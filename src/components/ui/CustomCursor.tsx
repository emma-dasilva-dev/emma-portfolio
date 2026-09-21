"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    document.documentElement.classList.add("custom-cursor-enabled");

    const move = (event: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
    };

    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setActive(
        Boolean(
          target?.closest(
            "a, button, [role='button'], input, textarea, select, .stack-slider-item",
          ),
        ),
      );
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${active ? "is-active" : ""}`}
      aria-hidden="true"
    />
  );
}
