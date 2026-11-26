import { chips } from "@/content";

/** A small inline logo chip, like "[F] Fireflies.ai", that sits inside a sentence. */
export function Chip({ name }: { name: string }) {
  const c = chips[name];
  if (!c) return <>{name}</>;
  const inner = (
    <>
      <span
        aria-hidden="true"
        className="mr-1 inline-flex h-[1.15em] w-[1.15em] -translate-y-px items-center justify-center rounded-[5px] align-middle text-[0.7em] font-bold leading-none text-white"
        style={{ background: c.color }}
      >
        {c.mark}
      </span>
      <span className="text-ink underline decoration-line decoration-1 underline-offset-4 transition-colors group-hover/chip:decoration-accent">
        {name}
      </span>
    </>
  );
  return c.href ? (
    <a href={c.href} target="_blank" rel="noopener noreferrer" className="group/chip whitespace-nowrap">
      {inner}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <span className="group/chip whitespace-nowrap">{inner}</span>
  );
}

/** Renders text, swapping any name from the chip list for its inline chip. */
export function RichText({ text }: { text: string }) {
  const names = Object.keys(chips).sort((a, b) => b.length - a.length);
  const re = new RegExp(`(${names.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return (
    <>
      {text.split(re).map((part, i) => (chips[part] ? <Chip key={i} name={part} /> : <span key={i}>{part}</span>))}
    </>
  );
}
