"use client";

/**
 * Ollie's face parts for each mood: eyes, brows, mouth extras and the little
 * floating decorations (hearts, Zzz, "!", "?", sparkles, dizzy stars).
 */
import { motion, type MotionValue } from "framer-motion";

export type Mood =
  | "neutral"
  | "happy"
  | "excited"
  | "shocked"
  | "love"
  | "wink"
  | "sleepy"
  | "thinking"
  | "proud"
  | "dizzy";

const INK = "#1f1a15";
const CREAM = "#fffaf1";
const GOLD = "#f2c063";
const TEAL_DARK = "#0b3a37";

const heart = (x: number, y: number, s = 1) =>
  `M${x} ${y + 3 * s} c${-1.5 * s} ${-3 * s} ${-6 * s} ${-3 * s} ${-6 * s} ${0.6 * s} c0 ${2.6 * s} ${3.4 * s} ${4.6 * s} ${6 * s} ${6.6 * s} c${2.6 * s} ${-2 * s} ${6 * s} ${-4 * s} ${6 * s} ${-6.6 * s} c0 ${-3.6 * s} ${-4.5 * s} ${-3.6 * s} ${-6 * s} ${-0.6 * s}z`;

const star = (cx: number, cy: number, r: number) => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const rr = i % 2 ? r * 0.45 : r;
    pts.push(`${(cx + Math.cos(a) * rr).toFixed(2)},${(cy + Math.sin(a) * rr).toFixed(2)}`);
  }
  return `M${pts.join("L")}z`;
};

