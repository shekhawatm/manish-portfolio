"use client";

/**
 * Little 🚀 rockets that zoom across the page every so often, leaving a sparkly
 * trail. Call launchRocket(x, y) from anywhere to fire one from that point.
 * Nothing flies for visitors who turn on "reduce motion".
 */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Flight = { id: number; xs: number[]; ys: number[]; flip: boolean; duration: number; size: number; liftoff?: boolean };

const EVENT = "launch-rocket";

/** Fire a rocket from a screen point. `up` sends it straight up (back to top). */
export function launchRocket(x: number, y: number, up = false) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { x, y, up } }));
}

let nextId = 1;

function randomFlight(w: number, h: number): Flight {
  // about 4 in 10 rockets lift straight off from the bottom of the screen with a smoke trail
  if (Math.random() < 0.4) {
    const x = w * (0.1 + Math.random() * 0.8);
    const wob = 20 + Math.random() * 30;
    return { id: nextId++, xs: [x, x + wob, x - wob / 2], ys: [h + 60, h * 0.45, -100], flip: false, duration: 3.2 + Math.random() * 1.5, size: 30 + Math.random() * 12, liftoff: true };
  }
  const leftToRight = Math.random() > 0.35;
  const startY = h * (0.55 + Math.random() * 0.4);
  const endY = h * (Math.random() * 0.35);
  const midY = (startY + endY) / 2 - h * (0.05 + Math.random() * 0.15);
  const xs = leftToRight ? [-60, w * 0.5, w + 60] : [w + 60, w * 0.5, -60];
  return { id: nextId++, xs, ys: [startY, midY, endY], flip: !leftToRight, duration: 4 + Math.random() * 2.5, size: 26 + Math.random() * 14 };
}

export function Rockets() {
  const reduce = useReducedMotion();
  const [flights, setFlights] = useState<Flight[]>([]);

  // a rocket every 9–16 seconds
  useEffect(() => {
    if (reduce) return;
    let t: ReturnType<typeof setTimeout>;
    const loop = (first = false) => {
      t = setTimeout(() => {
        if (document.visibilityState === "visible") {
          setFlights((f) => [...f, randomFlight(window.innerWidth, window.innerHeight)]);
        }
        loop();
      }, first ? 3500 : 9000 + Math.random() * 7000);
    };
    loop(true);
    return () => clearTimeout(t);
  }, [reduce]);

  // rockets fired from a click
  useEffect(() => {
    if (reduce) return;
    const onLaunch = (e: Event) => {
      const { x, y, up } = (e as CustomEvent<{ x: number; y: number; up: boolean }>).detail;
      const f: Flight = up
        ? { id: nextId++, xs: [x, x - 20, x + 10], ys: [y, y - window.innerHeight * 0.5, -80], flip: false, duration: 1.6, size: 38 }
        : { id: nextId++, xs: [x, x + 160, window.innerWidth + 60], ys: [y, y - 180, -60], flip: false, duration: 2.2, size: 32 };
      setFlights((fl) => [...fl, f]);
    };
    window.addEventListener(EVENT, onLaunch);
    return () => window.removeEventListener(EVENT, onLaunch);
  }, [reduce]);

  if (reduce) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      <AnimatePresence>
        {flights.map((f) => (
          <RocketFlight key={f.id} f={f} onDone={() => setFlights((all) => all.filter((x) => x.id !== f.id))} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function RocketFlight({ f, onDone }: { f: Flight; onDone: () => void }) {
  // the 🚀 emoji points up-right; work out the heading of each leg so it noses along the curve
  const angle = (i: number) => {
    const dx = f.xs[i + 1] - f.xs[i];
    const dy = f.ys[i + 1] - f.ys[i];
    return (Math.atan2(dy, dx) * 180) / Math.PI + 45;
  };
  const rot = [angle(0), angle(0), angle(1)];
  const trail = f.liftoff ? [0.1, 0.2, 0.3, 0.4, 0.5, 0.6] : [0.08, 0.16, 0.24, 0.32];

  return (
    <>
      {trail.map((d, i) => (
        <motion.span
          key={i}
          className="absolute left-0 top-0 rounded-full"
          style={
            f.liftoff
              ? { width: 14, height: 14, marginLeft: 6, marginTop: 22, background: i < 2 ? "var(--gold)" : "color-mix(in oklab, var(--muted) 35%, white)", filter: "blur(1.5px)" }
              : { width: 10 - i * 2, height: 10 - i * 2, background: i % 2 ? "var(--gold)" : "var(--accent)", filter: "blur(0.5px)" }
          }
          initial={{ x: f.xs[0], y: f.ys[0], opacity: 0, scale: 0.6 }}
          animate={{ x: f.xs, y: f.ys, opacity: [0, 0.8, 0.8, 0], scale: f.liftoff ? [0.6, 1.4, 2.2] : 1 }}
          transition={{ duration: f.duration, delay: d, ease: "easeInOut" }}
        />
      ))}
      <motion.span
        className="absolute left-0 top-0 select-none"
        style={{ fontSize: f.size, lineHeight: 1 }}
        initial={{ x: f.xs[0], y: f.ys[0], rotate: rot[0], opacity: 0, scale: 0.6 }}
        animate={{ x: f.xs, y: f.ys, rotate: rot, opacity: [0, 1, 1, 1], scale: [0.6, 1, 1] }}
        transition={{ duration: f.duration, ease: "easeInOut" }}
        onAnimationComplete={onDone}
      >
        🚀
      </motion.span>
    </>
  );
}
