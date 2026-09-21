import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Projects from "@/components/sections/Projects";
import Stack from "@/components/sections/Stack";
import PortfolioHeroWithPaperShaders from "@/components/ui/portfolio-hero-with-paper-shaders";
import SectionTransition from "@/components/ui/SectionTransition";
import SmoothScroll from "@/components/ui/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <PortfolioHeroWithPaperShaders />

        <SectionTransition direction="left">
          <About />
        </SectionTransition>

        <SectionTransition direction="left">
          <Stack />
        </SectionTransition>

        <SectionTransition direction="right">
          <Projects />
        </SectionTransition>


        <Contact />
      </main>
    </SmoothScroll>
  );
}
