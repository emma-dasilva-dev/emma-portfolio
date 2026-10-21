"use client";

import { useEffect, useRef, useState } from "react";
import { SECTION_IDS, type Copy, type Lang } from "@/content/site";
import { setLang, useActiveSection, useCotonouTime, useHeaderScroll } from "@/lib/hooks";
import styles from "./SiteHeader.module.css";

const NAV_IDS = [SECTION_IDS.about, SECTION_IDS.work, SECTION_IDS.expertise, SECTION_IDS.contact] as const;

export default function SiteHeader({ t, lang }: { t: Copy; lang: Lang }) {
  const [open, setOpen] = useState(false);
  const { scrolled, hidden } = useHeaderScroll();
  const active = useActiveSection(NAV_IDS);
  const time = useCotonouTime();
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const labels = [t.nav.about, t.nav.work, t.nav.expertise, t.nav.contact];

  useEffect(() => {
    if (!open) return;
    const button = menuButton.current;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const wide = window.matchMedia("(min-width: 720px)");
    const onWide = () => wide.matches && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    firstLink.current?.focus();
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
      button?.focus({ preventScroll: true });
    };
  }, [open]);

  const languageToggle = (
    <div className={styles.lang} role="group" aria-label={t.a11y.language}>
      {(["fr", "en"] as const).map((code, i) => (
        <span key={code} className={styles.langItem}>
          {i > 0 ? <span aria-hidden="true" className={styles.slash}>/</span> : null}
          <button type="button" onClick={() => setLang(code)} aria-pressed={lang === code} lang={code}>
            {code.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );

  return (
    <header className={styles.header} data-scrolled={scrolled || open || undefined} data-hidden={(hidden && !open) || undefined}>
      <div className={styles.inner}>
        <a id="brand-link" className={styles.brand} href={`#${SECTION_IDS.home}`} aria-label={t.a11y.home}>
          Emma DaSilva<sup aria-hidden="true">©</sup>
        </a>

        <nav className={styles.nav} aria-label={t.a11y.mainNav}>
          <ol>
            {NAV_IDS.map((id, i) => (
              <li key={id}>
                <a href={`#${id}`} aria-current={active === i ? "location" : undefined}>
                  <span className={styles.navIndex} aria-hidden="true">0{i + 1}</span>
                  {labels[i]}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className={styles.right}>
          <span className={`label ${styles.clock}`}>
            {t.clock} <time suppressHydrationWarning>{time || "--:--"}</time> <span className={styles.tz}>GMT+1</span>
          </span>
          {languageToggle}
          <button
            ref={menuButton}
            type="button"
            className={styles.menuButton}
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.a11y.menuClose : t.a11y.menuOpen}
          >
            <span aria-hidden="true" className={styles.burger} data-open={open || undefined} />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={styles.overlay} data-open={open || undefined} inert={!open}>
        <nav aria-label={t.a11y.mainNav}>
          <ol>
            {NAV_IDS.map((id, i) => (
              <li key={id} style={{ "--i": i } as React.CSSProperties}>
                <a ref={i === 0 ? firstLink : undefined} href={`#${id}`} onClick={() => setOpen(false)}>
                  <span className="label">0{i + 1}</span>
                  {labels[i]}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className={styles.overlayFoot}>
          <span className="label">
            {t.clock} {time || "--:--"} GMT+1
          </span>
          {languageToggle}
        </div>
      </div>
    </header>
  );
}
