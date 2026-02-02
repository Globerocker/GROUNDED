'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        category: "Ownership & Asset",
        items: [
            {
                q: "What does 'Autonomous Living Infrastructure' actually mean?",
                a: "It means true independence without sacrificing luxury. Every Grounded unit is a self-contained ecosystem. We integrate hospital-grade water filtration, 15kWh+ solar energy storage, and satellite connectivity directly into the chassis. You physically do not need to connect to a municipal grid to live comfortably. This unlocks land that was previously undevelopable—mountain peaks, desert canyons, and remote coastlines—turning zero-value land into premium real estate."
            },
            {
                q: "Do I own the land or just the unit?",
                a: "You own the asset. If you deploy a Grounded unit on your own property, you own 100% of the vertical and horizontal equity. If you join our 'Grounded Network' as a land partner, you retain title to your land while we deploy units at our cost, sharing the booking revenue with you. For buyers looking for investment capability without land management, we offer fractionalized ownership in our managed resort locations."
            },
            {
                q: "How does the reservation and delivery process work?",
                a: "Reservation secures your production slot with a fully refundable deposit. Once reserved, you'll be assigned a dedicated Deployment Manager who handles site assessment, permitting, and logistics. Our 'White Glove' delivery service includes site preparation (screw pile foundation), crane installation, and system commissioning. From reservation to keys-in-hand, the timeline is typically 12-16 weeks."
            }
        ]
    },
    {
        category: "Technology & Specs",
        items: [
            {
                q: "Can I truly live off-grid indefinitely?",
                a: "Yes. The system is designed for 99.9% uptime. Our solar arrays are oversized relative to load, paired with massive 30kWh LiFePO4 battery banks (expandable). Water is harvested from rain or delivered via truck to the 3000L internal cisterns, then purified through a 3-stage UV and reverse osmosis system. You have the power of a suburban home in the middle of nowhere."
            },
            {
                q: "How do you handle waste and sewage?",
                a: "We use a proprietary hidden incineration system ('Cinderella' technology) that reduces organic waste to sterile ash—maintenance is as simple as emptying a tray once a week. For greywater (showers/sinks), we employ a biological filtration planter technique that safely recycles water back into the immediate landscape, actually improving the local soil microbiome."
            },
            {
                q: "Is it suitable for extreme climates?",
                a: "Absolutely. The localized production allows us to adapt insulation ratings. Our 'Nordic' package features R-40 insulation and triple-glazed windows for arctic conditions, while our 'Equator' package optimizes airflow and passive cooling. The steel exoskeleton is rated for 150mph hurricane winds and high seismic activity."
            }
        ]
    },
    {
        category: "Financials",
        items: [
            {
                q: " What is the expected ROI for rental units?",
                a: "Because Grounded units can be placed in unique, high-demand locations that traditional hotels cannot reach, they command significant premiums. Our network averages an ADR (Average Daily Rate) of $350-$800 depending on location. With lower operating costs (no utility bills), net yields often exceed 15-20% annually. Use our ROI Calculator to model your specific scenario."
            },
            {
                q: "Do you offer financing?",
                a: "We have partnered with forward-thinking lenders who understand that the future of real estate is modular and sustainable. We offer terms up to 20 years with as little as 20% down for qualified buyers. We also accept crypto settlements for full asset purchases."
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
