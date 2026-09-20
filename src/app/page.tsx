import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import SmoothScroll from "@/components/ui/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <Intro />
      <main>
        <Hero />

        <About />

        <div id="experience" />
        <div id="projects" />
        <div id="contact" />
      </main>
    </SmoothScroll>
  );
}
