"use client";

/**
 * Ollie: an original owl mascot drawn in SVG, with moods.
 * - Moods: happy, excited, shocked, love, wink, sleepy, thinking, proud, dizzy (+ neutral).
 *   Each changes the eyes, brows, mouth, floating extras and the body movement.
 * - Every section of the page gives Ollie its own mood; every click cycles to a new reaction.
 * - In neutral mood the eyes follow your cursor, and glance around on their own when you're idle.
 * Respects "reduce motion" through MotionConfig and useReducedMotion.
 */
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { mascot } from "@/content";
import { burst } from "./Burst";
import { Brows, Extras, Eyes, Mouth, bodyMotion, type Mood } from "./OwlFace";
import { launchRocket } from "./Rockets";

export function OwlSvg({ size = 96, waving = false, mood = "neutral" }: { size?: number; waving?: boolean; mood?: Mood }) {
  const ref = useRef<SVGSVGElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 180, damping: 16 });
  const sy = useSpring(py, { stiffness: 180, damping: 16 });
  const tilt = useTransform(sx, [-4, 4], [-7, 7]);
  const [blink, setBlink] = useState(false);
  const lastMove = useRef(0);
  const flapping = waving || mood === "excited" || mood === "happy";

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

  const body = bodyMotion[mood];

  return (
    <svg ref={ref} width={size} height={size} viewBox="0 0 120 120" aria-hidden="true" className="overflow-visible">
      {/* ground shadow */}
      <motion.ellipse
        cx="60" cy="114" rx="28" ry="4.5" fill="currentColor" className="text-ink/15"
        animate={reduce ? undefined : { rx: [28, 22, 28] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* mood movement (restarts whenever the mood changes) */}
      <motion.g
        key={mood}
        style={{ originX: "60px", originY: "100px" }}
        animate={reduce ? undefined : body.animate}
        transition={body.transition}
      >
        {/* gentle idle bob */}
        <motion.g
          animate={reduce ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* left wing (flaps when happy/excited) */}
          <motion.path
            d="M27 66 q-14 16 -4 34 q10 -6 14 -20z"
            fill="#11504c"
            style={{ originX: "27px", originY: "68px" }}
            animate={flapping && !reduce && mood !== "neutral" ? { rotate: [0, 30, 0, 30, 0] } : { rotate: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
          {/* right wing (waves) */}
          <motion.path
            d="M93 66 q14 16 4 34 q-10 -6 -14 -20z"
            fill="#11504c"
            style={{ originX: "93px", originY: "68px" }}
            animate={flapping && !reduce ? { rotate: [0, -38, -10, -38, 0] } : { rotate: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          />
          {/* feet */}
          <path d="M48 104 l-4 6 M52 104 l0 7 M56 104 l4 6" stroke="#e8893a" strokeWidth="3.4" strokeLinecap="round" />
          <path d="M64 104 l-4 6 M68 104 l0 7 M72 104 l4 6" stroke="#e8893a" strokeWidth="3.4" strokeLinecap="round" />

          {/* head + body tilt toward where Ollie is looking */}
          <motion.g style={{ rotate: mood === "neutral" ? tilt : 0, originX: "60px", originY: "90px" }}>
            {/* ear tufts */}
            <path d="M30 34 L38 12 L50 30z" fill="#17635e" />
            <path d="M90 34 L82 12 L70 30z" fill="#17635e" />
            {/* body */}
            <ellipse cx="60" cy="68" rx="36" ry="40" fill="#17635e" />
            {/* belly with little feather scallops */}
            <ellipse cx="60" cy="84" rx="22" ry="21" fill="#d9ece8" />
            {[0, 1, 2].map((r) =>
              [-1, 0, 1].map((c) => (
                <path
                  key={`${r}${c}`}
                  d={`M${52 + c * 8 - (r % 2) * 4} ${86 + r * 6} q4 4 8 0`}
                  stroke="#6cc8bb"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                />
              )),
            )}
            <Eyes mood={mood} blink={blink} sx={sx} sy={sy} />
            <Brows mood={mood} />
            {/* beak */}
            <path d="M55 66 L65 66 L60 75z" fill="#e8893a" />
            <Mouth mood={mood} />
            {/* cheeks: rosier when happy or in love */}
            <circle cx="30" cy="66" r={mood === "love" || mood === "happy" ? 6 : 4.5} fill="#f28c7a" opacity={mood === "love" ? 0.85 : 0.55} />
            <circle cx="90" cy="66" r={mood === "love" || mood === "happy" ? 6 : 4.5} fill="#f28c7a" opacity={mood === "love" ? 0.85 : 0.55} />
          </motion.g>
          {!reduce && <Extras mood={mood} />}
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

/** Cycles through Ollie's click reactions. */
function useReactions() {
  const [i, setI] = useState(-1);
  const next = () => {
    const n = (i + 1) % mascot.reactions.length;
    setI(n);
    return mascot.reactions[n];
  };
  return next;
}

/** Ollie in the hero, perched on the chart card. Each click: a new reaction. */
export function HeroMascot() {
  const [mood, setMood] = useState<Mood>("happy");
  const [line, setLine] = useState<string | null>(mascot.lines.top);
  const nextReaction = useReactions();

  useEffect(() => {
    const t = setTimeout(() => {
      setMood("neutral");
      setLine(null);
    }, 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!line) return;
    const t = setTimeout(() => {
      setLine(null);
      setMood("neutral");
    }, 2600);
    return () => clearTimeout(t);
  }, [line]);

  return (
    <motion.button
      data-hero-ollie=""
      type="button"
      aria-label={mascot.hello}
      onClick={(e) => {
        const r = nextReaction();
        setMood(r.mood);
        setLine(r.text);
        burst(e.clientX, e.clientY, 14);
        if (r.rocket) launchRocket(e.clientX, e.clientY);
      }}
      initial={{ opacity: 0, y: 40, rotate: -12 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ type: "spring", stiffness: 160, damping: 12, delay: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="relative cursor-pointer text-ink"
    >
      <AnimatePresence>{line && <Bubble key={line} text={line} side="top" />}</AnimatePresence>
      <OwlSvg size={110} mood={mood} />
    </motion.button>
  );
}

/** Ollie follows you down the page: a different mood for every section, a new reaction on every click. */
export function MascotCompanion() {
  const ids = Object.keys(mascot.lines);
  const [current, setCurrent] = useState("top");
  const [visible, setVisible] = useState(false);
  // hide the corner Ollie while the hero Ollie is on screen, so there are never two owls at once
  const [heroOllieOnScreen, setHeroOllieOnScreen] = useState(false);
  useEffect(() => {
    const el = document.querySelector("[data-hero-ollie]");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setHeroOllieOnScreen(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const [bubble, setBubble] = useState<string | null>(null);
  const [clickMood, setClickMood] = useState<Mood | null>(null);
  const reduce = useReducedMotion();
  const nextReaction = useReactions();

  const sectionMood = (mascot.moods[current] ?? "neutral") as Mood;
  const mood = clickMood ?? sectionMood;

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setCurrent(e.target.id);
            setClickMood(null);
            setBubble(mascot.lines[e.target.id] ?? null);
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

  // the bubble (and any click reaction) fades after a few seconds
  useEffect(() => {
    if (!bubble) return;
    const t = setTimeout(() => {
      setBubble(null);
      setClickMood(null);
    }, 3200);
    return () => clearTimeout(t);
  }, [bubble]);

  return (
    <AnimatePresence>
      {visible && !heroOllieOnScreen && (
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
          className="fixed bottom-24 right-3 z-40 flex flex-col items-center text-ink sm:bottom-32 sm:right-8"
        >
          <AnimatePresence mode="wait">{bubble && <Bubble key={bubble} text={bubble} />}</AnimatePresence>
          <motion.button
            type="button"
            aria-label={`${mascot.name}, the site mascot. Click for a reaction`}
            onClick={(e) => {
              const r = nextReaction();
              setClickMood(r.mood);
              setBubble(r.text);
              burst(e.clientX, e.clientY, 12);
              if (r.rocket) launchRocket(e.clientX, e.clientY);
            }}
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.88 }}
            className="block cursor-pointer drop-shadow-[0_10px_18px_rgba(0,0,0,0.18)]"
          >
            <span className="sm:hidden">
              <OwlSvg size={72} mood={mood} />
            </span>
            <span className="hidden sm:block">
              <OwlSvg size={96} mood={mood} />
            </span>
          </motion.button>
          {/* little rocket button: blast back to the top */}
          <motion.button
            type="button"
            aria-label="Back to top"
            onClick={(e) => {
              launchRocket(e.clientX, e.clientY, true);
              setClickMood("excited");
              setBubble("Blast off! 🚀");
              setTimeout(() => window.scrollTo({ top: 0 }), 250);
            }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            className="-mt-1 rounded-full border border-line bg-card px-2.5 py-1 text-[11px] font-medium text-muted shadow-sm transition-colors hover:text-ink"
          >
            🚀 Top
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
