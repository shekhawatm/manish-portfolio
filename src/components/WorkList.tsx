"use client";

import { motion } from "framer-motion";
import { work } from "@/content";

/** A clean, scannable "Work" list: logo, company, role, years in mono, and a hover arrow. */
export function WorkList() {
  return (
    <div className="mb-16">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted">At a glance</p>
      <ul className="mt-4 border-t border-line">
        {work.map((w, i) => (
          <motion.li
            key={w.org + w.years}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex items-center gap-4 border-b border-line py-4"
          >
            {/* hover wash that slides in from the left */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 -left-3 -right-3 origin-left scale-x-0 rounded-xl bg-card transition-transform duration-300 ease-out group-hover:scale-x-100"
            />
            <span
              aria-hidden="true"
              className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
              style={{ background: w.color }}
            >
              {w.mark}
            </span>
            <span className="relative min-w-0 flex-1">
              <span className="block font-medium">{w.org}</span>
              <span className="block text-sm text-muted">{w.role}</span>
            </span>
            <span className="relative shrink-0 font-mono text-xs text-muted sm:text-sm">{w.years}</span>
            <span
              aria-hidden="true"
              className="relative -ml-2 w-0 overflow-hidden text-accent opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:w-4 group-hover:opacity-100"
            >
              →
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
