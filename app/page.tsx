'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
    Truck,
    Box,
    Map as MapIcon,
    ShieldCheck,
    Zap,
    Wifi
} from 'lucide-react';
import FAQSection from '@/components/grounded/FAQSection';

export default function Home() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

    return (
        <main ref={containerRef} className="bg-background text-foreground overflow-hidden">

            {/* 1. Parallax Hero */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <Image
                        src="/premium_desert_hero_1769977835499.png"
                        alt="Mexican High Desert"
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

                <div className="relative z-10 text-center space-y-6 max-w-4xl px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-6xl md:text-8xl font-light tracking-tighter text-white"
                    >
                        Own your fallback.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-xl md:text-2xl font-light text-white/80 max-w-2xl mx-auto"
                    >
                        Permanent infrastructure outside fragile systems.
                    </motion.p>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/40 text-sm animate-bounce">
                    SCROLL TO EXPLORE
                </div>
            </section>

            {/* 2. Trust Signals (Social Proof) */}
            <section className="py-12 border-b border-white/5 bg-neutral-900/50">
                <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Mock Logos for Authority */}
                    {['Monocle', 'Dwell', 'ArchDaily', 'Wired', 'Bloomberg'].map((brand, i) => (
                        <div key={i} className="text-xl font-serif italic text-foreground/80">{brand}</div>
                    ))}
                </div>
            </section>

            {/* 3. The Narrative: Why Own? */}
            <section className="py-32 px-8 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-4"
                        >
                            <h2 className="text-sm tracking-widest text-accent uppercase flex items-center gap-2">
                                <ShieldCheck size={16} />
                                The Problem
                            </h2>
                            <h3 className="text-4xl font-light leading-tight text-foreground/60">
                                Rent is temporary.<br />
                                Cities are fragile.<br />
                                Systems are strained.
                            </h3>
                        </motion.div>
                    </div>
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-4"
                        >
                            <h2 className="text-sm tracking-widest text-accent uppercase flex items-center gap-2">
                                <Zap size={16} />
                                The Solution
                            </h2>
                            <h3 className="text-4xl font-medium leading-tight text-foreground">
                                Ownership is permanent.<br />
                                Infrastructure is secured.<br />
                                Nature is resilient.
                            </h3>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 4. The Product: Logistics & Modularity - NEW */}
            <section className="py-32 bg-neutral-900 text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-24 items-center">
                    <div className="order-2 md:order-1 relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl border border-white/10">
                        {/* Use generated Truck Image */}
                        <Image
                            src="/logistics_truck_desert_1769977848559.png"
                            alt="Modular Unit Transport"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-6 left-6 flex items-center gap-4">
                            <div className="bg-black/50 backdrop-blur px-4 py-2 rounded text-xs border border-white/10 flex items-center gap-2">
                                <Truck size={14} className="text-accent" />
                                <span>Global Logistics Ready</span>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 space-y-8">
                        <h2 className="text-5xl font-light tracking-tight">Deploy anywhere.</h2>
                        <p className="text-xl text-white/60 font-light leading-relaxed">
                            Our proprietary modular system is designed for standard ISO logistics. If a truck can reach it, we can build it. Your asset is not just fixed real estate—it's a relocatable fortress.
                        </p>
                        <div className="grid grid-cols-2 gap-8 pt-4">
                            <div>
                                <div className="text-3xl font-light text-white">1 Day</div>
                                <div className="text-xs uppercase tracking-widest text-accent mt-1">Installation Time</div>
                            </div>
                            <div>
                                <div className="text-3xl font-light text-white">ISO</div>
                                <div className="text-xs uppercase tracking-widest text-accent mt-1">Standard Shipping</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. The Vision: Settlement - NEW */}
            <section className="relative h-[80vh] flex items-center justify-center bg-neutral-950">
                <div className="absolute inset-0 z-0 opacity-80">
                    {/* Use generated Settlement Image */}
                    <Image
                        src="/settlement_aerial_forest_1769977872697.png"
                        alt="Grounded Settlement Vision"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 z-10" />
                </div>
                <div className="relative z-20 text-center space-y-8 max-w-4xl px-4">
                    <h2 className="text-5xl md:text-7xl font-light text-white tracking-tighter drop-shadow-lg">The Final Vision</h2>
                    <p className="text-xl md:text-2xl font-light text-white/90 max-w-2xl mx-auto drop-shadow-md">
                        Join a network of sovereign settlements. Connected by values, separated by nature.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/locations" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black hover:bg-white/90 transition-colors uppercase tracking-widest text-sm rounded-full">
                            <MapIcon size={16} />
                            Explore Locations
                        </Link>
                    </div>
                </div>
            </section>

            {/* 6. Models Showcase */}
            <section className="py-32 bg-foreground/5 relative">
                <div className="px-8 max-w-7xl mx-auto mb-16 flex justify-between items-end">
                    <div>
                        <h2 className="text-4xl font-light mb-4">Architecture</h2>
                        <p className="text-foreground/60 max-w-md">Prefabricated precision. Designed for the landscape, not against it.</p>
                    </div>
                    <Link href="/models" className="text-accent hover:text-foreground transition-colors">View all models →</Link>
                </div>

                <div className="flex overflow-x-auto gap-8 px-8 pb-12 snap-x scrollbar-hide">
                    {[
                        { name: "Model A", size: "28 sqm", price: "$35k", img: "/interior_virtual_tour_living_1769905432339.png" }, // Use generated interior
                        { name: "Model B", size: "42 sqm", price: "$55k", img: "/images/interior_bedroom_nature_1769886262067.png" },
                        { name: "Model C", size: "60 sqm", price: "$75k", img: "/images/landscape_coast_moody_1769886288578.png" }
                    ].map((model, i) => (
                        <motion.div
                            key={i}
                            className="min-w-[85vw] md:min-w-[600px] snap-center relative group cursor-pointer"
                            whileHover={{ scale: 0.98 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Link href="/models" className="block aspect-[16/9] relative overflow-hidden bg-card rounded-xl">
                                <Image src={model.img} alt={model.name} fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                                <div className="absolute bottom-6 left-6 text-white space-y-1">
                                    <h3 className="text-2xl font-light">{model.name}</h3>
                                    <p className="text-sm text-white/70 flex items-center gap-3">
                                        <Box size={14} /> {model.size}
                                        <span className="w-1 h-1 bg-white/50 rounded-full" />
                                        Starting at {model.price}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 7. Integration Grid - NEW */}
            <section className="py-24 px-8 border-t border-white/5 bg-neutral-900/30">
                <div className="max-w-7xl mx-auto text-center space-y-16">
                    <h2 className="text-3xl font-light">Full-Stack Autonomy</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { icon: Zap, label: "Solar + Storage", desc: "3 Days Autonomy" },
                            { icon: Wifi, label: "Starlink Ready", desc: "Global Connectivity" },
                            { icon: Truck, label: "Relocatable", desc: "Move if you must" },
                            { icon: ShieldCheck, label: "Warranty", desc: "10-Year Structural" }
                        ].map((item, i) => (
                            <div key={i} className="p-6 border border-white/5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors group">
                                <item.icon size={32} className="mx-auto mb-4 text-neutral-500 group-hover:text-accent transition-colors" />
                                <div className="font-medium text-white mb-1">{item.label}</div>
                                <div className="text-xs text-neutral-500">{item.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. FAQs */}
            <FAQSection />

            {/* 9. Call to Action */}
            <section className="py-32 px-8 relative overflow-hidden bg-white text-black">
                <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-5xl md:text-7xl font-light tracking-tighter">Join the network.</h2>
                    <p className="text-xl md:text-2xl text-neutral-600 font-light max-w-2xl mx-auto leading-relaxed">
                        We are rapidly expanding our location network. Secure your unit or partner with your land.
                    </p>
                    <div className="flex flex-col md:flex-row gap-6 justify-center pt-8">
                        <Link href="/reserve" className="px-10 py-5 bg-black text-white hover:bg-neutral-800 transition-colors rounded-full text-lg tracking-wide shadow-xl hover:shadow-2xl hover:-translate-y-1 transform duration-300">
                            Reserve Unit
                        </Link>
                        <Link href="/land-partner" className="px-10 py-5 border border-black/20 hover:border-black hover:bg-black/5 transition-colors rounded-full text-lg tracking-wide">
                            Partner with Land
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    );
}
