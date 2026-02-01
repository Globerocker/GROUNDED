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
