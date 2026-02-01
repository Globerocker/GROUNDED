import { createClient } from '@/lib/supabase/server';
import WaitlistForm from '@/components/grounded/WaitlistForm';
import { CheckCircle2, ShieldCheck, Lock } from 'lucide-react';
import Image from 'next/image';

export default async function ReservePage() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-24 px-6">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24">

                {/* Left: Value Prop & Summary */}
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-light mb-4">Secure your unit.</h1>
                        <p className="text-xl text-neutral-400 font-light">
                            You are observing the start of a housing revolution. Production slots are limited.
                        </p>
                    </div>

                    <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 space-y-6">
                        <div className="flex items-start gap-4 pb-6 border-b border-white/5">
                            <div className="relative w-24 h-24 bg-neutral-800 rounded-lg overflow-hidden shrink-0">
                                <Image src="/images/model_a_exterior_1769883040320.png" alt="Model A" fill className="object-cover" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-white">Grounded Unit Reservation</h3>
                                <p className="text-sm text-neutral-400 mt-1">Ref: PRE-ORDER-2026</p>
                                <div className="mt-2 inline-flex items-center gap-2 px-2 py-1 bg-emerald-500/10 text-emerald-500 text-xs rounded border border-emerald-500/20">
                                    <CheckCircle2 size={12} />
                                    <span>Fully Refundable Deposit</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-sm font-medium uppercase tracking-widest text-neutral-500">What's included</h4>
                            <ul className="space-y-3">
                                {[
                                    "Priority production slot allocation",
                                    "Site feasibility consultation (Remote)",
                                    "Customization suite access",
                                    "Direct line to dedicated project manager"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-neutral-300">
                                        <CheckCircle2 size={16} className="text-accent shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-neutral-500">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={14} />
                            <span>SSL Secure</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Lock size={14} />
                            <span>Encrypted Data</span>
                        </div>
                    </div>
                </div>

                {/* Right: Action Form */}
                <div className="bg-neutral-900/50 border border-white/5 p-8 rounded-3xl backdrop-blur-sm">
                    <h2 className="text-2xl font-light mb-8">Start your inquiry</h2>
                    {/* Using the existing form but wrapped in a 'checkout' context */}
                    <WaitlistForm />
                    <p className="text-xs text-center text-neutral-500 mt-6">
                        No immediate payment required. We will review your application and contact you for the next steps.
                    </p>
                </div>
            </div>
        </main>
    );
}
