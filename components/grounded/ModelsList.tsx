'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

interface Model {
    id: string;
    name: string;
    description: string;
    size_sqm_min: number;
    size_sqm_max: number;
    price_usd_min: number;
    price_usd_max: number;
    bedrooms: number;
    // Add other fields as needed
}

// Map model names to their image filenames (mirrored from page.tsx for now to keep client sync)
const modelImages: Record<string, string[]> = {
    'Model A – Studio': [
        '/images/models/model_a_exterior_1769883040320.png',
        '/images/models/model_a_interior_1769883053783.png',
    ],
    'Model B – 1 Bedroom': [
        '/images/models/model_b_exterior_1769883069908.png',
        '/images/models/model_b_interior_1769883084425.png',
    ],
    'Model C – 2 Bedroom': [
        '/images/models/model_c_exterior_1769883099326.png',
        '/images/models/model_c_interior_1769883111015.png',
    ],
    'Model D – 3 Bedroom': [
        '/images/models/model_d_exterior_1769883126934.png',
        '/images/models/model_d_interior_1769883142529.png',
    ],
};

export default function ModelsList({ models, plotId }: { models: Model[], plotId?: string }) {
    return (
        <div className="space-y-32 py-24">
            {models.map((model, index) => {
                const isEven = index % 2 === 0;
                const images = modelImages[model.name] || [];
                const href = plotId ? `/models/${model.id}?plot_id=${plotId}` : `/models/${model.id}`;

                return (
                    <motion.div
                        key={model.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center group`}
                    >
                        {/* Image Side */}
                        <div className="w-full md:w-1/2 relative">
                            <Link href={href} className="block overflow-hidden relative aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3]">
                                <div className="absolute inset-0 bg-accent/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                {images[0] && (
                                    <Image
                                        src={images[0]}
                                        alt={model.name}
                                        fill
                                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                    />
                                )}
                                {/* Floating Label */}
                                <div className="absolute bottom-8 left-8 z-20 overflow-hidden">
                                    <motion.div
                                        initial={{ y: "100%" }}
                                        whileInView={{ y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2, duration: 0.5 }}
                                        className="text-9xl font-bold opacity-10 text-white leading-none absolute -bottom-12 -left-4 select-none"
                                    >
                                        0{index + 1}
                                    </motion.div>
                                </div>
                            </Link>
                        </div>

                        {/* Content Side */}
                        <div className="w-full md:w-1/2 space-y-8 px-4 md:px-0">
                            <div className="space-y-4">
                                <h2 className="text-5xl md:text-7xl font-light tracking-tight">{model.name.split('–')[0]}</h2>
                                <p className="text-xl md:text-2xl font-light text-accent">{model.name.split('–')[1]}</p>
                            </div>

                            <p className="text-lg text-foreground/70 leading-relaxed max-w-md">
                                {model.description}
                            </p>

                            <div className="grid grid-cols-2 gap-8 py-8 border-t border-border/30">
                                <div>
                                    <div className="text-xs uppercase tracking-widest text-foreground/40 mb-1">Footprint</div>
                                    <div className="text-2xl">{model.size_sqm_min} - {model.size_sqm_max} <span className="text-sm align-top">sqm</span></div>
                                </div>
                                <div>
                                    <div className="text-xs uppercase tracking-widest text-foreground/40 mb-1">Investment</div>
                                    <div className="text-2xl">${(model.price_usd_min / 1000).toFixed(0)}k <span className="text-sm align-top">USD</span></div>
                                </div>
                            </div>

                            <Link
                                href={href}
                                className="inline-block border border-foreground/20 px-8 py-4 uppercase tracking-widest text-xs hover:bg-foreground hover:text-background transition-all duration-300"
                            >
                                Explore Model
                            </Link>
                        </div>
                    </motion.div>
                );
            })}

            {/* Build Your Own / Custom Option */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col md:flex-row gap-12 md:gap-24 items-center group pt-12 border-t border-dashed border-border/30"
            >
                <div className="w-full md:w-1/2 relative">
                    <Link href={plotId ? `/reservation?model_id=custom&plot_id=${plotId}` : `/reservation?model_id=custom`} className="block overflow-hidden relative aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3] bg-neutral-900 border border-white/10 group-hover:border-accent/50 transition-colors">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-9xl font-thin text-white/5 group-hover:text-accent/20 transition-colors duration-500">+</span>
                        </div>
                        <div className="absolute bottom-8 left-8 z-20">
                            <div className="text-xl font-light text-white uppercase tracking-widest">Custom Project</div>
                        </div>
                    </Link>
                </div>
                <div className="w-full md:w-1/2 space-y-8 px-4 md:px-0">
                    <div className="space-y-4">
                        <h2 className="text-5xl md:text-7xl font-light tracking-tight">Build or Bring</h2>
                        <div className="text-xl md:text-2xl font-light text-accent">Your Own Architecture</div>
                    </div>
                    <p className="text-lg text-foreground/70 leading-relaxed max-w-md">
                        Have your own mobile unit, yurt, or custom project? Rent the plot and plug into our infrastructure.
                    </p>
                    <div className="grid grid-cols-2 gap-8 py-8 border-t border-border/30">
                        <div>
                            <div className="text-xs uppercase tracking-widest text-foreground/40 mb-1">Flexibility</div>
                            <div className="text-2xl">High</div>
                        </div>
                        <div>
                            <div className="text-xs uppercase tracking-widest text-foreground/40 mb-1">Fee</div>
                            <div className="text-2xl">Plot Lease <span className="text-sm align-top">Only</span></div>
                        </div>
                    </div>
                    <Link
                        href={plotId ? `/reservation?model_id=custom&plot_id=${plotId}` : `/reservation?model_id=custom`}
                        className="inline-block border border-foreground/20 px-8 py-4 uppercase tracking-widest text-xs hover:bg-foreground hover:text-background transition-all duration-300"
                    >
                        Select Option
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
