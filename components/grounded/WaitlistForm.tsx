'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { motion } from 'framer-motion';

interface WaitlistFormProps {
    source?: string;
    compact?: boolean;
}

export default function WaitlistForm({ source = 'website', compact = false }: WaitlistFormProps) {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [interestedIn, setInterestedIn] = useState('unsure');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const supabase = createClient();

        const { error: submitError } = await supabase.from('waitlist').insert({
            email,
            full_name: fullName || null,
            interested_in: interestedIn,
            message: message || null,
            source,
        });

        if (submitError) {
            if (submitError.code === '23505') {
                setError('This email is already registered.');
            } else {
                setError('Submission failed. Please try again.');
            }
            setLoading(false);
        } else {
            setSubmitted(true);
        }
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 border border-accent bg-accent/5"
            >
                <h3 className="text-2xl mb-2">Priority access reserved</h3>
                <p className="text-foreground/80">
                    We'll contact you when plots become available.
                </p>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {!compact && (
                <div>
                    <h3 className="text-2xl mb-2">Reserve priority access</h3>
                    <p className="text-foreground/60">
                        Join the waitlist to be notified when new plots are available.
                    </p>
                </div>
            )}

            <div>
                <label htmlFor="email" className="block text-sm text-foreground/60 mb-2">
                    Email *
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-card border border-border focus:border-accent focus:outline-none transition-colors"
                />
            </div>

            {!compact && (
                <>
                    <div>
                        <label htmlFor="fullName" className="block text-sm text-foreground/60 mb-2">
                            Full Name
                        </label>
                        <input
                            id="fullName"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-3 bg-card border border-border focus:border-accent focus:outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="interestedIn" className="block text-sm text-foreground/60 mb-2">
                            Interest
                        </label>
                        <select
                            id="interestedIn"
                            value={interestedIn}
                            onChange={(e) => setInterestedIn(e.target.value)}
                            className="w-full px-4 py-3 bg-card border border-border focus:border-accent focus:outline-none transition-colors"
                        >
                            <option value="unsure">Not sure yet</option>
                            <option value="studio">Studio (28-32 sqm)</option>
                            <option value="1br">1 Bedroom (40-45 sqm)</option>
                            <option value="2br">2 Bedroom (55-65 sqm)</option>
                            <option value="3br">3 Bedroom (70-80 sqm)</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm text-foreground/60 mb-2">
                            Additional Information
                        </label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 bg-card border border-border focus:border-accent focus:outline-none transition-colors"
                            placeholder="Timeline, specific requirements, questions..."
                        />
                    </div>
                </>
            )}

            {error && (
                <div className="text-sm text-foreground/80 p-4 border border-border">
                    {error}
                </div>
            )}

            <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-accent text-foreground hover:bg-accent/90 transition-colors disabled:opacity-50"
            >
                {loading ? 'Submitting...' : 'Join waitlist'}
            </motion.button>

            <p className="text-xs text-foreground/40">
                No spam. We'll only contact you regarding Grounded availability.
            </p>
        </form>
    );
}
