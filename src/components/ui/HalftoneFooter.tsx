"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Dot = { x: number; y: number; homeX: number; homeY: number; vx: number; vy: number; radius: number };

export default function HalftoneFooter({ language }: { language: "fr" | "en" }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mobileWordRef = useRef<HTMLSpanElement>(null);
  const mobileTouchActive = useRef(false);
  const updateMobileSpotlight = useCallback((clientX: number, clientY: number) => {
    const word = mobileWordRef.current;
    if (!word) return;
    const rect = word.getBoundingClientRect();
    word.style.setProperty("--touch-x", `${clientX - rect.left}px`);
    word.style.setProperty("--touch-y", `${clientY - rect.top}px`);
  }, []);
  const [mobileReplay, setMobileReplay] = useState(0);
  const toTop = useCallback(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!root || !canvas || !ctx) return;
    // Mobile uses a lightweight touch-first wordmark instead of the hover canvas.
    if (window.matchMedia("(max-width: 600px)").matches) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    let reduced = motionQuery.matches;
    let finePointer = pointerQuery.matches;
    let visible = true;
    let frame = 0;
    let lastMobileFrame = 0;
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
      maskCtx.clearRect(0, 0, width, height);
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
      lastMobileFrame = 0;
      // Keep readable text as a fallback if Safari fails to produce a glyph mask.
      root!.dataset.dotsReady = "false";
      pointer = null;
      shock = null;
      wake();
    }

    function render(now: number) {
      if (!ctx) return;
      const mobile = width < 600 && !finePointer;
      // Cap continuous mobile animation at 30fps to reduce Safari GPU/CPU load.
      if (mobile && !reduced && now - lastMobileFrame < 32) {
        frame = 0;
        wake();
        return;
      }
      if (mobile) lastMobileFrame = now;
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
        // On touch screens, a gentle traveling wave makes the effect visible even
        // before the user discovers that the letters respond to touch.
        const wave = mobile && !reduced
          ? Math.sin(dot.homeX * 0.027 - now * 0.0017 + dot.homeY * 0.012)
          : 0;
        const drawY = dot.y + wave * (pointer ? 1.4 : 2.6);
        ctx.beginPath();
        ctx.arc(dot.x, drawY, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      if (shock && age >= 850) shock = null;
      // Only hide the accessible fallback after the canvas has actually painted.
      root!.dataset.dotsReady = dots.length > 0 ? "true" : "false";
      frame = 0;
      if (visible && (moving || Boolean(shock) || (mobile && !reduced))) wake();
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
      <span className="halftone-footer__fallback" aria-hidden="true">emma.</span>
      <div className="halftone-footer__top">
        <span>Emma Da Silva <span aria-hidden="true">/</span> {language === "fr" ? "Portfolio" : "Portfolio"}</span>
        <button type="button" onClick={toTop}>
          {language === "fr" ? "Retour en haut" : "Back to top"} <span aria-hidden="true">↗</span>
        </button>
      </div>
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="halftone-footer__mobile">
        <button
          type="button"
          className="halftone-footer__mobile-action"
          aria-label={language === "fr" ? "Animer la signature Emma" : "Animate the Emma signature"}
          onClick={() => setMobileReplay((value) => value + 1)}
          onPointerDown={(event) => {
            if (event.pointerType === "touch" || event.pointerType === "pen") {
              mobileTouchActive.current = true;
              updateMobileSpotlight(event.clientX, event.clientY);
              mobileWordRef.current?.setAttribute("data-touching", "true");
            }
          }}
          onPointerMove={(event) => {
            if (mobileTouchActive.current) updateMobileSpotlight(event.clientX, event.clientY);
          }}
          onPointerUp={() => {
            mobileTouchActive.current = false;
            mobileWordRef.current?.removeAttribute("data-touching");
          }}
          onPointerCancel={() => {
            mobileTouchActive.current = false;
            mobileWordRef.current?.removeAttribute("data-touching");
          }}
        >
          <span ref={mobileWordRef} className="halftone-footer__mobile-word" key={mobileReplay} aria-hidden="true">
            {Array.from("emma.").map((letter, index) => (
              <span key={index} className="halftone-footer__mobile-letter" style={{ animationDelay: `${index * 90}ms` }}>{letter}</span>
            ))}
          </span>
        </button>
        <span className="halftone-footer__mobile-hint">{language === "fr" ? "Touchez pour animer ↗" : "Tap to animate ↗"}</span>
      </div>
      <span className="halftone-footer__sr">Emma Da Silva</span>
      <style>{`
        .halftone-footer {
          position: relative; isolation: isolate; overflow: hidden; width: 100%;
          height: clamp(265px, 39vw, 590px); background: var(--abyss, #0a121a); color: var(--glacier, #d6eaf2);
          border-top: 1px solid var(--edge, #22404d);
        }
        .halftone-footer canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
        .halftone-footer__mobile { display: none; }
        .halftone-footer__fallback {
          position: absolute; z-index: 1; left: 3%; right: 3%; bottom: 12%;
          font: 900 clamp(75px, 21vw, 320px)/.85 Arial, Helvetica, sans-serif;
          text-align: center; letter-spacing: -.07em; color: var(--glacier, #d6eaf2);
          pointer-events: none;
        }
        .halftone-footer[data-dots-ready="true"] .halftone-footer__fallback { visibility: hidden; }
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
          .halftone-footer canvas, .halftone-footer__fallback { display: none; }
          .halftone-footer__mobile {
            position: absolute; inset: 76px 0 8px; display: flex;
            flex-direction: column; align-items: center; justify-content: center;
            gap: 18px; padding: 0 12px;
          }
          .halftone-footer__mobile-action {
            display: block; width: 100%; min-height: 128px; padding: 0;
            border: 0; background: none; color: var(--glacier, #d6eaf2);
            touch-action: manipulation; -webkit-tap-highlight-color: transparent;
          }
          .halftone-footer__mobile-word {
            display: flex; justify-content: center; align-items: baseline;
            width: 100%; font: 900 clamp(64px, 21vw, 136px)/1 Arial, Helvetica, sans-serif;
            letter-spacing: -.08em;
            --touch-x: 50%; --touch-y: 50%;
            background: radial-gradient(circle 85px at var(--touch-x) var(--touch-y), #ffffff 0%, #9fc8d9 46%, #d6eaf2 100%);
            -webkit-background-clip: text; background-clip: text;
            transition: filter .25s ease;
          }
          .halftone-footer__mobile-word[data-touching="true"] {
            filter: drop-shadow(0 0 12px rgba(159, 200, 217, .45));
          }
          .halftone-footer__mobile-letter {
            display: inline-block; transform-origin: 50% 85%;
            animation: mobile-signature-bounce 850ms cubic-bezier(.16,1,.3,1) both;
          }
          .halftone-footer__mobile-letter:last-child { color: var(--ice, #5d8fa6); }
          .halftone-footer__mobile-word[data-touching="true"] .halftone-footer__mobile-letter {
            text-shadow: 0 0 22px rgba(159,200,217,.35);
          }
          .halftone-footer__mobile-hint {
            font: 500 10px/1.5 var(--font-geist-mono), monospace;
            letter-spacing: .14em; text-transform: uppercase;
            color: var(--frost, #9fc8d9); pointer-events: none;
          }
          .halftone-footer__fallback {
            bottom: 22%; font-size: clamp(66px, 21vw, 128px); letter-spacing: -.065em;
          }
          /* Safari-safe animated halftone when Canvas has not successfully painted.
             Unlike a solid wordmark, this remains visibly animated without JS. */
          @supports (-webkit-background-clip: text) {
            .halftone-footer:not([data-dots-ready="true"]) .halftone-footer__fallback {
              color: transparent;
              -webkit-text-fill-color: transparent;
              background-image: radial-gradient(circle, #d6eaf2 1.8px, transparent 2.1px);
              background-size: 7px 7px;
              background-position: 0 0;
              -webkit-background-clip: text;
              background-clip: text;
              animation: halftone-mobile-flow 3.2s linear infinite;
              will-change: background-position;
            }
          }
        }
        @keyframes mobile-signature-bounce {
          0% { opacity: .2; transform: translateY(30px) rotate(-7deg) scale(.83); filter: blur(4px); }
          55% { opacity: 1; transform: translateY(-12px) rotate(2deg) scale(1.08); filter: blur(0); }
          100% { opacity: 1; transform: translateY(0) rotate(0) scale(1); filter: blur(0); }
        }
        @keyframes halftone-mobile-flow {
          from { background-position: 0 0; }
          to { background-position: 28px -21px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .halftone-footer__fallback, .halftone-footer__mobile-letter { animation: none !important; }
          .halftone-footer__mobile-letter { opacity: 1; transform: none; filter: none; }
        }
        @media (max-width: 360px) {
          .halftone-footer__top { font-size: 9px; }
          .halftone-footer { height: 245px; }
        }
      `}</style>
    </div>
  );
}
