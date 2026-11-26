"use client";

import { useState } from "react";
import { contact, site } from "@/content";
import { Reveal } from "./Section";

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the mailto link still works */
    }
  }
  return (
    <div className="mt-10 inline-flex max-w-full flex-wrap items-center gap-2 rounded-2xl border border-paper/15 bg-paper/5 p-2 pl-5">
      <a href={`mailto:${contact.email}`} className="break-all font-serif text-xl underline-offset-4 hover:underline sm:text-3xl">
        {contact.email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="ml-auto rounded-xl bg-paper/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-paper/20"
      >
        <span aria-live="polite">{copied ? "Copied ✓" : "Copy"}</span>
        <span className="sr-only"> email address</span>
      </button>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-ink text-paper">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-40 h-[30rem] w-[30rem] rounded-full bg-accent/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[26rem] w-[26rem] rounded-full bg-accent-2/30 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <h2 id="contact-title" className="font-serif text-5xl font-medium tracking-tight sm:text-7xl">
            {contact.title}
            <span className="text-accent">.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-paper/75">{contact.text}</p>
          <CopyEmail />
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
              </svg>
              LinkedIn
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-6 py-3 font-medium transition-colors hover:border-paper"
            >
              GitHub
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </Reveal>
      </div>
      <footer className="relative border-t border-paper/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-paper/60 sm:flex-row sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>Vibe-coded with Claude · Deployed on Vercel</p>
        </div>
      </footer>
    </section>
  );
}
