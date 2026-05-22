export type ToolCategory = 'chat' | 'coding' | 'api' | 'other';

export interface ToolUsage {
  id?: string; // Optional if not provided by client
  name: string;
  category: ToolCategory;
  planName: string;
  seats: number;
  monthlySpend: number;
}

export interface AuditRequest {
  teamSize: number;
  useCase: string;
  tools: ToolUsage[];
}

export interface SavingsOpportunity {
  toolId?: string;
  title: string;
  description: string;
  caveat?: string;
  estimatedMonthlySavings: number;
  actionType: 'cancel' | 'downgrade' | 'consolidate' | 'switch';
}

export interface AuditResult {
  totalCurrentMonthlySpend: number;
  totalEstimatedMonthlySavings: number;
  opportunities: SavingsOpportunity[];
}

export function runAudit(request: AuditRequest): AuditResult {
  const { teamSize, tools } = request;
  let totalCurrentMonthlySpend = 0;
  let totalEstimatedMonthlySavings = 0;
  const opportunities: SavingsOpportunity[] = [];

  // Calculate current spend
  for (const tool of tools) {
    totalCurrentMonthlySpend += tool.monthlySpend;
  }

  // Rule 1: Duplicate Capabilities (Coding Tools)
  const codingTools = tools.filter(t => t.category === 'coding');
  if (codingTools.length > 1) {
    codingTools.sort((a, b) => b.monthlySpend - a.monthlySpend);
    const toolToCancel = codingTools[0]; 
    opportunities.push({
      toolId: toolToCancel.id,
      title: `Consolidate redundant coding assistants`,
      description: `You are paying for multiple AI coding tools (${codingTools.map(t => t.name).join(', ')}). Standardizing on a single platform reduces context-switching and saves licensing costs.`,
      caveat: `If different teams have strict hard-dependencies on specific IDEs (e.g. Visual Studio vs VS Code), consolidation may temporarily reduce developer velocity.`,
      estimatedMonthlySavings: toolToCancel.monthlySpend,
      actionType: 'consolidate',
    });
  }

  // Rule 2: ChatGPT Team vs Plus Optimization
  const chatgpt = tools.find(t => t.name.toLowerCase().includes('chatgpt'));
  if (chatgpt && teamSize <= 5 && chatgpt.planName.toLowerCase().includes('team')) {
     const savings = chatgpt.monthlySpend - (chatgpt.seats * 20); // Plus is $20/mo
     if (savings > 0) {
       opportunities.push({
         toolId: chatgpt.id,
         title: `Downgrade ChatGPT Team to Plus`,
         description: `For teams of ${teamSize}, individual ChatGPT Plus licenses ($20/mo) are often more cost-effective than the Team plan ($30/mo per user with minimums).`,
         caveat: `Downgrading means losing shared workspaces, higher message caps, and enterprise data privacy guarantees (Team data is excluded from model training by default).`,
         estimatedMonthlySavings: savings,
         actionType: 'downgrade',
       });
     }
  }

  // Rule 3: High API Spend for small teams
  const apiTools = tools.filter(t => t.category === 'api');
  for (const api of apiTools) {
    if (api.monthlySpend > 500 && teamSize < 10) {
      opportunities.push({
        toolId: api.id,
        title: `Implement prompt caching and model routing for ${api.name}`,
        description: `Your API spend ($${api.monthlySpend}) is disproportionately high for a team of ${teamSize}. Routing simpler tasks to smaller models (e.g., Claude 3 Haiku or GPT-4o-mini) and implementing semantic caching can drastically reduce inference costs.`,
        caveat: `Requires engineering bandwidth to implement routing logic and evaluate output quality degradation on smaller models.`,
        estimatedMonthlySavings: api.monthlySpend * 0.4, // Estimate 40% savings with routing/caching
        actionType: 'downgrade',
      });
    }
  }
  
  // Rule 4: Underutilized seats
  for (const tool of tools) {
     if (tool.seats > teamSize) {
        const costPerSeat = tool.monthlySpend / tool.seats;
        const overage = tool.seats - teamSize;
        opportunities.push({
           toolId: tool.id,
           title: `Reclaim unused seats for ${tool.name}`,
           description: `You are currently paying for ${tool.seats} seats but your stated team size is only ${teamSize}.`,
           caveat: `Ensure that the "extra" seats aren't being used by contractors, service accounts, or external partners before canceling.`,
           estimatedMonthlySavings: overage * costPerSeat,
           actionType: 'cancel',
        })
     }
  }

  // Rule 5: Credex Discount Opportunity
  if (totalCurrentMonthlySpend > 1000) {
     opportunities.push({
        title: `Unlock Credex Enterprise Discounts`,
        description: `Your aggregate AI spend ($${totalCurrentMonthlySpend}/mo) qualifies for bulk vendor discounts through a Credex advisory consultation.`,
        caveat: `Discount negotiation requires annual commitments.`,
        estimatedMonthlySavings: totalCurrentMonthlySpend * 0.15, // 15% discount assumption
        actionType: 'switch',
     });
  }

  // Rule 6: Claude vs ChatGPT redundancy
  const hasClaude = tools.some(t => t.name.toLowerCase().includes('claude'));
  const hasChatGPT = tools.some(t => t.name.toLowerCase().includes('chatgpt'));
  if (hasClaude && hasChatGPT && chatgpt) {
     opportunities.push({
        title: `Rationalize General Chat Tools`,
        description: `You are maintaining parallel subscriptions for both ChatGPT and Claude. Most teams see diminishing returns having both for every employee. Pick a primary LLM vendor based on your specific reasoning or coding needs.`,
        caveat: `Some power users genuinely require both for cross-checking complex logic. Consider pooling a few shared seats instead of canceling entirely.`,
        estimatedMonthlySavings: chatgpt.monthlySpend * 0.5, // Save 50% by halving redundant seats
        actionType: 'consolidate',
     });
  }

  // Calculate total savings
  totalEstimatedMonthlySavings = opportunities.reduce((sum, opp) => sum + opp.estimatedMonthlySavings, 0);

  return {
    totalCurrentMonthlySpend,
    totalEstimatedMonthlySavings: Number(totalEstimatedMonthlySavings.toFixed(2)),
    opportunities,
  };
}
