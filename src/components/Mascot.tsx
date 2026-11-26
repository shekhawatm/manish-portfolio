"use client";

/**
 * Scout: an original mascot drawn in SVG. A round little scout with a
 * spyglass-star antenna whose eyes follow your cursor, who blinks, bobs and
 * waves. Respects "reduce motion" through MotionConfig.
 */
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { mascot } from "@/content";

export function ScoutSvg({ size = 96, waving = false }: { size?: number; waving?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 220, damping: 18 });
  const sy = useSpring(py, { stiffness: 220, damping: 18 });
  const [blink, setBlink] = useState(false);

  // eyes follow the pointer
  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.max(1, Math.hypot(dx, dy));
      px.set((dx / d) * 2.6);
      py.set((dy / d) * 2.2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduce]);

  // blink every few seconds
  useEffect(() => {
    if (reduce) return;
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 140);
        loop();
      }, 2600 + Math.random() * 2600);
    };
    loop();
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <svg ref={ref} width={size} height={size} viewBox="0 0 120 120" aria-hidden="true" className="overflow-visible">
      {/* shadow */}
      <motion.ellipse
        cx="60" cy="112" rx="30" ry="5" fill="currentColor" className="text-ink/10"
        animate={reduce ? undefined : { rx: [30, 24, 30] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.g
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* antenna with a twinkling star */}
        <path d="M60 30 C 60 20, 66 14, 72 10" stroke="var(--ink)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <motion.path
          d="M74 1 l2.4 5.2 5.6.6-4.2 3.8 1.2 5.6-5-2.9-5 2.9 1.2-5.6-4.2-3.8 5.6-.6z"
          fill="#f2b84b"
          style={{ originX: "74px", originY: "8px" }}
          animate={reduce ? undefined : { rotate: [0, 18, -10, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* left arm */}
        <path d="M26 72 q-10 4 -12 14" stroke="var(--accent)" strokeWidth="8" fill="none" strokeLinecap="round" />
        {/* right arm (waves) */}
        <motion.path
          d="M94 70 q12 -4 16 -16"
          stroke="var(--accent)" strokeWidth="8" fill="none" strokeLinecap="round"
          style={{ originX: "94px", originY: "70px" }}
          animate={waving && !reduce ? { rotate: [0, -22, 8, -22, 0] } : { rotate: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />
        {/* body */}
        <ellipse cx="60" cy="70" rx="36" ry="38" fill="var(--accent)" />
        <ellipse cx="60" cy="82" rx="22" ry="20" fill="var(--paper)" opacity="0.9" />
        {/* cheeks */}
        <circle cx="36" cy="72" r="5" fill="#f28c7a" opacity="0.55" />
        <circle cx="84" cy="72" r="5" fill="#f28c7a" opacity="0.55" />
        {/* eyes */}
        <g>
          <ellipse cx="47" cy="60" rx="9" ry={blink ? 1 : 10} fill="#fff" />
          <ellipse cx="73" cy="60" rx="9" ry={blink ? 1 : 10} fill="#fff" />
          {!blink && (
            <>
              <motion.circle cx="47" cy="61" r="4.6" fill="#1c1917" style={{ x: sx, y: sy }} />
              <motion.circle cx="73" cy="61" r="4.6" fill="#1c1917" style={{ x: sx, y: sy }} />
              <motion.circle cx="48.5" cy="59" r="1.4" fill="#fff" style={{ x: sx, y: sy }} />
              <motion.circle cx="74.5" cy="59" r="1.4" fill="#fff" style={{ x: sx, y: sy }} />
            </>
          )}
        </g>
        {/* smile */}
        <path d="M53 76 q7 6 14 0" stroke="#1c1917" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        {/* little scout scarf */}
        <path d="M34 96 q26 12 52 0 l-4 8 q-22 8 -44 0z" fill="#f2b84b" />
      </motion.g>
    </svg>
  );
}

/** Speech bubble */
function Bubble({ text, side = "left" }: { text: string; side?: "left" | "top" }) {
  return (
    <motion.div
      key={text}
      initial={{ opacity: 0, y: 8, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={`pointer-events-none absolute whitespace-nowrap rounded-2xl border border-line bg-card px-3.5 py-2 text-sm font-medium text-ink shadow-lg ${
        side === "left" ? "bottom-14 right-[4.6rem]" : "-top-12 left-1/2 -translate-x-1/2"
      }`}
    >
      {text}
    </motion.div>
  );
}

/** Big Scout used in the hero, sitting on the chart card. */
export function HeroScout() {
  const [wave, setWave] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setWave(false), 1400);
    return () => clearTimeout(t);
  }, []);
  return (
    <motion.button
      type="button"
      aria-label={mascot.hello}
      onClick={() => {
        setWave(true);
        setTimeout(() => setWave(false), 1200);
      }}
      initial={{ opacity: 0, y: 40, rotate: -12 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ type: "spring", stiffness: 160, damping: 12, delay: 1 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="relative cursor-pointer text-ink"
    >
      <AnimatePresence>{wave && <Bubble text={mascot.lines.top} side="top" />}</AnimatePresence>
      <ScoutSvg size={104} waving={wave} />
    </motion.button>
  );
}

/** Small Scout that follows you down the page and comments on each section. */
export function ScoutCompanion() {
  const ids = Object.keys(mascot.lines);
  const [current, setCurrent] = useState("top");
  const [visible, setVisible] = useState(false);
  const [wave, setWave] = useState(false);
  const [showBubble, setShowBubble] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.1);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setCurrent(e.target.id);
            setShowBubble(true);
            setWave(true);
            setTimeout(() => setWave(false), 1100);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, [ids.join()]); // eslint-disable-line react-hooks/exhaustive-deps

  // hide the bubble after a few seconds so it never gets in the way
  useEffect(() => {
    if (!showBubble) return;
    const t = setTimeout(() => setShowBubble(false), 3200);
    return () => clearTimeout(t);
  }, [showBubble, current]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.6 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 80, scale: 0.6 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="fixed bottom-4 right-4 z-40 text-ink sm:bottom-6 sm:right-6"
        >
          <AnimatePresence mode="wait">
            {showBubble && mascot.lines[current] && <Bubble key={current} text={mascot.lines[current]} />}
          </AnimatePresence>
          <motion.button
            type="button"
            aria-label={`${mascot.name}, the site mascot. Back to top`}
            onClick={() => window.scrollTo({ top: 0 })}
            onMouseEnter={() => {
              setShowBubble(true);
              setWave(true);
              setTimeout(() => setWave(false), 1100);
            }}
            whileHover={{ scale: 1.08, rotate: -4 }}
            whileTap={{ scale: 0.9 }}
            className="block cursor-pointer"
          >
            <ScoutSvg size={64} waving={wave} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
