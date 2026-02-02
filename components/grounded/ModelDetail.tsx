'use client';

import Image from 'next/image';
import Link from 'next/link';
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

    const getFallbackImages = (name: string) => {
        if (name.includes('Model A')) return ['/images/models/model_a_exterior_1769883040320.png', '/images/models/model_a_interior_1769883053783.png'];
        if (name.includes('Model B')) return ['/images/models/model_b_exterior_1769883069908.png', '/images/models/model_b_interior_1769883084425.png'];
        if (name.includes('Model C')) return ['/images/models/model_c_exterior_1769883099326.png', '/images/models/model_c_interior_1769883111015.png'];
        if (name.includes('Model D')) return ['/images/models/model_d_exterior_1769883126934.png', '/images/models/model_d_interior_1769883142529.png'];
        return [];
    };

    const floorPlan = getFloorPlan(model.name);
    const displayImages = (model.images && model.images.length > 0) ? model.images : getFallbackImages(model.name);

    return (
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 min-h-[80vh]">
            {/* LEFT COL: Scrollable Gallery & Specs (7/12) */}
            <div className="lg:col-span-7 space-y-12">
                {/* Main Hero Image */}
                <div className="aspect-[4/3] relative bg-neutral-900 overflow-hidden rounded-sm group">
                    {displayImages[0] ? (
                        <Image src={displayImages[0]} alt={model.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-white/20">No Image</div>
                    )}
                    <div className="absolute bottom-4 left-4 flex gap-2">
                        <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-xs uppercase tracking-widest text-white border border-white/10">12.2m x 3.9m</span>
                        <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-xs uppercase tracking-widest text-white border border-white/10">{model.size_sqm_min}m² Total</span>
                    </div>
                </div>

                {/* Secondary Images Grid */}
                {displayImages.length > 1 && (
                    <div className="grid grid-cols-2 gap-4">
                        {displayImages.slice(1).map((img, idx) => (
                            <div key={idx} className="aspect-[16/9] relative bg-neutral-900 overflow-hidden rounded-sm group">
                                <Image src={img} alt={`${model.name} Detail ${idx}`} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Spatial Layout (Areas) */}
                <div className="space-y-6">
                    <h3 className="text-xl font-light border-b border-white/10 pb-4">Spatial Layout</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="relative aspect-square border border-white/10 bg-white/5 p-4 hover:border-accent/50 transition-colors">
                                <Image
                                    src={floorPlan}
                                    alt="Floor Plan"
                                    fill
                                    className="object-contain invert dark:invert-0 opacity-90 p-2"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-xs uppercase tracking-widest text-foreground/50 mb-4">Module Zones</h4>
                            <ol className="list-decimal list-inside space-y-3 text-sm text-foreground/80">
                                <li>Master Bedroom <span className="text-foreground/40 float-right">12m²</span></li>
                                <li>Full Bathroom <span className="text-foreground/40 float-right">4.5m²</span></li>
                                <li>Kitchen & Dining <span className="text-foreground/40 float-right">14m²</span></li>
                                <li>Living Area <span className="text-foreground/40 float-right">10m²</span></li>
                                <li>Wash/Utility Closet</li>
                                <li>Coffee Station / Bar</li>
                                <li>Dressing Table / Vanity</li>
                                <li>External Deck / Aisle</li>
                            </ol>
                        </div>
                    </div>
                </div>

                {/* Finishes & Inclusions */}
                <div className="space-y-6">
                    <h3 className="text-xl font-light border-b border-white/10 pb-4">Specifications & Finishes</h3>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Interior */}
                        <div className="space-y-6">
                            <h4 className="flex items-center space-x-2 text-accent">
                                <span className="w-2 h-2 bg-accent rounded-full" />
                                <span className="text-sm uppercase tracking-widest">Interior</span>
                            </h4>
                            <ul className="space-y-4 text-sm text-foreground/70">
                                <li className="space-y-1">
                                    <span className="block text-foreground font-medium">Flooring</span>
                                    <span>Polished concrete / Wide-plank engineered oak</span>
                                </li>
                                <li className="space-y-1">
                                    <span className="block text-foreground font-medium">Kitchen</span>
                                    <span>Matte black cabinetry, quartz stone countertops, integrated appliances</span>
                                </li>
                                <li className="space-y-1">
                                    <span className="block text-foreground font-medium">Bathroom</span>
                                    <span>Rainfall shower, backlit vanity mirror, stone resin basin</span>
                                </li>
                                <li className="space-y-1">
                                    <span className="block text-foreground font-medium">Walls</span>
                                    <span>Venetian plaster / Natural clay paint</span>
                                </li>
                            </ul>
                        </div>

                        {/* Exterior */}
                        <div className="space-y-6">
                            <h4 className="flex items-center space-x-2 text-accent">
                                <span className="w-2 h-2 bg-accent rounded-full" />
                                <span className="text-sm uppercase tracking-widest">Exterior</span>
                            </h4>
                            <ul className="space-y-4 text-sm text-foreground/70">
                                <li className="space-y-1">
                                    <span className="block text-foreground font-medium">Facade</span>
                                    <span>Viroc cement bonded particle board / Shou Sugi Ban timber</span>
                                </li>
                                <li className="space-y-1">
                                    <span className="block text-foreground font-medium">Glazing</span>
                                    <span>Double-glazed, argon filled, thermally broken aluminum frames</span>
                                </li>
                                <li className="space-y-1">
                                    <span className="block text-foreground font-medium">Decking</span>
                                    <span>Sustainable composite or hardwoods</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4 mt-8">
                        <h4 className="text-sm uppercase tracking-widest text-foreground/60">Included Engineering</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                            <div className="flex items-center space-x-2">
                                <div className="w-1 h-1 bg-accent" /> <span>Plumbing Systems</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-1 h-1 bg-accent" /> <span>Electrical Grid (Solar Ready)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-1 h-1 bg-accent" /> <span>HVAC / Mini-split</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-1 h-1 bg-accent" /> <span>Smart Home Hub</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-1 h-1 bg-accent" /> <span>Water Filtration</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-1 h-1 bg-accent" /> <span>Thermal Insulation (R-30+)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add-ons Section */}
                <div className="space-y-6 pt-12 border-t border-white/10">
                    <h3 className="text-2xl font-light">Modular Add-ons</h3>
                    <p className="text-foreground/60 max-w-lg">Enhance your property with plug-and-play modules.</p>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="border border-white/10 bg-white/5 space-y-4 hover:border-accent transition-colors group cursor-pointer">
                            <div className="aspect-[4/3] bg-black/40 relative overflow-hidden flex items-center justify-center">
                                <div className="text-center p-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                                        <span className="text-xl">🏋️</span>
                                    </div>
                                    <span className="text-xs uppercase tracking-widest text-white/50">Gym Module</span>
                                </div>
                            </div>
                            <div className="p-4 pt-0">
                                <h4 className="font-medium">Private Gym Pod</h4>
                                <p className="text-xs text-foreground/60 mt-1">Glass-walled fitness container. 15m².</p>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-accent text-sm">+$18,000</span>
                                    <span className="text-xs text-foreground/40 underline">View Specs</span>
                                </div>
                            </div>
                        </div>
                        <div className="border border-white/10 bg-white/5 space-y-4 hover:border-accent transition-colors group cursor-pointer">
                            <div className="aspect-[4/3] bg-black/40 relative overflow-hidden flex items-center justify-center">
                                <div className="text-center p-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                                        <span className="text-xl">🧖</span>
                                    </div>
                                    <span className="text-xs uppercase tracking-widest text-white/50">Sauna Module</span>
                                </div>
                            </div>
                            <div className="p-4 pt-0">
                                <h4 className="font-medium">Nordic Sauna</h4>
                                <p className="text-xs text-foreground/60 mt-1">Cedar barrel, 4-person capacity.</p>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-accent text-sm">+$12,500</span>
                                    <span className="text-xs text-foreground/40 underline">View Specs</span>
                                </div>
                            </div>
                        </div>
                        <div className="border border-white/10 bg-white/5 space-y-4 hover:border-accent transition-colors group cursor-pointer">
                            <div className="aspect-[4/3] bg-black/40 relative overflow-hidden flex items-center justify-center">
                                <div className="text-center p-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                                        <span className="text-xl">🧊</span>
                                    </div>
                                    <span className="text-xs uppercase tracking-widest text-white/50">Recovery Module</span>
                                </div>
                            </div>
                            <div className="p-4 pt-0">
                                <h4 className="font-medium">Chiller Plunge</h4>
                                <p className="text-xs text-foreground/60 mt-1">Pro-grade chiller, 3°C capability.</p>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-accent text-sm">+$5,000</span>
                                    <span className="text-xs text-foreground/40 underline">View Specs</span>
                                </div>
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
                        <Link
                            href={`/reservation?model_id=${model.id}`}
                            className="block w-full text-center py-5 bg-foreground text-background text-lg uppercase tracking-widest hover:bg-white/90 transition-colors"
                        >
                            Reserve Now
                        </Link>
                        <p className="text-xs text-center text-foreground/30">
                            $1,000 refundable deposit secures your production slot.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
