"use client";

import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { useEffect, useMemo, useRef, useState } from "react";

interface LiquidMetalButtonProps {
  label?: string;
  href: string;
}

export function LiquidMetalButton({
  label = "Drop me an email!",
  href,
}: LiquidMetalButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const shaderRef = useRef<HTMLDivElement>(null);
  const shaderMount = useRef<any>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const rippleId = useRef(0);

  const dimensions = useMemo(
    () => ({
      width: 168,
      height: 50,
      innerWidth: 164,
      innerHeight: 46,
      shaderWidth: 168,
      shaderHeight: 50,
    }),
    [],
  );

  useEffect(() => {
    const styleId = "liquid-metal-button-canvas";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .liquid-metal-shader canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          inset: 0 !important;
          border-radius: 100px !important;
        }

        @keyframes liquid-metal-ripple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    if (shaderRef.current) {
      shaderMount.current?.destroy?.();

      shaderMount.current = new ShaderMount(
        shaderRef.current,
        liquidMetalFragmentShader,
        {
          u_repetition: 4,
          u_softness: 0.5,
          u_shiftRed: 0.3,
          u_shiftBlue: 0.3,
          u_distortion: 0,
          u_contour: 0,
          u_angle: 45,
          u_scale: 8,
          u_shape: 1,
          u_offsetX: 0.1,
          u_offsetY: -0.1,
        },
        undefined,
        0.6,
      );
    }

    return () => {
      shaderMount.current?.destroy?.();
      shaderMount.current = null;
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    shaderMount.current?.setSpeed?.(1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    shaderMount.current?.setSpeed?.(0.6);
  };

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    shaderMount.current?.setSpeed?.(2.4);

    setTimeout(() => {
      shaderMount.current?.setSpeed?.(isHovered ? 1 : 0.6);
    }, 300);

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const ripple = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        id: rippleId.current++,
      };

      setRipples((current) => [...current, ripple]);
      setTimeout(() => {
        setRipples((current) => current.filter((item) => item.id !== ripple.id));
      }, 600);
    }
  };

  return (
    <div className="liquid-metal-wrap">
      <div
        className="liquid-metal-stage"
        style={{
          width: dimensions.width,
          height: dimensions.height,
        }}
      >
        <div className="liquid-metal-label">{label}</div>

        <div
          className="liquid-metal-inner"
          style={{
            width: dimensions.innerWidth,
            height: dimensions.innerHeight,
          }}
        />

        <div
          className="liquid-metal-surface"
          style={{
            width: dimensions.width,
            height: dimensions.height,
          }}
        >
          <div
            ref={shaderRef}
            className="liquid-metal-shader"
            style={{
              width: dimensions.shaderWidth,
              height: dimensions.shaderHeight,
            }}
          />
        </div>

        <a
          ref={buttonRef}
          className="liquid-metal-hit"
          href={href}
          aria-label={label}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          style={{
            width: dimensions.width,
            height: dimensions.height,
            transform: isPressed
              ? "translateZ(25px) translateY(1px) scale(0.98)"
              : "translateZ(25px)",
          }}
        >
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="liquid-metal-ripple"
              style={{
                left: ripple.x,
                top: ripple.y,
              }}
            />
          ))}
        </a>
      </div>
    </div>
  );
}
