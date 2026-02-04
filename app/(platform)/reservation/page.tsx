'use client';

import { useState, useEffect, Suspense } from 'react';
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
    size_sqm_min: number;
    bedrooms: number;
    images: string[];
}

function ReservationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const plot_id = searchParams.get('plot_id');
    const model_id = searchParams.get('model_id');

    const [plot, setPlot] = useState<Plot | null>(null);
    const [model, setModel] = useState<HouseModel | null>(null);
    const [addons, setAddons] = useState<Addon[]>([]);
    const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [notes, setNotes] = useState('');

    useEffect(() => {
        setMounted(true);
    }, []);

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
                if (model_id === 'custom') {
                    setModel({
                        id: 'custom',
                        name: 'Custom Project / BYO',
                        price_usd_min: 0,
                        price_usd_max: 0,
                        size_sqm_min: 0,
                        bedrooms: 0,
                        images: [] // Will fallback to empty/custom logic
                    });
                } else {
                    const { data } = await supabase
                        .from('house_models')
                        .select('*')
                        .eq('id', model_id)
                        .single();
                    if (data) setModel(data);
                }
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
        const housePrice = model ? model.price_usd_min : 0;
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

    // Placeholder image logic
    const getModelImage = (model: HouseModel) => {
        if (model.images && model.images.length > 0) return model.images[0];
        // Use placeholders if no DB images
        if (model.name.includes('Model A')) return '/images/models/model_a_exterior_1769883040320.png';
        if (model.name.includes('Model B')) return '/images/models/model_b_exterior_1769883069908.png';
        if (model.name.includes('Model C')) return '/images/models/model_c_exterior_1769883099326.png';
        if (model.name.includes('Model D')) return '/images/models/model_d_exterior_1769883126934.png';
        return null;
    };


    if (!mounted || loading) {
        return (
            <main className="min-h-screen px-8 py-24 flex items-center justify-center bg-neutral-950 text-white">
                <div className="text-center space-y-4">
                    <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-foreground/60 text-sm tracking-widest uppercase">Initializing Reservation...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen pt-24 pb-16 px-6 md:px-12 bg-neutral-950 text-white">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24">

                {/* LEFT COL: Configuration & Selection */}
                <div className="space-y-12">
                    <div>
                        <h1 className="text-3xl font-light mb-2">Finalize your Build</h1>
                        <p className="text-foreground/60">Review your configuration and secure your production slot with a refundable deposit.</p>
                    </div>

                    {/* Empty State Prompt */}
                    {!loading && !model && !plot && (
                        <div className="p-8 border border-white/10 bg-white/5 rounded-sm text-center space-y-6">
                            <p className="text-foreground/80">You haven't selected a model or location yet.</p>
                            <div className="flex flex-col gap-4">
                                <button onClick={() => router.push('/models')} className="w-full py-3 bg-white text-black font-medium uppercase text-xs tracking-widest hover:bg-neutral-200">Select a Model</button>
                                <button onClick={() => router.push('/locations')} className="w-full py-3 border border-white/20 hover:bg-white/5 uppercase text-xs tracking-widest transition-colors">Select a Location</button>
                            </div>
                        </div>
                    )}

                    {/* Model Selection Card */}
                    {model && (
                        <div className="space-y-4">
                            <h2 className="text-xs uppercase tracking-widest text-accent">Selected Model</h2>
                            <div className="group border border-white/10 bg-white/5 overflow-hidden hover:border-accent/40 transition-colors rounded-sm">
                                <div className="aspect-video relative bg-black/50">
                                    {/* Try to show first image, else fallback */}
                                    {getModelImage(model) ? (
                                        <img src={getModelImage(model)!} alt={model.name} className="object-cover w-full h-full" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-white/20">No Preview Available</div>
                                    )}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                                        <h3 className="text-xl font-medium text-white">{model.name}</h3>
                                        <p className="text-sm text-white/70">{model.size_sqm_min}m²</p>
                                    </div>
                                </div>
                                <div className="p-4 flex justify-between items-center text-sm">
                                    <span className="text-foreground/60">Base Config</span>
                                    <span className="font-mono">${model.price_usd_min.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Plot Selection Card */}
                    {plot && (
                        <div className="space-y-4">
                            <h2 className="text-xs uppercase tracking-widest text-accent">Selected Location</h2>
                            <div className="border border-white/10 bg-white/5 p-6 rounded-sm flex justify-between items-center">
                                <div>
                                    <h3 className="font-medium text-lg">{plot.location?.name || 'Unknown Location'}</h3>
                                    <p className="text-sm text-foreground/60">Plot {plot.plot_number}</p>
                                </div>
                                <div className="text-right">
                                    <span className="block font-mono text-lg">${plot.yearly_fee_usd.toLocaleString()}<span className="text-xs text-foreground/40">/yr</span></span>
                                    <span className="text-xs text-accent">Available Now</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Add-ons Selection */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <h2 className="text-xs uppercase tracking-widest text-accent">Add-ons</h2>
                            <span className="text-xs text-foreground/40">{selectedAddons.size} selected</span>
                        </div>
                        <div className="grid gap-3">
                            {addons.map((addon) => {
                                let imageSrc = null;
                                if (addon.name.toLowerCase().includes('gym')) imageSrc = '/gym_module_exterior_1770232602932.png';
                                if (addon.name.toLowerCase().includes('sauna')) imageSrc = '/sauna_module_exterior_1770232574541.png';
                                if (addon.name.toLowerCase().includes('plunge') || addon.name.toLowerCase().includes('ice')) imageSrc = '/ice_bath_module_exterior_1770232588613.png';

                                return (
                                    <button
                                        key={addon.id}
                                        onClick={() => toggleAddon(addon.id)}
                                        className={`relative border text-left transition-all duration-300 rounded-sm group overflow-hidden ${selectedAddons.has(addon.id)
                                            ? 'border-accent bg-accent/5'
                                            : 'border-white/10 bg-white/5 hover:border-white/30'
                                            }`}
                                    >
                                        <div className="flex h-24">
                                            <div className="w-24 relative shrink-0">
                                                {imageSrc ? (
                                                    <img src={imageSrc} alt={addon.name} className="object-cover w-full h-full" />
                                                ) : (
                                                    <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-white/20 text-xs">No Img</div>
                                                )}
                                                {selectedAddons.has(addon.id) && (
                                                    <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                                                        <div className="bg-accent text-black rounded-full p-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-3 flex flex-col justify-between grow">
                                                <div className="flex justify-between items-start">
                                                    <span className="font-medium text-sm">{addon.name}</span>
                                                    <span className="font-mono text-xs text-accent">+${addon.price_usd.toLocaleString()}</span>
                                                </div>
                                                <p className="text-xs text-foreground/50 line-clamp-2">{addon.description}</p>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Notes Field */}
                    <div className="space-y-4">
                        <h2 className="text-xs uppercase tracking-widest text-accent">Questions / Notes</h2>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Any specific requirements or questions for our team?"
                            className="w-full bg-white/5 border border-white/10 p-4 rounded-sm outline-none focus:border-accent text-sm min-h-[100px]"
                        />
                    </div>
                </div>

                {/* RIGHT COL: Summary & Payment */}
                <div className="lg:pl-12">
                    <div className="sticky top-24 space-y-8 bg-neutral-900/50 p-8 border border-white/5 rounded-sm backdrop-blur-sm">
                        <h2 className="text-xl font-light border-b border-white/10 pb-4">Order Summary</h2>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-foreground/70">
                                <span>Base Model ({model?.name})</span>
                                <span>${(model?.price_usd_min || 0).toLocaleString()}</span>
                            </div>
                            {Array.from(selectedAddons).map(id => {
                                const addon = addons.find(a => a.id === id);
                                if (!addon) return null;
                                return (
                                    <div key={id} className="flex justify-between text-foreground/70">
                                        <span>{addon.name}</span>
                                        <span>+${addon.price_usd.toLocaleString()}</span>
                                    </div>
                                );
                            })}
                            <div className="pt-4 border-t border-white/10 flex justify-between text-lg font-medium text-white">
                                <span>Total Estimate</span>
                                <span>${calculateTotal().toLocaleString()}</span>
                            </div>
                            {plot && (
                                <div className="flex justify-between text-xs text-foreground/50 pt-1">
                                    <span>Recurring Land Lease</span>
                                    <span>${plot.yearly_fee_usd.toLocaleString()}/yr</span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4 pt-4">
                            <div className="bg-accent/10 border border-accent/20 p-4 rounded text-xs text-accent">
                                <p className="font-bold mb-1">Refundable Deposit</p>
                                <p>To secure your production slot, a fully refundable deposit of $1,000 is required today. The remaining balance is due upon manufacturing start.</p>
                            </div>

                            <button
                                onClick={handleReserve}
                                disabled={submitting}
                                className="w-full py-4 bg-white text-black font-medium tracking-wide hover:bg-neutral-200 transition-colors disabled:opacity-50 text-sm uppercase"
                            >
                                {submitting ? 'Processing...' : 'Request Reservation'}
                            </button>

                            <p className="text-center text-xs text-foreground/30">
                                Secure checkout via Stripe. Encrypted & Safe.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}

export default function ReservationPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">Loading reservation...</div>}>
            <ReservationContent />
        </Suspense>
    );
}
