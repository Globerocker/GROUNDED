import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Metadata } from 'next';

// Generate dynamic metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: post } = await supabase
        .from('posts')
        .select('title, excerpt, seo_title, seo_description')
        .eq('slug', slug)
        .single();

    if (!post) return { title: 'Not Found' };

    return {
        title: `${post.seo_title || post.title} | Grounded Journal`,
        description: post.seo_description || post.excerpt,
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: post } = await supabase
        .from('posts')
        .select(`
            *,
            category:categories(name, slug),
            author:authors(name, role, avatar_url)
        `)
        .eq('slug', slug)
        .single();

    if (!post) {
        notFound();
    }

    // GROUNDED: Inject extended content for "Million Dollar" feel (Mocking CMS expansion)
    const EXTENDED_CONTENT: Record<string, string> = {
        'future-of-housing-infrastructure': `
# The Hardware of Living

We are witnessing a fundamental shift in how humanity inhabits the planet. For centuries, "housing" has been defined by static, site-built structures—heavy, permanent, and inefficient. We pour concrete into the earth, creating assets that are immovable and slow to adapt. 

At Grounded, we believe housing is not a static asset, but a dynamic **infrastructure**. 

## The Teslafication of the Home

Just as the automotive industry shifted from combustion engines to software-defined electric platforms, the housing industry is undergoing a similar metamorphosis. We are moving from "stick-built" to "assembled."

> "The home of the future is not built; it is manufactured, deployed, and updated."

Our flagship models are not just buildings; they are high-performance machines for living. Precision-engineered in controlled factory environments, they rival the tolerance levels of the aerospace industry. This isn't just about pre-fab; it's about **productizing the living environment**.

### Decoupling Land and Structure

The traditional real estate model bundles land and improvements into a single, expensive asset. We are decoupling them. 
1.  **The Land:** A network of premium, curated locations (The Grid) that you access via subscription.
2.  **The Unit:** A depreciating asset that you own, upgrade, and move.

This model allows for a level of freedom previously impossible. Own the hardware, rent the view. Move your home from the cliffs of Big Sur to the deserts of Utah without selling a single brick.

## Engineering Autonomy

True freedom requires autonomy. Our units are designed to operate off-grid for extended periods without sacrificing luxury.
*   **Energy:** Integrated solar arrays and Tesla Powerwall storage.
*   **Water:** Atmospheric water generation and closed-loop greywater recycling.
*   **Connectivity:** Starlink high-speed satellite internet baked into the chassis.

We are building the infrastructure for a sovereign life. A life where you are connected to the world but not dependent on its aging utilities.

## The Design Philosophy: Invisible Tech

Technology should be felt, not seen. Our interiors are finished with natural materials—Venetian plaster, raw oak, stone—that hide the advanced systems beneath. Voice-controlled lighting, automated climate regulation, and health-monitoring sensors work in the background to optimize your environment.

This is the future we are building. A future where your home is as smart as your phone, as mobile as your car, and as beautiful as the nature it sits within.
        `,
        'sustainable-luxury-living': `
# Redefining Luxury: The Etiquette of Ecology

Luxury has historically been synonymous with excess. Large footprints, wasteful materials, and high energy consumption. We are rewriting this definition. True sustainable luxury is about **precision, harmony, and health**.

## Small Footprint, Massive Impact

Our units are compact by design, but expansive in experience. By reducing the conditioned square footage, we drastically lower the carbon footprint of daily living. But we don't sacrifice quality.
Every square meter is considered. High ceilings, floor-to-ceiling glazing, and seamless indoor-outdoor flows expand the perceived space.

*   **Thermal Mass:** Using high-density insulation and materials that regulate temperature naturally.
*   **Passive Interaction:** Orienting units to maximize solar gain in winter and shade in summer.

## Biophilic Design

We don't just place a house in nature; we invite nature in. 
Studies show that connection to nature lowers cortisol levels and improves cognitive function. Our "Glass House" philosophy ensures that you are always visually connected to your surroundings.

> "We shape our buildings; thereafter they shape us." — Winston Churchill

We are shaping buildings that heal. Natural light, circadian lighting systems, and non-toxic, organic finishes create a sanctuary for the body and mind.

## The Materials Palette

We reject plastics and faux-finishes.
*   **Exterior:** Shou Sugi Ban (charred timber) or Viroc (cement composite) – durable, beautiful, aging with grace.
*   **Interior:** Clay paints that breathe, regulating humidity. Stone floors that ground you.

Sustainable luxury is not about what you have; it's about how you live. It is a conscious choice to live lighter, smarter, and more beautifully.
        `
    };

    // Override content if we have an enhanced version
    if (slug in EXTENDED_CONTENT) {
        post.content = EXTENDED_CONTENT[slug];
    }

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Image */}
            <div className="relative h-[60vh] w-full">
                {post.cover_image ? (
                    <Image
                        src={post.cover_image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="w-full h-full bg-neutral-900" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

                <div className="absolute top-8 left-6 md:left-12">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/5 hover:bg-black/40"
                    >
                        <ArrowLeft size={16} />
                        Back to Journal
                    </Link>
                </div>
            </div>

            {/* Content Container */}
            <article className="max-w-3xl mx-auto px-6 -mt-32 relative z-10 pb-24">

                {/* Article Header */}
                <header className="mb-12 space-y-6">
                    <div className="flex items-center gap-4">
                        {post.category && (
                            <span className="px-3 py-1 bg-accent/20 text-accent border border-accent/20 rounded-full text-[10px] uppercase tracking-widest font-medium">
                                {post.category.name}
                            </span>
                        )}
                        <span className="text-white/50 text-sm">
                            {post.published_at && format(new Date(post.published_at), 'MMMM d, yyyy')}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-light leading-tight text-white mb-6">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-between border-y border-white/10 py-6">
                        <div className="flex items-center gap-3">
                            {post.author?.avatar_url && (
                                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10">
                                    <Image src={post.author.avatar_url} alt={post.author.name} fill className="object-cover" />
                                </div>
                            )}
                            <div>
                                <div className="text-sm font-medium text-white">{post.author?.name || 'Grounded Team'}</div>
                                <div className="text-xs text-white/50">{post.author?.role || 'Editor'}</div>
                            </div>
                        </div>
                        <div className="text-xs text-white/50 font-mono">
                            {post.reading_time_minutes} MIN READ
                        </div>
                    </div>
                </header>

                {/* Markdown Content */}
                <div className="prose prose-invert prose-lg max-w-none prose-headings:font-light prose-headings:tracking-tight prose-a:text-accent prose-img:rounded-xl">
                    <ReactMarkdown>{post.content || ''}</ReactMarkdown>
                </div>

            </article>
        </main>
    );
}
