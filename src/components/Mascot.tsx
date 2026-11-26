"use client";

/**
 * Ollie: an original owl mascot drawn in SVG.
 * - Big eyes follow your cursor; when you stop moving, Ollie glances around on its own.
 * - Blinks, bobs, tilts its head toward where it's looking, flaps a wing to wave.
 * - The companion version pops up from the bottom-right, comments on each section,
 *   and launches a rocket back to the top when clicked.
 * Respects "reduce motion" through MotionConfig and useReducedMotion.
 */
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { mascot } from "@/content";
import { burst } from "./Burst";
import { launchRocket } from "./Rockets";

export function OwlSvg({ size = 96, waving = false }: { size?: number; waving?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 180, damping: 16 });
  const sy = useSpring(py, { stiffness: 180, damping: 16 });
  const tilt = useTransform(sx, [-4, 4], [-7, 7]);
  const [blink, setBlink] = useState(false);
  const lastMove = useRef(0);

  // eyes follow the pointer…
  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      lastMove.current = Date.now();
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.max(1, Math.hypot(dx, dy));
      px.set((dx / d) * 4);
      py.set((dy / d) * 3.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduce]);

  // …and when you stop moving, Ollie looks here and there on its own
  useEffect(() => {
    if (reduce) return;
    const spots = [
      [-4, -1], [4, -1], [0, 3], [-3, 2], [3, 2], [0, -3], [0, 0],
    ];
    const t = setInterval(() => {
      if (Date.now() - lastMove.current < 2500) return;
      const [x, y] = spots[Math.floor(Math.random() * spots.length)];
      px.set(x);
      py.set(y);
    }, 1400);
    return () => clearInterval(t);
  }, [px, py, reduce]);

  // blink every few seconds (sometimes twice)
  useEffect(() => {
    if (reduce) return;
    let t: ReturnType<typeof setTimeout>;
    const blinkOnce = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 130);
    };
    const loop = () => {
      t = setTimeout(() => {
        blinkOnce();
        if (Math.random() > 0.7) setTimeout(blinkOnce, 260);
        loop();
      }, 2200 + Math.random() * 2600);
    };
    loop();
    return () => clearTimeout(t);
  }, [reduce]);

  const eye = (cx: number) => (
    <g>
      <circle cx={cx} cy="54" r="15" fill="#fffaf1" />
      <circle cx={cx} cy="54" r="15" fill="none" stroke="#f2c063" strokeWidth="2.5" />
      {blink ? (
        <path d={`M${cx - 9} 55 q9 5 18 0`} stroke="#1f1a15" strokeWidth="3" fill="none" strokeLinecap="round" />
      ) : (
        <motion.g style={{ x: sx, y: sy }}>
          <circle cx={cx} cy="55" r="8" fill="#1f1a15" />
          <circle cx={cx + 2.6} cy="52" r="2.6" fill="#fff" />
          <circle cx={cx - 2.4} cy="58" r="1.2" fill="#fff" opacity="0.8" />
        </motion.g>
      )}
    </g>
  );

  return (
    <svg ref={ref} width={size} height={size} viewBox="0 0 120 120" aria-hidden="true" className="overflow-visible">
      {/* ground shadow */}
      <motion.ellipse
        cx="60" cy="114" rx="28" ry="4.5" fill="currentColor" className="text-ink/15"
        animate={reduce ? undefined : { rx: [28, 22, 28] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.g
        animate={reduce ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* left wing */}
        <path d="M27 66 q-14 16 -4 34 q10 -6 14 -20z" fill="#11504c" />
        {/* right wing (waves) */}
        <motion.path
          d="M93 66 q14 16 4 34 q-10 -6 -14 -20z"
          fill="#11504c"
          style={{ originX: "93px", originY: "68px" }}
          animate={waving && !reduce ? { rotate: [0, -38, -10, -38, 0] } : { rotate: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />
        {/* feet */}
        <path d="M48 104 l-4 6 M52 104 l0 7 M56 104 l4 6" stroke="#e8893a" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M64 104 l-4 6 M68 104 l0 7 M72 104 l4 6" stroke="#e8893a" strokeWidth="3.4" strokeLinecap="round" />

        {/* head + body tilt toward where Ollie is looking */}
        <motion.g style={{ rotate: tilt, originX: "60px", originY: "90px" }}>
          {/* ear tufts */}
          <path d="M30 34 L38 12 L50 30z" fill="#17635e" />
          <path d="M90 34 L82 12 L70 30z" fill="#17635e" />
          {/* body */}
          <ellipse cx="60" cy="68" rx="36" ry="40" fill="#17635e" />
          {/* belly with little feather scallops */}
          <ellipse cx="60" cy="82" rx="22" ry="22" fill="#d9ece8" />
          {[0, 1, 2].map((r) =>
            [-1, 0, 1].map((c) => (
              <path
                key={`${r}${c}`}
                d={`M${52 + c * 8 - (r % 2) * 4} ${74 + r * 8} q4 4 8 0`}
                stroke="#6cc8bb"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
              />
            )),
          )}
          {eye(45)}
          {eye(75)}
          {/* brows give a friendly look */}
          <path d="M34 36 q10 -6 20 0" stroke="#0b3a37" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M66 36 q10 -6 20 0" stroke="#0b3a37" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* beak */}
          <path d="M55 66 L65 66 L60 75z" fill="#e8893a" />
          {/* cheeks */}
          <circle cx="30" cy="66" r="4.5" fill="#f28c7a" opacity="0.55" />
          <circle cx="90" cy="66" r="4.5" fill="#f28c7a" opacity="0.55" />
          {/* tiny gold star badge */}
          <motion.path
            d="M86 92 l2 4.3 4.7.5-3.5 3.2 1 4.6-4.2-2.4-4.2 2.4 1-4.6-3.5-3.2 4.7-.5z"
            fill="#f2c063"
            style={{ originX: "86px", originY: "98px" }}
            animate={reduce ? undefined : { rotate: [0, 15, -10, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>
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
        side === "left" ? "right-[calc(100%+6px)] top-4" : "-top-12 left-1/2 -translate-x-1/2"
      }`}
    >
      {text}
    </motion.div>
  );
}

/** Ollie in the hero, perched on the chart card. */
export function HeroMascot() {
  const [wave, setWave] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setWave(false), 1400);
    return () => clearTimeout(t);
  }, []);
  return (
    <motion.button
      type="button"
      aria-label={mascot.hello}
      onClick={(e) => {
        burst(e.clientX, e.clientY, 18);
        launchRocket(e.clientX, e.clientY);
        setWave(true);
        setTimeout(() => setWave(false), 1200);
      }}
      initial={{ opacity: 0, y: 40, rotate: -12 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ type: "spring", stiffness: 160, damping: 12, delay: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="relative cursor-pointer text-ink"
    >
      <AnimatePresence>{wave && <Bubble text={mascot.lines.top} side="top" />}</AnimatePresence>
      <OwlSvg size={110} waving={wave} />
    </motion.button>
  );
}

/** Ollie follows you down the page, sitting higher up so it's easy to see. */
export function MascotCompanion() {
  const ids = Object.keys(mascot.lines);
  const [current, setCurrent] = useState("top");
  const [visible, setVisible] = useState(false);
  const [wave, setWave] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
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

  // the bubble hides itself after a few seconds so it never gets in the way
  useEffect(() => {
    if (!showBubble) return;
    const t = setTimeout(() => setShowBubble(false), 3400);
    return () => clearTimeout(t);
  }, [showBubble, current]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          // pops up from below the screen edge, then hops every few seconds
          initial={{ opacity: 0, y: 160, scale: 0.5, rotate: 20 }}
          animate={reduce ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : { opacity: 1, y: [0, 0, -14, 0], scale: 1, rotate: 0 }}
          exit={{ opacity: 0, y: 160, scale: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 14,
            y: { duration: 6, times: [0, 0.8, 0.9, 1], repeat: Infinity, ease: "easeInOut" },
          }}
          className="fixed bottom-24 right-3 z-40 text-ink sm:bottom-32 sm:right-8"
        >
          <AnimatePresence mode="wait">
            {showBubble && mascot.lines[current] && <Bubble key={current} text={mascot.lines[current]} />}
          </AnimatePresence>
          <motion.button
            type="button"
            aria-label={`${mascot.name}, the site mascot. Launch back to the top`}
            onClick={(e) => {
              launchRocket(e.clientX, e.clientY, true);
              setTimeout(() => window.scrollTo({ top: 0 }), 250);
            }}
            onMouseEnter={() => {
              setShowBubble(true);
              setWave(true);
              setTimeout(() => setWave(false), 1100);
            }}
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            className="block cursor-pointer drop-shadow-[0_10px_18px_rgba(0,0,0,0.18)]"
          >
            <span className="sm:hidden">
              <OwlSvg size={72} waving={wave} />
            </span>
            <span className="hidden sm:block">
              <OwlSvg size={96} waving={wave} />
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
