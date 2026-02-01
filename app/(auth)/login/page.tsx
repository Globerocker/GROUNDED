'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const supabase = createClient();
        const { error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) {
            setError('Login could not be completed.');
            setLoading(false);
        } else {
            router.push('/');
            router.refresh();
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h1 className="text-4xl">Login</h1>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm text-foreground/60 mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-card border border-border focus:border-accent focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm text-foreground/60 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-card border border-border focus:border-accent focus:outline-none"
                        />
                    </div>

                    {error && (
                        <div className="text-sm text-foreground/80 p-4 border border-border">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-8 py-4 bg-accent text-foreground hover:bg-accent/90 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Login'}
                    </button>
                </form>

                <div className="text-center text-sm">
                    <span className="text-foreground/60">No account? </span>
                    <a href="/signup" className="text-foreground hover:text-accent">
                        Sign up
                    </a>
                </div>
            </div>
        </main>
    );
}
