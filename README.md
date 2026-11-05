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
