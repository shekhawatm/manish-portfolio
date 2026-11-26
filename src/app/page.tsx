import { Bring } from "@/components/Bring";
import { Built } from "@/components/Built";
import { Contact } from "@/components/Contact";
import { Engine } from "@/components/Engine";
import { Focus } from "@/components/Focus";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { Lifecycle } from "@/components/Lifecycle";
import { ScoutCompanion } from "@/components/Mascot";
import { Motion } from "@/components/Motion";
import { Nav } from "@/components/Nav";
import { Numbers } from "@/components/Numbers";
import { Principles } from "@/components/Principles";
import { Life, OpenSource, Recognition, Recommendations } from "@/components/Recognition";
import { ScrollProgress } from "@/components/ScrollProgress";

export default function Home() {
  return (
    <Motion>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <Numbers />
        <Engine />
        <Journey />
        <Bring />
        <Lifecycle />
        <Principles />
        <Built />
        <Focus />
        <Recognition />
        <Recommendations />
        <Life />
        <OpenSource />
      </main>
      <Contact />
      <ScoutCompanion />
    </Motion>
  );
}
