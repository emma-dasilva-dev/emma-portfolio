"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_-#";
const DURATION = 700;

/**
 * Decodes a short label character by character when `active` turns on.
 * Screen readers always get the real text; the animated copy is hidden.
 */
export default function ScrambleText({ text, active, reducedMotion }: { text: string; active: boolean; reducedMotion: boolean }) {
  const [display, setDisplay] = useState(text);
  const played = useRef(false);

  useEffect(() => {
    if (!active || played.current || reducedMotion) {
      setDisplay(text);
      return;
    }
    played.current = true;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const settled = Math.floor(t * text.length);
      setDisplay(
        text
          .split("")
          .map((char, i) => (i < settled || char === " " ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join("")
      );
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, text, reducedMotion]);

  return (
    <>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{text}</span>
    </>
  );
}
