"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface FluidRipple {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  hueType: "electricBlue" | "vibrantOrange" | "stealthSlate";
}

interface AmbientWaveNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  colorType: "electricBlue" | "ambientSlate" | "electricBlueSecondary" | "vibrantOrange";
}

export default function LiquidBackground() {
  const { resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ripplesRef = useRef<FluidRipple[]>([]);
  const timeScaleRef = useRef<number>(1);
  const isLightRef = useRef<boolean>(resolvedTheme === "light");

  useEffect(() => {
    isLightRef.current = resolvedTheme === "light";
  }, [resolvedTheme]);

  const pointerRef = useRef<{ x: number; y: number; lastX: number; lastY: number; active: boolean }>({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
    active: false,
  });

  const spawnRipple = (clientX: number, clientY: number) => {
    const p = pointerRef.current;
    const dx = clientX - p.lastX;
    const dy = clientY - p.lastY;
    const speed = Math.min(Math.hypot(dx, dy), 60);

    p.lastX = clientX;
    p.lastY = clientY;
    p.x = clientX;
    p.y = clientY;
    p.active = true;

    const palette: FluidRipple["hueType"][] = ["electricBlue", "stealthSlate", "electricBlue"];
    const hueType = speed > 24 ? "vibrantOrange" : speed > 12 ? "electricBlue" : palette[ripplesRef.current.length % 3];

    ripplesRef.current.push({
      x: clientX,
      y: clientY,
      vx: dx * 0.12,
      vy: dy * 0.12,
      radius: 18 + speed * 0.6,
      maxRadius: 160 + speed * 2.2,
      alpha: Math.min(0.25, 0.08 + speed * 0.003),
      hueType,
    });

    if (ripplesRef.current.length > 32) {
      ripplesRef.current.shift();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext("2d");
    } catch {
      ctx = null;
    }
    if (!ctx) return;

    let animationFrameId = 0;
    let width = (canvas.width = window.innerWidth || 1280);
    let height = (canvas.height = window.innerHeight || 800);

    const nodes: AmbientWaveNode[] = [
      {
        x: width * 0.2,
        y: height * 0.25,
        vx: 0.35,
        vy: 0.22,
        radius: Math.max(width, height) * 0.38,
        colorType: "electricBlue",
      },
      {
        x: width * 0.78,
        y: height * 0.68,
        vx: -0.28,
        vy: -0.25,
        radius: Math.max(width, height) * 0.42,
        colorType: "ambientSlate",
      },
      {
        x: width * 0.52,
        y: height * 0.45,
        vx: -0.2,
        vy: 0.3,
        radius: Math.max(width, height) * 0.32,
        colorType: "electricBlueSecondary",
      },
      {
        x: width * 0.35,
        y: height * 0.75,
        vx: 0.25,
        vy: -0.18,
        radius: Math.max(width, height) * 0.3,
        colorType: "vibrantOrange",
      },
    ];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth || 1280;
      height = canvas.height = window.innerHeight || 800;
    };

    const handleWindowMouseMove = (e: MouseEvent) => {
      spawnRipple(e.clientX, e.clientY);
    };

    const handleWindowTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        spawnRipple(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleBulletTime = (e: Event) => {
      const custom = e as CustomEvent<{ active?: boolean; timeScale?: number }>;
      if (custom.detail && typeof custom.detail.timeScale === "number") {
        timeScaleRef.current = custom.detail.timeScale;
      } else {
        timeScaleRef.current = custom.detail?.active ? 0.15 : 1;
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });
    window.addEventListener("touchmove", handleWindowTouchMove, { passive: true });
    window.addEventListener("liquid-bullet-time", handleBulletTime);

    const getNodeColor = (colorType: AmbientWaveNode["colorType"], isLight: boolean) => {
      if (isLight) {
        switch (colorType) {
          case "electricBlue":
            return "rgba(0, 82, 255, 0.18)";
          case "ambientSlate":
            return "rgba(100, 116, 139, 0.22)";
          case "electricBlueSecondary":
            return "rgba(0, 82, 255, 0.12)";
          case "vibrantOrange":
            return "rgba(255, 122, 0, 0.14)";
          default:
            return "rgba(0, 82, 255, 0.15)";
        }
      } else {
        switch (colorType) {
          case "electricBlue":
            return "rgba(0, 82, 255, 0.08)";
          case "ambientSlate":
            return "rgba(30, 33, 40, 0.45)";
          case "electricBlueSecondary":
            return "rgba(0, 82, 255, 0.05)";
          case "vibrantOrange":
            return "rgba(255, 122, 0, 0.03)";
          default:
            return "rgba(0, 82, 255, 0.06)";
        }
      }
    };

    const getRippleColor = (hueType: FluidRipple["hueType"], alpha: number, isLight: boolean) => {
      if (isLight) {
        const boosted = Math.min(0.65, alpha * 2.2);
        if (hueType === "vibrantOrange") return `rgba(255, 122, 0, ${boosted.toFixed(3)})`;
        if (hueType === "stealthSlate") return `rgba(100, 116, 139, ${boosted.toFixed(3)})`;
        return `rgba(0, 82, 255, ${boosted.toFixed(3)})`;
      } else {
        if (hueType === "vibrantOrange") return `rgba(255, 122, 0, ${alpha.toFixed(3)})`;
        if (hueType === "stealthSlate") return `rgba(30, 33, 40, ${alpha.toFixed(3)})`;
        return `rgba(0, 82, 255, ${alpha.toFixed(3)})`;
      }
    };

    const render = () => {
      if (!ctx) return;

      const dt = timeScaleRef.current;
      const isLight = isLightRef.current;
      const fadeColor = isLight ? "rgba(248, 250, 252, 0)" : "rgba(15, 17, 21, 0)";

      ctx.clearRect(0, 0, width, height);

      // Ambient autonomous fluid currents (modulated by bullet-time scale & theme mode)
      for (const node of nodes) {
        node.x += node.vx * dt;
        node.y += node.vy * dt;

        if (node.x < -node.radius * 0.3 || node.x > width + node.radius * 0.3) node.vx *= -1;
        if (node.y < -node.radius * 0.3 || node.y > height + node.radius * 0.3) node.vy *= -1;

        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius);
        grad.addColorStop(0, getNodeColor(node.colorType, isLight));
        grad.addColorStop(1, fadeColor);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Interactive cursor fluid wakes & ripples
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.x += r.vx * dt;
        r.y += r.vy * dt;
        r.vx *= 1 - 0.06 * dt;
        r.vy *= 1 - 0.06 * dt;
        r.radius += (r.maxRadius - r.radius) * 0.06 * dt;
        r.alpha *= 1 - 0.04 * dt;

        if (r.alpha <= 0.004) {
          ripples.splice(i, 1);
          continue;
        }

        const grad = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, r.radius);
        grad.addColorStop(0, getRippleColor(r.hueType, r.alpha, isLight));
        grad.addColorStop(0.55, getRippleColor(r.hueType, r.alpha * 0.4, isLight));
        grad.addColorStop(1, fadeColor);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("touchmove", handleWindowTouchMove);
      window.removeEventListener("liquid-bullet-time", handleBulletTime);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      onMouseMove={(e) => spawnRipple(e.clientX, e.clientY)}
      className="fixed inset-0 z-[-1] overflow-hidden bg-base pointer-events-none select-none"
    >
      <div className="absolute inset-0 bg-dot-pattern opacity-70" />
      <canvas
        ref={canvasRef}
        data-testid="liquid-canvas"
        className="block w-full h-full"
      />
    </div>
  );
}
