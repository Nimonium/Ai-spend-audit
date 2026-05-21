export type ToolCategory = 'chat' | 'coding' | 'api' | 'other';

export interface ToolUsage {
  id: string;
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

  // Rule 1: Duplicate Capabilities (e.g., Cursor and Copilot)
  const codingTools = tools.filter(t => t.category === 'coding');
  if (codingTools.length > 1) {
    // Sort by spend, recommend keeping the cheapest or just standardizing
    codingTools.sort((a, b) => b.monthlySpend - a.monthlySpend);
    const toolToCancel = codingTools[0]; // Cancel the most expensive one
    opportunities.push({
      toolId: toolToCancel.id,
      title: `Consolidate coding tools`,
      description: `You are paying for multiple AI coding assistants. Standardizing on one can save you money.`,
      estimatedMonthlySavings: toolToCancel.monthlySpend,
      actionType: 'consolidate',
    });
  }

  // Rule 2: ChatGPT Plus / Team vs API
  const chatgpt = tools.find(t => t.name.toLowerCase().includes('chatgpt'));
  if (chatgpt && teamSize <= 5 && chatgpt.planName.toLowerCase().includes('team')) {
     const savings = chatgpt.monthlySpend - (chatgpt.seats * 20); // Down to Plus
     if (savings > 0) {
       opportunities.push({
         toolId: chatgpt.id,
         title: `Downgrade ChatGPT Team to Plus`,
         description: `For teams of ${teamSize}, ChatGPT Plus is often sufficient and cheaper than the Team plan.`,
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
        title: `Optimize API Usage`,
        description: `Your API spend ($${api.monthlySpend}) is unusually high for a team of ${teamSize}. Consider caching, prompt optimization, or switching to smaller models for routine tasks.`,
        estimatedMonthlySavings: api.monthlySpend * 0.3, // Estimate 30% savings
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
           title: `Remove Unused Seats for ${tool.name}`,
           description: `You are paying for ${tool.seats} seats but only have a team of ${teamSize}.`,
           estimatedMonthlySavings: overage * costPerSeat,
           actionType: 'cancel',
        })
     }
  }

  // Rule 5: Credex Discount Opportunity
  if (totalCurrentMonthlySpend > 1000) {
     opportunities.push({
        title: `Unlock Credex Startup Discounts`,
        description: `Your AI spend is over $1,000/mo. A Credex consultation can help you unlock bulk discounts and better payment terms.`,
        estimatedMonthlySavings: totalCurrentMonthlySpend * 0.15, // 15% discount
        actionType: 'switch',
     });
  }

  // Calculate total savings
  totalEstimatedMonthlySavings = opportunities.reduce((sum, opp) => sum + opp.estimatedMonthlySavings, 0);

  return {
    totalCurrentMonthlySpend,
    totalEstimatedMonthlySavings,
    opportunities,
  };
}
