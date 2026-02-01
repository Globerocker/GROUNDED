import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, ShoppingCart } from 'lucide-react';
import { Metadata } from 'next';

// Generate dynamic metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const supabase = await createClient();

    const { data: addon } = await supabase
        .from('addons')
        .select('name, description')
        .eq('id', id)
        .single();

    if (!addon) return { title: 'Not Found' };

    return {
        title: `${addon.name} | Grounded Add-ons`,
        description: addon.description,
    };
}

export default async function AddonDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: addon } = await supabase
        .from('addons')
        .select('*')
        .eq('id', id)
        .single();

    if (!addon) {
        notFound();
    }

    // Parse features if string, or cast if object
    let features: Record<string, string> = {};
    if (typeof addon.features === 'string') {
        try {
            features = JSON.parse(addon.features);
        } catch (e) {
            console.error('Failed to parse features', e);
        }
    } else if (typeof addon.features === 'object') {
        features = addon.features || {};
    }

    return (
        <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-background">
            <div className="max-w-[1400px] mx-auto">
                <Link
                    href="/#customize"
                    className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors mb-12"
                >
                    <ArrowLeft size={16} />
                    Back to Catalog
                </Link>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Image Section */}
                    <div className="space-y-4">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
                            {addon.image_url ? (
                                <Image
                                    src={addon.image_url}
                                    alt={addon.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-neutral-700">No Image</div>
                            )}
                        </div>
                        <p className="text-xs text-center text-neutral-600 uppercase tracking-widest">
                            {addon.name} Visualization
                        </p>
                    </div>

                    {/* Details Section */}
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <h1 className="text-5xl font-light">{addon.name}</h1>
                            <p className="text-xl text-neutral-400 font-light leading-relaxed">
                                {addon.description}
                            </p>
                        </div>

                        <div className="space-y-2 pb-8 border-b border-white/10">
                            <div className="text-sm text-neutral-500 uppercase tracking-widest">Price</div>
                            <div className="text-3xl font-light text-accent">
                                ${(addon.price_usd).toLocaleString()}
                            </div>
                            <p className="text-xs text-neutral-600">
                                Including installation and integration with main unit.
                            </p>
                        </div>

                        {/* Specs / Features */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-medium">Specifications</h3>
                            <div className="grid gap-4">
                                {Object.entries(features).map(([key, value]) => (
                                    <div key={key} className="flex justify-between items-center p-4 bg-neutral-900/50 rounded-lg border border-white/5">
                                        <span className="text-neutral-400 capitalize">{key.replace('_', ' ')}</span>
                                        <span className="font-medium text-white">{String(value)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Compatibility */}
                        <div className="space-y-4 p-6 bg-accent/5 border border-accent/10 rounded-xl">
                            <div className="flex items-center gap-2 text-accent">
                                <Check size={18} />
                                <span className="text-sm font-medium tracking-wide uppercase">Fully Compatible</span>
                            </div>
                            <p className="text-sm text-neutral-400">
                                Seamlessly integrates with all Grounded models (Model A - D).
                                Connects to central power and water management systems.
                            </p>
                        </div>

                        {/* CTA */}
                        <div className="pt-4">
                            <button className="w-full py-4 bg-white text-black font-medium text-lg rounded-full hover:bg-neutral-200 transition-colors flex items-center justify-center gap-3">
                                <ShoppingCart size={20} />
                                Add to Reservation Inquiry
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}
