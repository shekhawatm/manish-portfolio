"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { life, openSource, recognition, recommendations } from "@/content";
import { Reveal, Section } from "./Section";

const ease = [0.22, 1, 0.36, 1] as const;

const TrophyIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 4h8v5a4 4 0 0 1-8 0z" />
    <path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 20h8M10 17h4" />
  </svg>
);

/* ---------------- Recognition: trophy shelf, honours, certifications ---------------- */

export function Recognition() {
  const featured = recognition.awards.filter((a) => a.featured);
  const more = recognition.awards.filter((a) => !a.featured);

  return (
    <Section id="recognition" title={recognition.title} lead={recognition.lead} className="overflow-x-clip bg-paper-2">
      {/* Trophy shelf */}
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted">{recognition.shelfTitle}</p>
      <div className="relative mt-5">
        <ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-5">
          {featured.map((a, i) => (
            <motion.li
              key={a.title + a.date}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 140, damping: 16, delay: i * 0.1 }}
              className="group relative w-[78%] shrink-0 snap-start sm:w-auto"
            >
              <div
                className={`relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_24px_60px_-28px_rgba(180,73,42,0.6)] ${
                  i === 0 ? "border-transparent bg-ink text-paper" : "border-line bg-card"
                }`}
              >
                {/* glow */}
                <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/20 blur-2xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-0" />
                <motion.span
                  className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-paper"
                  whileHover={{ rotate: [0, -14, 10, -6, 0] }}
                  transition={{ duration: 0.7 }}
                >
                  <TrophyIcon size={28} />
                </motion.span>
                <p className={`mt-5 text-xs font-semibold uppercase tracking-[0.14em] ${i === 0 ? "text-accent" : "text-accent"}`}>{a.date}</p>
                <h3 className="mt-1 font-serif text-2xl font-medium leading-tight">{a.title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${i === 0 ? "text-paper/70" : "text-muted"}`}>{a.text}</p>
                {i === 0 && (
                  <span className="mt-auto pt-5 text-xs font-medium text-paper/60">Latest · {a.org}</span>
                )}
              </div>
            </motion.li>
          ))}
        </ul>
        {/* the shelf */}
        <motion.div
          aria-hidden="true"
          className="hidden h-2 origin-left rounded-full bg-gradient-to-r from-accent/50 via-accent/25 to-transparent sm:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
        />
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        {/* More honours */}
        <Reveal>
          <div className="h-full rounded-3xl border border-line bg-card p-7">
            <h3 className="font-serif text-2xl font-medium">More honours</h3>
            <ol className="mt-5 space-y-1">
              {more.map((a, i) => (
                <motion.li
                  key={a.title + a.date}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease }}
                  className="group flex gap-4 rounded-2xl p-3 transition-colors hover:bg-paper-2"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-110">
                    <TrophyIcon size={18} />
                  </span>
                  <span>
                    <span className="block font-medium">
                      {a.title} <span className="text-sm font-normal text-muted">· {a.org}, {a.date}</span>
                    </span>
                    <span className="block text-sm text-muted">{a.text}</span>
                  </span>
                </motion.li>
              ))}
            </ol>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          {/* Certifications */}
          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-line bg-card p-7">
              <h3 className="font-serif text-2xl font-medium">Certifications</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {recognition.certifications.map((c, i) => (
                  <motion.li
                    key={c.title}
                    initial={{ opacity: 0, scale: 0.85, y: 16 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 + i * 0.06 }}
                    whileHover={{ y: -4 }}
                    className="flex items-center gap-3 rounded-2xl bg-paper-2 p-3.5"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                      style={{ background: c.color }}
                    >
                      {c.mark}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium leading-snug">{c.title}</span>
                      <span className="block text-xs text-muted">
                        {c.issuer} · {c.date}
                      </span>
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
          {/* Publication */}
          <Reveal delay={0.12}>
            <div className="rounded-3xl border border-line bg-card p-7">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted">Publication</p>
              <p className="mt-3 font-serif text-xl font-medium italic">&ldquo;{recognition.publication.title}&rdquo;</p>
              <p className="mt-1 text-sm text-muted">{recognition.publication.text}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Recommendations: rotating feature + two scrolling strips ---------------- */

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
}

export function Recommendations() {
  const items = recommendations.items;
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused || items.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 6500);
    return () => clearInterval(t);
  }, [reduce, paused, items.length]);

  if (!items.length) return null;
  const r = items[i];
  const rowA = items.filter((_, k) => k % 2 === 0);
  const rowB = items.filter((_, k) => k % 2 === 1);

  return (
    <Section id="recommendations" title={recommendations.title} lead={recommendations.lead} className="overflow-x-clip">
      {/* Featured quote */}
      <div
        className="relative overflow-hidden rounded-[32px] border border-line bg-card p-8 sm:p-12"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <span aria-hidden="true" className="pointer-events-none absolute -left-2 -top-10 font-serif text-[12rem] leading-none text-accent/15">
          &ldquo;
        </span>
        <div className="relative min-h-[15rem] sm:min-h-[12rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
              transition={{ duration: 0.55, ease }}
            >
              <blockquote className="max-w-4xl font-serif text-2xl leading-snug tracking-tight sm:text-3xl">{r.quote}</blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full bg-accent font-semibold text-paper">
                  {initials(r.name)}
                </span>
                <span>
                  <span className="block font-medium">{r.name}</span>
                  <span className="block text-sm text-muted">
                    {r.role} · {r.year}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* controls */}
        <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Choose a recommendation">
            {items.map((it, k) => (
              <button
                key={it.name}
                type="button"
                role="tab"
                aria-selected={k === i}
                aria-label={`Recommendation from ${it.name}`}
                onClick={() => setI(k)}
                className="flex h-6 items-center"
              >
                <span className={`block h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-8 bg-accent" : "w-1.5 bg-line hover:bg-muted"}`} />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setI((v) => (v - 1 + items.length) % items.length)}
              aria-label="Previous recommendation"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line transition-colors hover:border-ink"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => setI((v) => (v + 1) % items.length)}
              aria-label="Next recommendation"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper transition-transform hover:-translate-y-0.5"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Scrolling strips of one-liners */}
      <div aria-hidden="true" className="mt-10 space-y-4 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        {[rowA, rowB].map((row, r2) => (
          <div key={r2} className="overflow-hidden">
            <div
              className={`flex w-max gap-4 hover:[animation-play-state:paused] ${
                r2 === 0 ? "animate-[marquee_60s_linear_infinite]" : "animate-[marquee_70s_linear_infinite_reverse]"
              }`}
            >
              {[...row, ...row].map((it, k) => (
                <div key={k} className="flex w-[22rem] shrink-0 items-start gap-3 rounded-2xl border border-line bg-card p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
                    {initials(it.name)}
                  </span>
                  <span>
                    <span className="block text-sm leading-snug">&ldquo;{it.short}&rdquo;</span>
                    <span className="mt-1 block text-xs text-muted">{it.name}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Reveal>
        <a
          href={recommendations.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 font-medium text-accent underline-offset-4 hover:underline"
        >
          Read all {items.length} on LinkedIn →<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </Reveal>
    </Section>
  );
}

/* ---------------- Off the clock ---------------- */

const lifeIcons: Record<string, React.ReactElement> = {
  run: <path d="M13 4a2 2 0 1 0 0 .01M7 21l3-6 3 2v4M10 15l1-5 4 3h4M6 12l3-3 3 1" />,
  bolt: <path d="M13 3L5 14h6l-1 7 8-11h-6z" />,
  ball: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3v18M5.6 5.6c3.5 3.5 3.5 9.3 0 12.8M18.4 5.6c-3.5 3.5-3.5 9.3 0 12.8" /></>,
  music: <><path d="M9 18V5l11-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" /></>,
  chef: <path d="M6 14a4 4 0 0 1 1-7.9A5 5 0 0 1 17 6a4 4 0 0 1 1 8v6H6z M6 17h12" />,
  book: <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 21V5" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" /></>,
};

export function Life() {
  return (
    <Section id="life" title={life.title} lead={life.lead} className="bg-paper-2">
      <ul className="flex flex-wrap gap-3">
        {life.items.map((it, i) => (
          <motion.li
            key={it.label}
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: i * 0.06 }}
            whileHover={{ y: -6, rotate: i % 2 ? 3 : -3 }}
            className="flex items-center gap-3 rounded-full border border-line bg-card py-2.5 pl-2.5 pr-5 text-lg"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {lifeIcons[it.icon]}
              </svg>
            </span>
            {it.label}
          </motion.li>
        ))}
      </ul>
      <Reveal>
        <p className="mt-8 text-muted">
          <span className="font-medium text-ink">Languages:</span> {life.languages}
        </p>
      </Reveal>
    </Section>
  );
}

/* ---------------- Open source ---------------- */

export function OpenSource() {
  return (
    <Section id="open-source" title={openSource.title}>
      {openSource.items.map((p) => (
        <Reveal key={p.name}>
          <div className="flex flex-col gap-6 rounded-3xl border border-line bg-card p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <p className="font-mono text-sm text-accent">github.com/shekhawatm/{p.name}</p>
              <h3 className="mt-2 font-serif text-2xl font-medium">{p.name}</h3>
              <p className="mt-2 max-w-xl text-muted">{p.text}</p>
            </div>
            <div className="flex shrink-0 gap-3">
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5">
                Try it<span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href={p.repo} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-ink">
                Code<span className="sr-only"> for {p.name} on GitHub (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </Reveal>
      ))}
    </Section>
  );
}
