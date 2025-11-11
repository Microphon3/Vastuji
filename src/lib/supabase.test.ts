import { describe, it, expect } from 'vitest';
import { supabase } from './supabase';

describe('Supabase Client', () => {
  it('should initialize Supabase client', () => {
    expect(supabase).toBeDefined();
  });

  it('should have storage bucket configured', async () => {
    const { data, error } = await supabase.storage.listBuckets();
    expect(error).toBeNull();
    expect(data).toBeDefined();
  });
});
