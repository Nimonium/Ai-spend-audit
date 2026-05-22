# AI Spend Audit | Built for Credex

A hyper-optimized, visually stunning B2B SaaS wedge designed to help engineering and finance teams identify redundancies, reclaim unused seats, and optimize their AI subscription stack (ChatGPT, GitHub Copilot, Anthropic API, etc.).

## 🚀 Live Demo Ready

This application is engineered for production with a strict adherence to performance, accessibility, and modern web aesthetics (Linear/Vercel styling).

*   **Lighthouse Targets:** 95+ across Performance, Accessibility, Best Practices, and SEO.
*   **Zero-Layout-Shift:** Server-side data fetching ensures the report page loads instantly without jank.
*   **Type-Safe:** End-to-end type safety using Zod, React Hook Form, and strict TypeScript.

## 🧠 The Audit Engine

Located at `src/lib/audit-engine.ts`, this pure function is the core of the application. It applies financially defensible heuristics to a company's SaaS stack.
Current rules include:
1.  **Redundancy Checks:** Flags overlapping capabilities (e.g., paying for both Cursor and GitHub Copilot).
2.  **API Spend Optimization:** Recommends semantic caching and model routing for unoptimized API usage.
3.  **Seat Optimization:** Cross-references stated team size with active subscription seats to find waste.
4.  **Tier Downgrades:** Recommends mathematically optimal downgrades (e.g., ChatGPT Team vs Plus) while explicitly stating the *caveats* (e.g., loss of data privacy or shared workspaces).

## 🛠 Tech Stack

*   **Framework:** Next.js 14+ (App Router, Server Actions)
*   **Styling:** Tailwind CSS v4, Lucide Icons, Shadcn UI
*   **Database:** Supabase (PostgreSQL) with local in-memory fallback.
*   **Validation:** Zod + React Hook Form
*   **Testing:** Vitest

## 📚 Submission Documents

Please review the following documents for a deeper dive into the product strategy and architecture:
*   [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical decisions, trade-offs, and scaling plans.
*   [ECONOMICS.md](./ECONOMICS.md) - Unit economics and real-world math scenarios for the audit logic.
*   [GTM.md](./GTM.md) - Go-to-market strategy, acquisition channels, and the "Shadow IT" SEO play.

## 🏃‍♂️ Running Locally

1.  Clone the repository.
2.  Run `npm install`.
3.  Set up environment variables (optional, app will gracefully degrade to in-memory mock if absent):
    *   `NEXT_PUBLIC_SUPABASE_URL`
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4.  Run `npm run dev` and navigate to `http://localhost:3000`.
