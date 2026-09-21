"use client";

import { Dithering } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";

const experience = [
  ["Independent", "Self-taught developer", "2025 → 2026"],
  ["University", "Cybersecurity student", "2026 → Present"],
  ["CJEPE", "Professional training", "2026"],
  ["Cashless Africa", "Software dev intern", "2026"],
] as const;

const links = [
  ["GitHub", "https://github.com/emma-dasilva-dev", "github"],
  ["LinkedIn", "https://www.linkedin.com/in/emmadasilvadev", "linkedin"],
  ["Instagram", "https://www.instagram.com/emmadev.bj", "instagram"],
  ["Email", "https://mail.google.com/mail/?view=cm&fs=1&to=emma.dasilva.dev@gmail.com", "email"],
] as const;

function SocialIcon({ type }: { type: (typeof links)[number][2] }) {
  if (type === "github") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.29-5.27-5.72 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.16 1.18A10.9 10.9 0 0 1 12 6.05c.98 0 1.96.13 2.88.39 2.19-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.44-2.71 5.42-5.29 5.71.42.36.79 1.07.79 2.16v3.26c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .7Z"
        />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"
        />
      </svg>
    );
  }

  if (type === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.81.25 2.24.42a4.5 4.5 0 0 1 1.63 1.06 4.5 4.5 0 0 1 1.06 1.63c.17.43.37 1.07.42 2.24.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.81-.42 2.24a4.5 4.5 0 0 1-1.06 1.63 4.5 4.5 0 0 1-1.63 1.06c-.43.17-1.07.37-2.24.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.81-.25-2.24-.42a4.5 4.5 0 0 1-1.63-1.06 4.5 4.5 0 0 1-1.06-1.63c-.17-.43-.37-1.07-.42-2.24C2.17 16 2.16 15.62 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.81.42-2.24a4.5 4.5 0 0 1 1.06-1.63 4.5 4.5 0 0 1 1.63-1.06c.43-.17 1.07-.37 2.24-.42C8.85 2.17 9.23 2.16 12 2.16Zm0 4.69A5.15 5.15 0 1 0 12 17.15 5.15 5.15 0 0 0 12 6.85Zm0 8.49A3.34 3.34 0 1 1 12 8.66a3.34 3.34 0 0 1 0 6.68Zm6.56-8.7a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5.5h18v13H3zM3.5 6l8.5 7 8.5-7"
      />
    </svg>
  );
}

export default function PortfolioHeroWithPaperShaders() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("portfolio-light", !isDarkMode);

    return () => {
      document.documentElement.classList.remove("portfolio-light");
    };
  }, [isDarkMode]);

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
          <nav className="paper-hero-links" aria-label="Social links">
            {links.map(([label, href, type]) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={label}
                title={label}
              >
                <SocialIcon type={type} />
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
