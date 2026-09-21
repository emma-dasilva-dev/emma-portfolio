"use client";

import { Dithering } from "@paper-design/shaders-react";
import { useState } from "react";

const experience = [
  ["Independent", "Self-taught developer", "2025 → now"],
  ["CJEPE", "Professional training", "2026"],
  ["Cashless Africa", "Software dev intern", "2026"],
] as const;

const links = [
  ["GitHub", "https://github.com/emma-dasilva-dev"],
  ["LinkedIn", "https://www.linkedin.com/in/emmadasilvadev"],
  ["Instagram", "https://www.instagram.com/emmadev.bj"],
  ["Email", "mailto:emma.dasilva.dev@gmail.com"],
] as const;

export default function PortfolioHeroWithPaperShaders() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <section
      className={`paper-hero ${isDarkMode ? "paper-hero-dark" : "paper-hero-light"}`}
      id="home"
    >
      <div className="paper-hero-copy">
        <button
          onClick={() => setIsDarkMode((current) => !current)}
          className="paper-theme-toggle"
          aria-label="Toggle hero theme"
          type="button"
        >
          {isDarkMode ? (
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          ) : (
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        <div className="paper-hero-header">
          <a className="paper-hero-brand" href="#home">
            Emma.dev
          </a>

          <div className="paper-hero-title">
            <h1>EMMA DA SILVA</h1>
            <p>SOFTWARE ENGINEERING × CYBERSECURITY</p>
          </div>
        </div>

        <div className="paper-hero-experience" aria-label="Experience">
          {experience.map(([company, role, date]) => (
            <div className="paper-experience-row" key={company}>
              <span>{company}</span>
              <span>{role}</span>
              <span>{date}</span>
            </div>
          ))}
        </div>

        <div className="paper-hero-bottom">
          <span className="paper-links-label">Links</span>
          <nav className="paper-hero-links" aria-label="Social links">
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="paper-hero-shader" aria-hidden="true">
        <Dithering
          style={{ height: "100%", width: "100%" }}
          colorBack={isDarkMode ? "hsl(0, 0%, 0%)" : "hsl(0, 0%, 95%)"}
          colorFront={isDarkMode ? "hsl(320, 100%, 70%)" : "hsl(220, 100%, 70%)"}
          shape="cat"
          type="4x4"
          pxSize={3}
          offsetX={0}
          offsetY={0}
          scale={0.8}
          rotation={0}
          speed={0.1}
        />
      </div>
    </section>
  );
}
