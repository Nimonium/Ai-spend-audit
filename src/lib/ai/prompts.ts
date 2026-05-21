import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { AuditResult } from '../audit-engine';

export async function generateExecutiveSummary(result: AuditResult) {
  if (!process.env.OPENAI_API_KEY) {
     return "AI Summary is currently disabled in local development. Add your OPENAI_API_KEY to see the personalized executive summary.";
  }

  try {
    const { text } = await generateText({
      model: openai('gpt-4-turbo'),
      system: "You are a senior financial advisor for startups (tone: professional, concise, like Linear or Ramp). Given an AI spend audit result, write a punchy 2-sentence executive summary emphasizing the most critical savings opportunity. Do not hallucinate numbers not present in the input.",
      prompt: `Audit Result: ${JSON.stringify(result)}`,
    });

    return text;
  } catch (error) {
    console.error("Failed to generate AI summary:", error);
    return "Failed to generate executive summary.";
  }
}
