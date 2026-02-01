import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    cover_image: string | null;
    published_at: string | null;
    reading_time_minutes: number;
    category: {
        name: string;
        slug: string;
    } | null;
}

export default function BlogCard({ post }: { post: BlogPost }) {
    return (
        <Link href={`/blog/${post.slug}`} className="group block h-full">
            <div className="bg-neutral-900/30 border border-white/5 rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-500 hover:border-white/10 hover:bg-neutral-900/50">
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                    {post.cover_image ? (
                        <Image
                            src={post.cover_image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-neutral-600">
                            No Image
                        </div>
                    )}

                    {/* Category Badge */}
                    {post.category && (
                        <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-white/90">
                                {post.category.name}
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-neutral-500 mb-3">
                        {post.published_at && (
                            <time dateTime={post.published_at}>
                                {format(new Date(post.published_at), 'MMM d, yyyy')}
                            </time>
                        )}
                        <span>•</span>
                        <span>{post.reading_time_minutes} min read</span>
                    </div>

                    <h3 className="text-xl font-light mb-3 text-white group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                    </h3>

                    {post.excerpt && (
                        <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                            {post.excerpt}
                        </p>
                    )}

                    <div className="flex items-center text-xs font-medium text-white/50 group-hover:text-white transition-colors">
                        Read Article
                        <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
