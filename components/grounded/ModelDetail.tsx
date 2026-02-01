'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import ROICalculator from './ROICalculator';

export interface HouseModel {
    id: string;
    name: string;
    size_sqm_min: number;
    size_sqm_max: number;
    price_usd_min: number;
    price_usd_max: number;
    bedrooms: number;
    description: string;
    images: string[];
    features: Record<string, string>;
    materials: string[];
}

export default function ModelDetail({ model }: { model: HouseModel }) {
    // Mock floor plan if not in DB images
    const getFloorPlan = (name: string) => {
        if (name.includes('Model A')) return '/images/models_floorplan_a_1769886179707.png';
        if (name.includes('Model B')) return '/images/models_floorplan_b_1769886195917.png';
        if (name.includes('Model C')) return '/images/models_floorplan_c_1769886209367.png';
        if (name.includes('Model D')) return '/images/models_floorplan_d_1769886223855.png';
        return '/images/models_floorplan_a_1769886179707.png';
    };

    const floorPlan = getFloorPlan(model.name);

    return (
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 min-h-[80vh]">
            {/* LEFT COL: Scrollable Gallery (7/12) */}
            <div className="lg:col-span-7 space-y-8">
                {/* Main Hero Image */}
                <div className="aspect-[4/3] relative bg-neutral-900 overflow-hidden rounded-sm group">
                    {model.images && model.images[0] ? (
                        <Image src={model.images[0]} alt={model.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-white/20">No Image</div>
                    )}
                </div>

                {/* Secondary Images (Interior/Detail) */}
                {model.images && model.images[1] && (
                    <div className="aspect-[16/9] relative bg-neutral-900 overflow-hidden rounded-sm group">
                        <Image src={model.images[1]} alt={model.name + " Interior"} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                    </div>
                )}

                {/* Floor Plan & Technicals */}
                <div className="grid md:grid-cols-2 gap-8 pt-8">
                    <div className="space-y-4">
                        <h3 className="text-xs tracking-widest uppercase text-accent/80 border-b border-white/10 pb-2">Floor Plan</h3>
                        <div className="relative aspect-square border border-white/10 bg-white/5 p-4 hover:border-accent/50 transition-colors cursor-zoom-in">
                            <Image
                                src={floorPlan}
                                alt="Floor Plan"
                                fill
                                className="object-contain invert dark:invert-0 opacity-80 hover:opacity-100 transition-opacity p-4"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xs tracking-widest uppercase text-accent/80 border-b border-white/10 pb-2">Materials</h3>
                        <ul className="space-y-2 text-sm text-foreground/70">
                            <li className="flex justify-between"><span>Structure</span> <span className="text-foreground">Steel & CLT</span></li>
                            <li className="flex justify-between"><span>Cladding</span> <span className="text-foreground">Burned Cedar</span></li>
                            <li className="flex justify-between"><span>Glazing</span> <span className="text-foreground">Triple Pane</span></li>
                            <li className="flex justify-between"><span>Flooring</span> <span className="text-foreground">Polished Concrete</span></li>
                        </ul>
                    </div>
                </div>

                {/* Community Amenities Section */}
                <div className="space-y-6 pt-12 border-t border-white/10">
                    <h3 className="text-2xl font-light">Community Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Community Gym', 'Sauna Access', 'Coworking Space', 'Permaculture Garden'].map((item, i) => (
                            <div key={i} className="aspect-square bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center p-4 gap-2 hover:bg-white/10 transition-colors">
                                <div className="w-8 h-8 bg-accent/20 rounded-full" /> {/* Icon placeholder */}
                                <span className="text-xs uppercase tracking-wider text-foreground/80">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add-ons Section */}
                <div className="space-y-6 pt-12 border-t border-white/10">
                    <h3 className="text-2xl font-light">Customize Your Build</h3>
                    <p className="text-foreground/60 max-w-lg">Enhance your property with modular add-ons. Delivered fully assembled.</p>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="border border-white/10 bg-white/5 p-4 space-y-4 hover:border-accent transition-colors">
                            <div className="aspect-video bg-black/40 relative">
                                {/* Placeholder for Gym Box Image */}
                                <div className="absolute inset-0 flex items-center justify-center text-xs text-white/30">Gym Box Image</div>
                            </div>
                            <div>
                                <h4 className="font-medium">Private Gym Pod</h4>
                                <p className="text-sm text-foreground/60">Glass-walled fitness container.</p>
                                <p className="text-accent text-sm mt-2">+$18,000</p>
                            </div>
                        </div>
                        <div className="border border-white/10 bg-white/5 p-4 space-y-4 hover:border-accent transition-colors">
                            <div className="aspect-video bg-black/40 relative">
                                {/* Placeholder for Sauna Box Image */}
                                <div className="absolute inset-0 flex items-center justify-center text-xs text-white/30">Sauna Box Image</div>
                            </div>
                            <div>
                                <h4 className="font-medium">Nordic Sauna</h4>
                                <p className="text-sm text-foreground/60">Cedar wood, electric heater.</p>
                                <p className="text-accent text-sm mt-2">+$12,500</p>
                            </div>
                        </div>
                        <div className="border border-white/10 bg-white/5 p-4 space-y-4 hover:border-accent transition-colors">
                            <div className="aspect-video bg-black/40 relative">
                                {/* Placeholder for Ice Bath Image */}
                                <div className="absolute inset-0 flex items-center justify-center text-xs text-white/30">Ice Bath</div>
                            </div>
                            <div>
                                <h4 className="font-medium">Chiller Plunge</h4>
                                <p className="text-sm text-foreground/60">Stainless steel, temp control.</p>
                                <p className="text-accent text-sm mt-2">+$5,000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT COL: Sticky Details & CTA (5/12) */}
            <div className="lg:col-span-5 relative">
                <div className="sticky top-8 space-y-8 pr-4">
                    <div className="space-y-2 border-b border-white/10 pb-6">
                        <div className="flex justify-between items-start">
                            <h1 className="text-5xl md:text-6xl font-light tracking-tight">{model.name}</h1>
                            {/* Share/Save icons could go here */}
                        </div>
                        <p className="text-xl font-light text-accent">
                            ${model.price_usd_min.toLocaleString()}
                            <span className="text-foreground/40 text-base ml-2">Base Price</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 text-sm">
                        <div>
                            <span className="block text-foreground/40 uppercase tracking-widest text-xs mb-1">Dimensions</span>
                            <span className="text-7xl font-thin leading-none">{model.size_sqm_min}</span>
                            <span className="ml-1 text-foreground/60">m²</span>
                        </div>
                        <div>
                            <span className="block text-foreground/40 uppercase tracking-widest text-xs mb-1">Capacity</span>
                            <span className="text-7xl font-thin leading-none">{model.bedrooms}</span>
                            <span className="ml-1 text-foreground/60">Bed{model.bedrooms !== 1 ? 's' : ''}</span>
                        </div>
                    </div>

                    <p className="text-lg leading-relaxed text-foreground/70 font-light">
                        {model.description}
                    </p>

                    <ROICalculator basePrice={model.price_usd_min} />

                    <div className="space-y-4 pt-6">
                        <button className="w-full py-5 bg-foreground text-background text-lg uppercase tracking-widest hover:bg-white/90 transition-colors">
                            Reserve Now
                        </button>
                        <p className="text-xs text-center text-foreground/30">
                            $1,000 refundable deposit secures your production slot.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
