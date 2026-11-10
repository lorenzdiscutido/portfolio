"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface WaterRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  intensity: number;
  hue: "cyan" | "electricBlue" | "indigo";
}

interface FluidCurrentNode {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  radius: number;
  phase: number;
  speed: number;
  freqX: number;
  freqY: number;
  color: string;
}

export default function LiquidBackground() {
  const { resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ripplesRef = useRef<WaterRipple[]>([]);
  const timeScaleRef = useRef<number>(1);
  const isLightRef = useRef<boolean>(resolvedTheme === "light");

  useEffect(() => {
    isLightRef.current = resolvedTheme === "light";
  }, [resolvedTheme]);

  const pointerRef = useRef<{
    x: number;
    y: number;
    lastX: number;
    lastY: number;
    lastTime: number;
    active: boolean;
  }>({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    active: false,
  });

  const spawnFluidDisturbance = (clientX: number, clientY: number) => {
    const p = pointerRef.current;
    const now = performance.now();

    if (!p.active) {
      p.lastX = clientX;
      p.lastY = clientY;
      p.x = clientX;
      p.y = clientY;
      p.lastTime = now;
      p.active = true;
      return;
    }

    const dx = clientX - p.lastX;
    const dy = clientY - p.lastY;
    const dt = Math.max(1, now - p.lastTime);
    const dist = Math.hypot(dx, dy);
    const speed = Math.min(dist / dt, 2.5); // normalized velocity

    // Only spawn when moved sufficiently
    if (dist > 4) {
      const hueType: WaterRipple["hue"] =
        speed > 1.2 ? "cyan" : speed > 0.5 ? "electricBlue" : "indigo";

      ripplesRef.current.push({
        x: clientX,
        y: clientY,
        radius: 4,
        maxRadius: Math.min(220, 50 + speed * 70),
        speed: 1.6 + speed * 1.8,
        intensity: Math.min(0.45, 0.18 + speed * 0.1),
        hue: hueType,
      });

      // Keep ripple array bounded
      if (ripplesRef.current.length > 45) {
        ripplesRef.current.shift();
      }
    }

    p.lastX = clientX;
    p.lastY = clientY;
    p.x = clientX;
    p.y = clientY;
    p.lastTime = now;
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

    const mql =
      typeof window !== "undefined" && typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    let prefersReducedMotion = mql ? mql.matches : false;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        if (animationFrameId) {
          window.cancelAnimationFrame(animationFrameId);
          animationFrameId = 0;
        }
        render();
      } else {
        if (!animationFrameId) {
          animationFrameId = window.requestAnimationFrame(render);
        }
      }
    };
    mql?.addEventListener("change", handleMotionChange);

    // Organic Liquid Swell Nodes
    const createNodes = (w: number, h: number): FluidCurrentNode[] => [
      {
        baseX: w * 0.25,
        baseY: h * 0.28,
        x: w * 0.25,
        y: h * 0.28,
        radius: Math.max(w, h) * 0.42,
        phase: 0,
        speed: 0.0007,
        freqX: 1.1,
        freqY: 0.9,
        color: "electricBlue",
      },
      {
        baseX: w * 0.72,
        baseY: h * 0.65,
        x: w * 0.72,
        y: h * 0.65,
        radius: Math.max(w, h) * 0.46,
        phase: Math.PI * 0.5,
        speed: 0.0006,
        freqX: 0.8,
        freqY: 1.2,
        color: "cyan",
      },
      {
        baseX: w * 0.5,
        baseY: h * 0.45,
        x: w * 0.5,
        y: h * 0.45,
        radius: Math.max(w, h) * 0.38,
        phase: Math.PI,
        speed: 0.0008,
        freqX: 1.3,
        freqY: 0.7,
        color: "indigo",
      },
      {
        baseX: w * 0.82,
        baseY: h * 0.22,
        x: w * 0.82,
        y: h * 0.22,
        radius: Math.max(w, h) * 0.35,
        phase: Math.PI * 1.5,
        speed: 0.0005,
        freqX: 0.9,
        freqY: 1.1,
        color: "electricBlueSecondary",
      },
    ];

    let nodes = createNodes(width, height);

    const resumeLoopIfNeeded = () => {
      if (!animationFrameId && !prefersReducedMotion) {
        animationFrameId = window.requestAnimationFrame(render);
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth || 1280;
      height = canvas.height = window.innerHeight || 800;
      nodes = createNodes(width, height);
      render();
    };

    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!prefersReducedMotion) {
        spawnFluidDisturbance(e.clientX, e.clientY);
        resumeLoopIfNeeded();
      }
    };

    const handleWindowTouchMove = (e: TouchEvent) => {
      if (!prefersReducedMotion && e.touches && e.touches.length > 0) {
        spawnFluidDisturbance(e.touches[0].clientX, e.touches[0].clientY);
        resumeLoopIfNeeded();
      }
    };

    const handleBulletTime = (e: Event) => {
      const custom = e as CustomEvent<{ active?: boolean; timeScale?: number }>;
      if (custom.detail && typeof custom.detail.timeScale === "number") {
        timeScaleRef.current = custom.detail.timeScale;
      } else {
        timeScaleRef.current = custom.detail?.active ? 0.2 : 1;
      }
      resumeLoopIfNeeded();
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });
    window.addEventListener("touchmove", handleWindowTouchMove, { passive: true });
    window.addEventListener("liquid-bullet-time", handleBulletTime);

    let time = 0;

    const render = () => {
      if (!ctx) return;

      const dt = timeScaleRef.current;
      const isLight = isLightRef.current;
      time += 16 * dt;

      ctx.clearRect(0, 0, width, height);

      // 1. Render Organic Ambient Fluid Swells
      ctx.globalCompositeOperation = isLight ? "multiply" : "screen";

      for (const node of nodes) {
        if (!prefersReducedMotion) {
          // Multi-frequency harmonic liquid drift
          const waveX = Math.sin(time * node.speed * node.freqX + node.phase) * (width * 0.08);
          const waveY = Math.cos(time * node.speed * node.freqY + node.phase) * (height * 0.08);
          node.x = node.baseX + waveX;
          node.y = node.baseY + waveY;
        }

        const grad = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          node.radius
        );

        if (isLight) {
          if (node.color === "cyan") {
            grad.addColorStop(0, "rgba(56, 189, 248, 0.16)");
            grad.addColorStop(0.5, "rgba(0, 82, 255, 0.08)");
          } else if (node.color === "electricBlue") {
            grad.addColorStop(0, "rgba(0, 82, 255, 0.15)");
            grad.addColorStop(0.6, "rgba(14, 165, 233, 0.06)");
          } else {
            grad.addColorStop(0, "rgba(99, 102, 241, 0.12)");
            grad.addColorStop(0.5, "rgba(0, 82, 255, 0.05)");
          }
          grad.addColorStop(1, "rgba(248, 250, 252, 0)");
        } else {
          // Dark Mode: Deep, rich bioluminescent liquid radiance
          if (node.color === "cyan") {
            grad.addColorStop(0, "rgba(56, 189, 248, 0.18)");
            grad.addColorStop(0.45, "rgba(0, 82, 255, 0.08)");
          } else if (node.color === "electricBlue") {
            grad.addColorStop(0, "rgba(0, 82, 255, 0.16)");
            grad.addColorStop(0.5, "rgba(30, 58, 138, 0.07)");
          } else {
            grad.addColorStop(0, "rgba(99, 102, 241, 0.14)");
            grad.addColorStop(0.5, "rgba(15, 23, 42, 0.05)");
          }
          grad.addColorStop(1, "rgba(10, 14, 23, 0)");
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Render Interactive Concentric Fluid Ripples & Wave Fronts
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed * dt;
        r.intensity *= Math.pow(0.975, dt);

        if (r.radius >= r.maxRadius || r.intensity < 0.01) {
          ripples.splice(i, 1);
          continue;
        }

        const progress = r.radius / r.maxRadius;
        const waveAlpha = (1 - progress) * r.intensity;

        // A. Primary Water Wave Ring (The Liquid Crest)
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        const strokeColor =
          r.hue === "cyan"
            ? `rgba(56, 189, 248, ${(waveAlpha * 1.5).toFixed(3)})`
            : r.hue === "electricBlue"
            ? `rgba(0, 82, 255, ${(waveAlpha * 1.3).toFixed(3)})`
            : `rgba(99, 102, 241, ${(waveAlpha * 1.1).toFixed(3)})`;

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = Math.max(1, (1 - progress) * 3);
        ctx.stroke();

        // B. Secondary Echo Wave (Refraction ring)
        if (r.radius > 20) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius * 0.65, 0, Math.PI * 2);
          ctx.strokeStyle =
            r.hue === "cyan"
              ? `rgba(56, 189, 248, ${(waveAlpha * 0.7).toFixed(3)})`
              : `rgba(0, 82, 255, ${(waveAlpha * 0.6).toFixed(3)})`;
          ctx.lineWidth = Math.max(0.5, (1 - progress) * 1.8);
          ctx.stroke();
        }

        // C. Ambient Fluid Pool under the ripple
        const poolGrad = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, r.radius);
        poolGrad.addColorStop(
          0,
          r.hue === "cyan"
            ? `rgba(56, 189, 248, ${(waveAlpha * 0.4).toFixed(3)})`
            : `rgba(0, 82, 255, ${(waveAlpha * 0.35).toFixed(3)})`
        );
        poolGrad.addColorStop(0.7, "rgba(0, 82, 255, 0)");
        poolGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = poolGrad;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";

      if (prefersReducedMotion) return;

      // On mobile screens (< 768px), pause continuous RAF when ripples settle to eliminate TBT and preserve battery
      if (width < 768 && ripplesRef.current.length === 0) {
        animationFrameId = 0;
        return;
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    const handleVisibilityChange = () => {
      if (document.hidden || document.visibilityState === "hidden") {
        if (animationFrameId) {
          window.cancelAnimationFrame(animationFrameId);
          animationFrameId = 0;
        }
      } else {
        if (!animationFrameId && !prefersReducedMotion) {
          animationFrameId = window.requestAnimationFrame(render);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Initial render: Paint 1st serene frame immediately, then defer continuous RAF until idle on desktop
    render();
    if (!prefersReducedMotion && width >= 768) {
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        window.requestIdleCallback(() => {
          if (!animationFrameId) {
            animationFrameId = window.requestAnimationFrame(render);
          }
        }, { timeout: 300 });
      } else {
        setTimeout(() => {
          if (!animationFrameId) {
            animationFrameId = window.requestAnimationFrame(render);
          }
        }, 100);
      }
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("touchmove", handleWindowTouchMove);
      window.removeEventListener("liquid-bullet-time", handleBulletTime);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      mql?.removeEventListener("change", handleMotionChange);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      onMouseMove={(e) => spawnFluidDisturbance(e.clientX, e.clientY)}
      className="fixed inset-0 z-[-1] overflow-hidden bg-base pointer-events-none select-none"
    >
      <div className="absolute inset-0 bg-dot-pattern opacity-40" />
      <canvas
        ref={canvasRef}
        data-testid="liquid-canvas"
        className="block w-full h-full"
      />
    </div>
  );
}
