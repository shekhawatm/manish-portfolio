import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { MascotCompanion } from "@/components/Mascot";
import { Explore, Highlights } from "@/components/Pages";

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <Highlights />
        <Explore />
      </main>
      <Contact />
      <MascotCompanion />
    </>
  );
}
