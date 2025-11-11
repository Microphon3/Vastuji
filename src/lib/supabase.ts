import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { Analysis, AnalysisInsert, AnalysisUpdate } from '$lib/types/database';

if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export type Database = {
  public: {
    Tables: {
      analyses: {
        Row: Analysis;
        Insert: AnalysisInsert;
        Update: AnalysisUpdate;
      };
    };
  };
};

// Re-export types for convenience
export type { Analysis, AnalysisInsert, AnalysisUpdate } from '$lib/types/database';
