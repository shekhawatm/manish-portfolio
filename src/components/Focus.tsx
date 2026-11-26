import { focus } from "@/content";
import { Reveal, Section } from "./Section";

export function Focus() {
  return (
    <Section id="focus" title={focus.title} lead={focus.lead}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {focus.items.map((f, i) => (
          <li key={f.title} className={i === 0 ? "sm:col-span-2 lg:row-span-2" : ""}>
            <Reveal delay={(i % 4) * 0.06} className="h-full">
              <article
                className={`group flex h-full flex-col justify-between rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                  i === 0
                    ? "border-transparent bg-accent-2 text-paper sm:p-9"
                    : "border-line bg-card hover:border-accent/40"
                }`}
              >
                <span className={`font-serif text-sm italic ${i === 0 ? "text-gold" : "text-accent"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={i === 0 ? "mt-16" : "mt-8"}>
                  <h3 className={`font-serif font-medium ${i === 0 ? "text-4xl leading-tight" : "text-xl"}`}>{f.title}</h3>
                  <p className={`mt-2 leading-relaxed ${i === 0 ? "text-lg text-paper/80" : "text-sm text-muted"}`}>{f.text}</p>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
