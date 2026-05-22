'use server'

import { redirect } from 'next/navigation';
import { runAudit, AuditRequest, ToolCategory, ToolUsage } from '@/lib/audit-engine';
import { saveAuditToDatabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export async function submitAuditAction(formData: FormData) {
  const teamSize = Number(formData.get('teamSize')) || 1;
  const useCase = (formData.get('useCase') as string) || 'General';
  
  const tools: ToolUsage[] = [];
  
  // Legacy form fallback (graceful handling if client JS fails)
  if (formData.has('tool1Name')) {
     tools.push({
      id: uuidv4(),
      name: formData.get('tool1Name') as string || 'ChatGPT',
      category: 'chat' as ToolCategory,
      planName: formData.get('tool1Plan') as string || 'Plus',
      seats: Number(formData.get('tool1Seats')) || 1,
      monthlySpend: Number(formData.get('tool1Spend')) || 20,
    });
  } else {
     // Modern client-side fetch payload parsing
     const payloadStr = formData.get('payload');
     if (payloadStr) {
        try {
           const payload = JSON.parse(payloadStr as string) as AuditRequest;
           return await processAuditPayload(payload);
        } catch (e) {
           console.error("Failed to parse payload", e);
        }
     }
  }

  const request: AuditRequest = { teamSize, useCase, tools };
  const result = runAudit(request);

  const id = await saveAuditToDatabase(request, result);
  
  redirect(`/report/${id}`);
}

// Client-side JSON submission handler
export async function processAuditPayload(payload: AuditRequest) {
   const request: AuditRequest = {
      teamSize: payload.teamSize,
      useCase: payload.useCase || 'General',
      tools: payload.tools.map((t) => ({
         id: uuidv4(),
         name: t.name,
         category: t.category as ToolCategory,
         planName: t.planName,
         seats: Number(t.seats),
         monthlySpend: Number(t.monthlySpend),
      })),
   };

   const result = runAudit(request);
   const id = await saveAuditToDatabase(request, result);
   
   return { id };
}
