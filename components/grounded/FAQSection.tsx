'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

// Split into Left and Right columns for balanced layout
const leftColumnFaqs = [
    {
        category: "Ownership & Asset",
        items: [
            {
                q: "What does 'Autonomous Living Infrastructure' really mean?",
                a: "It means true independence without sacrificing luxury. Every Grounded unit is a self-contained ecosystem with hospital-grade water filtration, 15kWh+ solar energy storage, and satellite connectivity. You do not need to connect to a municipal grid to live comfortably. This unlocks land that was previously undevelopable—turning zero-value land into premium real estate."
            },
            {
                q: "Do I own the land or just the unit?",
                a: "You own the asset (the unit). If you deploy it on your own property, you own 100% of the equity. If you join our 'Grounded Network' as a land partner, you retain title to your land while we deploy units. For buyers, we offer fractionalized ownership in our managed resort locations."
            },
            {
                q: "How does the reservation process work?",
                a: "Reservation secures your production slot with a fully refundable deposit ($1,000). Once reserved, yyou are assigned a Deployment Manager. Our 'White Glove' service includes site preparation, foundation installation, and system commissioning. Typical timeline: 12-16 weeks."
            }
        ]
    }
];

const rightColumnFaqs = [
    {
        category: "Technology & Performance",
        items: [
            {
                q: "Can I live off-grid indefinitely?",
                a: "Yes. The system is designed for 99.9% uptime. Solar arrays are paired with massive 30kWh LiFePO4 battery banks. Water is harvested from rain or delivered to 3000L cisterns, then purified via UV and reverse osmosis. You have the power of a modern home anywhere."
            },
            {
                q: "How is waste handled?",
                a: "We use 'Cinderella' incineration toilets that reduce waste to sterile ash (emptied weekly) or biological septic systems depending on location. Greywater is recycled for irrigation, creating a net-positive environmental impact."
            },
            {
                q: "Is it hurricane / earthquake safe?",
                a: "Absolutely. The steel exoskeleton is rated for 150mph winds and high seismic activity. The localized production allows us to adapt insulation—'Nordic' for arctic cold, 'Equator' for passive cooling."
            }
        ]
    },
    {
        category: "Financials",
        items: [
            {
                q: "ROI & Financing options?",
                a: "Units can generate 15-20% net annual yields as short-term rentals due to their unique locations. We offer financing terms up to 20 years with 20% down. We also accept crypto settlements."
            }
        ]
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    const toggle = (id: string) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    const renderFaqGroup = (groups: typeof leftColumnFaqs, colPrefix: string) => (
        <div className="space-y-12">
            {groups.map((group, gIdx) => (
                <div key={gIdx} className="space-y-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full" />
                        {group.category}
                    </h3>
                    <div className="space-y-4">
                        {group.items.map((item, i) => {
                            const id = `${colPrefix}-${gIdx}-${i}`;
                            const isOpen = openIndex === id;
                            return (
                                <div key={i} className="border border-white/5 rounded-sm bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                                    <button
                                        onClick={() => toggle(id)}
                                        className="w-full flex items-start justify-between p-5 text-left"
                                    >
                                        <span className="font-light text-white/90 text-sm md:text-base pr-4 leading-normal">{item.q}</span>
                                        {isOpen ? <Minus size={14} className="text-accent shrink-0 mt-1" /> : <Plus size={14} className="text-neutral-500 shrink-0 mt-1" />}
                                    </button>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-5 pt-0 text-sm text-neutral-400 leading-relaxed font-light">
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
    );

    return (
        <section className="py-32 px-8 bg-neutral-900/30 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div className="space-y-4 max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-light">Questions &<br />Specifications</h2>
                        <p className="text-neutral-500 text-lg font-light">
                            Detailed insights into the hardware, legalities, and financials of autonomous ownership.
                        </p>
                    </div>
                    <div>
                        <a href="/contact" className="inline-block px-8 py-3 bg-white text-black hover:bg-neutral-200 transition-colors uppercase tracking-widest text-xs rounded-full">
                            Contact Engineering
                        </a>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-16 md:gap-24 relative">
                    {/* Vertical Divider */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2" />

                    {renderFaqGroup(leftColumnFaqs, 'left')}
                    {renderFaqGroup(rightColumnFaqs, 'right')}
                </div>
            </div>
        </section>
    );
}
