# Founder Reflection

Building the AI Spend Audit wedge has been an exercise in scoping. When I started, I fell into the classic engineering trap: I wanted to build a fully automated, OAuth-integrated SaaS management platform. 

## What Failed

1.  **The OAuth Dream:** I originally planned to integrate directly with GitHub, OpenAI, and Anthropic APIs to pull usage data automatically. I quickly realized that asking a VP of Engineering to Oauth into their company's core infrastructure for a "free audit tool" was a massive security red flag. The conversion rate would have been near zero. 
    *   *Pivot:* I moved to a manual, low-friction form. It requires more effort from the user, but it bypasses InfoSec.

2.  **LLM-Generated Reports:** I initially used OpenAI structured outputs to generate the audit recommendations. It sounded cool, but it was slow (4-6 seconds per request), expensive, and crucially, non-deterministic. Sometimes it hallucinated a competitor's pricing plan.
    *   *Pivot:* I scrapped the LLM entirely for the core audit. The engine in `src/lib/audit-engine.ts` is a deterministic, pure function. It's infinitely faster, costs nothing to run, and guarantees the math is always defensible to a CFO.

## The Path Forward

The MVP proves the wedge. The Next.js App Router architecture is solid, and the graceful fallback to in-memory caching ensures it won't crash during a demo.

The biggest operational bottleneck to the business right now is not technical. If this tool goes viral, Credex will be flooded with "Book a Consultation" requests. Fulfilling those requests requires human negotiation time. The next engineering phase must focus on internal tooling to automate the procurement and vendor negotiation process, or the advisory margins will collapse.
