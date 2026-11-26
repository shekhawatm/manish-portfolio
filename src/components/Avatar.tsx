"use client";

/**
 * Manish's illustrated avatar, in three flavours:
 *  - AvatarBadge: round face with a slowly spinning gradient ring, a gentle float,
 *    a tilt + "That's me!" tooltip on hover, and confetti on click.
 *  - NavAvatar: the small version next to the name in the nav.
 *  - WelcomeCard: the full "come on in" picture, revealed like a door opening.
 */
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { avatar } from "@/content";
import { burst } from "./Burst";

export function AvatarBadge({ size = 72 }: { size?: number }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.button
      type="button"
      aria-label={avatar.alt}
      onClick={(e) => burst(e.clientX, e.clientY, 22)}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      initial={{ scale: 0, rotate: -25 }}
      animate={{ scale: 1, rotate: 0, y: [0, -4, 0] }}
      transition={{
        scale: { type: "spring", stiffness: 260, damping: 14, delay: 0.2 },
        rotate: { type: "spring", stiffness: 260, damping: 14, delay: 0.2 },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 },
      }}
      whileHover={{ scale: 1.08, rotate: -6 }}
      whileTap={{ scale: 0.92 }}
      className="glow-ring relative shrink-0 cursor-pointer rounded-full"
      style={{ width: size, height: size }}
    >
      <span className="block h-full w-full overflow-hidden rounded-full border-[3px] border-paper bg-paper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={avatar.face} alt="" width={size} height={size} className="h-full w-full object-cover" />
      </span>
      <AnimatePresence>
        {hover && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            className="pointer-events-none absolute -top-10 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-xl border border-line bg-card px-3 py-1.5 text-xs font-medium not-italic text-ink shadow-lg"
          >
            {avatar.tooltip}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function NavAvatar() {
  return (
    <span className="relative mr-2.5 inline-flex h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/30 transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={avatar.face} alt="" width={32} height={32} className="h-full w-full object-cover" />
    </span>
  );
}

export function WelcomeCard() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.figure
      ref={ref}
      // the picture opens like a pair of doors
      initial={{ clipPath: "inset(0 50% 0 50% round 28px)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0% round 28px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
      className="group relative aspect-square w-full max-w-sm overflow-hidden rounded-[28px] border border-paper/15 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]"
    >
      <motion.div style={{ y }} className="absolute -inset-[6%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatar.full}
          alt={avatar.alt}
          width={720}
          height={720}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </motion.div>
      <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl bg-ink/70 px-4 py-3 text-sm text-paper backdrop-blur-md">
        {avatar.caption}
      </figcaption>
    </motion.figure>
  );
}
