"use client";

import { motion } from "framer-motion";

/** Fades content up as it scrolls into view. Motion is skipped for reduced-motion users (see MotionConfig in page). */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  id,
  title,
  lead,
  children,
  className = "",
}: {
  id: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const headingId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={headingId} className={`py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 id={headingId} className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
          {/* each word rises out of its own little mask, one after another */}
          {title.split(" ").map((w, i, all) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.75, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
                {i < all.length - 1 ? " " : ""}
              </motion.span>
            </span>
          ))}
        </h2>
        {/* a short accent line that draws itself under the heading */}
        <motion.span
          aria-hidden="true"
          className="mt-4 block h-[3px] w-16 origin-left rounded-full bg-gradient-to-r from-accent via-gold to-accent-2"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
        {lead && (
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-2xl text-lg text-muted">{lead}</p>
          </Reveal>
        )}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
