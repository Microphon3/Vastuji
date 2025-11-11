import { describe, it, expect } from 'vitest';
import { supabase } from '$lib/supabase';
import type { BookingInsert } from '$lib/types/database';

describe('Bookings Database Operations', () => {
  const mockBooking: BookingInsert = {
    analysisId: '00000000-0000-0000-0000-000000000000', // Will use real ID in practice
    name: 'Test User',
    email: 'test@example.com',
    phone: '+919876543210',
    scheduledTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    timezone: 'Asia/Kolkata',
    paymentStatus: 'pending',
    amount: 299900, // ₹2999
    consultationStatus: 'scheduled'
  };

  it('should create a booking', async () => {
    const { data, error } = await supabase
      .from('bookings')
      .insert(mockBooking)
      .select()
      .single();

    expect(error).toBeNull();
    expect(data?.email).toBe('test@example.com');
    expect(data?.amount).toBe(299900);
  });
});
