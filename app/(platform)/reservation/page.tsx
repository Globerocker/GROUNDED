'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface Addon {
    id: string;
    name: string;
    price_usd: number;
    description: string;
}

interface Plot {
    id: string;
    plot_number: string;
    yearly_fee_usd: number;
    location: {
        name: string;
    };
}

interface HouseModel {
    id: string;
    name: string;
    price_usd_min: number;
    price_usd_max: number;
}

import { Suspense } from 'react';

function ReservationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    // ... existing logic ...
    const plot_id = searchParams.get('plot_id');
    const model_id = searchParams.get('model_id');

    const [plot, setPlot] = useState<Plot | null>(null);
    const [model, setModel] = useState<HouseModel | null>(null);
    const [addons, setAddons] = useState<Addon[]>([]);
    const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const supabase = createClient();

            // Fetch plot
            if (plot_id) {
                const { data } = await supabase
                    .from('plots')
                    .select('*, location:locations(*)')
                    .eq('id', plot_id)
                    .single();
                if (data) setPlot(data);
            }

            // Fetch model
            if (model_id) {
                const { data } = await supabase
                    .from('house_models')
                    .select('*')
                    .eq('id', model_id)
                    .single();
                if (data) setModel(data);
            }

            // Fetch addons
            const { data: addonsData } = await supabase
                .from('addons')
                .select('*')
                .order('price_usd', { ascending: false });
            if (addonsData) setAddons(addonsData);

            setLoading(false);
        };

        fetchData();
    }, [plot_id, model_id]);

    const toggleAddon = (addonId: string) => {
        const newSelected = new Set(selectedAddons);
        if (newSelected.has(addonId)) {
            newSelected.delete(addonId);
        } else {
            newSelected.add(addonId);
        }
        setSelectedAddons(newSelected);
    };

    const calculateTotal = () => {
        const housePrice = model ? (model.price_usd_min + model.price_usd_max) / 2 : 0;
        const addonsTotal = addons
            .filter((a) => selectedAddons.has(a.id))
            .reduce((sum, a) => sum + a.price_usd, 0);
        return housePrice + addonsTotal;
    };

    const handleReserve = async () => {
        setSubmitting(true);

        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            router.push('/login?redirect=/reservation');
            return;
        }

        const { error } = await supabase.from('orders').insert({
            user_id: user.id,
            plot_id: plot?.id,
            house_model_id: model?.id,
            addon_ids: Array.from(selectedAddons),
            total_house_price: calculateTotal(),
            yearly_land_fee: plot?.yearly_fee_usd || 0,
            status: 'reserved',
        });

        if (!error) {
            router.push('/dashboard');
        } else {
            alert('This action could not be completed.');
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen px-8 py-16">
                <div className="max-w-4xl mx-auto">
                    <p className="text-foreground/60">Loading...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen px-8 py-16">
            <div className="max-w-4xl mx-auto space-y-12">
                <h1>Reservation summary</h1>

                {/* Selected plot */}
                {plot && (
                    <div className="space-y-3">
                        <h2 className="text-lg text-foreground/60">Plot</h2>
                        <div className="p-6 border border-border space-y-2">
                            <div className="flex justify-between">
                                <span>{plot.location.name}</span>
                                <span className="text-foreground/60">{plot.plot_number}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-foreground/60">Yearly usage fee</span>
                                <span>${plot.yearly_fee_usd.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Selected model */}
                {model && (
                    <div className="space-y-3">
                        <h2 className="text-lg text-foreground/60">House model</h2>
                        <div className="p-6 border border-border space-y-2">
                            <div className="flex justify-between">
                                <span>{model.name}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-foreground/60">One-time price</span>
                                <span>${model.price_usd_min.toLocaleString()}–${model.price_usd_max.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add-ons */}
                <div className="space-y-3">
                    <h2 className="text-lg text-foreground/60">Add-ons (optional)</h2>
                    <div className="space-y-2">
                        {addons.map((addon) => (
                            <button
                                key={addon.id}
                                onClick={() => toggleAddon(addon.id)}
                                className={`w-full p-6 border text-left transition-colors ${selectedAddons.has(addon.id)
                                    ? 'border-accent bg-accent/5'
                                    : 'border-border hover:border-accent/50'
                                    }`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="font-medium">{addon.name}</div>
                                        <div className="text-sm text-foreground/60 mt-1">{addon.description}</div>
                                    </div>
                                    <div className="text-right ml-4">
                                        <div className="text-foreground/60 text-xs">One-time</div>
                                        <div className="font-medium">${addon.price_usd.toLocaleString()}</div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Pricing summary */}
                <div className="pt-8 border-t border-border space-y-4">
                    <div className="flex justify-between text-lg">
                        <span className="text-foreground/60">One-time total</span>
                        <span className="font-medium">${calculateTotal().toLocaleString()}</span>
                    </div>
                    {plot && (
                        <div className="flex justify-between text-lg">
                            <span className="text-foreground/60">Yearly usage fee</span>
                            <span className="font-medium">${plot.yearly_fee_usd.toLocaleString()}</span>
                        </div>
                    )}
                    <p className="text-sm text-foreground/60 pt-4">
                        This is ownership, not a rental. The yearly fee covers land usage rights.
                    </p>
                </div>

                {/* CTA */}
                <div className="pt-8">
                    <button
                        onClick={handleReserve}
                        disabled={submitting}
                        className="px-8 py-4 bg-accent text-foreground hover:bg-accent/90 transition-colors disabled:opacity-50"
                    >
                        {submitting ? 'Processing...' : 'Reserve'}
                    </button>
                </div>
            </div>
        </main>
    );
}

export default function ReservationPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading reservation...</div>}>
            <ReservationContent />
        </Suspense>
    );
}
