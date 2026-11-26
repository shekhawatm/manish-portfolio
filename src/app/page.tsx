import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { MascotCompanion } from "@/components/Mascot";
import { Explore } from "@/components/Pages";

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <Explore />
      </main>
      <Contact />
      <MascotCompanion />
    </>
  );
}
