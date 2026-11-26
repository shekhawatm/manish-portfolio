"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { pages, site } from "@/content";
import { NavAvatar } from "./Avatar";
import { icons } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";

/** Which page are we on? "/" for home, otherwise the page's href. */
export function useActive() {
  const path = usePathname() ?? "/";
  const clean = path.replace(/\.html$/, "").replace(/\/$/, "") || "/";
  return clean;
}

/** Top bar: name on the left, icon links in the middle (desktop), theme switch on the right. */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const active = useActive();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-paper/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group inline-flex items-center font-serif text-lg font-semibold tracking-tight">
          <NavAvatar />
          {site.name}
          <span className="text-accent">.</span>
        </Link>

        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-0.5 rounded-full border border-line bg-card/70 p-1 md:flex">
            {pages.map((p) => {
              const Icon = icons[p.icon];
              const on = active === p.href;
              return (
                <li key={p.href} className="relative">
                  {on && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-butter"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <Link
                    href={p.href}
                    aria-current={on ? "page" : undefined}
                    className={`group relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors ${
                      on ? "font-medium text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    <Icon size={15} strokeWidth={1.9} aria-hidden="true" className="transition-transform group-hover:-rotate-12 group-hover:scale-110" />
                    {p.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <a
            href="#contact"
            className="ml-2 hidden rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 md:inline-flex"
          >
            Say hello
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

/** Phone-sized screens get a floating icon dock at the bottom instead of a menu. */
export function Dock() {
  const active = useActive();
  const items = [{ href: "/", label: "Home", icon: "home" }, ...pages.map((p) => ({ href: p.href, label: p.label, icon: p.icon }))];
  return (
    <nav aria-label="Pages" className="fixed inset-x-0 bottom-3 z-40 flex justify-center px-3 md:hidden">
      <ul className="flex items-center gap-0.5 rounded-full border border-line bg-card/90 p-1.5 shadow-[0_16px_40px_-18px_rgba(60,40,10,0.45)] backdrop-blur-md">
        {items.map((it) => {
          const Icon = icons[it.icon];
          const on = active === it.href;
          return (
            <li key={it.href} className="relative">
              {on && (
                <motion.span
                  layoutId="dock-pill"
                  className="absolute inset-0 rounded-full bg-butter"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <Link
                href={it.href}
                aria-current={on ? "page" : undefined}
                className={`relative flex h-11 flex-col items-center justify-center rounded-full px-2.5 text-[10px] leading-none ${on ? "text-ink" : "text-muted"}`}
              >
                <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
                <span className="mt-1">{it.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
