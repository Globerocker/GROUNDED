'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function Header() {
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };
        getUser();
    }, [pathname]);

    const isActive = (path: string) => pathname === path;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <nav className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-medium hover:text-accent transition-colors">
                    Grounded
                </Link>

                <div className="flex items-center space-x-8">
                    <Link
                        href="/locations"
                        className={`text-sm transition-colors ${isActive('/locations') ? 'text-accent' : 'text-foreground/80 hover:text-foreground'
                            }`}
                    >
                        Locations
                    </Link>
                    <Link
                        href="/models"
                        className={`text-sm transition-colors ${isActive('/models') ? 'text-accent' : 'text-foreground/80 hover:text-foreground'
                            }`}
                    >
                        Models
                    </Link>
                    <Link
                        href="/how-it-works"
                        className={`text-sm transition-colors ${isActive('/how-it-works') ? 'text-accent' : 'text-foreground/80 hover:text-foreground'
                            }`}
                    >
                        How It Works
                    </Link>
                    <Link
                        href="/faq"
                        className={`text-sm transition-colors ${isActive('/faq') ? 'text-accent' : 'text-foreground/80 hover:text-foreground'
                            }`}
                    >
                        FAQ
                    </Link>
                    <Link
                        href="/blog"
                        className={`text-sm transition-colors ${isActive('/blog') ? 'text-accent' : 'text-foreground/80 hover:text-foreground'
                            }`}
                    >
                        Journal
                    </Link>
                    <Link
                        href="/waitlist"
                        className={`px-4 py-2 border border-accent transition-colors ${isActive('/waitlist')
                            ? 'bg-accent text-foreground'
                            : 'text-foreground hover:bg-accent/10'
                            }`}
                    >
                        Waitlist
                    </Link>

                    {!loading && (
                        <>
                            {user ? (
                                <Link
                                    href="/admin"
                                    className="text-sm text-foreground/60 hover:text-accent transition-colors"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className="text-sm text-foreground/60 hover:text-accent transition-colors"
                                >
                                    Login
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
