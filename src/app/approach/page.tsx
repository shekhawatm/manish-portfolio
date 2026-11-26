import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { MascotCompanion } from "@/components/Mascot";
import { PageHeader, UpNext } from "@/components/Pages";
import { Bring } from "@/components/Bring";
import { Focus } from "@/components/Focus";
import { Lifecycle } from "@/components/Lifecycle";
import { Principles } from "@/components/Principles";
import { pages } from "@/content";

const p = pages.find((x) => x.slug === "approach")!;
export const metadata: Metadata = { title: p.label, description: p.lead };

export default function Page() {
  return (
    <>
      <main id="main">
        <PageHeader slug="approach" sections={[{ id: "bring", label: "What I bring" }, { id: "lifecycle", label: "Hiring lifecycle" }, { id: "how", label: "How I work" }, { id: "focus", label: "Focus now" }]} />
        <Bring />
        <Lifecycle />
        <Principles />
        <Focus />
        <UpNext slug="approach" />
      </main>
      <Contact />
      <MascotCompanion />
    </>
  );
}
