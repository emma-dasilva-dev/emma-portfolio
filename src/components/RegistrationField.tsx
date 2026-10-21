"use client";

import { useEffect, useRef } from "react";

type Mark = { x: number; y: number; energy: number };

const INK = [233, 228, 218];
const ACCENT = [233, 118, 43];
const REACH = 210;

/**
 * A drafting-sheet grid of registration marks behind the hero. Near a fine
 * pointer the marks grow, turn and warm toward the accent, and the cursor
 * gets a small coordinate readout. Touch and reduced-motion get the still grid.
 */
export default function RegistrationField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fineQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const mono = getComputedStyle(document.documentElement).getPropertyValue("--font-mono").trim() || "monospace";
    let marks: Mark[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let visible = true;
    let pointer: { x: number; y: number } | null = null;
    let fade = 0;

    function layout() {
      const rect = canvas!.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      const step = width < 720 ? 48 : 64;
      const offsetX = (width % step) / 2;
      const offsetY = (height % step) / 2;
      const previous = new Map(marks.map((m) => [`${m.x},${m.y}`, m.energy]));
      marks = [];
      for (let y = offsetY; y <= height; y += step) {
        for (let x = offsetX; x <= width; x += step) {
          marks.push({ x, y, energy: previous.get(`${x},${y}`) ?? 0 });
        }
      }
      draw();
    }

    function draw() {
      frame = 0;
      const active = Boolean(pointer) && fineQuery.matches && !reducedQuery.matches;
      fade += ((active ? 1 : 0) - fade) * 0.14;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, width, height);
      ctx!.lineWidth = 1;
      let settling = Math.abs((active ? 1 : 0) - fade) > 0.01;

      for (const mark of marks) {
        let target = 0;
        if (active && pointer) {
          const d = Math.hypot(mark.x - pointer.x, mark.y - pointer.y);
          target = Math.max(0, 1 - d / REACH);
          target *= target;
        }
        mark.energy += (target - mark.energy) * 0.16;
        if (Math.abs(target - mark.energy) > 0.002) settling = true;

        const e = mark.energy;
        const arm = 3.5 + e * 7;
        const angle = e * Math.PI * 0.25;
        const r = Math.round(INK[0] + (ACCENT[0] - INK[0]) * e);
        const g = Math.round(INK[1] + (ACCENT[1] - INK[1]) * e);
        const b = Math.round(INK[2] + (ACCENT[2] - INK[2]) * e);
        ctx!.strokeStyle = `rgba(${r},${g},${b},${0.16 + e * 0.7})`;
        const cos = Math.cos(angle) * arm;
        const sin = Math.sin(angle) * arm;
        ctx!.beginPath();
        ctx!.moveTo(mark.x - cos, mark.y - sin);
        ctx!.lineTo(mark.x + cos, mark.y + sin);
        ctx!.moveTo(mark.x + sin, mark.y - cos);
        ctx!.lineTo(mark.x - sin, mark.y + cos);
        ctx!.stroke();
      }

      if (pointer && fade > 0.02) {
        const { x, y } = pointer;
        ctx!.globalAlpha = fade;
        ctx!.strokeStyle = "rgba(233,118,43,0.55)";
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, height);
        ctx!.moveTo(0, y);
        ctx!.lineTo(width, y);
        ctx!.setLineDash([2, 5]);
        ctx!.globalAlpha = fade * 0.35;
        ctx!.stroke();
        ctx!.setLineDash([]);
        ctx!.globalAlpha = fade;
        ctx!.fillStyle = "rgba(233,228,218,0.72)";
        ctx!.font = `10px ${mono}`;
        const text = `X ${String(Math.round(x)).padStart(4, "0")}  Y ${String(Math.round(y)).padStart(4, "0")}`;
        const flip = x > width - 150;
        ctx!.textAlign = flip ? "right" : "left";
        ctx!.fillText(text, x + (flip ? -14 : 14), y - 12);
        ctx!.globalAlpha = 1;
      }

      if (settling && visible) frame = requestAnimationFrame(draw);
    }

    const wake = () => {
      if (!frame && visible) frame = requestAnimationFrame(draw);
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = canvas!.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      if (pointer.y < 0 || pointer.y > height) pointer = null;
      wake();
    };
    const onLeave = () => {
      pointer = null;
      wake();
    };

    const host = canvas.parentElement ?? canvas;
    const resize = new ResizeObserver(layout);
    const io = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) wake();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    resize.observe(canvas);
    io.observe(canvas);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    reducedQuery.addEventListener("change", wake);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      reducedQuery.removeEventListener("change", wake);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
