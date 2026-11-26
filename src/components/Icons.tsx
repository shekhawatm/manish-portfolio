"use client";

/**
 * One place for the site's icons (from lucide-react), so pages, the top bar,
 * the dock and the home tiles all use the same picture for the same page.
 */
import {
  Award,
  Compass,
  Hammer,
  House,
  Lightbulb,
  Mail,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

export const icons: Record<string, LucideIcon> = {
  home: House,
  impact: TrendingUp,
  journey: Compass,
  approach: Lightbulb,
  built: Hammer,
  praise: Award,
  contact: Mail,
};

/** Soft background + strong foreground for each tint. */
export const tints: Record<string, string> = {
  accent: "bg-accent-soft text-accent",
  teal: "bg-accent-2-soft text-accent-2",
  gold: "bg-butter-soft text-gold",
  ink: "bg-paper/10 text-paper",
};

/** A rounded icon badge. `wiggle` gives it a little playful hover animation from its parent's `group`. */
export function IconBadge({
  name,
  tint = "accent",
  size = 44,
  float = false,
}: {
  name: string;
  tint?: string;
  size?: number;
  float?: boolean;
}) {
  const Icon = icons[name] ?? House;
  return (
    <motion.span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${tints[tint] ?? tints.accent}`}
      style={{ width: size, height: size }}
      animate={float ? { y: [0, -6, 0], rotate: [0, -4, 0] } : undefined}
      transition={float ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : undefined}
    >
      <Icon size={Math.round(size * 0.48)} strokeWidth={1.8} />
    </motion.span>
  );
}
