import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import HowIWork from "@/components/sections/HowIWork";
import Intro from "@/components/sections/Intro";
import Projects from "@/components/sections/Projects";
import Stack from "@/components/sections/Stack";
import SectionTransition from "@/components/ui/SectionTransition";
import SmoothScroll from "@/components/ui/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <Intro />
      <main>
        <Hero />

        <SectionTransition direction="left">
          <About />
        </SectionTransition>

        <SectionTransition direction="right">
          <Experience />
        </SectionTransition>

        <SectionTransition direction="left">
          <Stack />
        </SectionTransition>

        <SectionTransition direction="right">
          <Projects />
        </SectionTransition>

        <SectionTransition direction="up">
          <HowIWork />
        </SectionTransition>

        <Contact />
      </main>
    </SmoothScroll>
  );
}
