import { ArrowRight, Shield, Globe, Zap, Heart } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-neutral-900/50 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(/premium_desert_hero_1769977835499.png)' }}
                />
                <div className="relative z-20 text-center max-w-4xl px-6">
                    <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight text-white">
                        Beyond the <span className="text-accent italic">Grid</span>.
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto">
                        Permanent infrastructure for those who refuse to be tethered to fragile systems.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">
                {/* Mission Statement */}
                <section className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-sm font-medium uppercase tracking-widest text-accent">Our Mission</h2>
                        <h3 className="text-4xl font-light leading-tight">
                            We build resilience <br />
                            into real estate.
                        </h3>
                        <p className="text-lg text-foreground/70 leading-relaxed">
                            Grounded was born from a simple realization: true freedom requires physical independence.
                            We provide secure, fee-simple ownership of modular housing infrastructure in jurisdictions
                            that prioritize property rights.
                        </p>
                        <p className="text-lg text-foreground/70 leading-relaxed">
                            This is not just a vacation home. It is a lifeboat. A headquarters. A legacy asset
                            that operates completely independently of the municipal grid.
                        </p>
                    </div>
                    <div className="relative aspect-square md:aspect-[4/5] bg-neutral-900 rounded-lg overflow-hidden border border-white/5">
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-80"
                            style={{ backgroundImage: 'url(/settlement_aerial_forest_1769977872697.png)' }}
                        />
                    </div>
                </section>

                {/* Core Values Grid */}
                <section className="space-y-12">
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                        <h2 className="text-3xl font-light">The Grounded Philosophy</h2>
                        <p className="text-foreground/60">Built on principles of permanence, transparency, and autonomy.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Shield,
                                title: "Sovereignty",
                                desc: "Owning your power, water, and data infrastructure means you are not subject to the failures of the state."
                            },
                            {
                                icon: Globe,
                                title: "Global Access",
                                desc: "We select locations based on geopolitical stability, flight connectivity, and natural beauty."
                            },
                            {
                                icon: Zap,
                                title: "Energy Independence",
                                desc: "Every unit generates 200% of its daily energy consumption, ensuring you never experience a blackout."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors rounded-xl space-y-4 group">
                                <item.icon className="w-10 h-10 text-accent opacity-80 group-hover:opacity-100 transition-opacity" />
                                <h3 className="text-xl font-medium">{item.title}</h3>
                                <p className="text-foreground/70 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Team / Culture - "Lively" Element */}
                <section className="bg-accent/5 rounded-2xl p-12 md:p-24 text-center space-y-8 relative overflow-hidden">
                    {/* Abstract decorative circles */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

                    <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                        <Heart className="w-12 h-12 text-accent mx-auto" />
                        <h2 className="text-4xl md:text-5xl font-light">"We are not selling houses. <br /> We are selling peace of mind."</h2>
                        <div className="flex items-center justify-center space-x-4">
                            <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center text-xs font-bold border border-white/10">JD</div>
                            <div className="text-left">
                                <div className="font-medium">John Doe</div>
                                <div className="text-sm text-foreground/60">Founder & CEO</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center space-y-8 pb-24">
                    <h2 className="text-3xl font-light">Ready to secure your future?</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/models" className="px-8 py-4 bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors rounded-full">
                            Explore Models
                        </Link>
                        <Link href="/waitlist" className="px-8 py-4 border border-foreground/20 hover:border-foreground hover:bg-foreground/5 transition-all rounded-full">
                            Join the Waitlist
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}
