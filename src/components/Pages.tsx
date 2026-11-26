"use client";

/**
 * Building blocks for the multi-page layout:
 * - Explore: the icon tiles on the home page that open each page
 * - PageHeader: the calm intro at the top of every page
 * - UpNext: the "next page" card at the bottom, so reading flows page to page
 */
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronRight, House } from "lucide-react";
import Link from "next/link";
import { pages, recommendations, type PageInfo } from "@/content";
import { IconBadge } from "./Icons";

const ease = [0.22, 1, 0.36, 1] as const;

export function Explore() {
  const quote = recommendations.items[1];
  return (
    <section id="explore" aria-labelledby="explore-title" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Explore</p>
            <h2 id="explore-title" className="mt-2 font-serif text-4xl font-medium tracking-tight sm:text-5xl">
              Pick a page<span className="text-accent">.</span>
            </h2>
          </div>
          <p className="max-w-sm text-muted">Each page is short and focused. Start anywhere; every page links to the next.</p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((p, i) => (
            <motion.li
              key={p.href}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease }}
              className={i === 0 ? "lg:row-span-2" : ""}
            >
              <Tile p={p} n={i + 1} big={i === 0} />
            </motion.li>
          ))}
          {/* the last tile: a wide quote band that opens the praise page */}
          <motion.li
            className="sm:col-span-2 lg:col-span-3"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
          >
            <Link
              href="/praise"
              className="group relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-[28px] bg-ink p-6 text-paper sm:flex-row sm:items-center sm:p-8 transition-transform duration-300 hover:-translate-y-1"
            >
              <span aria-hidden="true" className="font-serif text-6xl leading-none text-butter">&ldquo;</span>
              <p className="font-serif text-xl leading-snug sm:flex-1 sm:text-2xl">{quote.short}</p>
              <p className="flex items-center justify-between gap-3 text-sm text-paper/70 sm:max-w-xs">
                <span>
                  {quote.name} · {quote.role}
                </span>
                <ArrowUpRight size={18} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </p>
            </Link>
          </motion.li>
        </ul>
      </div>
    </section>
  );
}

function Tile({ p, n, big }: { p: PageInfo; n: number; big: boolean }) {
  return (
    <Link
      href={p.href}
      className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-butter hover:shadow-[0_24px_60px_-30px_rgba(90,60,10,0.45)]"
    >
      {/* a butter-coloured glow that grows from the corner on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-butter-soft opacity-0 transition-all duration-500 group-hover:scale-150 group-hover:opacity-100"
      />
      <span className="relative flex items-center justify-between">
        <IconBadge name={p.icon} tint={p.tint} size={big ? 56 : 46} />
        <span className="font-mono text-xs text-muted">0{n}</span>
      </span>
      <span className={`relative mt-6 block font-serif font-medium tracking-tight ${big ? "text-3xl sm:text-4xl" : "text-2xl"}`}>{p.label}</span>
      <span className="relative mt-2 block text-muted">{p.blurb}</span>
      {big && <MiniBars />}
      <span className="relative mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium">
        Open
        <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5" />
      </span>
    </Link>
  );
}

/** A small decorative bar chart for the big Impact tile (the real chart is on the Impact page). */
function MiniBars() {
  const bars = [66, 83, 95, 83, 87, 94];
  return (
    <span aria-hidden="true" className="relative mt-8 flex h-28 items-end gap-2">
      {bars.map((b, i) => (
        <motion.span
          key={i}
          className={`flex-1 origin-bottom rounded-t-md ${i === bars.length - 1 ? "bg-accent" : "bg-accent/20 group-hover:bg-accent/35"}`}
          style={{ height: `${b}%` }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 + i * 0.07, ease }}
        />
      ))}
    </span>
  );
}

/** Calm page intro: breadcrumb, floating icon, title and one line of context. */
export function PageHeader({ slug, sections }: { slug: PageInfo["slug"]; sections: { id: string; label: string }[] }) {
  const i = pages.findIndex((p) => p.slug === slug);
  const p = pages[i];
  return (
    <section id="top" aria-labelledby="page-title" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-butter-soft blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(var(--line)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
      />
      <div className="relative mx-auto max-w-6xl px-5 pb-10 pt-12 sm:px-8 sm:pb-14 sm:pt-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-muted">
            <li>
              <Link href="/" className="inline-flex items-center gap-1 hover:text-ink">
                <House size={14} aria-hidden="true" /> Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={14} />
            </li>
            <li aria-current="page" className="text-ink">
              {p.label}
            </li>
          </ol>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mt-8 flex items-center gap-4"
        >
          <IconBadge name={p.icon} tint={p.tint} size={60} float />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            0{i + 1} / 0{pages.length} · {p.label}
          </span>
        </motion.div>

        <h1 id="page-title" className="mt-6 max-w-3xl font-serif text-[2.6rem] font-medium leading-[1.05] tracking-tight sm:text-6xl">
          {p.title}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mt-5 max-w-2xl text-lg text-muted"
        >
          {p.lead}
        </motion.p>

        {sections.length > 1 && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            aria-label="On this page"
            className="mt-8 flex flex-wrap gap-2"
          >
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card/80 px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-butter hover:bg-butter-soft hover:text-ink"
                >
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {s.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  );
}

/** Bottom-of-page card that leads on to the next page (and wraps back round to the first). */
export function UpNext({ slug }: { slug: PageInfo["slug"] }) {
  const i = pages.findIndex((p) => p.slug === slug);
  const next = pages[(i + 1) % pages.length];
  return (
    <section aria-label="Next page" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Link
          href={next.href}
          className="group relative flex flex-col gap-6 overflow-hidden rounded-[32px] border border-line bg-butter-soft p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-35px_rgba(90,60,10,0.5)] sm:flex-row sm:items-center sm:justify-between sm:p-10"
        >
          <span className="flex items-center gap-5">
            <IconBadge name={next.icon} tint={next.tint} size={56} />
            <span>
              <span className="block font-mono text-xs uppercase tracking-[0.2em] text-muted">Up next</span>
              <span className="mt-1 block font-serif text-3xl font-medium tracking-tight sm:text-4xl">{next.label}</span>
              <span className="mt-1 block text-muted">{next.blurb}</span>
            </span>
          </span>
          <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center self-end rounded-full bg-ink text-paper transition-transform duration-300 group-hover:rotate-[-45deg] sm:self-auto">
            <ArrowRight size={22} aria-hidden="true" />
          </span>
        </Link>
        <p className="mt-6 text-center text-sm text-muted">
          or{" "}
          <Link href="/" className="underline decoration-line underline-offset-4 hover:text-ink">
            go back home
          </Link>
        </p>
      </div>
    </section>
  );
}
