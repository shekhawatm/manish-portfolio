"use client";

import { MotionConfig } from "framer-motion";

/** Honours the visitor's "reduce motion" setting across every animation on the site. */
export function Motion({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
