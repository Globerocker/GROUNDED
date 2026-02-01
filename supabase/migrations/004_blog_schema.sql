-- Blog System Tables
-- Posts, Categories, Authors

-- Authors Table
CREATE TABLE IF NOT EXISTS authors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT, -- Markdown content
  cover_image TEXT,
  author_id UUID REFERENCES authors(id) ON DELETE SET NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  is_featured BOOLEAN DEFAULT FALSE,
  seo_title TEXT,
  seo_description TEXT,
  reading_time_minutes INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Public Read Access
CREATE POLICY "Blog content is publicly readable" ON authors FOR SELECT USING (true);
CREATE POLICY "Blog categories are publicly readable" ON categories FOR SELECT USING (true);
CREATE POLICY "Published posts are publicly readable" ON posts FOR SELECT USING (published_at IS NOT NULL AND published_at <= NOW());

-- Admin Write Access (Authenticated Users for MVP)
CREATE POLICY "Admins can manage authors" ON authors FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins can manage categories" ON categories FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins can manage posts" ON posts FOR ALL TO authenticated USING (true);

-- Trigger for updated_at
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- SEED DATA

-- Authors
INSERT INTO authors (name, role, bio) VALUES
('Grounded Team', 'Editor', 'Exploring the future of living and infrastructure.');

-- Categories
INSERT INTO categories (name, slug, description) VALUES
('Off-Grid Living', 'off-grid-living', 'Guides and insights for autonomous living.'),
('Technology', 'technology', 'The tech stack behind modern homes.'),
('Investment', 'investment', 'ROI and land value analysis.'),
('Design', 'design', 'Architecture and interior concepts.');

-- Initial Post (Placeholder)
INSERT INTO posts (title, slug, excerpt, content, category_id, author_id, published_at, is_featured) 
SELECT 
  'The Future of Housing is Infrastructure',
  'future-of-housing',
  'Why buying a house should be like buying a utility subscription.',
  '# The Future of Housing\n\nImagine if your home was as smart as your phone and as reliable as the power grid...',
  c.id,
  a.id,
  NOW(),
  TRUE
FROM categories c, authors a
WHERE c.slug = 'off-grid-living' AND a.name = 'Grounded Team'
LIMIT 1;
