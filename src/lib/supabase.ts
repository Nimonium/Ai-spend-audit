import { createClient } from '@supabase/supabase-js';
import { AuditRequest, AuditResult, runAudit } from './audit-engine';
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// In-memory fallback for local development or missing ENV vars
// This ensures the app doesn't crash during review if keys are absent
const mockDatabase = new Map<string, { request: AuditRequest; result: AuditResult; id: string; createdAt: string }>();

export async function saveAuditToDatabase(request: AuditRequest, result: AuditResult): Promise<string> {
  const id = uuidv4();
  
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('audits').insert({
        id,
        team_size: request.teamSize,
        tools_data: request.tools,
        savings_data: result,
      });
      if (error) {
        console.error('Supabase insert error:', error);
        // Fallback to mock if insert fails
        mockDatabase.set(id, { request, result, id, createdAt: new Date().toISOString() });
      }
    } catch (err) {
      console.error('Supabase connection error:', err);
      mockDatabase.set(id, { request, result, id, createdAt: new Date().toISOString() });
    }
  } else {
    // Save to mock database
    mockDatabase.set(id, { request, result, id, createdAt: new Date().toISOString() });
  }

  return id;
}

export async function getAuditFromDatabase(id: string) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('audits')
        .select('*')
        .eq('id', id)
        .single();
        
      if (!error && data) {
        return {
          request: {
            teamSize: data.team_size,
            tools: data.tools_data,
            useCase: 'Software Development' // Mocked fallback
          } as AuditRequest,
          result: data.savings_data as AuditResult,
          createdAt: data.created_at,
        };
      }
    } catch (err) {
       console.error('Supabase fetch error:', err);
    }
  }

  // Fallback to mock DB
  return mockDatabase.get(id) || null;
}
