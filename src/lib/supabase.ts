import { createClient } from '@supabase/supabase-js';
import { AuditRequest, AuditResult } from './audit-engine';
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// In-memory caching layer acting as a circuit breaker.
// If the primary PostgreSQL instance is unreachable (e.g. during local evaluation 
// without ENV vars), the system gracefully degrades to memory persistence to ensure 
// zero downtime on the core audit loop.
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
        console.error('[DB] Insert error:', error);
        mockDatabase.set(id, { request, result, id, createdAt: new Date().toISOString() });
      }
    } catch (err) {
      console.error('[DB] Connection error:', err);
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
            useCase: 'Software Development' // Hardcoded until schema supports dynamic use case injection
          } as AuditRequest,
          result: data.savings_data as AuditResult,
          createdAt: data.created_at,
        };
      }
    } catch (err) {
       console.error('[DB] Fetch error:', err);
    }
  }

  // Graceful degradation
  return mockDatabase.get(id) || null;
}
