/**
 * A tiny confetti burst at a screen point, drawn with plain DOM + the Web
 * Animations API (no library). Does nothing for reduced-motion users.
 */
export function burst(x: number, y: number, count = 26) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const styles = getComputedStyle(document.documentElement);
  const colors = ["--accent", "--accent-2", "--gold"].map((v) => styles.getPropertyValue(v).trim() || "#b8432a");

  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    const size = 5 + Math.random() * 6;
    const round = Math.random() > 0.5;
    Object.assign(el.style, {
      position: "fixed",
      left: `${x}px`,
      top: `${y}px`,
      width: `${size}px`,
      height: `${round ? size : size * 0.45}px`,
      background: colors[i % colors.length],
      borderRadius: round ? "999px" : "2px",
      pointerEvents: "none",
      zIndex: "9999",
    } as CSSStyleDeclaration);
    document.body.appendChild(el);

    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 110;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 40;
    el.animate(
      [
        { transform: "translate(-50%, -50%) rotate(0deg)", opacity: 1 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy + 80}px)) rotate(${Math.random() * 540 - 270}deg)`, opacity: 0 },
      ],
      { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.2,.8,.3,1)", fill: "forwards" },
    ).onfinish = () => el.remove();
  }
}
