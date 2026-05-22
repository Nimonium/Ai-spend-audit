'use server'

import { redirect } from 'next/navigation';
import { runAudit, AuditRequest, ToolCategory } from '@/lib/audit-engine';
import { saveAuditToDatabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export async function submitAuditAction(formData: FormData) {
  const teamSize = Number(formData.get('teamSize')) || 1;
  const useCase = (formData.get('useCase') as string) || 'General';
  
  // Try to parse multiple tools if they exist
  // We'll extract them by matching the form field patterns (e.g. tools.0.name, tools.1.name)
  // For now, if coming from the simple MVP form, it might be tool1Name
  
  const tools: any[] = [];
  
  // Check for the old MVP format first
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
     // If the new form format is used (react-hook-form might serialize differently, but we'll adapt later or handle it in client)
     // Actually, we'll parse the 'toolsData' if it's sent as a JSON string from a client-side fetch.
     // But wait, server actions with RHF usually pass the parsed object if used as an action, or we stringify.
     // Let's assume the client will send a JSON string of the whole payload for robust parsing.
     const payloadStr = formData.get('payload');
     if (payloadStr) {
        try {
           const payload = JSON.parse(payloadStr as string);
           return await processAuditPayload(payload);
        } catch (e) {
           console.error("Failed to parse payload", e);
        }
     }
  }

  const request: AuditRequest = { teamSize, useCase, tools };
  const result = runAudit(request);

  const id = await saveAuditToDatabase(request, result);
  
  console.log('Generated Audit ID:', id);

  redirect(`/report/${id}`);
}

// Helper to handle client-side JSON submission
export async function processAuditPayload(payload: any) {
   const request: AuditRequest = {
      teamSize: payload.teamSize,
      useCase: payload.useCase || 'General',
      tools: payload.tools.map((t: any) => ({
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
   
   // We can return the ID instead of redirecting if it's a client component making a fetch
   return { id };
}
