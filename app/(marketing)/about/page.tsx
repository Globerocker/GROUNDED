import { ArrowRight, Shield, Globe, Zap, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Hero Section - Parallax Effect Idea */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/premium_desert_hero_1769977835499.png"
                        alt="Desert Landscape"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="relative z-20 text-center max-w-5xl px-6 space-y-8">
                    <h1 className="text-6xl md:text-8xl font-thin tracking-tighter text-white">
                        ELEVATE <span className="text-accent italic font-serif">EXISTENCE</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto tracking-wide">
                        Infrastructure for the sovereign individual.
                    </p>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/50">
                    <div className="w-[1px] h-12 bg-white/50 mx-auto" />
                </div>
            </section>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-32 space-y-48">

                {/* Mission Module 1: The Why */}
                <section className="grid lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <span className="h-[1px] w-12 bg-accent" />
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">The Mission</h2>
                        </div>
                        <h3 className="text-5xl md:text-6xl font-light leading-[1.1]">
                            The grid is <br />
                            <span className="text-white/50">fragile.</span>
                        </h3>
                        <p className="text-xl text-neutral-400 leading-relaxed font-light">
                            We are witnessing the slow decay of centralized infrastructure. Power outages, water scarcity, and data surveillance are the new normal.
                        </p>
                        <p className="text-xl text-neutral-400 leading-relaxed font-light">
                            Grounded was built to offer an alternative. Not a bunker, but a beautiful, high-performance machine for living that grants you absolute physical autonomy.
                        </p>
                    </div>
                    <div className="relative aspect-[3/4] lg:aspect-square group overflow-hidden">
                        <Image
                            src="/settlement_aerial_forest_1769977872697.png"
                            alt="Sustainable Settlement"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-8 left-8 border-l-2 border-white pl-4">
                            <p className="text-white text-sm tracking-widest uppercase">Figure 01</p>
                            <p className="text-white/60 text-xs mt-1">Decentralized Settlement Node</p>
                        </div>
                    </div>
                </section>

                {/* Mission Module 2: The Philosophy */}
                <section className="relative py-24 border-y border-white/5">
                    <div className="text-center max-w-3xl mx-auto space-y-6 mb-24">
                        <h2 className="text-4xl font-light">The Grounded Standard</h2>
                        <p className="text-neutral-500">Built on three non-negotiable pillars.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: Shield,
                                title: "Sovereignty",
                                desc: "True ownership of your energy, water, and shelter systems. No utility bills. No dependencies."
                            },
                            {
                                icon: Globe,
                                title: "Freedom",
                                desc: "The ability to move your asset classes across jurisdictions. The home that travels with your lifestyle."
                            },
                            {
                                icon: Heart,
                                title: "Biophilia",
                                desc: "Design that reconnects you with biological rhythms. Circadian lighting, natural materials, and clean air."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group p-8 relative hover:bg-white/[0.02] transition-colors duration-500 border-l border-white/5 hover:border-accent/50">
                                <item.icon className="w-12 h-12 text-accent mb-6 stroke-[1px]" />
                                <h3 className="text-2xl font-light mb-4 text-white group-hover:text-accent transition-colors">{item.title}</h3>
                                <p className="text-neutral-500 leading-relaxed group-hover:text-neutral-400 transition-colors">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Team / Vision - Cinematic Layout */}
                <section className="grid lg:grid-cols-12 gap-12 items-end">
                    <div className="lg:col-span-8 relative aspect-video bg-neutral-900 overflow-hidden group">
                        <Image
                            src="/hero_image_check_1769977939131.png" // Reusing hero for cinematic feel
                            alt="Founder Vision"
                            fill
                            className="object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
                    </div>
                    <div className="lg:col-span-4 space-y-8 pb-8">
                        <Quote size={48} className="text-accent/50" />
                        <blockquote className="text-2xl font-light leading-relaxed text-white">
                            "We are not selling houses. We are selling the infrastructure for a free life."
                        </blockquote>
                        <div>
                            <div className="text-lg font-medium text-white">The Founders</div>
                            <div className="text-sm text-neutral-500 uppercase tracking-widest mt-1">Architecture & Engineering Team</div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="relative py-48 text-center overflow-hidden">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

                    <div className="relative z-10 space-y-12">
                        <h2 className="text-5xl md:text-7xl font-thin tracking-tighter">
                            SECURE YOUR <span className="text-accent font-serif italic">LEGACY</span>
                        </h2>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <Link
                                href="/models"
                                className="px-12 py-5 bg-white text-black text-sm font-bold uppercase tracking-[0.2em] hover:bg-neutral-200 transition-colors min-w-[240px]"
                            >
                                Explore Models
                            </Link>
                            <Link
                                href="/waitlist"
                                className="px-12 py-5 border border-white/20 text-white text-sm font-bold uppercase tracking-[0.2em] hover:bg-white/5 transition-all min-w-[240px]"
                            >
                                Join Waitlist
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}

// Simple icon wrapper if Lucide doesn't have a Quote icon in the current version or to style it
function Quote({ size, className }: { size?: number, className?: string }) {
    return (
        <svg
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 8.44772 5.01697 9V11C5.01697 11.5523 4.56925 12 4.01697 12H3.01697V5H13.017V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z" />
        </svg>
    )
}
