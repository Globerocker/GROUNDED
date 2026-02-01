export default function HowItWorksPage() {
    return (
        <main className="min-h-screen px-8 py-16">
            <div className="max-w-4xl mx-auto space-y-16">
                <div className="space-y-4">
                    <h1>How It Works</h1>
                    <p className="text-xl text-foreground/80">
                        From selection to ownership in four steps.
                    </p>
                </div>

                {/* Process Steps */}
                <section className="space-y-8">
                    <div className="space-y-6">
                        <div className="border-l-2 border-accent pl-6 space-y-3">
                            <div className="text-sm text-foreground/60">Step 1</div>
                            <h2 className="text-2xl">Select Location</h2>
                            <p className="text-foreground/80">
                                Browse available locations on our interactive map. Each location is within 60 minutes of an international airport and has verified infrastructure access.
                            </p>
                            <p className="text-foreground/80">
                                View plot availability, yearly usage fees, and proximity to transportation corridors.
                            </p>
                        </div>

                        <div className="border-l-2 border-accent pl-6 space-y-3">
                            <div className="text-sm text-foreground/60">Step 2</div>
                            <h2 className="text-2xl">Choose House Model</h2>
                            <p className="text-foreground/80">
                                Select from four modular housing models ranging from 28 to 80 square meters. All models use concrete, steel, and wood construction.
                            </p>
                            <p className="text-foreground/80">
                                Optional infrastructure add-ons: solar carport, water catchment, storage, internet.
                            </p>
                        </div>

                        <div className="border-l-2 border-accent pl-6 space-y-3">
                            <div className="text-sm text-foreground/60">Step 3</div>
                            <h2 className="text-2xl">Reserve & Contract</h2>
                            <p className="text-foreground/80">
                                Submit reservation through the platform. We verify plot availability and send contract documentation within 5 business days.
                            </p>
                            <p className="text-foreground/80">
                                Review contract terms, consult legal counsel if needed, execute agreement.
                            </p>
                        </div>

                        <div className="border-l-2 border-accent pl-6 space-y-3">
                            <div className="text-sm text-foreground/60">Step 4</div>
                            <h2 className="text-2xl">Construction & Delivery</h2>
                            <p className="text-foreground/80">
                                Units are manufactured off-site and delivered for installation. Timeline: 8-12 weeks from contract execution to completion.
                            </p>
                            <p className="text-foreground/80">
                                Final inspection, handover, access credentials provided.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Ownership Model */}
                <section className="space-y-6">
                    <h2 className="text-3xl">Ownership Structure</h2>
                    <div className="space-y-4 text-foreground/80 leading-relaxed">
                        <p>
                            Grounded operates on a separation between asset ownership and land access:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-6 border border-accent bg-accent/5">
                                <h3 className="font-medium mb-2">One-Time Purchase</h3>
                                <p className="text-sm">
                                    You own the modular housing unit. This is your permanent asset.
                                </p>
                                <p className="text-sm mt-2 text-foreground/60">
                                    $22,000 - $70,000 depending on model
                                </p>
                            </div>
                            <div className="p-6 border border-border">
                                <h3 className="font-medium mb-2">Yearly Land Usage Fee</h3>
                                <p className="text-sm">
                                    Secures your right to maintain the unit on the designated plot.
                                </p>
                                <p className="text-sm mt-2 text-foreground/60">
                                    $750 - $1,500/year depending on location
                                </p>
                            </div>
                        </div>
                        <p className="text-sm p-4 border border-border">
                            For detailed legal structure: <a href="/ownership-model" className="underline hover:text-accent">Ownership Model</a>
                        </p>
                    </div>
                </section>

                {/* Timeline */}
                <section className="space-y-6">
                    <h2 className="text-3xl">Expected Timeline</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between p-4 border border-border">
                            <span className="text-foreground/80">Reservation to Contract</span>
                            <span className="font-medium">5 business days</span>
                        </div>
                        <div className="flex justify-between p-4 border border-border">
                            <span className="text-foreground/80">Contract to Payment</span>
                            <span className="font-medium">7-14 days</span>
                        </div>
                        <div className="flex justify-between p-4 border border-border">
                            <span className="text-foreground/80">Payment to Manufacturing Start</span>
                            <span className="font-medium">2-3 days</span>
                        </div>
                        <div className="flex justify-between p-4 border border-border">
                            <span className="text-foreground/80">Manufacturing to Installation</span>
                            <span className="font-medium">6-10 weeks</span>
                        </div>
                        <div className="flex justify-between p-4 border border-border">
                            <span className="text-foreground/80">Installation to Completion</span>
                            <span className="font-medium">3-7 days</span>
                        </div>
                    </div>
                    <p className="text-sm text-foreground/60">
                        Total: approximately 8-12 weeks from contract to habitable unit.
                    </p>
                </section>

                {/* Payments */}
                <section className="space-y-6">
                    <h2 className="text-3xl">Payment Structure</h2>
                    <div className="space-y-4 text-foreground/80 leading-relaxed">
                        <div className="p-6 border border-border space-y-3">
                            <h3 className="font-medium">Initial Payment (50%)</h3>
                            <p className="text-sm">
                                Due at contract execution. Covers manufacturing and materials.
                            </p>
                        </div>
                        <div className="p-6 border border-border space-y-3">
                            <h3 className="font-medium">Final Payment (50%)</h3>
                            <p className="text-sm">
                                Due before installation begins. Covers delivery and on-site assembly.
                            </p>
                        </div>
                        <div className="p-6 border border-border space-y-3">
                            <h3 className="font-medium">Yearly Land Usage Fee</h3>
                            <p className="text-sm">
                                Billed annually. Due 30 days before anniversary of contract execution.
                            </p>
                        </div>
                    </div>
                </section>

                {/* FAQs Snippet */}
                <section className="space-y-4">
                    <h2 className="text-3xl">Common Questions</h2>
                    <div className="space-y-3">
                        <details className="p-4 border border-border">
                            <summary className="cursor-pointer font-medium">
                                Can I visit the location before purchasing?
                            </summary>
                            <p className="mt-3 text-foreground/80">
                                Yes. Contact us to arrange site visits. Travel and accommodation are at your own expense.
                            </p>
                        </details>
                        <details className="p-4 border border-border">
                            <summary className="cursor-pointer font-medium">
                                What if I don't pay the yearly fee?
                            </summary>
                            <p className="mt-3 text-foreground/80">
                                Failure to pay yearly fees results in loss of land access rights. The unit remains your property but must be removed from the plot.
                            </p>
                        </details>
                        <details className="p-4 border border-border">
                            <summary className="cursor-pointer font-medium">
                                Can I rent out my unit?
                            </summary>
                            <p className="mt-3 text-foreground/80">
                                Subject to landholder approval. Most locations permit short-term rental with restrictions.
                            </p>
                        </details>
                    </div>
                    <a href="/faq" className="inline-block mt-4 underline text-accent hover:text-foreground">
                        View All FAQs →
                    </a>
                </section>

                <section className="space-y-4 pt-8 border-t border-border">
                    <h2 className="text-2xl">Ready to proceed?</h2>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="/locations"
                            className="px-6 py-3 bg-accent text-foreground hover:bg-accent/90 transition-colors"
                        >
                            View Locations
                        </a>
                        <a
                            href="/waitlist"
                            className="px-6 py-3 border border-accent text-foreground hover:bg-accent/10 transition-colors"
                        >
                            Join Waitlist
                        </a>
                    </div>
                </section>
            </div>
        </main>
    );
}
