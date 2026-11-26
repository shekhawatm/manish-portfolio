"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { numbers } from "@/content";
import { Reveal, Section } from "./Section";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  // Start at the real value so the number is correct without JavaScript and for screen readers.
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown.toLocaleString("en-US")}
      <span className="text-accent-2">{suffix}</span>
    </span>
  );
}

export function Numbers() {
  return (
    <Section id="numbers" title={numbers.title} lead={numbers.lead} className="border-t border-line bg-paper-2">
      <dl className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {numbers.items.map((item, i) => (
          <Reveal key={item.label} delay={(i % 3) * 0.08} className="border-t border-line pt-6">
            <dt className="sr-only">{item.label}</dt>
            <dd>
              <p className="font-serif text-5xl font-medium tracking-tight sm:text-6xl" aria-hidden="true">
                <Counter value={item.value} suffix={item.suffix} />
              </p>
              <span className="sr-only">
                {item.value.toLocaleString("en-US")}
                {item.suffix}
              </span>
              <p className="mt-3 max-w-xs leading-relaxed text-muted">{item.label}</p>
            </dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
