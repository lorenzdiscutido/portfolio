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
    if (!p.active) {
      p.lastX = clientX;
      p.lastY = clientY;
      p.x = clientX;
      p.y = clientY;
      p.active = true;
      return;
    }

    const dx = clientX - p.lastX;
    const dy = clientY - p.lastY;
    const distance = Math.hypot(dx, dy);
    const speed = Math.min(distance, 60);

    const steps = Math.min(Math.max(1, Math.floor(distance / 5)), 60); // Spawn a particle every 5px
    const palette: FluidRipple["hueType"][] = ["electricBlue", "stealthSlate", "electricBlue"];
    const hueType = speed > 24 ? "vibrantOrange" : speed > 12 ? "electricBlue" : palette[ripplesRef.current.length % 3];

    for (let i = 0; i < steps; i++) {
      const interpX = p.lastX + (dx * (i / steps));
      const interpY = p.lastY + (dy * (i / steps));

      ripplesRef.current.push({
        x: interpX,
        y: interpY,
        vx: dx * 0.12,
        vy: dy * 0.12,
        radius: 8 + speed * 0.3,
        maxRadius: 60 + speed * 1.5,
        alpha: Math.min(0.15, 0.05 + speed * 0.002),
        hueType,
      });

      if (ripplesRef.current.length > 180) {
        ripplesRef.current.shift();
      }
    }

    p.lastX = clientX;
    p.lastY = clientY;
    p.x = clientX;
    p.y = clientY;
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

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const nodes: AmbientWaveNode[] = [
      {
        x: width * 0.2,
        y: height * 0.25,
        vx: prefersReducedMotion ? 0 : 0.35,
        vy: prefersReducedMotion ? 0 : 0.22,
        radius: Math.max(width, height) * 0.38,
        colorType: "electricBlue",
      },
      {
        x: width * 0.78,
        y: height * 0.68,
        vx: prefersReducedMotion ? 0 : -0.28,
        vy: prefersReducedMotion ? 0 : -0.25,
        radius: Math.max(width, height) * 0.42,
        colorType: "ambientSlate",
      },
      {
        x: width * 0.52,
        y: height * 0.45,
        vx: prefersReducedMotion ? 0 : -0.2,
        vy: prefersReducedMotion ? 0 : 0.3,
        radius: Math.max(width, height) * 0.32,
        colorType: "electricBlueSecondary",
      },
      {
        x: width * 0.35,
        y: height * 0.75,
        vx: prefersReducedMotion ? 0 : 0.25,
        vy: prefersReducedMotion ? 0 : -0.18,
        radius: Math.max(width, height) * 0.3,
        colorType: "vibrantOrange",
      },
    ];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth || 1280;
      height = canvas.height = window.innerHeight || 800;
    };

    let isIdle = false;
    let lastActivityTime = Date.now();

    const wakeAnimation = () => {
      lastActivityTime = Date.now();
      if (isIdle && !document.hidden && !prefersReducedMotion) {
        isIdle = false;
        animationFrameId = window.requestAnimationFrame(render);
      }
    };

    const handleWindowMouseMove = (e: MouseEvent) => {
      wakeAnimation();
      if (!prefersReducedMotion) {
        spawnRipple(e.clientX, e.clientY);
      }
    };

    const handleWindowTouchMove = (e: TouchEvent) => {
      wakeAnimation();
      if (!prefersReducedMotion && e.touches && e.touches.length > 0) {
        spawnRipple(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleBulletTime = (e: Event) => {
      wakeAnimation();
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
        if (!prefersReducedMotion) {
          node.x += node.vx * dt;
          node.y += node.vy * dt;

          if (node.x < -node.radius * 0.3 || node.x > width + node.radius * 0.3) node.vx *= -1;
          if (node.y < -node.radius * 0.3 || node.y > height + node.radius * 0.3) node.vy *= -1;
        }

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
      ctx.globalCompositeOperation = isLight ? "multiply" : "screen";
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.x += r.vx * dt;
        r.y += r.vy * dt;
        r.vx *= 1 - 0.06 * dt;
        r.vy *= 1 - 0.06 * dt;
        r.radius += 0.5 * dt;
        r.alpha -= 0.003 * dt;

        if (r.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        const grad = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, r.radius);
        grad.addColorStop(0, getRippleColor(r.hueType, r.alpha, isLight));
        grad.addColorStop(0.4, getRippleColor(r.hueType, r.alpha * 0.5, isLight));
        grad.addColorStop(1, isLight ? "rgba(255, 255, 255, 0)" : "rgba(0, 0, 0, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      // Prefers-reduced-motion: draw once, no animation frame loop
      if (prefersReducedMotion) {
        return;
      }

      // 3-Second Idle Pause: If no interaction occurs and all ripples have faded, pause loop to save battery
      const now = Date.now();
      if (now - lastActivityTime > 3000 && ripples.length === 0) {
        isIdle = true;
        animationFrameId = 0;
        return;
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameId) {
          window.cancelAnimationFrame(animationFrameId);
          animationFrameId = 0;
        }
      } else {
        if (!animationFrameId) {
          animationFrameId = window.requestAnimationFrame(render);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("touchmove", handleWindowTouchMove);
      window.removeEventListener("liquid-bullet-time", handleBulletTime);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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
