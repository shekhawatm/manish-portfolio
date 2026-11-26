"use client";

import { motion } from "framer-motion";
import { built } from "@/content";
import { Mockup } from "./Mockups";
import { Reveal, Section } from "./Section";
import { TiltCard } from "./TiltCard";

const ease = [0.22, 1, 0.36, 1] as const;

function Tags({ tags }: { tags: readonly string[] }) {
  return (
    <ul className="flex flex-wrap justify-center gap-2" aria-label="Tags">
      {tags.map((t) => (
        <li key={t} className="rounded-full border border-line bg-paper px-3 py-1 text-xs text-muted">
          {t}
        </li>
      ))}
    </ul>
  );
}

export function Built() {
  const featured = built.items.filter((i) => i.featured);
  const rest = built.items.filter((i) => !i.featured);
  return (
    <Section id="built" title={built.title} lead={built.lead} className="bg-paper-2">
      {/* featured projects: centred title, one-line outcome, tags, then the preview */}
      <ul className="mx-auto flex max-w-4xl flex-col gap-8">
        {featured.map((item, i) => (
          <motion.li
            key={item.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
          >
            <article className="group rounded-[32px] border border-line bg-card p-6 text-center transition-shadow duration-500 hover:shadow-[0_40px_80px_-45px_rgba(90,60,10,0.55)] sm:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Featured · 0{i + 1}</p>
              <h3 className="mt-3 font-serif text-3xl font-medium tracking-tight sm:text-4xl">{item.title}</h3>
              <p className="mx-auto mt-3 max-w-xl text-muted">{item.outcome}</p>
              <div className="mt-5">
                <Tags tags={item.tags} />
              </div>
              <div className="mx-auto mt-8 max-w-2xl rounded-3xl bg-paper-2 p-4 transition-transform duration-500 group-hover:-translate-y-1 sm:p-6">
                <Mockup kind={item.mock} />
              </div>
              <p className="mx-auto mt-6 max-w-xl text-sm text-muted">{item.text}</p>
            </article>
          </motion.li>
        ))}
      </ul>

      <h3 className="mt-20 font-serif text-2xl font-medium tracking-tight">More things I&rsquo;ve built</h3>
      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((item, i) => (
          <li key={item.title}>
            <Reveal delay={(i % 3) * 0.08} className="h-full">
              <TiltCard className="rounded-3xl">
                <article className="flex h-full flex-col rounded-3xl border border-line bg-card p-5 transition-[border-color,box-shadow] duration-300 group-hover:border-butter group-hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)]">
                  <div style={{ transform: "translateZ(30px)" }}>
                    <Mockup kind={item.mock} />
                  </div>
                  <h4 className="mt-5 font-serif text-xl font-medium" style={{ transform: "translateZ(20px)" }}>
                    {item.title}
                  </h4>
                  <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-4" aria-label="Tags">
                    {item.tags.map((t) => (
                      <li key={t} className="rounded-full bg-paper-2 px-2.5 py-0.5 text-[11px] text-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              </TiltCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
