import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Metadata } from 'next';
import { BLOG_CONTENT } from '../../../lib/blog-content';

// Generate dynamic metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const supabase = await createClient();

    // Check custom content first
    const extendedPost = (BLOG_CONTENT as any)[slug];
    if (extendedPost) {
        return {
            title: `${extendedPost.title} | Grounded Journal`,
            description: extendedPost.excerpt,
        };
    }

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

    let post: any = null;

    // 1. Try to fetch from Supabase first (for existing structure/author/image data)
    const { data: dbPost } = await supabase
        .from('posts')
        .select(`
            *,
            category:categories(name, slug),
            author:authors(name, role, avatar_url)
        `)
        .eq('slug', slug)
        .single();

    if (dbPost) {
        post = dbPost;
    }

    // 2. Check for "Premium Content" override from our file
    const extendedPost = (BLOG_CONTENT as any)[slug];

    if (extendedPost) {
        if (!post) {
            // Mock post if it doesn't exist in DB
            post = {
                slug,
                title: extendedPost.title,
                content: extendedPost.content,
                excerpt: extendedPost.excerpt,
                published_at: new Date().toISOString(),
                reading_time_minutes: 10,
                author: { name: 'Grounded Team', role: 'Editorial' },
                category: { name: 'Deep Dive', slug: 'deep-dive' }
            };
        } else {
            // Override DB content with file content
            post.content = extendedPost.content;
            post.title = extendedPost.title;
            post.excerpt = extendedPost.excerpt;
        }
    }

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
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
                    <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
                        <span className="text-white/10 text-9xl font-thin tracking-tighter">GROUNDED</span>
                    </div>
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
                    <ReactMarkdown
                        components={{
                            h2: ({ node, ...props }) => <h2 className="text-3xl font-light mt-12 mb-6 text-white border-l-2 border-accent pl-6" {...props} />,
                            h3: ({ node, ...props }) => <h3 className="text-xl font-medium mt-8 mb-4 text-white/90" {...props} />,
                            p: ({ node, ...props }) => <p className="text-lg leading-relaxed text-neutral-400 mb-6" {...props} />,
                            ul: ({ node, ...props }) => <ul className="space-y-4 my-8 pl-6 border-l border-white/10" {...props} />,
                            li: ({ node, ...props }) => (
                                <li className="text-neutral-300 pl-4 relative list-none" {...props}>
                                    <span className="absolute left-0 top-3 w-1.5 h-1.5 bg-accent rounded-full" />
                                    {props.children}
                                </li>
                            ),
                            blockquote: ({ node, ...props }: any) => (
                                <div className="my-12 p-8 border-l-4 border-accent bg-white/5 italic text-xl md:text-2xl font-light text-white/90 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-serif">"</div>
                                    <div {...props} />
                                </div>
                            ),
                            a: ({ node, ...props }) => (
                                <a className="text-accent hover:text-white transition-colors border-b border-accent/20 hover:border-accent pb-0.5" {...props} />
                            ),
                            strong: ({ node, ...props }) => <strong className="font-semibold text-white/90" {...props} />,
                        }}
                    >
                        {post.content || ''}
                    </ReactMarkdown>
                </div>

            </article>
        </main>
    );
}
