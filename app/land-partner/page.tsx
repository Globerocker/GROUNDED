import { createClient } from '@/lib/supabase/server';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, DollarSign, Trees, Zap } from 'lucide-react';
import WaitlistForm from '@/components/grounded/WaitlistForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Invest Your Land | Grounded',
    description: 'Turn your raw land into a high-yield eco-tourism destination. We handle the infrastructure, you own the asset.',
};

export default async function LandPartnerPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-white">

            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/blog/investment.png" // Re-using the investment hero logic
                    alt="Land Investment"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-neutral-950" />

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium tracking-wide">
                        <DollarSign size={16} className="text-accent" />
                        <span>Partner Program Open</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-tight">
                        Monetize Your <span className="text-accent italic">Raw Land</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed">
                        Transform unused acreage into a premium off-grid destination.
                        We provide the infrastructure, technology, and management.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
                        <a href="#apply" className="px-8 py-4 bg-white text-black font-medium text-lg rounded-full hover:bg-neutral-200 transition-colors w-full md:w-auto">
                            Apply for Partnership
                        </a>
                        <a href="#how-it-works" className="px-8 py-4 bg-transparent border border-white/20 text-white font-medium text-lg rounded-full hover:bg-white/5 transition-colors w-full md:w-auto">
                            How it Works
                        </a>
                    </div>
                </div>
            </section>

            {/* Value Props */}
            <section id="how-it-works" className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="space-y-6 p-8 bg-neutral-900/30 border border-white/5 rounded-2xl">
                            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-2xl font-light">Rapid Deployment</h3>
                            <p className="text-neutral-400 leading-relaxed">
                                Traditional development takes years. Grounded units are deployed in weeks with minimal site impact.
                            </p>
                        </div>
                        <div className="space-y-6 p-8 bg-neutral-900/30 border border-white/5 rounded-2xl">
                            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500">
                                <Trees size={24} />
                            </div>
                            <h3 className="text-2xl font-light">Eco-Restorative</h3>
                            <p className="text-neutral-400 leading-relaxed">
                                Our "Touch Lightly" philosophy means your land stays pristine. No permanent foundations required.
                            </p>
                        </div>
                        <div className="space-y-6 p-8 bg-neutral-900/30 border border-white/5 rounded-2xl">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-500">
                                <DollarSign size={24} />
                            </div>
                            <h3 className="text-2xl font-light">High Yields</h3>
                            <p className="text-neutral-400 leading-relaxed">
                                Tap into the booming eco-tourism market. Earn 3x more than traditional long-term leases.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Split Section */}
            <section className="py-24 bg-neutral-900">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-light">We handle the hardware.<br />You own the asset.</h2>
                        <ul className="space-y-6">
                            {[
                                "Site feasibility analysis",
                                "Unit delivery & installation",
                                "Off-grid utility setup (Solar, Water, Starlink)",
                                "Booking & guest management (Optional)",
                                "Maintenance & security protocols"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <CheckCircle2 className="text-accent shrink-0 mt-1" size={20} />
                                    <span className="text-lg text-neutral-300 font-light">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative aspect-square">
                        <Image
                            src="/images/blog/tech-stack.png"
                            alt="Infrastructure"
                            fill
                            className="object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                </div>
            </section>

            {/* Application Section */}
            <section id="apply" className="py-32 px-6 bg-gradient-to-b from-neutral-950 to-neutral-900">
                <div className="max-w-xl mx-auto text-center space-y-12">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-light">Ready to Partner?</h2>
                        <p className="text-neutral-400">
                            Tell us about your land. We look for scenic locations with at least 1 acre of usable space.
                        </p>
                    </div>

                    <div className="bg-neutral-950 p-8 rounded-2xl border border-white/10 shadow-2xl">
                        {/* Reusing existing waitlist form component but contextually works */}
                        <WaitlistForm />
                        <p className="text-xs text-neutral-500 mt-4">
                            Select "Unsure" for model if just inquiring about land partnership.
                        </p>
                    </div>
                </div>
            </section>

        </main>
    );
}
