import { MapPin, Home, FileCheck, Truck, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorksPage() {
    const steps = [
        {
            id: 1,
            title: "Select Location",
            desc: "Browse our network of vetted land partners. Every site is pre-approved for modular deployment, with soil tests and access roads already in place.",
            icon: MapPin,
            color: "text-blue-400"
        },
        {
            id: 2,
            title: "Configure Model",
            desc: "Choose from our four base models (28-80m²). Add off-grid packages like solar carports, Starlink, or water catchment systems.",
            icon: Home,
            color: "text-orange-400"
        },
        {
            id: 3,
            title: "Reserve & Contract",
            desc: "Secure your production slot with a deposit. We handle the permitting and land-use agreements directly with the local municipality.",
            icon: FileCheck,
            color: "text-green-400"
        },
        {
            id: 4,
            title: "Construction & Delivery",
            desc: "Your unit is built in our controlled factory environment. We transport it to site and install it on screw piles in just 3-5 days.",
            icon: Truck,
            color: "text-yellow-400"
        }
    ];

    return (
        <main className="min-h-screen bg-background text-foreground pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-6xl mx-auto space-y-24">
                {/* Header */}
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-light tracking-tight">
                        Seamless <span className="text-accent italic">Deployment</span>.
                    </h1>
                    <p className="text-xl text-foreground/70">
                        We have removed the headache of traditional construction.
                        No architects, no contractors, no delays. Just pick a spot and plug in.
                    </p>
                </div>

                {/* Steps Blocks */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step) => (
                        <div key={step.id} className="group bg-neutral-900/50 border border-white/10 p-8 rounded-sm hover:border-accent/50 hover:bg-neutral-900 transition-all duration-300">
                            <div className="flex justify-between items-start mb-6">
                                <step.icon className={`w-10 h-10 ${step.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                                <span className="text-5xl font-thin text-white/5 group-hover:text-white/10 transition-colors font-mono">0{step.id}</span>
                            </div>
                            <h3 className="text-lg font-medium mb-3 text-white">{step.title}</h3>
                            <p className="text-sm text-foreground/60 leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Detailed Breakdown */}
                <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-white/5">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-light">What's Included?</h2>
                        <ul className="space-y-4">
                            {[
                                "Structural engineering & architectural plans",
                                "Permitting & land-use compliance handling",
                                "Site preparation (grading & screw piles)",
                                "Transportation to site (up to 500km)",
                                "Crane installation & leveling",
                                "Utility connection & system commissioning"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center space-x-3 text-foreground/80">
                                    <CheckCircle size={20} className="text-accent shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10 space-y-6">
                        <h3 className="text-xl font-medium">Timeline Guarantee</h3>
                        <p className="text-foreground/70">
                            Because we build in a controlled factory environment, we are not subject to weather delays or labor shortages.
                        </p>
                        <div className="flex justify-between items-end border-b border-white/10 pb-2">
                            <span className="text-sm uppercase tracking-widest text-foreground/60">Typical Build Time</span>
                            <span className="text-2xl font-light text-accent">8 Weeks</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-white/10 pb-2">
                            <span className="text-sm uppercase tracking-widest text-foreground/60">Installation Time</span>
                            <span className="text-2xl font-light text-accent">3 Days</span>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center pt-12">
                    <Link href="/locations" className="inline-flex items-center space-x-2 px-8 py-4 bg-accent text-foreground font-medium rounded-full hover:bg-accent/90 transition-colors">
                        <span>Find Your Location</span>
                        <MapPin size={18} />
                    </Link>
                </div>
            </div>
        </main>
    );
}
