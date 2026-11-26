import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { MascotCompanion } from "@/components/Mascot";
import { PageHeader, UpNext } from "@/components/Pages";
import { Journey } from "@/components/Journey";
import { Life } from "@/components/Recognition";
import { pages } from "@/content";

const p = pages.find((x) => x.slug === "journey")!;
export const metadata: Metadata = { title: p.label, description: p.lead };

export default function Page() {
  return (
    <>
      <main id="main">
        <PageHeader slug="journey" sections={[{ id: "journey", label: "Career" }, { id: "life", label: "Off the clock" }]} />
        <Journey />
        <Life />
        <UpNext slug="journey" />
      </main>
      <Contact />
      <MascotCompanion />
    </>
  );
}
