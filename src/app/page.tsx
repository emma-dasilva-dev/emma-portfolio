import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Projects from "@/components/sections/Projects";
import Stack from "@/components/sections/Stack";
import PortfolioHeroWithPaperShaders from "@/components/ui/portfolio-hero-with-paper-shaders";
import SectionTransition from "@/components/ui/SectionTransition";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { LanguageProvider } from "@/components/ui/LanguageProvider";
import ScrollExperience from "@/components/ui/ScrollExperience";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string; theme?: string }>;
}) {
  const params = await searchParams;
  const initialLanguage = params.lang === "fr" ? "fr" : "en";
  const initialDarkMode = params.theme !== "light";

  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <SmoothScroll>
        <ScrollExperience />
        <main
          className={initialDarkMode ? undefined : "portfolio-light-page"}
          data-mobile-theme={initialDarkMode ? "dark" : "light"}
        >
          <div className="section-stack-card section-stack-card-hero">
            <PortfolioHeroWithPaperShaders initialDarkMode={initialDarkMode} />
          </div>

          <SectionTransition direction="left">
            <About />
          </SectionTransition>

          <SectionTransition direction="left">
            <Stack />
          </SectionTransition>

          <SectionTransition direction="right">
            <Projects />
          </SectionTransition>

          <div className="section-stack-card section-stack-card-contact">
            <Contact />
          </div>
        </main>
      </SmoothScroll>
    </LanguageProvider>
  );
}
