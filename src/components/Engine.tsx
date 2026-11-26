"use client";

import { motion } from "framer-motion";
import { engine } from "@/content";
import { Reveal, Section } from "./Section";

const ease = [0.22, 1, 0.36, 1] as const;

function TrendChart() {
  const desc = engine.trend.map((t) => `${t.year}${t.note ? ` ${t.note}` : ""}: ${t.rate}%`).join(", ");
  return (
    <div className="rounded-3xl border border-line bg-card p-6 sm:p-8">
      <div className="flex items-baseline justify-between">
        <p className="font-medium">{engine.chartLabel}</p>
        <p className="text-sm text-muted">{engine.chartNote}</p>
      </div>
      <div role="img" aria-label={`${engine.chartLabel} by year. ${desc}.`} className="relative mt-8 h-64">
        {/* gridlines */}
        {[25, 50, 75, 100].map((g) => (
          <div key={g} aria-hidden="true" className="absolute inset-x-0 border-t border-dashed border-line" style={{ bottom: `${g}%` }}>
            <span className="absolute -top-2.5 right-0 bg-card pl-2 text-[11px] text-muted">{g}%</span>
          </div>
        ))}
        <div aria-hidden="true" className="absolute inset-0 flex items-end gap-3 pr-10 sm:gap-5">
          {engine.trend.map((t, i) => {
            const isLast = i === engine.trend.length - 1;
            return (
              <div key={t.year} className="group relative flex h-full flex-1 flex-col justify-end">
                <div className="relative w-full" style={{ height: `${t.rate}%` }}>
                  <motion.span
                    className={`absolute -top-7 left-1/2 -translate-x-1/2 text-sm font-semibold tabular-nums ${isLast ? "text-accent" : "text-ink/80"}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                  >
                    {t.rate}%
                  </motion.span>
                  <motion.div
                    className={`h-full w-full origin-bottom rounded-t-xl transition-colors ${isLast ? "bg-accent" : "bg-accent/30 group-hover:bg-accent/50"}`}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 1, delay: i * 0.1, ease }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div aria-hidden="true" className="mt-3 flex gap-3 pr-10 sm:gap-5">
        {engine.trend.map((t) => (
          <span key={t.year} className="flex-1 text-center text-xs text-muted">
            {t.year}
            {t.note ? <span className="block text-[10px]">{t.note}</span> : null}
          </span>
        ))}
      </div>
    </div>
  );
}

function Marquee() {
  const list = [...engine.countries, ...engine.countries];
  return (
    <div className="mt-14">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted">{engine.countriesTitle}</p>
      <p className="sr-only">{engine.countries.join(", ")}</p>
      <div
        aria-hidden="true"
        className="relative mt-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        <div className="flex w-max animate-[marquee_45s_linear_infinite] gap-3 hover:[animation-play-state:paused]">
          {list.map((c, i) => (
            <span key={i} className="whitespace-nowrap rounded-full border border-line bg-card px-4 py-2 text-sm">
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Engine() {
  return (
    <Section id="impact" title={engine.title} lead={engine.lead}>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <TrendChart />
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {engine.highlights.map((h, i) => (
            <li key={h.label}>
              <Reveal delay={i * 0.08} className="h-full">
                <div className="flex h-full items-center gap-5 rounded-2xl border border-line bg-card px-5 py-4 transition-colors hover:border-accent/40">
                  <span className="min-w-[5.5rem] whitespace-nowrap font-serif text-3xl font-medium text-accent-2">{h.value}</span>
                  <span className="text-sm leading-snug text-muted">{h.label}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
      <Marquee />
    </Section>
  );
}
