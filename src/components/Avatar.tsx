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
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -8 }}
      whileInView={{ opacity: 1, y: 0, rotate: -3 }}
      whileHover={{ rotate: 0, scale: 1.02 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      className="group relative w-full max-w-sm"
    >
      {/* two strips of washi tape holding the photo */}
      <span aria-hidden="true" className="absolute -top-3 left-8 z-20 h-6 w-20 -rotate-6 rounded-sm bg-gold/60 shadow-sm backdrop-blur-sm" />
      <span aria-hidden="true" className="absolute -top-3 right-8 z-20 h-6 w-20 rotate-6 rounded-sm bg-accent-2/50 shadow-sm backdrop-blur-sm" />

      {/* cream polaroid frame */}
      <figure className="relative rounded-[22px] bg-[#fffaf1] p-3 pb-4 text-[#1f1a15] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
        <motion.div
          ref={ref}
          // the picture opens like a pair of doors
          initial={{ clipPath: "inset(0 50% 0 50% round 14px)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0% round 14px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.65, 0, 0.35, 1] }}
          className="relative aspect-square overflow-hidden rounded-[14px] bg-[#f3e7d4]"
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
          {/* soft warm vignette */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(60,30,10,0.25))]" />
        </motion.div>
        <figcaption className="mt-3 px-1 text-center font-serif text-lg italic">{avatar.caption}</figcaption>
      </figure>

      {/* floating stickers */}
      <motion.span
        aria-hidden="true"
        animate={{ y: [0, -8, 0], rotate: [-8, -4, -8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-6 top-1/3 z-20 rounded-full bg-accent px-3.5 py-2 text-xs font-semibold text-white shadow-lg"
      >
        {avatar.stickers[0]}
      </motion.span>
      <motion.span
        aria-hidden="true"
        animate={{ y: [0, 8, 0], rotate: [8, 4, 8] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-5 bottom-24 z-20 rounded-full bg-accent-2 px-3.5 py-2 text-xs font-semibold text-white shadow-lg"
      >
        {avatar.stickers[1]}
      </motion.span>
    </motion.div>
  );
}
