# Design System & Token Specification: Stealth Terminal CLI

## 1. Visual Philosophy: "Stealth Terminal CLI"
The design language reflects a zero-trust network console and high-reliability industrial hardware dashboard:
- **High Contrast**: Clean delineation between background, elevated surfaces, and interactive elements.
- **Intentional Accents**: Color is reserved strictly for status, telemetry, and primary actions.
- **Anti-Slop Directives**: No purple gradients, no nested card madness, no emoji buttons, no bouncy elastic easing, no text clipping.

## 2. Color Palette & Semantic Tokens

### Ground & Surfaces
- **Ground / Base (Dark)**: `#0f1115` (`--base: 15 17 21`) — Deep slate-black canvas.
- **Elevated Surface (Cards / Panels)**: `#1e2128` (`--surface: 30 33 40`) — Clean dark slate container with subtle 1px border.
- **Ground / Base (Light)**: `#ffffff` (`--base: 255 255 255`)
- **Elevated Surface (Light)**: `#f8fafc` (`--surface: 248 250 252`)

### Typography
- **Primary Text (Dark)**: `#f8fafc` (`text-slate-100` / `theme-text-primary`) — Crisp white-slate.
- **Secondary Text (Dark)**: `#cbd5e1` (`text-slate-300` / `theme-text-secondary`) — High contrast readability.
- **Muted / Subtitle (Dark)**: `#94a3b8` (`text-slate-400` / `--muted: 148 163 184`)
- **Primary Text (Light)**: `#0f172a` (`text-slate-900`)
- **Secondary Text (Light)**: `#334155` (`text-slate-700`)

### Interactive Accents
- **Industrial Orange**: `#FF7A00` (`--orange: 255 122 0`, `text-orange`, `bg-orange`)
  - Semantic use: Hardware status, terminal prompt (`>`), primary action triggers, telemetry interlocks.
- **Electric Blue**: `#0052FF` (`--blue: 0 82 255`, `text-blue-600 dark:text-blue-400`, `bg-blue-600`)
  - Semantic use: Active states, network links, data stream indicators, bash shell badges.
- **Telemetry Emerald**: `#10b981` / `#34d399` (`text-emerald-500`, `bg-emerald-400`)
  - Semantic use: Online status, 0ms latency, active heartbeat.

## 3. Typography & Hierarchy
- **Font Stack**:
  - Headings & Body: Inter / System UI (`font-sans`)
  - Code, Commands & Tags: JetBrains Mono / SF Mono / Consolas (`font-mono`)
- **Hierarchy**:
  - Hero `H1`: `text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]`
  - Role Sub-headline: `text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-orange`
  - Section Headings: `text-2xl sm:text-3xl font-extrabold tracking-tight`
  - Body Text: `text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl`
  - Tech Tags & Badges: `text-xs font-mono font-semibold px-2.5 py-1`

## 4. Interaction & Accessibility Standards (WCAG 2.1 AA / AAA)
- **Minimum Touch Target**: 44x44px across all mobile buttons, links, toggles, and drawer controls.
- **Focus Rings**: `focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none` for full keyboard accessibility.
- **Transitions**: 150ms-250ms `ease-out` on transforms, opacity, and border colors. Never use bounce or elastic easing.
- **Responsiveness**: Zero horizontal overflow on any viewport width from 320px up to 4K ultra-wide (`w-full overflow-x-hidden`).
- **Icons**: Crisp SVG icons with explicit `aria-hidden="true"`; buttons have explicit `aria-label` and `aria-expanded` attributes.
