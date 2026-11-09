# Design System & Token Specification: Calm Before the Storm (Fluid & Disruptive)

## 1. Visual Philosophy: "Calm Before the Storm"
A deeply modern, relaxed, and cool atmosphere (Midnight Blue to Oceanic Slate with frosted glassmorphism over an interactive fluid simulation) intentionally interrupted by a violently striking, high-energy disruptive accent.

## 2. Color Palette & Semantic Tokens

### Cool & Relaxed Base
- **Midnight Base (`--base`)**: `#0a0f1c` (`10 15 28`) — Deep Midnight Blue ground canvas.
- **Oceanic Surface (`--surface`)**: `#111827` (`17 24 39`) — Oceanic Slate elevated surface.
- **Frosted Glass Surface**: `bg-white/[0.04]` to `bg-white/[0.08]` with `backdrop-blur-md` / `backdrop-blur-xl` and `border-white/10`.

### Typography
- **Primary Text (`--primary`)**: `#f8fafc` (`248 250 252`) — Frosty White (>15:1 contrast over `#0a0f1c`).
- **Secondary Text (`--muted`)**: `#94a3b8` (`148 163 184`) — Muted Cool Gray (>7:1 contrast over `#0a0f1c`).

### The Disruptive Accents
- **Electric Chartreuse (`--accent` / `chartreuse`)**: `#CCFF00` (`204 255 0`)
  - Primary high-energy disruptive accent for primary CTA buttons (16.8:1 AAA contrast with `#0a0f1c` text), active states, and custom cursor core.
- **Hyper-Neon Pink (`--neon-pink` / `neonPink`)**: `#FF007F` (`255 0 127`)
  - Secondary disruptive energy accent used in fluid velocity wakes, active telemetry highlights, and cursor ring pulse.
- **Deep Cyber Blue (`--blue`)**: `#0052FF` (`0 82 255`)
  - Ambient fluid currents and network topology links.

## 3. Component & Motion Architecture
- **Interactive Liquid Background (`LiquidBackground.tsx`)**:
  - Fixed viewport-filling HTML5 Canvas (`z-[-1]`, `pointer-events-none`) running a 60fps interactive fluid wave & vortex solver that reacts to `mousemove` and `touchmove` with ripples and disruptive color wakes.
- **Physics-Based Magnetic Interactions (`MagneticButton.tsx`)**:
  - Spring-driven magnetic pull (`stiffness: 180, damping: 15`) toward cursor position on desktop viewports.
- **Custom Cursor (`CustomCursor.tsx`)**:
  - Replaces default OS cursor on fine-pointer devices with an Electric Chartreuse dot and a spring-physics Neon Pink / Chartreuse translucent expansion ring on interactive targets.
- **Floating Pill Glass NavBar & Slide-In Mobile Drawer (`NavBar.tsx`)**:
  - Pill-shaped frosted glass header (`backdrop-blur-xl bg-[#0a0f1c]/75 border-white/10 rounded-full`).
  - Side slide-in mobile drawer (`backdrop-blur-2xl bg-[#0a0f1c]/90`) with zero horizontal overflow.

## 4. Accessibility & Quality Constraints
- **Zero Layout Shift / Overflow**: Canvas is strictly viewport-bound (`fixed inset-0 overflow-hidden`); `html, body` enforce `overflow-x: clip`.
- **WCAG Contrast Compliance**: All text over glassmorphism layers maintains a dark translucent backing (`#0a0f1c/75+`) guaranteeing >= 7:1 AA/AAA readability.
- **Touch & Reduced Motion**: Custom cursor and magnetic pulls auto-disable on coarse pointers (touchscreens) and respect `prefers-reduced-motion`.
