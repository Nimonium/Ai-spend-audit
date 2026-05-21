'use server'

import { redirect } from 'next/navigation';
import { runAudit, AuditRequest } from '@/lib/audit-engine';
import { v4 as uuidv4 } from 'uuid';

export async function submitAuditAction(formData: FormData) {
  const teamSize = Number(formData.get('teamSize'));
  const useCase = formData.get('useCase') as string;
  
  // For this MVP, parsing a single primary tool from the form
  const tools = [
    {
      id: uuidv4(),
      name: formData.get('tool1Name') as string || 'ChatGPT',
      category: 'chat' as const,
      planName: formData.get('tool1Plan') as string || 'Plus',
      seats: Number(formData.get('tool1Seats')) || 1,
      monthlySpend: Number(formData.get('tool1Spend')) || 20,
    }
  ];

  const request: AuditRequest = { teamSize, useCase, tools };
  const result = runAudit(request);

  const id = uuidv4();
  
  // In a full implementation, we'd save this to Supabase here.
  // For the MVP flow, we'll pass the ID and redirect.
  console.log('Generated Audit ID:', id);

  redirect(`/report/${id}`);
}
