"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { journey } from "@/content";
import { Reveal, Section } from "./Section";
import { WorkList } from "./WorkList";

const ease = [0.22, 1, 0.36, 1] as const;

export function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  // the timeline line fills as you scroll through it
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });

  return (
    <Section id="journey" title={journey.title} lead={journey.lead} className="overflow-x-clip bg-paper-2">
      <WorkList />
      <ol ref={ref} className="relative">
        {/* track + animated fill */}
        <div aria-hidden="true" className="absolute bottom-0 left-[11px] top-0 w-[2px] bg-line md:left-1/2 md:-translate-x-1/2" />
        <motion.div
          aria-hidden="true"
          className="absolute bottom-0 left-[11px] top-0 w-[2px] origin-top bg-gradient-to-b from-accent via-gold to-accent-2 md:left-1/2 md:-translate-x-1/2"
          style={{ scaleY: fill }}
        />

        {journey.roles.map((r, i) => {
          const right = i % 2 === 1;
          return (
            <li key={r.title + r.years} className="relative pb-10 pl-10 last:pb-0 md:grid md:grid-cols-2 md:gap-14 md:pl-0">
              {/* dot */}
              <motion.span
                aria-hidden="true"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
                transition={{ type: "spring", stiffness: 300, damping: 16 }}
                className={`absolute left-0 top-6 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent bg-paper md:left-1/2 md:-translate-x-1/2 ${
                  r.current ? "shadow-[0_0_0_6px_var(--accent-soft)]" : ""
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-accent" />
              </motion.span>

              <motion.article
                initial={{ opacity: 0, x: right ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease }}
                className={`group rounded-3xl border border-line bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.3)] sm:p-7 ${
                  right ? "md:col-start-2" : "md:col-start-1 md:text-right"
                }`}
              >
                <p className={`flex items-center gap-2 font-mono text-xs font-medium text-accent ${right ? "" : "md:justify-end"}`}>
                  {r.years}
                  {r.current && (
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-700 dark:text-emerald-300">Now</span>
                  )}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-medium leading-tight">{r.title}</h3>
                <p className="mt-1 font-medium text-muted">{r.org}</p>
                <p className="mt-3 leading-relaxed text-muted">{r.text}</p>
                <ul className={`mt-4 flex flex-wrap gap-2 ${right ? "" : "md:justify-end"}`}>
                  {r.tags.map((t) => (
                    <li key={t} className="rounded-full bg-accent-2-soft px-3 py-1 text-xs font-medium text-accent-2">
                      {t}
                    </li>
                  ))}
                </ul>
              </motion.article>
            </li>
          );
        })}
      </ol>

      {/* Education */}
      <div className="mt-16 grid gap-4 md:grid-cols-2">
        {journey.education.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.08}>
            <div className="flex items-center gap-4 rounded-2xl border border-line bg-card p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 9l10-5 10 5-10 5z" />
                  <path d="M6 11v5c3 2 9 2 12 0v-5" />
                </svg>
              </span>
              <div>
                <p className="font-medium">{e.title}</p>
                <p className="text-sm text-muted">{e.detail}</p>
                <p className="mt-1 font-mono text-xs font-medium text-accent">{e.years}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Companies marquee */}
      <div className="mt-14">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted">Hired for and with</p>
        <p className="sr-only">{journey.companies.join(", ")}</p>
        <div
          aria-hidden="true"
          className="relative mt-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
          <div className="flex w-max animate-[marquee_35s_linear_infinite_reverse] gap-10 hover:[animation-play-state:paused]">
            {[...journey.companies, ...journey.companies].map((c, i) => (
              <span key={i} className="whitespace-nowrap font-serif text-3xl font-medium text-ink/35 transition-colors hover:text-accent">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
