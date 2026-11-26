"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/** Cycles through short role lines, sliding each one up into place. */
export function RoleCycler({ roles, interval = 2600 }: { roles: string[]; interval?: number }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce || roles.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % roles.length), interval);
    return () => clearInterval(t);
  }, [reduce, roles.length, interval]);

  return (
    <span className="relative inline-grid h-[1.4em] items-center overflow-hidden align-middle leading-[1.4em]">
      {/* screen readers get the full list once, not a ticker */}
      <span className="sr-only">{roles.join(", ")}</span>
      <AnimatePresence initial={false}>
        <motion.span
          key={roles[i]}
          aria-hidden="true"
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-110%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="whitespace-nowrap font-medium text-ink [grid-area:1/1]"
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
