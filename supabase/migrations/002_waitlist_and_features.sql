-- Waitlist table for lead collection
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  country TEXT,
  interested_in TEXT, -- 'studio' | '1br' | '2br' | '3br' | 'unsure'
  preferred_location_ids UUID[],
  message TEXT,
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'pending', -- 'pending', 'contacted', 'converted'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS policies for waitlist
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Public can insert (for form submission)
CREATE POLICY "Anyone can submit to waitlist"
  ON waitlist FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users can view (admin)
CREATE POLICY "Authenticated users can view waitlist"
  ON waitlist FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can update status
CREATE POLICY "Authenticated users can update waitlist"
  ON waitlist FOR UPDATE
  TO authenticated
  USING (true);

-- Extension to house_models table
ALTER TABLE house_models 
ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS materials TEXT[] DEFAULT ARRAY['concrete', 'steel', 'wood'];

-- Update existing models with features
UPDATE house_models SET features = '{
  "insulation": "High-grade thermal insulation",
  "windows": "Double-pane impact-resistant glass",
  "structure": "Reinforced steel frame",
  "climate": "Passive cooling system"
}'::jsonb WHERE features = '{}'::jsonb;
