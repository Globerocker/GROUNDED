-- Add 'features' column to addons if not exists
ALTER TABLE addons ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '{}';
ALTER TABLE addons ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Clear existing placeholder data (optional, but good for clean slate)
DELETE FROM posts;
DELETE FROM addons WHERE name IN ('Gym Box', 'Sauna Box', 'Ice Bath');

-- Insert Add-ons
INSERT INTO addons (name, price_usd, description, image_url, features) VALUES
(
  'Gym Box',
  18000,
  'Private Gym Pod. Glass-walled fitness container.',
  '/images/addons/gym-box.png',
  '{"dimensions": "3m x 6m", "materials": "Black steel, double-pane glass", "equipment": "Not included (Space ready)"}'
),
(
  'Sauna Box',
  12500,
  'Nordic Sauna. Cedar wood, electric heater.',
  '/images/addons/sauna-box.png',
  '{"dimensions": "2.5m x 2.5m", "materials": "Cedar wood cladding", "heating": "Electric or Wood-burning options"}'
),
(
  'Ice Bath',
  5000,
  'Chiller Plunge. Stainless steel, temp control.',
  '/images/addons/ice-bath.png',
  '{"capacity": "350 Liters", "temp_range": "3°C - 38°C", "material": "316 Stainless Steel"}'
);

-- Blog Content
-- Get Category IDs (assuming categories exist from previous migration)
-- We'll use subqueries to get IDs

-- 1. Future of Housing (Off-Grid Living)
INSERT INTO posts (title, slug, excerpt, content, category_id, author_id, published_at, is_featured, cover_image, reading_time_minutes)
SELECT
  'The Future of Housing is Infrastructure',
  'future-of-housing-infrastructure',
  'Why buying a house should be like buying a utility subscription. Moving towards a world where homes are products, not projects.',
  '# The Future of Housing is Infrastructure

We are moving towards a world where homes are products, not projects. Traditional construction is slow, unpredictable, and inefficient. The future belongs to modular, infrastructure-first housing that can be deployed anywhere.

## The Problem with Traditional Real Estate
Real estate is one of the few industries that has resisted digitization. 
- **High Costs**: Labor shortages and material waste.
- **Unpredictability**: Delays are the norm.
- **Immobility**: You are tied to one location.

## The Grounded Approach
We view housing as a utility. You subscribe to a lifestyle, and the infrastructure supports it.
![Future Housing](/images/blog/future-housing.png)

### Key Benefits
1. **Speed**: Deployment in weeks, not years.
2. **Quality**: Factory-precision engineering.
3. **Freedom**: The ability to live off-grid without sacrificing comfort.

"The home of the future is a machine for living." - Le Corbusier (Updated for 2026)',
  (SELECT id FROM categories WHERE slug = 'off-grid-living'),
  (SELECT id FROM authors LIMIT 1), -- Default author
  NOW(),
  TRUE,
  '/images/blog/future-housing.png',
  7;

-- 2. Tech Stack (Technology)
INSERT INTO posts (title, slug, excerpt, content, category_id, author_id, published_at, is_featured, cover_image, reading_time_minutes)
SELECT
  'The OS for Your Home: Understanding the Tech Stack',
  'home-operating-system-tech-stack',
  'From Starlink to Solar: Deep dive into the integrated technologies that make autonomous living possible.',
  '# The OS for Your Home

A Grounded home is more than walls and a roof. It is a sophisticated machine running on a complex stack of technologies designed for autonomy.

## Energy Layer
The core of off-grid living is energy independence.
- **Solar Array**: High-efficiency bifacial panels.
- **Storage**: LiFePO4 battery banks with 3-day autonomy.
- **Management**: Smart inverters that balance load automatically.

![Tech Stack](/images/blog/tech-stack.png)

## Connectivity Layer
Being off-grid doesn''t mean being offline.
- **Starlink Integration**: Native mount points and routing.
- **Mesh Wi-Fi**: Blanket coverage for the entire plot.
- **Remote Monitoring**: Check battery levels and water tank status from your phone.

## Water & Waste
- **Rainwater Catchment**: Integrated filtration systems.
- **Bio-digesters**: Turning waste into safe byproducts.',
  (SELECT id FROM categories WHERE slug = 'technology'),
  (SELECT id FROM authors LIMIT 1),
  NOW() - INTERVAL '2 days',
  TRUE,
  '/images/blog/tech-stack.png',
  5;

-- 3. Land Investment (Investment)
INSERT INTO posts (title, slug, excerpt, content, category_id, author_id, published_at, is_featured, cover_image, reading_time_minutes)
SELECT
  'Land as an Asset Class: The ROI of Off-Grid Rentals',
  'land-investment-roi',
  'How turning raw land into a premium eco-tourism destination generates superior returns compared to traditional real estate.',
  '# Land as an Asset Class

Raw land has traditionally been a slow-moving asset. Grounded changes that equation by allowing land owners to activate their property with high-yield infrastructure.

## The Economics of Eco-Tourism
Travelers are seeking unique, remote experiences. They pay a premium for privacy and connection to nature.
- **Higher ADR**: Premium nightly rates for unique stays.
- **Lower CapEx**: Modular units cost less than traditional builds.
- **Tax Advantages**: Depreciation on equipment vs. permanent structures.

![Investment](/images/blog/investment.png)

## The Grounded Model
We partner with land owners to deploy units.
| Metric | Traditional Build | Grounded Unit |
| :--- | :--- | :--- |
| Time to Market | 12-24 Months | 8-12 Weeks |
| Cost / Sq Ft | $250+ | $150 |
| ROI (Year 1) | 4-6% | 12-18% |

## Case Study: Baja California
Our pilot project in Baja demonstrated a 90% occupancy rate within the first 3 months.',
  (SELECT id FROM categories WHERE slug = 'investment'),
  (SELECT id FROM authors LIMIT 1),
  NOW() - INTERVAL '5 days',
  TRUE,
  '/images/blog/investment.png',
  6;
