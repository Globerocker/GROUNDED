export default function AboutPage() {
    return (
        <main className="min-h-screen px-8 py-16">
            <div className="max-w-4xl mx-auto space-y-16">
                <div className="space-y-4">
                    <h1>About Grounded</h1>
                    <p className="text-xl text-foreground/80">
                        Permanent infrastructure outside fragile systems.
                    </p>
                </div>

                <section className="space-y-6">
                    <h2 className="text-3xl">Mission</h2>
                    <div className="space-y-4 text-foreground/80 leading-relaxed">
                        <p>
                            Grounded provides secure real estate ownership in Mexico through modular, infrastructure-grade housing.
                        </p>
                        <p>
                            This is not a lifestyle product. It is a resilience mechanism for individuals who recognize the value of a permanent fallback location outside their primary jurisdiction.
                        </p>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl">Why Mexico</h2>
                    <div className="space-y-4 text-foreground/80 leading-relaxed">
                        <p>
                            Mexico offers a combination of:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Stable legal framework for foreign real estate ownership</li>
                            <li>Proximity to major international airports</li>
                            <li>Lower cost structure than comparable locations</li>
                            <li>Established infrastructure in selected regions</li>
                        </ul>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl">How Grounded Was Built</h2>
                    <div className="space-y-4 text-foreground/80 leading-relaxed">
                        <p>
                            Grounded was developed to address a specific need: permanent, accessible ownership without dependency on continuous rental payments or fragile systems.
                        </p>
                        <p>
                            Our approach prioritizes:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Clear ownership structures</li>
                            <li>Modular, relocatable infrastructure</li>
                            <li>Minimal ongoing costs</li>
                            <li>No lifestyle marketing or community obligation</li>
                        </ul>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl">Principles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 border border-border">
                            <h3 className="text-xl mb-2">Transparency</h3>
                            <p className="text-foreground/80">
                                All costs, fees, and legal structures are documented and accessible.
                            </p>
                        </div>
                        <div className="p-6 border border-border">
                            <h3 className="text-xl mb-2">Permanence</h3>
                            <p className="text-foreground/80">
                                You own the structure. No expiring leases or rental dependencies.
                            </p>
                        </div>
                        <div className="p-6 border border-border">
                            <h3 className="text-xl mb-2">Simplicity</h3>
                            <p className="text-foreground/80">
                                Minimal bureaucracy. Clear processes. No hidden complexity.
                            </p>
                        </div>
                        <div className="p-6 border border-border">
                            <h3 className="text-xl mb-2">Accessibility</h3>
                            <p className="text-foreground/80">
                                Affordable entry points. Locations near major transportation hubs.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl">Not For Everyone</h2>
                    <div className="space-y-4 text-foreground/80 leading-relaxed">
                        <p>
                            Grounded is designed for individuals who:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Value fallback optionality over lifestyle amenities</li>
                            <li>Understand Mexico's legal and operational environment</li>
                            <li>Prefer ownership over rental arrangements</li>
                            <li>Can manage a remote property with minimal on-site presence</li>
                        </ul>
                        <p className="mt-4">
                            If you're seeking a vacation home, retirement community, or social environment, there are better options elsewhere.
                        </p>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-3xl">Next Steps</h2>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="/how-it-works"
                            className="px-6 py-3 border border-accent text-foreground hover:bg-accent/10 transition-colors"
                        >
                            How It Works
                        </a>
                        <a
                            href="/ownership-model"
                            className="px-6 py-3 border border-accent text-foreground hover:bg-accent/10 transition-colors"
                        >
                            Ownership Model
                        </a>
                        <a
                            href="/waitlist"
                            className="px-6 py-3 bg-accent text-foreground hover:bg-accent/90 transition-colors"
                        >
                            Join Waitlist
                        </a>
                    </div>
                </section>
            </div>
        </main>
    );
}
