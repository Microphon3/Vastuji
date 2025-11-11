-- Create analyses table
CREATE TABLE IF NOT EXISTS public.analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Input data
  property_type TEXT NOT NULL CHECK (property_type IN ('home', 'office', 'shop', 'factory', 'plot')),
  selected_goals TEXT[],
  video_url TEXT NOT NULL,
  compass_heading DECIMAL(5,2) NOT NULL CHECK (compass_heading >= 0 AND compass_heading < 360),

  -- Processing status
  status TEXT NOT NULL DEFAULT 'uploading' CHECK (status IN ('uploading', 'processing', 'complete', 'failed')),

  -- Generated outputs (stored as JSONB for flexibility)
  floor_plan JSONB,
  zones JSONB,
  summary JSONB,
  detailed_report JSONB
);

-- Add indexes for common queries
CREATE INDEX idx_analyses_user_id ON public.analyses(user_id);
CREATE INDEX idx_analyses_status ON public.analyses(status);
CREATE INDEX idx_analyses_created_at ON public.analyses(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to create analyses
CREATE POLICY "Anyone can create analyses" ON public.analyses
  FOR INSERT WITH CHECK (true);

-- Users can view their own analyses, or all if anonymous
CREATE POLICY "Users can view own analyses" ON public.analyses
  FOR SELECT USING (
    auth.uid() = user_id OR user_id IS NULL
  );

-- Only authenticated users can update their own analyses
CREATE POLICY "Users can update own analyses" ON public.analyses
  FOR UPDATE USING (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.analyses
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Add comments for documentation
COMMENT ON TABLE public.analyses IS 'Stores Vastu analysis data for properties';
COMMENT ON COLUMN public.analyses.property_type IS 'Type of property being analyzed';
COMMENT ON COLUMN public.analyses.compass_heading IS 'Device orientation in degrees (0-360)';
COMMENT ON COLUMN public.analyses.floor_plan IS 'Generated SVG floor plan and metadata';
COMMENT ON COLUMN public.analyses.zones IS 'Array of 16 zone analysis objects';
