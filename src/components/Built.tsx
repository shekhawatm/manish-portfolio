import { built } from "@/content";
import { Mockup } from "./Mockups";
import { Reveal, Section } from "./Section";
import { TiltCard } from "./TiltCard";

export function Built() {
  return (
    <Section id="built" title={built.title} lead={built.lead} className="bg-paper-2">
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {built.items.map((item, i) => (
          <li key={item.title}>
            <Reveal delay={(i % 3) * 0.08} className="h-full">
              <TiltCard className="rounded-3xl">
                <article className="flex h-full flex-col rounded-3xl border border-line bg-card p-5 transition-[border-color,box-shadow] duration-300 group-hover:border-accent/40 group-hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.3)]">
                  <div style={{ transform: "translateZ(30px)" }}>
                    <Mockup kind={item.mock} />
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-medium" style={{ transform: "translateZ(20px)" }}>
                    {item.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
                </article>
              </TiltCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
