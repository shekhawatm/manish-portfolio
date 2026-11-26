import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { MascotCompanion } from "@/components/Mascot";
import { PageHeader, UpNext } from "@/components/Pages";
import { Engine } from "@/components/Engine";
import { Numbers } from "@/components/Numbers";
import { pages } from "@/content";

const p = pages.find((x) => x.slug === "impact")!;
export const metadata: Metadata = { title: p.label, description: p.lead };

export default function Page() {
  return (
    <>
      <main id="main">
        <PageHeader slug="impact" sections={[{ id: "numbers", label: "By the numbers" }, { id: "impact", label: "Year by year" }]} />
        <Numbers />
        <Engine />
        <UpNext slug="impact" />
      </main>
      <Contact />
      <MascotCompanion />
    </>
  );
}
