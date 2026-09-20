import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import HowIWork from "@/components/sections/HowIWork";
import Intro from "@/components/sections/Intro";
import Projects from "@/components/sections/Projects";
import Stack from "@/components/sections/Stack";
import SmoothScroll from "@/components/ui/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <Intro />
      <main>
        <Hero />

        <About />

        <Experience />
        <Stack />
        <Projects />
        <HowIWork />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
