'use client';

import { useState } from 'react';

const faqs = [
    {
        category: 'Ownership & Legal',
        questions: [
            {
                q: 'Do I actually own the property?',
                a: 'You own the modular housing unit outright. Land access is secured through a yearly usage fee paid to the landholder. See our Ownership Model page for full details.',
            },
            {
                q: 'Is this legal for foreigners?',
                a: 'Yes. Mexican law permits foreign ownership of property under specific conditions. Our structure complies with federal and state regulations.',
            },
            {
                q: 'What happens if I stop paying the yearly fee?',
                a: 'Failure to pay results in loss of land access rights. The unit remains your property but must be removed from the plot.',
            },
            {
                q: 'Can I resell my unit?',
                a: 'Yes, subject to landholder approval of the new owner and transfer of the land usage agreement.',
            },
        ],
    },
    {
        category: 'Construction & Delivery',
        questions: [
            {
                q: 'How long until my unit is ready?',
                a: '8-12 weeks from contract execution to habitable completion.',
            },
            {
                q: 'What materials are used?',
                a: 'Concrete, steel, and wood. All units include high-grade insulation and impact-resistant windows.',
            },
            {
                q: 'Can I customize the interior?',
                a: 'Interior modifications are permitted post-delivery, subject to structural limitations. Exterior modifications require landholder approval.',
            },
            {
                q: 'Is the unit relocatable?',
                a: 'Yes. The modular design allows for disassembly and relocation. Relocation costs are your responsibility.',
            },
        ],
    },
    {
        category: 'Location & Infrastructure',
        questions: [
            {
                q: 'Are utilities included?',
                a: 'Basic infrastructure (water access, electrical connection points) is included. Utilities usage is billed separately by local providers.',
            },
            {
                q: 'How far from the nearest airport?',
                a: 'All locations are within 25-60 minutes of an international airport.',
            },
            {
                q: 'Can I visit before purchasing?',
                a: 'Yes. Contact us to arrange site visits at your expense.',
            },
            {
                q: 'What about internet access?',
                a: 'Most locations have LTE coverage. Satellite internet is available as an optional add-on.',
            },
        ],
    },
    {
        category: 'Payments & Fees',
        questions: [
            {
                q: 'What payment methods are accepted?',
                a: 'Wire transfer (preferred), ACH, or cryptocurrency. Card payments are not accepted.',
            },
            {
                q: 'Are there hidden fees?',
                a: 'No. All costs (house, add-ons, yearly land fee) are disclosed upfront.',
            },
            {
                q: 'Can I finance the purchase?',
                a: 'We do not offer financing. Payment is due in two installments: 50% at contract, 50% before installation.',
            },
            {
                q: 'What currency are prices in?',
                a: 'USD. Payments can be made in USD, EUR, or BTC at current exchange rates.',
            },
        ],
    },
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
        const key = `${categoryIndex}-${questionIndex}`;
        setOpenIndex(openIndex === key ? null : key);
    };

    return (
        <main className="min-h-screen px-8 py-16">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-4">
                    <h1>Frequently Asked Questions</h1>
                    <p className="text-xl text-foreground/80">
                        Answers to common questions about Grounded.
                    </p>
                </div>

                <div className="space-y-12">
                    {faqs.map((category, catIndex) => (
                        <section key={catIndex} className="space-y-4">
                            <h2 className="text-2xl pb-2 border-b border-border">{category.category}</h2>
                            <div className="space-y-3">
                                {category.questions.map((item, qIndex) => {
                                    const key = `${catIndex}-${qIndex}`;
                                    const isOpen = openIndex === key;
                                    return (
                                        <div key={qIndex} className="border border-border">
                                            <button
                                                onClick={() => toggleQuestion(catIndex, qIndex)}
                                                className="w-full text-left p-4 hover:bg-accent/5 transition-colors flex justify-between items-center"
                                            >
                                                <span className="font-medium">{item.q}</span>
                                                <span className="text-foreground/60 text-xl">
                                                    {isOpen ? '−' : '+'}
                                                </span>
                                            </button>
                                            {isOpen && (
                                                <div className="px-4 pb-4 text-foreground/80">
                                                    {item.a}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </div>

                <section className="space-y-4 pt-8 border-t border-border">
                    <h2 className="text-2xl">Still have questions?</h2>
                    <p className="text-foreground/80">
                        Contact us directly for specific inquiries not covered here.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block px-6 py-3 border border-accent text-foreground hover:bg-accent/10 transition-colors"
                    >
                        Contact Us
                    </a>
                </section>
            </div>
        </main>
    );
}
