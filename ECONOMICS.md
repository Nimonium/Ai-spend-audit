# Unit Economics & Financial Defensibility

The AI Spend Audit engine is built on real-world SaaS pricing models. The recommendations are mathematically rigorous to ensure credibility when reviewed by finance teams.

## The Cost of "Shadow AI"

A typical 50-person engineering organization often exhibits the following decentralized SaaS sprawl:
*   **ChatGPT Plus:** 20 seats @ $20/mo = $400/mo
*   **ChatGPT Team:** 5 seats @ $30/mo = $150/mo
*   **GitHub Copilot:** 30 seats @ $19/mo = $570/mo
*   **Cursor Pro:** 15 seats @ $20/mo = $300/mo
*   **Anthropic API:** Uncapped usage = ~$800/mo

**Total Unmanaged Spend: $2,220/mo ($26,640/yr)**

## Audit Engine Math & Scenarios

### Scenario 1: Redundant Coding Assistants
**Current State:** 15 developers using *both* GitHub Copilot ($19/mo) and Cursor Pro ($20/mo) to test the waters.
**Cost:** (15 * $19) + (15 * $20) = $585/mo.
**Audit Action:** Consolidate. Standardize on Cursor.
**Savings:** Cancel Copilot. 15 * $19 = **$285/mo saved.**

### Scenario 2: Unoptimized API Usage vs Batch/Routing
**Current State:** Small startup (10 people) building a RAG application, hitting GPT-4o directly for all queries. Spend is $1,200/mo.
**Audit Action:** Downgrade/Optimize. Implement semantic caching and route 60% of low-complexity queries to `gpt-4o-mini` (which is orders of magnitude cheaper).
**Savings:** Assuming 60% of queries move to a model that is 90% cheaper, and caching catches 15% of remaining queries.
**Math:** 
*   Original: $1,200
*   New Heavy Queries (25% volume): $300
*   New Light Queries (60% volume, 10% cost): $72
*   Cached Queries (15% volume): $0
*   New Total: ~$372/mo
**Savings:** **$828/mo saved.** (Our engine conservatively estimates a flat 40% reduction, or $480/mo, to account for implementation overhead).

### Scenario 3: Seat Minimums (The ChatGPT Team Trap)
**Current State:** A 2-person founding team upgrades to ChatGPT Team for shared workspaces.
**Cost:** Team requires a minimum of 2 seats. Billed monthly it's $30/seat. Total: $60/mo.
**Audit Action:** Downgrade to Plus.
**Savings:** 2 seats @ $20/mo = $40/mo. 
**Math:** $60 - $40 = **$20/mo saved.**
*Caveat Engine Note:* The engine explicitly warns that downgrading forfeits the "zero data training" guarantee and workspace sharing, ensuring the recommendation is nuanced and trusted.

## Credex Revenue Model
If Credex takes a 20% contingency fee on first-year savings achieved through enterprise negotiation and consolidation:
*   Average mid-market company savings: $8,000/yr.
*   Credex Revenue per customer: $1,600.
*   Cost of Goods Sold (COGS): Serverless compute (Vercel) + Database (Supabase) = ~$0.01 per audit run.
*   **Gross Margin:** >99% on the software side, scaling heavily on the advisory/negotiation side.
