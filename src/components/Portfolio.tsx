"use client";

import { useEffect } from "react";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Expertise from "@/components/Expertise";
import HalftoneFooter from "@/components/HalftoneFooter";
import Hero from "@/components/Hero";
import SiteHeader from "@/components/SiteHeader";
import Work from "@/components/Work";
import { copy } from "@/content/site";
import { useHydrated, useLang, useReveal } from "@/lib/hooks";

export default function Portfolio() {
  const lang = useLang();
  const t = copy[lang];
  // Reveal styles only hide content once hydrated, so nothing is lost if JS is late or fails.
  const ready = useHydrated();
  useReveal(ready);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="site" data-ready={ready || undefined}>
      {/* React hoists this into <head>, so the tab title follows the language. */}
      <title>{t.meta.title}</title>
      <a className="skip-link" href="#main">
        {t.a11y.skip}
      </a>
      <SiteHeader t={t} lang={lang} />
      <main id="main">
        <Hero t={t} />
        <About t={t} />
        <Work t={t} lang={lang} />
        <Expertise t={t} lang={lang} />
        <Contact t={t} />
      </main>
      <HalftoneFooter t={t} />
    </div>
  );
}
