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
