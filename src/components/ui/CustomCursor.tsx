"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const frameRef = useRef<number | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    document.documentElement.classList.add("custom-cursor-enabled");

    const move = (event: MouseEvent) => {
      pointer.current.x = event.clientX;
      pointer.current.y = event.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
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

    const tick = () => {
      ring.current.x += (pointer.current.x - ring.current.x) * 0.16;
      ring.current.y += (pointer.current.y - ring.current.y) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
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
    <>
      <div ref={ringRef} className={`custom-cursor-ring ${active ? "is-active" : ""}`} />
      <div ref={dotRef} className={`custom-cursor-dot ${active ? "is-active" : ""}`} />
    </>
  );
}
