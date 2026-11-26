"use client";

import { motion } from "framer-motion";
import { principles } from "@/content";
import { Section } from "./Section";

export function Principles() {
  return (
    <Section id="how" title={principles.title}>
      <ol className="divide-y divide-line border-y border-line">
        {principles.items.map((p, i) => (
          <motion.li
            key={p.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group flex items-baseline gap-6 py-7 sm:gap-10 sm:py-9"
          >
            <span className="font-serif text-sm italic text-accent" aria-hidden="true">
              {p.n}
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <span className="block font-serif text-2xl leading-snug tracking-tight sm:text-4xl">{p.text}</span>
              <span className="mt-1.5 block text-muted">{p.sub}</span>
            </span>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
