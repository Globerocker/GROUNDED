-- Grounded Database Schema
-- Complete schema with seed data for MVP

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Locations table
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  airport_code TEXT NOT NULL,
  coordinates JSONB NOT NULL, -- {lat: number, lng: number}
  airport_distance_km_min INTEGER NOT NULL,
  airport_distance_km_max INTEGER NOT NULL,
  description TEXT NOT NULL,
  yearly_fee_usd_min INTEGER NOT NULL,
  yearly_fee_usd_max INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Plots table
CREATE TABLE IF NOT EXISTS plots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  plot_number TEXT NOT NULL,
  size_sqm INTEGER NOT NULL,
  status TEXT CHECK (status IN ('available', 'reserved', 'sold')) DEFAULT 'available',
  yearly_fee_usd INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- House models table
CREATE TABLE IF NOT EXISTS house_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  size_sqm_min INTEGER NOT NULL,
  size_sqm_max INTEGER NOT NULL,
  price_usd_min INTEGER NOT NULL,
  price_usd_max INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL,
  description TEXT NOT NULL,
  images TEXT[] DEFAULT '{}', -- Array of Supabase Storage URLs
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add-ons table
CREATE TABLE IF NOT EXISTS addons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  price_usd INTEGER NOT NULL,
  description TEXT NOT NULL,
  is_recurring BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  plot_id UUID REFERENCES plots(id) ON DELETE SET NULL,
  house_model_id UUID REFERENCES house_models(id) ON DELETE SET NULL,
  addon_ids UUID[] DEFAULT '{}',
  total_house_price INTEGER NOT NULL,
  yearly_land_fee INTEGER NOT NULL,
  status TEXT CHECK (status IN ('reserved', 'contract_pending', 'complete')) DEFAULT 'reserved',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contracts table
CREATE TABLE IF NOT EXISTS contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE UNIQUE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  contract_data JSONB NOT NULL,
  signed_at TIMESTAMP WITH TIME ZONE,
  next_payment_due DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- SEED DATA
-- ========================================

-- Locations (5 Mexican locations near airports)
INSERT INTO locations (name, airport_code, coordinates, airport_distance_km_min, airport_distance_km_max, description, yearly_fee_usd_min, yearly_fee_usd_max) VALUES
  (
    'Querétaro (QRO)',
    'QRO',
    '{"lat": 20.5888, "lng": -100.3899}',
    15,
    25,
    'Secure location near Santiago de Querétaro International Airport. Stable infrastructure.',
    800,
    1200
  ),
  (
    'Mérida (MID)',
    'MID',
    '{"lat": 20.9674, "lng": -89.6243}',
    8,
    12,
    'Proximity to Manuel Crescencio Rejón International Airport. Established security protocols.',
    900,
    1400
  ),
  (
    'Puebla / Atlixco',
    'PBC',
    '{"lat": 18.9074, "lng": -98.4320}',
    25,
    35,
    'Near Puebla International Airport. Accessible infrastructure corridor.',
    750,
    1100
  ),
  (
    'Guadalajara Area (GDL)',
    'GDL',
    '{"lat": 20.5218, "lng": -103.3111}',
    18,
    28,
    'Miguel Hidalgo y Costilla International Airport vicinity. Established access routes.',
    1000,
    1500
  ),
  (
    'León / Guanajuato (BJX)',
    'BJX',
    '{"lat": 20.9853, "lng": -101.4809}',
    20,
    30,
    'Del Bajío International Airport region. Stable transportation infrastructure.',
    850,
    1300
  );

-- House models (4 models: Studio, 1BR, 2BR, 3BR)
INSERT INTO house_models (name, size_sqm_min, size_sqm_max, price_usd_min, price_usd_max, bedrooms, description) VALUES
  (
    'Model A – Studio',
    28,
    32,
    22000,
    25000,
    0,
    'Minimal fallback ownership unit'
  ),
  (
    'Model B – 1 Bedroom',
    40,
    45,
    32000,
    38000,
    1,
    'Single-bedroom infrastructure unit'
  ),
  (
    'Model C – 2 Bedroom',
    55,
    65,
    45000,
    55000,
    2,
    'Two-bedroom ownership structure'
  ),
  (
    'Model D – 3 Bedroom',
    70,
    80,
    60000,
    70000,
    3,
    'Three-bedroom permanent unit'
  );

-- Add-ons (4 infrastructure upgrades)
INSERT INTO addons (name, price_usd, description, is_recurring) VALUES
  (
    'Solar Carport',
    8500,
    'Solar panel installation with carport structure',
    FALSE
  ),
  (
    'Water Catchment System',
    4200,
    'Rainwater collection and filtration infrastructure',
    FALSE
  ),
  (
    'Storage Unit (10 sqm)',
    3800,
    'Additional secure storage structure',
    FALSE
  ),
  (
    'Internet Setup',
    1200,
    'Satellite internet installation and configuration',
    FALSE
  );

-- Generate sample plots for each location (10 plots per location)
DO $$
DECLARE
  loc RECORD;
  i INTEGER;
BEGIN
  FOR loc IN SELECT id, yearly_fee_usd_min, yearly_fee_usd_max FROM locations LOOP
    FOR i IN 1..10 LOOP
      INSERT INTO plots (location_id, plot_number, size_sqm, yearly_fee_usd, status)
      VALUES (
        loc.id,
        'P-' || LPAD(i::TEXT, 3, '0'),
        CASE 
          WHEN i % 3 = 0 THEN 600
          WHEN i % 3 = 1 THEN 800
          ELSE 1000
        END,
        loc.yearly_fee_usd_min + ((loc.yearly_fee_usd_max - loc.yearly_fee_usd_min) * i / 10),
        CASE 
          WHEN i % 7 = 0 THEN 'reserved'
          ELSE 'available'
        END
      );
    END LOOP;
  END LOOP;
END $$;

-- ========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE plots ENABLE ROW LEVEL SECURITY;
ALTER TABLE house_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view and update their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Locations: Public read access
CREATE POLICY "Locations are publicly readable"
  ON locations FOR SELECT
  TO authenticated, anon
  USING (is_active = TRUE);

-- Plots: Public read access for available plots
CREATE POLICY "Available plots are publicly readable"
  ON plots FOR SELECT
  TO authenticated, anon
  USING (status = 'available' OR status = 'reserved');

-- House models: Public read access
CREATE POLICY "House models are publicly readable"
  ON house_models FOR SELECT
  TO authenticated, anon
  USING (TRUE);

-- Add-ons: Public read access
CREATE POLICY "Add-ons are publicly readable"
  ON addons FOR SELECT
  TO authenticated, anon
  USING (TRUE);

-- Orders: Users can create and view their own orders
CREATE POLICY "Users can create orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own pending orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id AND status = 'reserved');

-- Contracts: Users can view their own contracts (read-only after creation)
CREATE POLICY "Users can view own contracts"
  ON contracts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- ========================================
-- FUNCTIONS AND TRIGGERS
-- ========================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for orders table
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for profiles table
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
