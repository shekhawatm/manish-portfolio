"use client";

import { motion } from "framer-motion";
import { engine, hero, site } from "@/content";
import { AvatarBadge } from "./Avatar";
import { RichText } from "./Chips";
import { Magnetic } from "./Magnetic";
import { HeroScout } from "./Mascot";
import { RoleCycler } from "./RoleCycler";

const ease = [0.22, 1, 0.36, 1] as const;

/** Floating card: a small bar chart of the offer-to-join trend. */
function HeroCard() {
  const max = 100;
  return (
    <motion.figure
      initial={{ opacity: 0, y: 30, rotate: 2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 1, delay: 0.3, ease }}
      className="relative w-full max-w-sm rounded-[28px] border border-line bg-card/90 p-6 shadow-[0_30px_80px_-30px_rgba(60,30,10,0.35)] backdrop-blur"
    >
      <figcaption className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted">{hero.card.title}</p>
          <p className="mt-1 font-serif text-4xl font-medium tracking-tight">
            {hero.card.from}% <span className="text-muted">→</span> <span className="text-accent">{hero.card.to}%</span>
          </p>
        </div>
        <span className="whitespace-nowrap rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
          ▲ {hero.card.to - hero.card.from} pts
        </span>
      </figcaption>

      <div
        role="img"
        aria-label={`Bar chart of ${engine.chartLabel.toLowerCase()} by year: ${engine.trend.map((t) => `${t.year} ${t.rate}%`).join(", ")}`}
        className="mt-6 flex h-36 items-end gap-2.5"
      >
        {engine.trend.map((t, i) => (
          <div key={t.year} className="flex h-full flex-1 flex-col items-center gap-2" aria-hidden="true">
            <div className="flex w-full flex-1 items-end">
              <motion.div
                className={`w-full origin-bottom rounded-t-lg ${i === engine.trend.length - 1 ? "bg-accent" : "bg-accent/25"}`}
                style={{ height: `${(t.rate / max) * 100}%` }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.9, delay: 0.6 + i * 0.08, ease }}
              />
            </div>
            <span className="text-[11px] text-muted">&rsquo;{t.year.slice(2)}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted">{hero.card.caption}</p>

      <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
        {hero.card.chips.map((c) => (
          <span key={c} className="rounded-full bg-accent-2-soft px-3 py-1 text-xs font-medium text-accent-2">
            {c}
          </span>
        ))}
      </div>

      {/* small floating badge */}
      <motion.div
        aria-hidden="true"
        className="absolute -left-6 -top-5 hidden items-center gap-2 rounded-2xl border border-line bg-card px-3 py-2 text-xs shadow-lg sm:flex"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        Recruiting since 2016
      </motion.div>
      {/* Scout, the mascot, perched on the card */}
      <div className="absolute -bottom-14 right-4 z-10">
        <HeroScout />
      </div>
    </motion.figure>
  );
}

export function Hero() {
  // The last three words get the accent colour: "…a lean, global team scale."
  const words = hero.headline.split(" ");
  const before = words.slice(0, -3).join(" ");
  const last = words.slice(-3).join(" ");

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Soft, slowly drifting glow behind everything */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-accent-soft blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, 24, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-accent-2-soft blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Faint dotted grid for texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(var(--line)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-24 pt-16 sm:px-8 sm:pb-32 sm:pt-24 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-4 py-1.5 text-sm text-muted"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <RoleCycler roles={hero.roles} />
            <span aria-hidden="true">·</span>
            {site.company}
          </motion.p>

          {/* Friendly greeting with a waving hand */}
          <p className="mt-7 flex items-center gap-4 font-serif text-2xl italic text-muted">
            <AvatarBadge size={72} />
            {hero.greeting}
            <motion.span
              aria-hidden="true"
              className="inline-block origin-[70%_70%] not-italic"
              animate={{ rotate: [0, 18, -8, 18, -4, 10, 0] }}
              transition={{ duration: 1.8, delay: 0.8, repeat: Infinity, repeatDelay: 4 }}
            >
              👋
            </motion.span>
          </p>

          {/* Headline and intro render instantly (no fade) so the page paints fast */}
          <h1
            id="hero-title"
            className="mt-3 font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-[3.6rem]"
          >
            {before} <em className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text pr-2 font-normal italic text-transparent">{last}</em>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
            <RichText text={hero.intro} />
          </p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Magnetic>
              <a
                href={hero.primaryCta.href}
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-medium text-paper shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]"
              >
                {hero.primaryCta.label}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={hero.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-card/60 px-6 py-3 font-medium transition-colors hover:border-ink"
              >
                {hero.secondaryCta.label}
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <HeroCard />
        </div>
      </div>

      {/* Scroll hint: a little mouse with a dot rolling down */}
      <a
        href="#numbers"
        aria-label="Scroll to the next section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted transition-colors hover:text-ink sm:flex"
      >
        <span className="flex h-9 w-6 justify-center rounded-full border-2 border-current pt-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-current"
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        Scroll
      </a>
    </section>
  );
}
