import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { MascotCompanion } from "@/components/Mascot";
import { PageHeader, UpNext } from "@/components/Pages";
import { Built } from "@/components/Built";
import { pages } from "@/content";

const p = pages.find((x) => x.slug === "built")!;
export const metadata: Metadata = { title: p.label, description: p.lead };

export default function Page() {
  return (
    <>
      <main id="main">
        <PageHeader slug="built" sections={[]} />
        <Built />
        <UpNext slug="built" />
      </main>
      <Contact />
      <MascotCompanion />
    </>
  );
}
