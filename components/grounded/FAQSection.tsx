'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        category: "General",
        items: [
            {
                q: "Do I own the land?",
                a: "If you purchase a unit for your own land, yes. If you join our network as a partner, you retain land ownership while we manage the asset. For travelers/renters, you simply book a stay."
            },
            {
                q: "Is it truly off-grid?",
                a: "Yes. Every unit comes standard with a 15kWh solar array, 30kWh LiFePO4 battery storage, and 3000L water catchment/filtration system. You can connect to utilities if desired, but it's not required."
            }
        ]
    },
    {
        category: "Technical",
        items: [
            {
                q: "How does waste management work?",
                a: "We use advanced incineration or composting toilets depending on the model, along with greywater recycling for irrigation. Zero blackwater discharge options are available for sensitive ecosystems."
            },
            {
                q: "What about internet?",
                a: "All units are pre-wired for Starlink. We offer a 'Digital Nomad' package that includes the hardware and mesh network setup for 200Mbps+ speeds anywhere on the planet."
            }
        ]
    },
    {
        category: "Financial",
        items: [
            {
                q: "Can I finance the unit?",
                a: "We offer in-house financing for up to 50% of the unit cost for qualified buyers. We also partner with sustainable lending institutions for land+unit packages."
            },
            {
                q: "What is the warranty?",
                a: "We offer a 10-year structural warranty on the steel chassis and shell, and a 2-year comprehensive warranty on all internal systems and finishes."
            }
        ]
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    const toggle = (id: string) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    return (
        <section className="py-24 px-8 bg-neutral-900/50 border-t border-white/5">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl font-light">Frequently Asked Questions</h2>
                    <p className="text-neutral-400">Everything you need to know about autonomous living.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                    {faqs.map((category, catIdx) => (
                        <div key={catIdx} className="space-y-6">
                            <h3 className="text-sm font-medium uppercase tracking-widest text-accent mb-6 border-b border-white/10 pb-2">
                                {category.category}
                            </h3>
                            <div className="space-y-4">
                                {category.items.map((item, itemIdx) => {
                                    const id = `${catIdx}-${itemIdx}`;
                                    const isOpen = openIndex === id;

                                    return (
                                        <div key={itemIdx} className="border border-white/5 rounded-lg bg-white/[0.02] overflow-hidden">
                                            <button
                                                onClick={() => toggle(id)}
                                                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                                            >
                                                <span className="font-light text-white/90">{item.q}</span>
                                                {isOpen ? <Minus size={16} className="text-accent shrink-0" /> : <Plus size={16} className="text-neutral-500 shrink-0" />}
                                            </button>
                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="p-4 pt-0 text-sm text-neutral-400 leading-relaxed">
                                                            {item.a}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
