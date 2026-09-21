"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: -100, y: -100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    document.documentElement.classList.add("custom-cursor-enabled");

    const renderCursor = () => {
      if (!cursorRef.current) return;

      cursorRef.current.style.left = `${pointer.current.x}px`;
      cursorRef.current.style.top = `${pointer.current.y}px`;
    };

    const move = (event: PointerEvent) => {
      pointer.current.x = event.clientX;
      pointer.current.y = event.clientY;
      renderCursor();
    };

    const over = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;

      setActive(
        Boolean(
          target?.closest(
            "a, button, [role='button'], input, textarea, select, .stack-slider-item",
          ),
        ),
      );
    };

    const syncOnScroll = () => {
      renderCursor();
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("scroll", syncOnScroll, { passive: true });
    window.addEventListener("wheel", syncOnScroll, { passive: true });

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("scroll", syncOnScroll);
      window.removeEventListener("wheel", syncOnScroll);
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
