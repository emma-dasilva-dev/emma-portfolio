import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
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
        <div id="contact" />
      </main>
    </SmoothScroll>
  );
}
