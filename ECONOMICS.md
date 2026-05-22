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

### Scenario 2: Seat Minimums (The ChatGPT Team Trap)
**Current State:** A 2-person founding team upgrades to ChatGPT Team for shared workspaces.
**Cost:** Team requires a minimum of 2 seats. Billed monthly it's $30/seat. Total: $60/mo.
**Audit Action:** Downgrade to Plus.
**Savings:** 2 seats @ $20/mo = $40/mo. 
**Math:** $60 - $40 = **$20/mo saved.**
*Caveat Engine Note:* The engine explicitly warns that downgrading forfeits the "zero data training" guarantee. This is crucial—we cannot recommend a downgrade that accidentally exposes proprietary IP without a warning.

## Credex Revenue Model & Margin Realities

If Credex operates as an advisory service taking a 20% contingency fee on first-year savings achieved through enterprise negotiation and consolidation:

*   **Average Mid-Market Savings:** $8,000/yr.
*   **Credex Revenue per Customer:** $1,600.
*   **Software COGS:** Serverless compute (Vercel) + Database (Supabase) = ~$0.01 per audit run.
*   **Advisory COGS:** Human negotiation time. This is the bottleneck.

**The Reality Check:**
While the software gross margin is >99%, the business model relies heavily on human-in-the-loop advisory work. Scaling this requires standardizing the procurement negotiation process, or the advisory COGS will eat the margin. Furthermore, the $1,600 LTV is a one-time capture (first-year savings). To build recurring revenue, Credex must evolve from a one-off negotiation service into a continuous FinOps monitoring platform.
