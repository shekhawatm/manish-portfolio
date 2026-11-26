#!/usr/bin/env node
/**
 * Privacy check. Runs before every build (`npm run build`) and on its own
 * with `npm run privacy`. Exits with an error if any file in the repo contains
 * a banned pattern, so nothing private can be deployed by accident.
 *
 * Two lists:
 *  1. BANNED below: generic patterns (internal links, pay words, work email).
 *  2. .privacy-terms.txt: your PRIVATE list of names (colleagues, candidates,
 *     vendors), one per line. That file is git-ignored, so the names themselves
 *     never enter the repo. Copy .privacy-terms.example.txt to start one.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SKIP_DIRS = new Set(["node_modules", ".next", "out", ".git", ".vercel"]);
const SKIP_FILES = new Set([
  "scripts/privacy-check.mjs", // this file names the patterns, so it would match itself
  ".privacy-terms.txt",
  ".privacy-terms.example.txt",
  "package-lock.json",
]);
const TEXT_EXT = /\.(tsx?|jsx?|mjs|cjs|css|md|mdx|json|svg|html|txt|ya?ml)$/i;

// Built with string joins so the raw patterns do not appear as plain text elsewhere.
const at = "@";
const BANNED = [
  { label: "Slack link", re: /slack\.com/i },
  { label: "Notion link or mention", re: /notion/i },
  { label: "Google Docs/Sheets link", re: /docs\.google\.com/i },
  { label: "Gem link", re: /gem\.com/i },
  { label: "Work email address", re: new RegExp(at + "fireflies\\.ai", "i") },
  { label: "Pay word: salary", re: /salar(y|ies)/i },
  { label: "Pay word: payslip", re: /payslip/i },
  { label: "Pay word: location factor", re: /location[- ]factor/i },
  { label: "Pay word: bonus", re: /bonus/i },
  // "offer" on its own is allowed for aggregate rates (offer-to-join). Block offer letters and amounts.
  { label: "Offer letter or amount", re: /offer[- ]letter|offer[^.\n]{0,30}[$₹€£]|[$₹€£][\d,.]+[^.\n]{0,30}offer/i },
  { label: "Currency amount", re: /[$₹€£]\s?\d/ },
  { label: "Performance word: PIP", re: /\bPIPs?\b/ },
  { label: "Secret-looking token", re: /(sk|pk|ghp|xox[bpa])[-_][A-Za-z0-9]{16,}/ },
];

// Exact phrases that are allowed even though they contain a banned word.
// These are your own descriptions of tools you built, with no figures in them.
const ALLOWED_PHRASES = ["Performance and bonus tool", "appraisals and bonuses"];

// Your own name is always allowed.
const OWN_NAME = /manish|shekhawat/i;

function privateTerms() {
  const file = join(ROOT, ".privacy-terms.txt");
  if (!existsSync(file)) return [];
  return readFileSync(file, "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#") && !OWN_NAME.test(l))
    .map((term) => ({
      label: "Private name or term (from .privacy-terms.txt)",
      re: new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i"),
      hideMatch: true,
    }));
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    const rel = relative(ROOT, full);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (!SKIP_FILES.has(rel) && (TEXT_EXT.test(name) || name.startsWith(".env"))) out.push(full);
  }
  return out;
}

const patterns = [...BANNED, ...privateTerms()];
const problems = [];

for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file);
  if (rel.startsWith(".env") && rel !== ".env.example") {
    problems.push(`${rel}: .env file found in repo folder, check it is git-ignored and holds no secrets`);
  }
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((rawLine, i) => {
      let line = rawLine;
      for (const phrase of ALLOWED_PHRASES) line = line.split(phrase).join("");
      for (const p of patterns) {
        const m = line.match(p.re);
        if (m) problems.push(`${rel}:${i + 1}  ${p.label}${p.hideMatch ? "" : `  ("${m[0]}")`}`);
      }
    });
}

const privateCount = patterns.length - BANNED.length;
console.log(`Privacy check: scanned with ${BANNED.length} built-in patterns and ${privateCount} private terms.`);
if (!privateCount) console.log("  Note: no .privacy-terms.txt found, so names are not being checked. See README.");

// Reminders (not failures): items still waiting on your confirmation.
const content = readFileSync(join(ROOT, "src/content.ts"), "utf8");
const block = content.match(/needsConfirmation\s*=\s*\[([\s\S]*?)\]/);
if (block) {
  const items = [...block[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  if (items.length) {
    console.log("\nStill to confirm before publishing:");
    items.forEach((t) => console.log(`  • ${t}`));
  }
}

if (problems.length) {
  console.error(`\n✗ Privacy check FAILED (${problems.length}):`);
  problems.forEach((p) => console.error(`  ${p}`));
  process.exit(1);
}
console.log("\n✓ Privacy check passed: no banned patterns found.");
