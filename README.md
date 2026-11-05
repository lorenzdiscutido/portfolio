# Jose Lorenzo Discutido - Engineering Portfolio

Personal portfolio for a Digital Data & Systems Engineer and AI/IoT Data Officer, built with the Next.js App Router and deployed on Vercel.

Live site: https://portfolio-eosin-xi-16.vercel.app

## Features

- Landing page: hero, about, experience, projects, personal workspace, footer
- Deep-dive case study pages (`/projects/[slug]`)
- Technical blog (`/blog`, `/blog/[slug]`)
- Dynamic PDF resume generator
- Dark/light theme toggle
- Interactive terminal easter egg (press `` Ctrl + ` ``)
- Contact form backed by `/api/contact`
- SEO: Open Graph image, sitemap, robots
- Vercel Analytics and Speed Insights

## Tech stack

Next.js 16, React 19, TypeScript, Tailwind CSS 3, next-themes, @react-pdf/renderer, Resend, Jest + Testing Library, GitHub Actions.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest in watch mode |
| `npm run test:ci` | Run Jest once (used by CI) |

## Environment variables

All are optional. Set them in `.env.local` for local work and in the Vercel dashboard for production.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata, sitemap and robots. Defaults to the Vercel URL; set it to the custom domain once configured. |
| `RESEND_API_KEY` | Delivers contact form messages through Resend. |
| `WEB3FORMS_ACCESS_KEY` | Fallback delivery through Web3Forms when Resend is not configured. |

If neither delivery key is set, contact submissions are only written to the server logs.

## Project structure

```
app/            Routes, layout, API route, sitemap, robots, OG image
components/     UI components (Hero, About, Projects, Terminal, ...)
lib/            Site config plus blog and case study data
__tests__/      Jest tests
.github/        CI workflow (runs tests on push and pull requests to main)
```

Blog posts live in `lib/blogData.ts` and case studies in `lib/caseStudyData.ts`.

## Roadmap

See `MASTER_PLAYBOOK.md` for module status. Remaining item: custom domain setup (Vercel Domains plus DNS records).
# Jose Lorenzo Discutido – Systems Engineering Portfolio

A modern, high-performance web portfolio built to showcase end-to-end software architecture, hardware integrations, and enterprise cloud workflows. 

Designed and engineered from the ground up using **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

## 🏗 System Architecture & Stack

*   **Framework:** Next.js 14 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS (Custom Dark/Light CSS Variables)
*   **Animations:** Framer Motion (Scroll reveals & micro-interactions)
*   **Testing:** Jest & React Testing Library
*   **CI/CD:** GitHub Actions (Automated testing on `main` pushes)
*   **Deployment & Analytics:** Vercel, Vercel Web Analytics, Speed Insights

## ⚡ Core Features

*   **Asymmetrical UI & Typography:** Custom design system utilizing Slate, Blue (`#0052FF`), and Orange (`#FF7A00`) palettes, strictly avoiding generic AI symmetries.
*   **Interactive Tech Stack:** Built-in contextual tooltips detailing real-world engineering implementations (e.g., master-master Tailscale DB networks, Microsoft Entra ID deployments, Solenoid relay integrations).
*   **Dynamic Case Studies:** Dynamic routing system (`/projects/[slug]`) mapping out system architecture diagrams, tech stacks, and outcome metrics.
*   **Hidden Terminal Subsystem:** An interactive command-line interface built in React state. *(Hint: press `Ctrl + \``).*
*   **Client-Side PDF Generator:** Utilizes `@react-pdf/renderer` to dynamically generate a printable engineering resume directly from the browser.

## 🚀 Local Deployment

To run this repository locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/lorenzdiscutido/portfolio.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing

The repository maintains a foundational testing suite for core components. To run tests interactively:
```bash
npm run test
```
