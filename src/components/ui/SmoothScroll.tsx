"use client";

import { ReactLenis } from "lenis/react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.05,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
      }}
    >
      {children}
    </ReactLenis>
  );
}
