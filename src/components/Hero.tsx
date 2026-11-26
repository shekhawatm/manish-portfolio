"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { avatar, chips, hero, journey, site } from "@/content";
import { burst } from "./Burst";
import { Magnetic } from "./Magnetic";
import { HeroMascot } from "./Mascot";
import { RoleCycler } from "./RoleCycler";

const ease = [0.22, 1, 0.36, 1] as const;

/** A rounded pill with a company's little logo square, used inside the hero lines. */
function LogoPill({ name }: { name: string }) {
  const c = chips[name];
  const body = (
    <>
      {c && (
        <span
          aria-hidden="true"
          className="inline-flex h-5 w-5 items-center justify-center rounded-md text-[11px] font-bold text-white"
          style={{ background: c.color }}
        >
          {c.mark}
        </span>
      )}
      {name}
    </>
  );
  const cls =
    "mx-1 inline-flex -translate-y-1 items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1 align-middle font-sans text-base font-medium not-italic text-ink shadow-sm transition-transform hover:-translate-y-1.5";
  return c?.href ? (
    <a href={c.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {body}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <span className={cls}>{body}</span>
  );
}

/** One hero line that rises into place. */
function Line({ i, children, className = "", li = false }: { i: number; children: React.ReactNode; className?: string; li?: boolean }) {
  const Tag = li ? motion.li : motion.span;
  return (
    <Tag
      className={`block ${className}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease }}
    >
      {children}
    </Tag>
  );
}

/** The avatar on a little retro computer screen, with Ollie perched on top. */
function RetroAvatar() {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 3 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 1, delay: 0.3, ease }}
      className="relative mx-auto w-[min(78vw,320px)]"
    >
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        {/* monitor */}
        <button
          type="button"
          aria-label={avatar.alt}
          onClick={(e) => burst(e.clientX, e.clientY, 24)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="relative block w-full cursor-pointer rounded-[34px] border border-[#e4d3ae] bg-gradient-to-b from-[#f6ecd6] to-[#eadbb9] p-5 pb-10 shadow-[0_40px_80px_-40px_rgba(90,60,10,0.55),inset_0_2px_0_rgba(255,255,255,0.7)] dark:border-[#3a3626] dark:from-[#2b2a22] dark:to-[#1f1e18]"
        >
          <span className="relative block aspect-[4/3.4] overflow-hidden rounded-[20px] border-4 border-[#d9c79f] bg-butter-soft dark:border-[#3f3b2a]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatar.full} alt="" className="h-full w-full object-cover object-top" />
            {/* faint scanlines and glass shine */}
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-20 [background:repeating-linear-gradient(0deg,transparent_0_3px,rgba(0,0,0,0.18)_3px_4px)]" />
            <span aria-hidden="true" className="pointer-events-none absolute -left-1/4 -top-1/2 h-full w-[150%] rotate-12 bg-gradient-to-b from-white/35 to-transparent" />
            <AnimatePresence>
              {hover && (
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-3 py-1 font-mono text-xs text-paper"
                >
                  {avatar.tooltip}
                </motion.span>
              )}
            </AnimatePresence>
          </span>
          {/* little badge and power light */}
          <span aria-hidden="true" className="absolute bottom-3.5 left-7 font-mono text-[10px] tracking-[0.2em] text-[#a8936a]">
            MS·2016
          </span>
          <motion.span
            aria-hidden="true"
            className="absolute bottom-4 right-8 h-2 w-2 rounded-full bg-emerald-500"
            animate={{ opacity: [1, 0.35, 1] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
        </button>
        {/* neck and base */}
        <span aria-hidden="true" className="mx-auto block h-6 w-20 bg-gradient-to-b from-[#e6d6b2] to-[#d8c59c] dark:from-[#2b2a22] dark:to-[#22211b]" />
        <span aria-hidden="true" className="mx-auto block h-4 w-44 rounded-t-xl rounded-b-md bg-[#e2d0a8] shadow-[0_14px_30px_-14px_rgba(90,60,10,0.5)] dark:bg-[#2b2a22]" />
      </motion.div>
      {/* Ollie perched on the monitor */}
      <div className="absolute -right-4 -top-14 z-10">
        <HeroMascot />
      </div>
    </motion.div>
  );
}

/** Quiet, still row of company names (inspired by Linear's logo wall). */
function LogoRow() {
  return (
    <div className="relative mx-auto max-w-6xl px-5 pb-16 sm:px-8">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-muted">{journey.logoRowTitle}</p>
      <ul className="mx-auto mt-5 flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {journey.companies.map((c, i) => (
          <motion.li
            key={c}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05, ease }}
            className="font-serif text-xl font-medium tracking-tight text-ink/40 transition-colors duration-300 hover:text-ink sm:text-2xl"
          >
            {c}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function Hero() {
  const l = hero.lines;
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* soft butter glow and dotted texture */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-butter-soft blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, 24, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-accent-2-soft/70 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(var(--line)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.4fr_1fr]">
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

          <p className="mt-7 font-serif text-xl italic text-muted">
            {hero.greeting}{" "}
            <motion.span
              aria-hidden="true"
              className="inline-block origin-[70%_70%] not-italic"
              animate={{ rotate: [0, 18, -8, 18, -4, 10, 0] }}
              transition={{ duration: 1.8, delay: 0.8, repeat: Infinity, repeatDelay: 4 }}
            >
              👋
            </motion.span>
          </p>

          {/* short lines, readable in five seconds */}
          <h1 id="hero-title" className="mt-3 font-serif text-[2.1rem] font-medium leading-[1.2] tracking-tight sm:text-5xl lg:text-[3.3rem]">
            <Line i={0}>{l.lead}</Line>
            <Line i={1} className="text-muted">
              from{" "}
              <span className="whitespace-nowrap rounded-lg bg-paper-2 px-2 text-[0.82em] italic text-muted line-through decoration-accent/60 decoration-2">{l.from}</span>
            </Line>
            <Line i={2} className="text-muted">
              to{" "}
              <em className="whitespace-nowrap rounded-lg bg-butter px-2 font-normal not-italic text-ink">{l.to}</em>
            </Line>
          </h1>

          <ul className="mt-6 space-y-2 font-serif text-xl text-muted sm:text-2xl">
            <Line i={3} li>
                Now @<LogoPill name={l.now[0]} />
            </Line>
            <Line i={4} li>
                Before @<LogoPill name={l.before[0]} />&amp;<LogoPill name={l.before[1]} />
            </Line>
            <Line i={5} li>
                Next @
                <a
                  href="#contact"
                  className="mx-1 inline-flex -translate-y-1 items-center gap-1 rounded-full border border-dashed border-accent/60 px-3 py-1 align-middle font-sans text-base font-medium text-accent transition-colors hover:bg-accent-soft"
                >
                  {l.next}
                  <motion.span aria-hidden="true" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                    |
                  </motion.span>
                </a>
            </Line>
          </ul>

          {/* two-tone intro: the key sentence in ink, the rest soft */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted"
          >
            <span className="font-medium text-ink">{hero.introLead}</span> {hero.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Magnetic>
              <Link
                href={hero.primaryCta.href}
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-medium text-paper shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]"
              >
                {hero.primaryCta.label}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
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

        <RetroAvatar />
      </div>

      <LogoRow />
    </section>
  );
}
