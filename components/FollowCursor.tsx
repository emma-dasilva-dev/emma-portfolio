'use client';

import { useEffect } from 'react';

const RADIUS = 10;
const COLOR = '#323232a6';
const LAG = 10;

export default function FollowCursor() {
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let stop: (() => void) | null = null;

    const start = () => {
      const canvas = document.createElement('canvas');
      canvas.className = 'follow-cursor';
      canvas.setAttribute('aria-hidden', 'true');
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      document.body.appendChild(canvas);

      const cursor = { x: 0, y: 0 };
      const position = { x: 0, y: 0 };
      let hasPointer = false;
      let frame = 0;

      const resize = () => {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      const onMouseMove = (e: MouseEvent) => {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
        if (!hasPointer) {
          // Start at the pointer instead of sliding in from the corner.
          position.x = cursor.x;
          position.y = cursor.y;
          hasPointer = true;
        }
      };

      const render = () => {
        position.x += (cursor.x - position.x) / LAG;
        position.y += (cursor.y - position.y) / LAG;

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        if (hasPointer) {
          ctx.beginPath();
          ctx.arc(position.x, position.y, RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = COLOR;
          ctx.fill();
        }
        frame = requestAnimationFrame(render);
      };

      resize();
      window.addEventListener('resize', resize);
      window.addEventListener('mousemove', onMouseMove);
      frame = requestAnimationFrame(render);

      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener('resize', resize);
        window.removeEventListener('mousemove', onMouseMove);
        canvas.remove();
      };
    };

    const sync = () => {
      stop?.();
      stop = motionQuery.matches ? null : start();
    };

    sync();
    motionQuery.addEventListener('change', sync);

    return () => {
      motionQuery.removeEventListener('change', sync);
      stop?.();
    };
  }, []);

  return null;
}
