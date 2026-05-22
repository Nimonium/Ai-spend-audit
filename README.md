# AI Spend Audit | Built for Credex

A simple B2B tool designed to help engineering and finance teams identify redundancies, reclaim unused seats, and optimize their AI subscription stack.

## 🚀 The Product

Most companies are currently bleeding money on "Shadow AI"—engineers expensing ChatGPT Plus, GitHub Copilot, Cursor, and Anthropic API keys on individual corporate cards. This tool ingests a team's stated size and AI stack, applying a deterministic rule engine to find savings. 

It is designed to be a top-of-funnel (TOFU) lead generation tool for a larger FinOps advisory business.

*   **Zero-Layout-Shift:** Server-side data fetching ensures the report page loads instantly without jank.
*   **Type-Safe:** End-to-end type safety using Zod, React Hook Form, and strict TypeScript.
*   **Resilient:** Implements a graceful degradation circuit breaker. If the primary Postgres database fails (or environment variables are missing during local review), it silently falls back to an in-memory cache to ensure zero downtime on the core audit loop.

## 🧠 The Audit Engine

Located at `src/lib/audit-engine.ts`, this pure function applies financially defensible heuristics. We intentionally avoided using an LLM to generate the audit report because it was too slow, expensive, and non-deterministic. Instead, we use hardcoded rules:

1.  **Redundancy Checks:** Flags overlapping capabilities (e.g., paying for both Cursor and GitHub Copilot).
2.  **API Spend Optimization:** Recommends semantic caching and model routing for unoptimized API usage.
3.  **Seat Optimization:** Cross-references stated team size with active subscription seats to find waste.
4.  **Tier Downgrades:** Recommends mathematically optimal downgrades (e.g., ChatGPT Team vs Plus) while explicitly stating the *tradeoffs* (e.g., loss of enterprise data privacy).

## 📚 Technical Decisions & Tradeoffs

*   **App Router & Server Actions:** Chosen for speed of iteration and ability to keep the proprietary audit logic secure on the server without needing a separate backend service.
*   **Postgres vs. Redis:** For a real production launch, the in-memory fallback should be replaced with Upstash Redis for distributed caching. The current Map-based fallback works well for a single-region Vercel deployment but will fail to share state across serverless edge nodes.
*   **Component Library:** Radix Primitives via shadcn/ui. We stripped out unused components to keep the bundle size minimal.

## 🏃‍♂️ Developer Onboarding

1.  Clone the repository.
2.  Run `npm install`.
3.  Set up environment variables in `.env.local` (optional, app will gracefully degrade to in-memory mock if absent):
    *   `NEXT_PUBLIC_SUPABASE_URL`
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4.  Run `npm run dev` and navigate to `http://localhost:3000`.
