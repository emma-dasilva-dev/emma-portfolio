"use client";

type InteractiveHoverButtonProps = {
  href: string;
  children: React.ReactNode;
};

export function InteractiveHoverButton({
  href,
  children,
}: InteractiveHoverButtonProps) {
  return (
    <a className="interactive-hover-button" href={href}>
      <span className="interactive-hover-button-front">
        <span className="interactive-hover-button-dot" />
        <span className="interactive-hover-button-label">{children}</span>
      </span>

      <span className="interactive-hover-button-hover" aria-hidden="true">
        <span>{children}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M5 12h14M13 6l6 6-6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  );
}
