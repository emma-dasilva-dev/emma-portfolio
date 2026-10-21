"use client";

import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";
import type { Lang } from "@/content/site";

/* ───── Language: a tiny external store, remembered per browser ───── */

const LANG_KEY = "emma-portfolio:lang";
const langListeners = new Set<() => void>();
let currentLang: Lang | null = null;

function readLang(): Lang {
  if (currentLang) return currentLang;
  try {
    const saved = window.localStorage.getItem(LANG_KEY);
    currentLang = saved === "en" || saved === "fr" ? saved : "fr";
  } catch {
    currentLang = "fr";
  }
  return currentLang;
}

export function setLang(lang: Lang) {
  currentLang = lang;
  try {
    window.localStorage.setItem(LANG_KEY, lang);
  } catch {}
  langListeners.forEach((listener) => listener());
}

function subscribeLang(listener: () => void) {
  langListeners.add(listener);
  return () => langListeners.delete(listener);
}

/** French is rendered on the server; a saved English choice applies right after hydration. */
export function useLang() {
  return useSyncExternalStore<Lang>(subscribeLang, readLang, () => "fr");
}

/* ───── Media queries ───── */

function useMedia(query: string, serverValue = false) {
  return useSyncExternalStore(
    (listener) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

export const useReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)");

/** True once the client has hydrated; used so nothing is hidden before JS can reveal it. */
export function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/* ───── Scroll reveals ───── */

/**
 * Marks every `[data-reveal]` element with `data-in` once it enters the viewport.
 * Styles only hide unrevealed elements while `.site[data-ready]` is set, so the
 * page stays fully readable without JavaScript.
 */
export function useReveal(deps: unknown) {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])"));
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.setAttribute("data-in", ""));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [deps]);
}

/** Index of the section currently crossing the middle of the viewport. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(-1);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(ids.indexOf(entry.target.id));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

/** Header state: scrolled past the top, and hidden while scrolling down. */
export function useHeaderScroll() {
  const [state, setState] = useState({ scrolled: false, hidden: false });
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - last;
      last = y;
      setState((prev) => {
        const scrolled = y > 8;
        const hidden = y > 240 && (Math.abs(delta) < 4 ? prev.hidden : delta > 0);
        return prev.scrolled === scrolled && prev.hidden === hidden ? prev : { scrolled, hidden };
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return state;
}

/* ───── Local time in Cotonou ───── */

const clockFormat = typeof Intl !== "undefined"
  ? new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Porto-Novo" })
  : null;

function subscribeClock(listener: () => void) {
  const id = window.setInterval(listener, 15_000);
  return () => window.clearInterval(id);
}

/** "HH:MM" in Cotonou, or an empty string during server render. */
export function useCotonouTime() {
  return useSyncExternalStore(
    subscribeClock,
    () => clockFormat?.format(new Date()) ?? "",
    () => "",
  );
}

/** Flips to true the first time the element enters the viewport. */
export function useInView<T extends Element>(ref: RefObject<T | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { rootMargin: "0px 0px -10% 0px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, inView]);
  return inView;
}
