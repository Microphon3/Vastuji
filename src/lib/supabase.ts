import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export type Database = {
  public: {
    Tables: {
      analyses: {
        Row: Analysis;
        Insert: Omit<Analysis, 'id' | 'createdAt'>;
        Update: Partial<Analysis>;
      };
      bookings: {
        Row: Booking;
        Insert: Omit<Booking, 'id'>;
        Update: Partial<Booking>;
      };
    };
  };
};

// Type definitions will be added in next task
export interface Analysis {
  id: string;
  userId?: string;
  createdAt: string;
  propertyType: 'home' | 'office' | 'shop' | 'factory' | 'plot';
  selectedGoals?: string[];
  videoUrl: string;
  compassHeading: number;
  status: 'uploading' | 'processing' | 'complete' | 'failed';
}

export interface Booking {
  id: string;
  analysisId: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  propertyAddress?: string;
  scheduledTime: string;
  timezone: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  amount: number;
}
