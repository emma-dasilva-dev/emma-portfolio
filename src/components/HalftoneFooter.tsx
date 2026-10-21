"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LINKS, SECTION_IDS, type Copy } from "@/content/site";
import styles from "./HalftoneFooter.module.css";

type Dot = { x: number; y: number; homeX: number; homeY: number; vx: number; vy: number; radius: number; ink: number };

const WORD = "emma.";
const BACKGROUND = "#0c0c0b";
const INK = [233, 228, 218];
const ACCENT = [233, 118, 43];
// Three ink densities stand in for uneven print coverage, and keep resting dots batchable.
const INK_LEVELS = [0.84, 0.92, 1];
const MOBILE_QUERY = "(max-width: 600px)";

export default function HalftoneFooter({ t }: { t: Copy }) {
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mobileWordRef = useRef<HTMLSpanElement>(null);
  const [replay, setReplay] = useState(0);

  const toTop = useCallback(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
    document.getElementById("brand-link")?.focus({ preventScroll: true });
  }, []);

  const spotlight = useCallback((clientX: number, clientY: number) => {
    const word = mobileWordRef.current;
    if (!word) return;
    const rect = word.getBoundingClientRect();
    word.style.setProperty("--touch-x", `${clientX - rect.left}px`);
    word.style.setProperty("--touch-y", `${clientY - rect.top}px`);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!root || !canvas || !ctx) return;
    // Phones get the touch-first CSS wordmark instead of the pointer canvas.
    if (window.matchMedia(MOBILE_QUERY).matches) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motionQuery.matches;
    let visible = true;
    let frame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let dots: Dot[] = [];
    let pointer: { x: number; y: number } | null = null;
    let shock: { x: number; y: number; start: number } | null = null;
    const family = getComputedStyle(document.documentElement).getPropertyValue("--font-sans").trim() || "Arial, sans-serif";
    const fontAt = (size: number) => `700 ${size}px ${family}`;

    function layout() {
      const rect = root!.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);

      const mask = document.createElement("canvas");
      mask.width = width;
      mask.height = height;
      const m = mask.getContext("2d", { willReadFrequently: true });
      if (!m) return;
      if ("letterSpacing" in m) m.letterSpacing = "-6px";
      m.font = fontAt(100);
      const fitted = ((width * 0.95) / Math.max(m.measureText(WORD).width, 1)) * 100;
      m.font = fontAt(fitted);
      if ("letterSpacing" in m) m.letterSpacing = `${-fitted * 0.055}px`;
      const measured = m.measureText(WORD);
      const ascent = measured.actualBoundingBoxAscent || fitted * 0.72;
      m.fillStyle = "#000";
      m.textBaseline = "alphabetic";
      // The baseline sits below the footer so the letters crop against its bottom edge.
      m.fillText(WORD, (width - measured.width) / 2, height + ascent * 0.1);

      const pixels = m.getImageData(0, 0, width, height).data;
      const gap = width < 1100 ? 6.5 : 7.5;
      const next: Dot[] = [];
      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          let covered = 0;
          for (let sy = 0; sy < 3; sy++) {
            for (let sx = 0; sx < 3; sx++) {
              const xx = Math.min(width - 1, Math.floor(x + ((sx + 0.5) * gap) / 3));
              const yy = Math.min(height - 1, Math.floor(y + ((sy + 0.5) * gap) / 3));
              covered += pixels[(yy * width + xx) * 4 + 3];
            }
          }
          const coverage = covered / (9 * 255);
          if (coverage < 0.06) continue;
          const homeX = x + gap / 2;
          const homeY = y + gap / 2;
          const jitter = 0.93 + Math.random() * 0.12;
          next.push({ x: homeX, y: homeY, homeX, homeY, vx: 0, vy: 0, radius: Math.sqrt(coverage) * gap * 0.5 * jitter, ink: Math.floor(Math.random() * 3) });
        }
      }
      dots = next;
      pointer = null;
      shock = null;
      wake();
    }

    function render(now: number) {
      frame = 0;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.fillStyle = BACKGROUND;
      ctx!.fillRect(0, 0, width, height);
      const age = shock ? now - shock.start : Infinity;
      const resting: Path2D[] = INK_LEVELS.map(() => new Path2D());
      let moving = false;

      for (const dot of dots) {
        if (!reduced) {
          if (pointer) {
            const dx = dot.x - pointer.x;
            const dy = dot.y - pointer.y;
            const d2 = dx * dx + dy * dy;
            const reach = 100;
            if (d2 < reach * reach) {
              const dist = Math.sqrt(d2) + 0.001;
              const force = (1 - dist / reach) * 3.2;
              dot.vx += (dx / dist) * force;
              dot.vy += (dy / dist) * force;
            }
          }
          if (shock && age < 900) {
            const dx = dot.homeX - shock.x;
            const dy = dot.homeY - shock.y;
            const dist = Math.hypot(dx, dy) + 0.001;
            const band = Math.max(0, 1 - Math.abs(dist - age * 1.05) / 30);
            const force = band * 3.4 * (1 - age / 900);
            dot.vx += (dx / dist) * force;
            dot.vy += (dy / dist) * force;
          }
          // Spring back home, with damping.
          dot.vx = (dot.vx + (dot.homeX - dot.x) * 0.05) * 0.84;
          dot.vy = (dot.vy + (dot.homeY - dot.y) * 0.05) * 0.84;
          dot.x += dot.vx;
          dot.y += dot.vy;
        } else {
          dot.x = dot.homeX;
          dot.y = dot.homeY;
        }

        const offset = Math.abs(dot.x - dot.homeX) + Math.abs(dot.y - dot.homeY);
        if (offset > 0.1 || Math.abs(dot.vx) + Math.abs(dot.vy) > 0.08) moving = true;
        if (offset > 0.6) {
          const warmth = Math.min(1, Math.hypot(dot.x - dot.homeX, dot.y - dot.homeY) / 26);
          const r = Math.round(INK[0] + (ACCENT[0] - INK[0]) * warmth);
          const g = Math.round(INK[1] + (ACCENT[1] - INK[1]) * warmth);
          const b = Math.round(INK[2] + (ACCENT[2] - INK[2]) * warmth);
          ctx!.globalAlpha = INK_LEVELS[dot.ink];
          ctx!.fillStyle = `rgb(${r},${g},${b})`;
          ctx!.beginPath();
          ctx!.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
          ctx!.fill();
        } else {
          const path = resting[dot.ink];
          path.moveTo(dot.x + dot.radius, dot.y);
          path.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        }
      }

      ctx!.fillStyle = `rgb(${INK[0]},${INK[1]},${INK[2]})`;
      resting.forEach((path, i) => {
        ctx!.globalAlpha = INK_LEVELS[i];
        ctx!.fill(path);
      });
      ctx!.globalAlpha = 1;

      if (shock && age >= 900) shock = null;
      // Only hide the text fallback once dots have actually painted.
      root!.dataset.dotsReady = dots.length > 0 ? "true" : "false";
      if (visible && (moving || shock)) wake();
    }

    function wake() {
      if (!frame && visible) frame = requestAnimationFrame(render);
    }

    const local = (event: PointerEvent) => {
      const rect = canvas!.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    function onMove(event: PointerEvent) {
      if (reduced || event.pointerType === "touch") return;
      pointer = local(event);
      wake();
    }
    function onLeave() {
      pointer = null;
      wake();
    }
    function onDown(event: PointerEvent) {
      if (reduced || (event.target as HTMLElement).closest("a, button")) return;
      const { x, y } = local(event);
      shock = { x, y, start: performance.now() };
      wake();
    }
    function onMotionChange() {
      reduced = motionQuery.matches;
      pointer = null;
      shock = null;
      wake();
    }

    const resize = new ResizeObserver(layout);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) wake();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerdown", onDown);
    motionQuery.addEventListener("change", onMotionChange);
    resize.observe(root);
    intersection.observe(root);
    // Re-sample the glyphs once the display font is available.
    document.fonts?.load(fontAt(100), WORD).then(layout).catch(() => {});
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerdown", onDown);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  const f = t.footer;

  return (
    <footer ref={rootRef} className={styles.footer}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <span className={styles.fallback} aria-hidden="true">{WORD}</span>

      <div className={styles.top}>
        <div className={styles.columns}>
          <div className={styles.group}>
            <span className={styles.strong}>Emma DaSilva</span>
            <span className={styles.muted}>{f.location}</span>
          </div>
          <nav className={styles.group} aria-label={f.footerNav}>
            <span className={styles.muted}>{f.explore}</span>
            <a href={`#${SECTION_IDS.home}`}>{f.home}</a>
            <a href={`#${SECTION_IDS.about}`}>{t.nav.about}</a>
            <a href={`#${SECTION_IDS.work}`}>{t.nav.work}</a>
            <a href={`#${SECTION_IDS.expertise}`}>{t.nav.expertise}</a>
          </nav>
          <div className={styles.group}>
            <span className={styles.muted}>{f.connect}</span>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={LINKS.mailto}>{f.email}</a>
          </div>
          <div className={styles.group}>
            <span className={styles.muted}>{f.contact}</span>
            <a href={LINKS.mailto} className={styles.mail}>{LINKS.email}</a>
          </div>
        </div>
        <div className={styles.bar}>
          <button type="button" className={styles.back} onClick={toTop}>
            {f.top} <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>

      <div className={styles.mobile}>
        <button
          type="button"
          className={styles.mobileAction}
          aria-label={f.replay}
          onClick={() => setReplay((value) => value + 1)}
          onPointerDown={(event) => {
            if (event.pointerType === "mouse") return;
            spotlight(event.clientX, event.clientY);
            mobileWordRef.current?.setAttribute("data-touching", "");
          }}
          onPointerMove={(event) => {
            if (mobileWordRef.current?.hasAttribute("data-touching")) spotlight(event.clientX, event.clientY);
          }}
          onPointerUp={() => mobileWordRef.current?.removeAttribute("data-touching")}
          onPointerCancel={() => mobileWordRef.current?.removeAttribute("data-touching")}
        >
          <span ref={mobileWordRef} className={styles.mobileWord} key={replay} aria-hidden="true">
            {Array.from(WORD).map((letter, i) => (
              <span key={i} className={styles.mobileLetter} style={{ animationDelay: `${i * 80}ms` }}>
                {letter}
              </span>
            ))}
          </span>
        </button>
        <span className={`label ${styles.hint}`} aria-hidden="true">{f.hint} ↗</span>
      </div>
    </footer>
  );
}
