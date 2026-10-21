"use client";

import { useEffect, useState } from "react";
import ContributionSkyline, { type ContributionDay } from "@/components/ui/contribution-skyline";

export default function GitHubActivity({ language }: { language: "fr" | "en" }) {
  const [days, setDays] = useState<ContributionDay[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const res = await fetch("/api/github-contributions", { signal: controller.signal });
        if (!res.ok) throw new Error("Unavailable");
        const json: unknown = await res.json();
        if (!json || typeof json !== "object" || !("days" in json) ||
            !Array.isArray(json.days) || json.days.length < 300) throw new Error("Incomplete");
        setDays(json.days as ContributionDay[]);
      } catch (cause) {
        if (!controller.signal.aborted) {
          console.error("Contribution calendar failed to load", cause);
          setError(true);
        }
      }
    }
    void load();
    return () => controller.abort();
  }, []);

  if (error) return (
    <div className="github-skyline-status" role="status">
      <p>{language === "fr" ? "L’activité GitHub est temporairement indisponible." : "GitHub activity is temporarily unavailable."}</p>
      <a href="https://github.com/emma-dasilva-dev" target="_blank" rel="noopener noreferrer">
        {language === "fr" ? "Voir mon profil GitHub ↗" : "View my GitHub profile ↗"}
      </a>
    </div>
  );
  if (!days) return <div className="github-skyline-status" role="status">{language === "fr" ? "Chargement de l’activité GitHub…" : "Loading GitHub activity…"}</div>;

  return (
    <div className="github-skyline-shell">
      <ContributionSkyline
        data={days}
        locale={language === "fr" ? "fr-FR" : "en-US"}
        defaultView="3d"
        palette={{ dark: ["#294651", "#416e85", "#70aac1", "#d6eaf2"], light: ["#294651", "#416e85", "#70aac1", "#d6eaf2"] }}
        title={language === "fr" ? "Contributions GitHub — 12 derniers mois" : "GitHub contributions — last 12 months"}
        footer={language === "fr" ? "Survolez les jours · Glissez pour orienter la vue 3D" : "Hover days · Drag to rotate the 3D view"}
        showStats
        showLegend
        showToggle
        orbit
      />
      <a className="github-skyline-profile" href="https://github.com/emma-dasilva-dev" target="_blank" rel="noopener noreferrer">
        github.com/emma-dasilva-dev <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
