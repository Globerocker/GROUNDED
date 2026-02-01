export default function OwnershipModelPage() {
    return (
        <main className="min-h-screen px-8 py-16">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-4">
                    <h1>Ownership Model</h1>
                    <p className="text-xl text-foreground/80">
                        Permanent infrastructure ownership. Not a rental.
                    </p>
                </div>

                <div className="space-y-8 text-foreground/80 leading-relaxed">
                    <section className="space-y-4">
                        <h2 className="text-2xl text-foreground">Structure</h2>
                        <p>
                            Grounded facilitates direct ownership of modular housing units on secure land plots in Mexico. This is not a timeshare, lease, or rental arrangement.
                        </p>
                        <p>
                            You own the structure. Land usage is secured through long-term agreements with verified landholders.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-foreground">Purchase Components</h2>
                        <div className="space-y-3">
                            <div className="p-4 border border-border">
                                <h3 className="font-medium mb-1">One-time: House Unit</h3>
                                <p className="text-sm">
                                    Purchase price: $22,000–$70,000 depending on model. This is your permanent asset.
                                </p>
                            </div>
                            <div className="p-4 border border-border">
                                <h3 className="font-medium mb-1">Yearly: Land Usage Fee</h3>
                                <p className="text-sm">
                                    Fee: $750–$1,500/year depending on location. This secures your right to maintain the unit on the designated plot.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-foreground">Legal Framework</h2>
                        <p>
                            Real estate transactions are governed by Mexican federal and state law. Foreign ownership of property in Mexico is permitted under specific conditions.
                        </p>
                        <p>
                            Grounded structures legal ownership through established frameworks that comply with local regulations.
                        </p>
                        <p className="text-sm p-4 border border-border">
                            <strong>Important:</strong> This is not legal advice. Consult a licensed attorney familiar with Mexican real estate law before finalizing any purchase.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-foreground">Rights & Responsibilities</h2>
                        <div className="space-y-3">
                            <div>
                                <h3 className="font-medium mb-2">You may:</h3>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Use the property as a personal residence</li>
                                    <li>Make interior modifications (subject to structural limitations)</li>
                                    <li>Sell or transfer ownership (subject to landholder approval)</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">You must:</h3>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Pay yearly land usage fees on time</li>
                                    <li>Maintain the structure in habitable condition</li>
                                    <li>Comply with local regulations and community guidelines</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-foreground">Resale & Exit</h2>
                        <p>
                            You may sell your unit at any time, subject to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Landholder approval of new owner</li>
                            <li>Transfer of land usage agreement</li>
                            <li>Payment of any outstanding fees</li>
                        </ul>
                        <p>
                            Grounded does not guarantee resale value or provide a buyback program.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-foreground">Why This Model?</h2>
                        <p>
                            This structure allows for:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Lower upfront costs than traditional land + construction</li>
                            <li>Flexibility to relocate the structure if needed</li>
                            <li>Access to secure locations without full land acquisition complexity</li>
                            <li>Clear separation between asset (house) and access (land rights)</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-foreground">Questions</h2>
                        <p>
                            For specific questions about ownership structure: <a href="/contact" className="underline hover:text-accent">Contact Us</a>
                        </p>
                        <p>
                            General information: <a href="/faq" className="underline hover:text-accent">FAQ</a>
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
