import { createClient } from '@/lib/supabase/server';
import BlogCard from '@/components/blog/BlogCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Journal | Grounded',
    description: 'Insights on off-grid living, sustainable architecture, and land investment.',
};

export default async function BlogIndex() {
    const supabase = await createClient();

    const { data: posts } = await supabase
        .from('posts')
        .select(`
            id,
            title,
            slug,
            excerpt,
            cover_image,
            published_at,
            reading_time_minutes,
            category:categories(name, slug)
        `)
        .eq('is_featured', true)
        .order('published_at', { ascending: false });

    return (
        <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-background">
            <div className="max-w-[1400px] mx-auto space-y-24">

                {/* Header */}
                <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-6xl font-light mb-6">The Journal</h1>
                    <p className="text-lg text-neutral-400 leading-relaxed font-light">
                        Exploring the intersection of modern autonomy, pre-fab architecture, and the future of housing.
                    </p>
                </div>

                {/* Featured Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts?.map((post: any) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                    {(!posts || posts.length === 0) && (
                        <div className="col-span-full py-20 text-center border border-white/5 rounded-2xl bg-white/[0.02]">
                            <p className="text-neutral-500">No articles published yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
