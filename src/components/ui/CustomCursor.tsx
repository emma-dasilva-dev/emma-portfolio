"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const frameRef = useRef<number | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    document.documentElement.classList.add("custom-cursor-enabled");

    const move = (event: MouseEvent) => {
      pointer.current.x = event.clientX;
      pointer.current.y = event.clientY;
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

    const tick = () => {
      current.current.x += (pointer.current.x - current.current.x) * 0.42;
      current.current.y += (pointer.current.y - current.current.y) * 0.42;

      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
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
