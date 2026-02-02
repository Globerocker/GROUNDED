'use client';

import Link from 'next/link';

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-24 pb-16 px-6 md:px-12 bg-neutral-950 text-white">
            <div className="max-w-6xl mx-auto space-y-24">

                {/* Header */}
                <div className="space-y-6 max-w-3xl">
                    <h1 className="text-5xl md:text-7xl font-light tracking-tighter">Get in Touch</h1>
                    <p className="text-xl text-neutral-400 font-light">
                        Interested in a specific model or location? Our team of architects and logistic experts is ready to assist you.
                    </p>
                </div>

                {/* Contact Grid */}
                <div className="grid lg:grid-cols-2 gap-16">

                    {/* Form */}
                    <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-sm space-y-8">
                        <h2 className="text-2xl font-light">Send us a message</h2>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-neutral-500">First Name</label>
                                    <input type="text" className="w-full bg-neutral-900 border border-white/10 p-3 rounded-sm focus:border-accent outline-none transition-colors" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-neutral-500">Last Name</label>
                                    <input type="text" className="w-full bg-neutral-900 border border-white/10 p-3 rounded-sm focus:border-accent outline-none transition-colors" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-neutral-500">Email Address</label>
                                <input type="email" className="w-full bg-neutral-900 border border-white/10 p-3 rounded-sm focus:border-accent outline-none transition-colors" placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-neutral-500">Subject</label>
                                <select aria-label="Contact Subject" className="w-full bg-neutral-900 border border-white/10 p-3 rounded-sm focus:border-accent outline-none transition-colors text-neutral-400">
                                    <option>Sales Inquiry</option>
                                    <option>Partnership Proposal</option>
                                    <option>Press & Media</option>
                                    <option>General Support</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-neutral-500">Message</label>
                                <textarea rows={5} className="w-full bg-neutral-900 border border-white/10 p-3 rounded-sm focus:border-accent outline-none transition-colors" placeholder="How can we help you today?" />
                            </div>
                            <button type="button" className="w-full py-4 bg-accent text-black font-medium tracking-wide hover:bg-neutral-200 transition-colors uppercase text-sm">
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Offices & Inspect Info */}
                    <div className="space-y-16">

                        <div className="space-y-8">
                            <h3 className="text-xl font-light border-b border-white/10 pb-4">Global Offices</h3>
                            <div className="grid gap-8">
                                <div>
                                    <h4 className="font-medium text-lg">Los Angeles (HQ)</h4>
                                    <p className="text-neutral-500 mt-2">10250 Constellation Blvd,<br />Los Angeles, CA 90067</p>
                                    <p className="text-accent mt-2">+1 (310) 555-0123</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-lg">Mexico City</h4>
                                    <p className="text-neutral-500 mt-2">Av. Paseo de la Reforma 509,<br />Cuauhtémoc, 06500 CDMX</p>
                                    <p className="text-accent mt-2">+52 (55) 5555-0199</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h3 className="text-xl font-light border-b border-white/10 pb-4">Press & Partnerships</h3>
                            <p className="text-neutral-400">
                                For press inquiries, please email <a href="mailto:press@grounded.com" className="text-accent hover:underline">press@grounded.com</a>.
                            </p>
                            <p className="text-neutral-400">
                                Interested in becoming a land partner? <Link href="/how-it-works" className="text-accent hover:underline">Learn more about our partnership model</Link>.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </main>
    );
}
