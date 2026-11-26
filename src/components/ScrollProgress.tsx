"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin accent bar across the top that fills as you read down the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-accent via-gold to-accent-2"
      style={{ scaleX }}
    />
  );
}
