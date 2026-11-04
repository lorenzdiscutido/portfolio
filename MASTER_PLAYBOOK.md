# THE ULTIMATE MASTER PLAYBOOK: ENGINEERING PORTFOLIO

## PART 1: PROJECT MANAGEMENT & PLANNING

### 1. Value Evaluation & Project Charter
- **Project Name**: Engineering & AI/IoT Portfolio Development
- **Project Manager**: Jose Lorenzo Discutido
- **Objective**: Build a professional web portfolio to showcase expertise as a Systems Engineer and AI/IoT Data Officer, emphasizing end-to-end software builds, physical hardware integrations, and database architectures.
- **Target Deployment Platform**: Vercel (Next.js App Router)
- **Success Criteria**: A responsive, live website deployed on Vercel with zero build errors, fast load times, and a professional dark-mode UI (Slate, Blue, Orange).

### 2. Scope & Work Breakdown
- **In-Scope**: Hero landing page, "About Me" (PUP engineering background & Vonotec role), "Projects" showcase, Contact routing, PDF Resume Generator, Technical Blog, SEO optimization, Personal Workspace feature, Interactive Terminal Easter Egg, Automated Testing (Jest), CI/CD (GitHub Actions), and Vercel Analytics.
- **Out-of-Scope**: Complex custom backend databases, user authentication.

---

## PART 2: ARCHITECTURE MODULES STATUS

- [x] **Module 1**: Core Portfolio Initialization (`tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`, `Hero.tsx`, `About.tsx`, `Projects.tsx`, `Footer.tsx`, `app/page.tsx`)
- [x] **Module 2**: Technical Blog System (`lib/blogData.ts`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`)
- [x] **Module 3**: Global Sticky Navigation Bar (`components/NavBar.tsx`)
- [x] **Module 4**: Dynamic PDF Resume Generator (`components/ResumePDF.tsx`, `components/ResumeDownload.tsx`)
- [x] **Module 5**: SEO, Open Graph & Sitemap Routing (`app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`)
- [x] **Module 6**: Workspace & Off-Duty Personalization (`components/Workspace.tsx`)
- [x] **Module 7**: Interactive Terminal Easter Egg (`components/Terminal.tsx` via `Ctrl + \``)
- [x] **Module 8**: Deep-Dive Case Study Pages (`lib/caseStudyData.ts`, `app/projects/[slug]/page.tsx`)
- [x] **Module 9**: Dark/Light Mode Toggle (`next-themes`, `ThemeProvider.tsx`, `ThemeToggle.tsx`)
- [x] **Module 10**: Automated Testing Suite (`jest.config.mjs`, `jest.setup.ts`, `__tests__/Hero.test.tsx`)
- [x] **Module 11**: CI/CD Pipeline (`.github/workflows/test.yml`)
- [x] **Module 12**: Vercel Web Analytics & Speed Insights (`@vercel/analytics`, `@vercel/speed-insights`)
- [ ] **Module 13**: Custom Domain Configuration (Manual Vercel Dashboard & DNS Registrar setup)
  - Add custom domain in Vercel Dashboard -> **Settings > Domains**
  - Add `A` Record: `@` -> `76.76.21.21`
  - Add `CNAME` Record: `www` -> `cname.vercel-dns.com`
