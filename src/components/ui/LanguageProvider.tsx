"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "fr";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("portfolio-language");
      if (saved === "en" || saved === "fr") setLanguageState(saved);
    } catch {
      // Some mobile/private browsing modes can block storage.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;

    try {
      window.localStorage.setItem("portfolio-language", language);
    } catch {
      // Language switching should still work even when storage is unavailable.
    }
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage: (next: Language) => setLanguageState(next),
      toggleLanguage: () =>
        setLanguageState((current) => (current === "en" ? "fr" : "en")),
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
