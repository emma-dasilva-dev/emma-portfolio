"use client";

import { useCallback, useEffect, useRef } from "react";

type Dot = { x: number; y: number; homeX: number; homeY: number; vx: number; vy: number; radius: number };

export default function HalftoneFooter({ language }: { language: "fr" | "en" }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const toTop = useCallback(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!root || !canvas || !ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    let reduced = motionQuery.matches;
    let finePointer = pointerQuery.matches;
    let visible = true;
    let frame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let dots: Dot[] = [];
    let pointer: { x: number; y: number } | null = null;
    let shock: { x: number; y: number; start: number } | null = null;
    let touchStart: { x: number; y: number; time: number; id: number } | null = null;
    const background = "#0a121a";
    const foreground = [214, 234, 242];
    const restingInk = "rgb(214,234,242)";
    const accent = [93, 143, 166]; // Existing portfolio ice blue.

    function layout() {
      const rect = root!.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, width < 600 ? 1.5 : 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);

      const mask = document.createElement("canvas");
      mask.width = width;
      mask.height = height;
      const maskCtx = mask.getContext("2d", { willReadFrequently: true });
      if (!maskCtx) return;

      const word = "emma.";
      const family = 'Arial, Helvetica, sans-serif';
      maskCtx.font = '900 100px ' + family;
      const initialWidth = maskCtx.measureText(word).width;
      const fitted = (width * (width < 600 ? 0.94 : 0.99) / Math.max(initialWidth, 1)) * 100;
      maskCtx.font = '900 ' + fitted + 'px ' + family;
      const measured = maskCtx.measureText(word);
      const ascent = measured.actualBoundingBoxAscent || fitted * 0.72;
      maskCtx.fillStyle = "#000";
      maskCtx.textBaseline = "alphabetic";
      // Desktop intentionally crops the signature; on phones keep the dots fully in view.
      const baseline = width < 600
        ? Math.min(height - 24, height * 0.58 + ascent * 0.55)
        : height + ascent * 0.17;
      maskCtx.fillText(word, Math.max(0, (width - measured.width) / 2), baseline);

      const pixels = maskCtx.getImageData(0, 0, width, height).data;
      // A slightly wider grid dramatically reduces Canvas 2D draw calls on large screens.
      const gap = width < 600 ? 5.5 : 8;
      const next: Dot[] = [];
      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          let covered = 0;
          for (let sy = 0; sy < 3; sy++) {
            for (let sx = 0; sx < 3; sx++) {
              const xx = Math.min(width - 1, Math.floor(x + (sx + 0.5) * gap / 3));
              const yy = Math.min(height - 1, Math.floor(y + (sy + 0.5) * gap / 3));
              covered += pixels[(yy * width + xx) * 4 + 3];
            }
          }
          const coverage = covered / (9 * 255);
          if (coverage < 0.06) continue;
          const homeX = x + gap / 2;
          const homeY = y + gap / 2;
          next.push({ x: homeX, y: homeY, homeX, homeY, vx: 0, vy: 0, radius: Math.sqrt(coverage) * gap * 0.56 });
        }
      }
      dots = next;
      pointer = null;
      shock = null;
      wake();
    }

    function render(now: number) {
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);
      // React to direct finger contact on mobile and hover on fine-pointer devices.
      const interactive = !reduced;
      const age = shock ? now - shock.start : Infinity;
      let moving = false;

      for (const dot of dots) {
        let displaced = false;
        if (interactive) {
          if (pointer) {
            const dx = dot.x - pointer.x;
            const dy = dot.y - pointer.y;
            const distanceSquared = dx * dx + dy * dy;
            const reach = finePointer ? 95 : 115;
            if (distanceSquared < reach * reach) {
              const dist = Math.sqrt(distanceSquared) + 0.001;
              const force = (1 - dist / reach) * (finePointer ? 3.3 : 5.2);
              dot.vx += dx / dist * force;
              dot.vy += dy / dist * force;
            }
          }
          if (shock && age < 850) {
            const dx = dot.homeX - shock.x;
            const dy = dot.homeY - shock.y;
            const dist = Math.hypot(dx, dy) + 0.001;
            const band = Math.max(0, 1 - Math.abs(dist - age * 0.95) / 27);
            const force = band * 3.1 * (1 - age / 850);
            dot.vx += dx / dist * force;
            dot.vy += dy / dist * force;
          }
          dot.vx = (dot.vx + (dot.homeX - dot.x) * 0.05) * 0.84;
          dot.vy = (dot.vy + (dot.homeY - dot.y) * 0.05) * 0.84;
          dot.x += dot.vx;
          dot.y += dot.vy;
          displaced = Math.abs(dot.x - dot.homeX) + Math.abs(dot.y - dot.homeY) > 0.1;
          if (displaced || Math.abs(dot.vx) + Math.abs(dot.vy) > 0.08) moving = true;
        } else {
          dot.x = dot.homeX;
          dot.y = dot.homeY;
        }

        if (displaced) {
          const warmth = Math.min(1, Math.hypot(dot.x - dot.homeX, dot.y - dot.homeY) / 28);
          const r = Math.round(foreground[0] + (accent[0] - foreground[0]) * warmth);
          const g = Math.round(foreground[1] + (accent[1] - foreground[1]) * warmth);
          const b = Math.round(foreground[2] + (accent[2] - foreground[2]) * warmth);
          ctx.fillStyle = `rgb(${r},${g},${b})`;
        } else {
          ctx.fillStyle = restingInk;
        }
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      if (shock && age >= 850) shock = null;
      frame = 0;
      if (visible && (moving || Boolean(shock))) wake();
    }

    function wake() {
      if (!frame && visible) frame = requestAnimationFrame(render);
    }

    function onMove(event: PointerEvent) {
      if (reduced) return;
      if (event.pointerType === "touch") {
        if (!touchStart || touchStart.id !== event.pointerId) return;
        const rect = canvas!.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        // If the gesture becomes a vertical scroll, give the page priority.
        if (Math.abs(y - touchStart.y) > Math.abs(x - touchStart.x) + 8) {
          touchStart = null;
          pointer = null;
          wake();
          return;
        }
        pointer = { x, y };
      } else {
        if (!finePointer) return;
        const rect = canvas!.getBoundingClientRect();
        pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      }
      wake();
    }
    function onLeave(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      pointer = null;
      wake();
    }
    function onDown(event: PointerEvent) {
      if (reduced || (event.target as HTMLElement).closest("a, button")) return;
      const rect = canvas!.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (event.pointerType === "touch") {
        touchStart = { x, y, time: performance.now(), id: event.pointerId };
        pointer = { x, y };
        wake();
        return;
      }
      shock = { x, y, start: performance.now() };
      wake();
    }
    function onUp(event: PointerEvent) {
      if (!touchStart || event.pointerId !== touchStart.id) return;
      const start = touchStart;
      touchStart = null;
      pointer = null;
      const rect = canvas!.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      // Do not fire a ripple during a vertical page scroll.
      if (reduced || performance.now() - start.time > 500 || Math.hypot(x - start.x, y - start.y) > 18) { wake(); return; }
      shock = { x, y, start: performance.now() };
      wake();
    }
    function onCancel() { touchStart = null; pointer = null; wake(); }
    function onMotionChange() { reduced = motionQuery.matches; pointer = null; shock = null; wake(); }
    function onPointerChange() { finePointer = pointerQuery.matches; pointer = null; shock = null; wake(); }

    const resize = new ResizeObserver(layout);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) wake();
      else { cancelAnimationFrame(frame); frame = 0; }
    });
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointerup", onUp);
    root.addEventListener("pointercancel", onCancel);
    motionQuery.addEventListener("change", onMotionChange);
    pointerQuery.addEventListener("change", onPointerChange);
    resize.observe(root);
    intersection.observe(root);
    layout();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointercancel", onCancel);
      motionQuery.removeEventListener("change", onMotionChange);
      pointerQuery.removeEventListener("change", onPointerChange);
    };
  }, []);

  return (
    <div ref={rootRef} className="halftone-footer" aria-label={language === "fr" ? "Signature visuelle" : "Visual wordmark"}>
      <div className="halftone-footer__top">
        <span>Emma Da Silva <span aria-hidden="true">/</span> {language === "fr" ? "Portfolio" : "Portfolio"}</span>
        <button type="button" onClick={toTop}>
          {language === "fr" ? "Retour en haut" : "Back to top"} <span aria-hidden="true">↗</span>
        </button>
      </div>
      <canvas ref={canvasRef} aria-hidden="true" />
      <span className="halftone-footer__sr">Emma Da Silva</span>
      <style>{`
        .halftone-footer {
          position: relative; isolation: isolate; overflow: hidden; width: 100%;
          height: clamp(265px, 39vw, 590px); background: var(--abyss, #0a121a); color: var(--glacier, #d6eaf2);
          border-top: 1px solid var(--edge, #22404d);
        }
        .halftone-footer canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
        .halftone-footer__top {
          position: relative; z-index: 2; display: flex; justify-content: space-between;
          gap: 1.25rem; align-items: center; padding: clamp(1.25rem, 3vw, 3rem);
          font: 500 clamp(.65rem, 1vw, .78rem)/1.4 var(--font-geist-mono), monospace;
          text-transform: uppercase; letter-spacing: .08em; pointer-events: none;
        }
        .halftone-footer__top button {
          pointer-events: auto; color: inherit; background: transparent;
          border: 0; font: inherit; letter-spacing: inherit; text-transform: inherit;
          cursor: pointer; padding: .4rem 0; border-bottom: 1px solid currentColor;
        }
        .halftone-footer__top button:focus-visible { outline: 2px solid currentColor; outline-offset: 5px; }
        .halftone-footer__sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
        @media (max-width: 600px) {
          .halftone-footer { height: clamp(240px, 76vw, 390px); }
          .halftone-footer__top {
            padding: 1.25rem max(18px, env(safe-area-inset-right)) 0 max(18px, env(safe-area-inset-left));
            gap: 12px;
            font-size: 10px;
            align-items: flex-start;
          }
          .halftone-footer__top > span { max-width: 50%; line-height: 1.6; }
          .halftone-footer__top button {
            min-height: 44px; text-align: right; padding: 6px 0;
          }
          .halftone-footer canvas { touch-action: pan-y; -webkit-tap-highlight-color: transparent; }
        }
        @media (max-width: 360px) {
          .halftone-footer__top { font-size: 9px; }
          .halftone-footer { height: 245px; }
        }
      `}</style>
    </div>
  );
}
