-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID NOT NULL REFERENCES public.analyses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Contact information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  property_address TEXT,

  -- Scheduling
  scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
  timezone TEXT NOT NULL DEFAULT 'Asia/Kolkata',

  -- Payment
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
  payment_id TEXT,
  amount INTEGER NOT NULL, -- Amount in paise (₹2999 = 299900)

  -- Consultation
  consultant_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  consultation_status TEXT NOT NULL DEFAULT 'scheduled' CHECK (consultation_status IN ('scheduled', 'completed', 'cancelled')),
  notes TEXT
);

-- Add indexes
CREATE INDEX idx_bookings_analysis_id ON public.bookings(analysis_id);
CREATE INDEX idx_bookings_email ON public.bookings(email);
CREATE INDEX idx_bookings_scheduled_time ON public.bookings(scheduled_time);
CREATE INDEX idx_bookings_payment_status ON public.bookings(payment_status);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own bookings by email" ON public.bookings
  FOR SELECT USING (email = current_setting('request.jwt.claims', true)::json->>'email');

-- Trigger for updated_at
CREATE TRIGGER set_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Comments
COMMENT ON TABLE public.bookings IS 'Consultation booking and payment tracking';
COMMENT ON COLUMN public.bookings.amount IS 'Amount in paise (₹1 = 100 paise)';
