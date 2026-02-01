# Grounded

Real estate infrastructure platform for secure ownership in Mexico.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` with your credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL, Auth, Storage)
- Mapbox
- Vercel (deployment)

## Project Structure

```
/app
  /(auth)         # Authentication pages
  /(platform)     # Main application
  /api            # API routes
/components
  /ui             # shadcn/ui components
  /grounded       # Custom components
/lib
  /supabase       # Database client
  /mapbox         # Map utilities
```

## Deployment

Deploy to Vercel:

```bash
vercel --prod
```

Ensure environment variables are set in Vercel dashboard.
