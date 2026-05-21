import { describe, it, expect } from 'vitest';
import { runAudit, AuditRequest } from '../lib/audit-engine';

describe('Audit Engine', () => {
  it('should calculate total current spend correctly', () => {
    const request: AuditRequest = {
      teamSize: 5,
      useCase: 'Software Development',
      tools: [
        { id: '1', name: 'ChatGPT Plus', category: 'chat', planName: 'Plus', seats: 2, monthlySpend: 40 },
        { id: '2', name: 'OpenAI API', category: 'api', planName: 'Pay-as-you-go', seats: 1, monthlySpend: 150 },
      ],
    };
    const result = runAudit(request);
    expect(result.totalCurrentMonthlySpend).toBe(190);
    expect(result.totalEstimatedMonthlySavings).toBe(0);
    expect(result.opportunities).toHaveLength(0);
  });

  it('should identify duplicate coding tools and suggest consolidation', () => {
    const request: AuditRequest = {
      teamSize: 10,
      useCase: 'Software Development',
      tools: [
        { id: '1', name: 'GitHub Copilot', category: 'coding', planName: 'Business', seats: 10, monthlySpend: 190 },
        { id: '2', name: 'Cursor', category: 'coding', planName: 'Pro', seats: 10, monthlySpend: 200 },
      ],
    };
    const result = runAudit(request);
    expect(result.opportunities).toContainEqual(
      expect.objectContaining({ actionType: 'consolidate', toolId: '2' })
    );
    expect(result.totalEstimatedMonthlySavings).toBe(200); // Saves the more expensive one
  });

  it('should suggest downgrading ChatGPT Team for small teams', () => {
    const request: AuditRequest = {
      teamSize: 3,
      useCase: 'Marketing',
      tools: [
        { id: '1', name: 'ChatGPT', category: 'chat', planName: 'Team', seats: 3, monthlySpend: 90 }, // $30/seat
      ],
    };
    const result = runAudit(request);
    expect(result.opportunities).toContainEqual(
      expect.objectContaining({ actionType: 'downgrade', toolId: '1', estimatedMonthlySavings: 30 }) // $90 - (3 * 20) = $30
    );
  });

  it('should flag high API spend for small teams', () => {
    const request: AuditRequest = {
      teamSize: 4,
      useCase: 'Prototyping',
      tools: [
        { id: '1', name: 'Anthropic API', category: 'api', planName: 'Usage', seats: 1, monthlySpend: 600 },
      ],
    };
    const result = runAudit(request);
    expect(result.opportunities).toContainEqual(
      expect.objectContaining({ actionType: 'downgrade', toolId: '1', estimatedMonthlySavings: 180 }) // 30% of 600
    );
  });

  it('should suggest Credex consultation for high total spend', () => {
    const request: AuditRequest = {
      teamSize: 20,
      useCase: 'Enterprise',
      tools: [
        { id: '1', name: 'OpenAI API', category: 'api', planName: 'Usage', seats: 1, monthlySpend: 1500 },
      ],
    };
    const result = runAudit(request);
    expect(result.opportunities).toContainEqual(
      expect.objectContaining({ actionType: 'switch', title: 'Unlock Credex Startup Discounts' })
    );
    expect(result.totalEstimatedMonthlySavings).toBeGreaterThanOrEqual(225); // 15% of 1500
  });
  
  it('should flag unused seats', () => {
    const request: AuditRequest = {
      teamSize: 5,
      useCase: 'General',
      tools: [
        { id: '1', name: 'Notion AI', category: 'other', planName: 'Pro', seats: 10, monthlySpend: 100 }, // $10/seat
      ],
    };
    const result = runAudit(request);
    expect(result.opportunities).toContainEqual(
      expect.objectContaining({ actionType: 'cancel', toolId: '1', estimatedMonthlySavings: 50 }) // 5 unused seats * $10
    );
  });
});
