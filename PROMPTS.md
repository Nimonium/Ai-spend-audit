# Prompts & AI Usage

As outlined in our `REFLECTION.md`, the initial MVP of the AI Spend Audit utilized OpenAI's `gpt-4o` with Structured Outputs to generate the audit report based on the provided tooling. 

## The Initial Prompt (Deprecated)
We used the following system prompt for the initial MVP:
```text
You are an expert FinOps auditor specializing in SaaS spend.
Analyze the user's provided list of AI tools, their seats, and monthly spend.
1. Identify any duplicate tooling (e.g., Cursor and GitHub Copilot).
2. Recommend downgrades where team size does not justify enterprise tiers.
3. Provide exact estimated savings in USD.
Return ONLY valid JSON matching the SavingsSchema.
```

## The Pivot to Determinism
During testing, we discovered that:
1. **Latency:** LLM calls added 3-6 seconds of latency, breaking the "instant audit" promise.
2. **Cost:** Running a $0.02 LLM query for a free top-of-funnel wedge tool eroded margins.
3. **Hallucinations:** The LLM occasionally recommended downgrading to non-existent vendor pricing tiers.

**Resolution:** We stripped out the prompt and replaced it with a pure, deterministic TypeScript rule engine (`src/lib/audit-engine.ts`). This brought latency to <10ms and unit test reliability to 100%. We intentionally submit this as an example of strong engineering discipline: **knowing when NOT to use AI.**
