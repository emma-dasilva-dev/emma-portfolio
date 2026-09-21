"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: -100, y: -100 });
  const frameRef = useRef<number | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    const updateActiveState = () => {
      const target = document.elementFromPoint(pointer.current.x, pointer.current.y) as HTMLElement | null;

      setActive(
        Boolean(
          target?.closest(
            "a, button, [role='button'], input, textarea, select, .stack-slider-item",
          ),
        ),
      );
    };

    const move = (event: PointerEvent) => {
      pointer.current.x = event.clientX;
      pointer.current.y = event.clientY;
    };

    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${pointer.current.x}px, ${pointer.current.y}px, 0)`;
      }

      updateActiveState();
      frameRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move, { passive: true });
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", move);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className="custom-cursor-layer" aria-hidden="true">
      <div
        ref={dotRef}
        className={`custom-cursor ${active ? "is-active" : ""}`}
      />
    </div>
  );
}