function Eye({ cx, mood, blink, side, sx, sy }: { cx: number; mood: Mood; blink: boolean; side: "l" | "r"; sx: MotionValue<number>; sy: MotionValue<number> }) {
  const disc = <circle cx={cx} cy="54" r={mood === "shocked" ? 17 : 15} fill={CREAM} stroke={GOLD} strokeWidth="2.5" />;
  const arcUp = <path d={`M${cx - 9} 58 q9 -11 18 0`} stroke={INK} strokeWidth="3.4" fill="none" strokeLinecap="round" />;
  const closed = <path d={`M${cx - 9} 55 q9 5 18 0`} stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />;

  if (mood === "happy" || mood === "proud") return <g>{disc}{arcUp}</g>;
  if (mood === "wink" && side === "r") return <g>{disc}{arcUp}</g>;
  if (blink && mood !== "dizzy" && mood !== "love" && mood !== "excited") return <g>{disc}{closed}</g>;

  if (mood === "love")
    return (
      <g>
        {disc}
        <motion.path
          d={heart(cx, 49, 1.25)}
          fill="#e11d48"
         
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.7, repeat: Infinity }}
        />
      </g>
    );
  if (mood === "excited")
    return (
      <g>
        {disc}
        <motion.path
          d={star(cx, 55, 9)}
          fill={INK}
         
          animate={{ rotate: [0, 20, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
        <circle cx={cx + 2.5} cy="52" r="1.8" fill="#fff" />
      </g>
    );
  if (mood === "dizzy")
    return (
      <g>
        {disc}
        {/* spiral spins around the exact centre of the eye (SVG's own rotate animation) */}
        <g>
          <path
            d={`M${cx} 54 m-1 0 a1 1 0 1 1 2 0 a3 3 0 1 1 -6 0 a5 5 0 1 1 10 0 a7 7 0 1 1 -14 0`}
            stroke={INK}
            strokeWidth="2"
            fill="none"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${cx} 54`}
            to={`${side === "l" ? 360 : -360} ${cx} 54`}
            dur="1.2s"
            repeatCount="indefinite"
          />
        </g>
      </g>
    );
  if (mood === "shocked")
    return (
      <g>
        {disc}
        <circle cx={cx} cy="54" r="4.2" fill={INK} />
        <circle cx={cx + 1.4} cy="52.6" r="1.2" fill="#fff" />
      </g>
    );
  if (mood === "sleepy")
    return (
      <g>
        {disc}
        <circle cx={cx} cy="61" r="5" fill={INK} />
        {/* heavy, droopy eyelid with lashes */}
        <path d={`M${cx - 16} 56 a16 16 0 0 1 32 0 q-16 4 -32 0z`} fill="#17635e" />
        <path d={`M${cx - 14} 57.5 q14 4 28 0`} stroke={TEAL_DARK} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      </g>
    );
  if (mood === "thinking")
    return (
      <g>
        {disc}
        <circle cx={cx + 3.5} cy="49.5" r="7" fill={INK} />
        <circle cx={cx + 5.5} cy="47" r="2.2" fill="#fff" />
      </g>
    );
  // neutral (and the open eye of a wink): follow the cursor
  return (
    <g>
      {disc}
      <motion.g style={{ x: sx, y: sy }}>
        <circle cx={cx} cy="55" r="8" fill={INK} />
        <circle cx={cx + 2.6} cy="52" r="2.6" fill="#fff" />
        <circle cx={cx - 2.4} cy="58" r="1.2" fill="#fff" opacity="0.8" />
      </motion.g>
    </g>
  );
}

export function Eyes(props: { mood: Mood; blink: boolean; sx: MotionValue<number>; sy: MotionValue<number> }) {
  return (
    <>
      <Eye cx={45} side="l" {...props} />
      <Eye cx={75} side="r" {...props} />
    </>
  );
}

export function Brows({ mood }: { mood: Mood }) {
  const b = (d: string, k: string) => <path key={k} d={d} stroke={TEAL_DARK} strokeWidth="3" fill="none" strokeLinecap="round" />;
  switch (mood) {
    case "shocked":
    case "excited":
      return <>{b("M33 30 q11 -8 22 0", "l")}{b("M65 30 q11 -8 22 0", "r")}</>;
    case "thinking":
      return <>{b("M34 37 q10 -2 20 1", "l")}{b("M66 31 q10 -8 20 -2", "r")}</>;
    case "sleepy":
      return <>{b("M35 38 h18", "l")}{b("M67 38 h18", "r")}</>;
    case "proud":
      return <>{b("M34 34 q10 -9 20 -2", "l")}{b("M66 32 q10 -7 20 2", "r")}</>;
    case "dizzy":
      return <>{b("M34 35 q5 -5 10 0 t10 0", "l")}{b("M66 35 q5 -5 10 0 t10 0", "r")}</>;
    default:
      return <>{b("M34 36 q10 -6 20 0", "l")}{b("M66 36 q10 -6 20 0", "r")}</>;
  }
}

/** Mouth extras that sit just under the beak. */
export function Mouth({ mood }: { mood: Mood }) {
  if (mood === "shocked")
    return <motion.ellipse cx="60" cy="81" rx="4" ry="5" fill={INK} animate={{ ry: [5, 6.5, 5] }} transition={{ duration: 0.6, repeat: Infinity }} />;
  if (mood === "excited" || mood === "happy" || mood === "love")
    return <path d="M53 78 q7 6 14 0" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" />;
  if (mood === "wink") return <path d="M54 79 q8 3 12 -2" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" />;
  if (mood === "thinking") return <path d="M55 80 h9" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />;
  return null;
}

/** Floating decorations around Ollie's head for each mood. */
export function Extras({ mood }: { mood: Mood }) {
  const float = (delay = 0) => ({
    initial: { opacity: 0, y: 6, scale: 0.6 },
    animate: { opacity: [0, 1, 1, 0], y: [6, -4, -10, -18], scale: [0.6, 1, 1, 0.9] },
    transition: { duration: 1.8, delay, repeat: Infinity, repeatDelay: 0.4 },
  });
  switch (mood) {
    case "love":
      return (
        <>
          <motion.path d={heart(96, 18, 1)} fill="#e11d48" {...float(0)} />
          <motion.path d={heart(24, 24, 0.8)} fill="#fb7185" {...float(0.6)} />
          <motion.path d={heart(104, 40, 0.7)} fill="#f43f5e" {...float(1.1)} />
        </>
      );
    case "shocked":
      return (
        <>
          <motion.text x="96" y="22" fontSize="22" fontWeight="900" fill="#e8893a" initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1], rotate: [0, -10, 0] }} transition={{ duration: 0.5 }}>!</motion.text>
          {/* sweat drop */}
          <motion.path d="M28 40 q-4 6 0 9 q4 -3 0 -9z" fill="#7dd3fc" animate={{ y: [0, 6, 0], opacity: [1, 0.6, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
        </>
      );
    case "excited":
      return (
        <>
          {[[18, 26], [100, 20], [106, 52], [14, 58]].map(([x, y], i) => (
            <motion.path key={i} d={star(x, y, 5)} fill={GOLD} animate={{ scale: [0, 1.2, 0], rotate: [0, 90] }} transition={{ duration: 1, delay: i * 0.25, repeat: Infinity }} />
          ))}
        </>
      );
    case "sleepy":
      return (
        <>
          <motion.text x="92" y="24" fontSize="14" fontWeight="800" fill={TEAL_DARK} {...float(0)}>Z</motion.text>
          <motion.text x="102" y="12" fontSize="10" fontWeight="800" fill={TEAL_DARK} {...float(0.7)}>z</motion.text>
        </>
      );
    case "thinking":
      return (
        <motion.text x="94" y="20" fontSize="20" fontWeight="900" fill="#e8893a" animate={{ y: [20, 16, 20], rotate: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>?</motion.text>
      );
    case "dizzy":
      return (
        // three little stars circling above Ollie's head
        <g transform="translate(60 16) scale(1 0.35)">
          <g>
            {[0, 120, 240].map((a) => {
              const x = Math.cos((a * Math.PI) / 180) * 28;
              const y = Math.sin((a * Math.PI) / 180) * 28;
              return <path key={a} d={star(x, y, 6)} fill={GOLD} />;
            })}
            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="1.8s" repeatCount="indefinite" />
          </g>
        </g>
      );
    case "proud":
      return (
        <motion.path d={star(98, 30, 6)} fill={GOLD} animate={{ scale: [0, 1.2, 1, 0], rotate: [0, 45, 90] }} transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.6 }} />
      );
    case "wink":
      return <motion.path d={star(96, 44, 4)} fill={GOLD} animate={{ scale: [0, 1.3, 0] }} transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 1 }} />;
    default:
      return null;
  }
}

/** The whole-body movement for each mood (applied to Ollie's outer group). */
export const bodyMotion: Record<Mood, { animate: Record<string, number[]>; transition: Record<string, unknown> }> = {
  neutral: { animate: { y: [0, 0] }, transition: { duration: 0.1 } },
  happy: { animate: { y: [0, -8, 0, -5, 0] }, transition: { duration: 0.9 } },
  excited: { animate: { y: [0, -18, 0, -12, 0, -6, 0], rotate: [0, -6, 6, -4, 0, 0, 0] }, transition: { duration: 1.1 } },
  shocked: { animate: { y: [0, -14, 0], x: [0, -4, 4, -3, 3, 0] }, transition: { duration: 0.6 } },
  love: { animate: { scale: [1, 1.1, 1, 1.08, 1] }, transition: { duration: 1.2 } },
  wink: { animate: { rotate: [0, 8, 0] }, transition: { duration: 0.6 } },
  sleepy: { animate: { rotate: [0, 6, 0, -3, 0] }, transition: { duration: 3, repeat: Infinity } },
  thinking: { animate: { rotate: [0, -8, -8, 0] }, transition: { duration: 1.6 } },
  proud: { animate: { scale: [1, 1.08, 1.08, 1], y: [0, -4, -4, 0] }, transition: { duration: 1.4 } },
  dizzy: { animate: { rotate: [0, -14, 12, -10, 8, 0], x: [0, -3, 3, -2, 2, 0] }, transition: { duration: 1.4 } },
};
