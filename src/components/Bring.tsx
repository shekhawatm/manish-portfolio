import { bring } from "@/content";
import { Reveal, Section } from "./Section";

export function Bring() {
  return (
    <Section id="bring" title={bring.title} lead={bring.lead}>
      <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
        {bring.columns.map((col, i) => (
          <Reveal key={col.label} delay={i * 0.08} className="bg-paper p-8 sm:p-10">
            <p className="font-serif text-sm italic text-accent">0{i + 1}</p>
            <h3 className="mt-3 font-serif text-2xl font-medium">{col.label}</h3>
            <ul className="mt-6 space-y-4">
              {col.points.map((p) => (
                <li key={p} className="flex gap-3 leading-relaxed text-muted">
                  <span aria-hidden="true" className="mt-2.5 h-1 w-4 shrink-0 rounded-full bg-accent/60" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
