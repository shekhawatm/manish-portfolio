"use client";

/**
 * A sealed butter-cream envelope that greets first-time visitors on the home page.
 * Click the wax seal (or press Enter) and it opens: the seal pops, the flap folds
 * back, a little letter rises out, and the site appears. It shows once per visit
 * (sessionStorage), never for "reduce motion" visitors, and can always be skipped.
 * A script in layout.tsx hides it before paint for anyone who has already seen it.
 */
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content";

const KEY = "envelope-opened";
type Stage = "closed" | "opening" | "gone";

export function Envelope() {
  const [stage, setStage] = useState<Stage>("closed");
  const sealRef = useRef<HTMLButtonElement>(null);

  // already seen this visit (or motion is reduced)? the html class hides it; drop it from React too
  useEffect(() => {
    let seen = document.documentElement.classList.contains("env-seen");
    try {
      seen ||= sessionStorage.getItem(KEY) === "1";
    } catch {
      seen = true;
    }
    if (seen) {
      setStage("gone");
      return;
    }
    document.body.style.overflow = "hidden";
    sealRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && finish();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  function finish() {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* storage blocked: it just shows again next time */
    }
    document.body.style.overflow = "";
    document.documentElement.classList.add("env-seen");
    setStage("gone");
  }

  function open() {
    if (stage !== "closed") return;
    setStage("opening");
    setTimeout(finish, 1900);
  }

  const opening = stage === "opening";

  return (
    <AnimatePresence>
      {stage !== "gone" && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`A letter from ${site.name}`}
          className="envelope-gate fixed inset-0 z-[60] flex flex-col items-center justify-center bg-paper px-6"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(var(--line)_1px,transparent_1px)] [background-size:22px_22px]"
          />
          <button
            type="button"
            onClick={finish}
            className="absolute right-5 top-5 rounded-full px-4 py-2 text-sm text-muted transition-colors hover:bg-paper-2 hover:text-ink"
          >
            Skip intro
          </button>

          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -4 }}
            animate={{ opacity: 1, y: opening ? 60 : 0, rotate: opening ? 0 : [-4, -2, -4] }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], rotate: opening ? { duration: 0.4 } : { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
            className="relative aspect-[1.6] w-[min(86vw,440px)] [perspective:1200px]"
          >
            {/* back of the envelope */}
            <div className="absolute inset-0 rounded-2xl bg-[#ecd08a] shadow-[0_40px_80px_-35px_rgba(90,60,10,0.6)] dark:bg-[#8a7438]" />

            {/* the letter that rises out */}
            <motion.div
              className="absolute inset-x-[7%] top-[8%] flex h-[84%] flex-col items-center justify-center rounded-xl bg-card px-6 text-center shadow-md"
              initial={false}
              animate={{ y: opening ? "-62%" : "0%" }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-serif text-2xl italic">Hi, I&rsquo;m Manish 👋</p>
              <p className="mt-1 text-sm text-muted">Come on in.</p>
            </motion.div>

            {/* front pocket: two side folds and the bottom fold */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl" aria-hidden="true">
              <div className="absolute inset-0 bg-[#f4dc9c] [clip-path:polygon(0_0,50%_55%,0_100%)] dark:bg-[#9a8342]" />
              <div className="absolute inset-0 bg-[#f4dc9c] [clip-path:polygon(100%_0,50%_55%,100%_100%)] dark:bg-[#9a8342]" />
              <div className="absolute inset-0 bg-[#f8e5b0] [clip-path:polygon(0_100%,50%_48%,100%_100%)] dark:bg-[#a58d4b]" />
              <p className="absolute bottom-[12%] left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-2xl italic text-[#9b7a2c] dark:text-[#f3e3b4]">
                {site.name}
              </p>
            </div>

            {/* top flap: folds back when opened */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[58%] origin-top [transform-style:preserve-3d]"
              initial={false}
              animate={{ rotateX: opening ? 180 : 0, zIndex: opening ? 0 : 3 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
            >
              <div className="h-full w-full rounded-t-2xl bg-[#efd38f] [backface-visibility:hidden] [clip-path:polygon(0_0,100%_0,50%_100%)] dark:bg-[#917b3d]" />
            </motion.div>

            {/* wax seal */}
            <motion.button
              ref={sealRef}
              type="button"
              onClick={open}
              aria-label="Open the letter"
              className="absolute left-1/2 top-[58%] z-[4] -ml-9 -mt-9 flex h-[72px] w-[72px] cursor-pointer items-center justify-center rounded-full outline-offset-4"
              animate={opening ? { scale: [1, 1.25, 0], rotate: 40, opacity: [1, 1, 0] } : { scale: [1, 1.06, 1] }}
              transition={opening ? { duration: 0.35 } : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.1, rotate: -8 }}
            >
              <svg viewBox="0 0 72 72" className="absolute inset-0 h-full w-full drop-shadow-[0_6px_10px_rgba(120,30,10,0.45)]" aria-hidden="true">
                <path
                  d="M36 3c6 0 8 4 13 5s10-1 13 4 0 9 2 14 6 7 5 13-6 6-8 11 1 10-4 13-9 0-14 2-7 6-13 5-6-5-11-7-10 0-13-5 1-9-1-14-6-7-5-13 5-7 7-12-1-10 4-13 9 1 14-1 5-6 11-6z"
                  fill="#b8432a"
                />
                <circle cx="36" cy="36" r="21" fill="none" stroke="#e7826a" strokeWidth="1.5" strokeDasharray="2 3" />
              </svg>
              <span className="relative font-serif text-3xl font-semibold italic text-[#fbe1d3]">M</span>
            </motion.button>
          </motion.div>

          <motion.p
            className="relative mt-16 font-mono text-xs uppercase tracking-[0.22em] text-muted"
            animate={{ opacity: opening ? 0 : [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: opening ? 0 : Infinity }}
          >
            Tap the seal to open
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
