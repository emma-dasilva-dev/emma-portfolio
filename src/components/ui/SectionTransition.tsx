"use client";

type SectionTransitionProps = {
  children: React.ReactNode;
  direction?: "left" | "right" | "up";
};

export default function SectionTransition({
  children,
}: SectionTransitionProps) {
  return <div className="section-transition">{children}</div>;
}
