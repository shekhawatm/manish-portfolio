"use client";

import { motion } from "framer-motion";
import { lifecycle } from "@/content";
import { Section } from "./Section";

const ease = [0.22, 1, 0.36, 1] as const;

const icons: Record<string, React.ReactElement> = {
  Attract: <path d="M11 4a7 7 0 1 0 4.9 12l4.1 4M11 8v6M8 11h6" />,
  Hire: <path d="M5 12l4 4 10-10" />,
  Operate: <path d="M4 7h16M4 12h16M4 17h10" />,
  Develop: <path d="M4 18l6-6 4 4 6-8M15 8h5v5" />,
  Engage: <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />,
  Automate: <path d="M13 3L5 14h6l-1 7 8-11h-6z" />,
};

export function Lifecycle() {
  return (
    <Section id="lifecycle" title={lifecycle.title} lead={lifecycle.lead} className="bg-paper-2">
      <div className="relative">
        {/* connecting line that draws itself across the steps (desktop) */}
        <motion.div
          aria-hidden="true"
          className="absolute left-0 right-0 top-7 hidden h-px origin-left bg-accent/40 lg:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease }}
        />
        <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-3">
          {lifecycle.steps.map((s, i) => (
            <motion.li
              key={s.verb}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease }}
              className="group"
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:text-paper ${i % 2 ? "text-accent-2 group-hover:bg-accent-2" : "text-accent group-hover:bg-accent"}`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {icons[s.verb]}
                </svg>
              </div>
              <p className="mt-4 text-xs font-medium text-muted">Step {i + 1}</p>
              <h3 className="mt-1 font-serif text-2xl font-medium">{s.verb}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
