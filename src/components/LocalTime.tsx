"use client";

import { useEffect, useState } from "react";
import { site } from "@/content";

/** "Gurugram · 2:41 PM IST" with a pulsing dot; updates every 30 seconds. */
export function LocalTime() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: site.timeZone }).format(new Date());
    setNow(fmt());
    const t = setInterval(() => setNow(fmt()), 30_000);
    return () => clearInterval(t);
  }, []);

  return (
    <p className="inline-flex items-center gap-2 font-mono text-xs">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      {site.city} · {now ?? "--:--"} IST · {site.availability}
    </p>
  );
}
