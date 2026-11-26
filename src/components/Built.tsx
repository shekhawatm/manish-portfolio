import { built } from "@/content";
import { Mockup } from "./Mockups";
import { Reveal, Section } from "./Section";

export function Built() {
  return (
    <Section id="built" title={built.title} lead={built.lead} className="bg-paper-2">
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {built.items.map((item, i) => (
          <li key={item.title}>
            <Reveal delay={(i % 3) * 0.08} className="h-full">
              <article className="group flex h-full flex-col rounded-3xl border border-line bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_50px_-20px_rgba(0,0,0,0.25)]">
                <div className="transition-transform duration-500 group-hover:scale-[1.02]">
                  <Mockup kind={item.mock} />
                </div>
                <h3 className="mt-5 font-serif text-xl font-medium">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
