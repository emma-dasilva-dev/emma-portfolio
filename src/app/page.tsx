import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import SmoothScroll from "@/components/ui/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <Intro />
      <main>
        <Hero />

        <section className="placeholder-section" id="about">
          <p className="section-kicker">01 · About</p>
          <p className="placeholder-copy">
            The next section starts here. We will design it after the opening
            direction is approved.
          </p>
        </section>

        <div id="experience" />
        <div id="projects" />
        <div id="contact" />
      </main>
    </SmoothScroll>
  );
}
