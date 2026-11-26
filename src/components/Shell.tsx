"use client";

/** Everything that stays put while you move between pages: top bar, dock, scroll bar and rockets. */
import { Motion } from "./Motion";
import { Dock, Nav, Rail } from "./Nav";
import { Rockets } from "./Rockets";
import { ScrollProgress } from "./ScrollProgress";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <Motion>
      <ScrollProgress />
      <Nav />
      {children}
      {/* room under the footer for the phone dock */}
      <div aria-hidden="true" className="h-20 bg-ink md:hidden" />
      <Dock />
      <Rail />
      <Rockets />
    </Motion>
  );
}
