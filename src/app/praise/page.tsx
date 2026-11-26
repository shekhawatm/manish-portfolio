import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { MascotCompanion } from "@/components/Mascot";
import { PageHeader, UpNext } from "@/components/Pages";
import { Recognition, Recommendations } from "@/components/Recognition";
import { pages } from "@/content";

const p = pages.find((x) => x.slug === "praise")!;
export const metadata: Metadata = { title: p.label, description: p.lead };

export default function Page() {
  return (
    <>
      <main id="main">
        <PageHeader slug="praise" sections={[{ id: "recognition", label: "Awards & certifications" }, { id: "recommendations", label: "Recommendations" }]} />
        <Recognition />
        <Recommendations />
        <UpNext slug="praise" />
      </main>
      <Contact />
      <MascotCompanion />
    </>
  );
}
