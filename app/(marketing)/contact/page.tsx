import WaitlistForm from '@/components/grounded/WaitlistForm';

export default function ContactPage() {
    return (
        <main className="min-h-screen px-8 py-16">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-4">
                    <h1>Contact</h1>
                    <p className="text-xl text-foreground/80">
                        For inquiries regarding Grounded.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl mb-4">General Inquiries</h2>
                            <p className="text-foreground/80 mb-4">
                                Use the waitlist form to express interest in specific plots or locations. We'll respond within 3 business days.
                            </p>
                        </div>

                        <div className="space-y-4 p-6 border border-border">
                            <h3 className="text-lg">Direct Email</h3>
                            <p className="text-sm text-foreground/80">
                                For legal, technical, or partnership inquiries:
                            </p>
                            <a
                                href="mailto:contact@grounded.mx"
                                className="text-accent hover:text-foreground underline"
                            >
                                contact@grounded.mx
                            </a>
                            <p className="text-xs text-foreground/60">
                                Response time: 2-5 business days
                            </p>
                        </div>

                        <div className="space-y-3 p-6 border border-border">
                            <h3 className="text-lg">What to Include</h3>
                            <ul className="text-sm text-foreground/80 space-y-2 list-disc list-inside">
                                <li>Your timeline for purchase</li>
                                <li>Preferred location(s)</li>
                                <li>House model of interest</li>
                                <li>Specific questions or requirements</li>
                            </ul>
                        </div>

                        <div className="p-4 border border-border bg-accent/5 text-sm text-foreground/80">
                            <strong>Note:</strong> We do not offer phone support. All communication is via email or scheduled video calls for serious inquiries.
                        </div>
                    </div>

                    <div>
                        <WaitlistForm source="contact_page" />
                    </div>
                </div>

                <section className="space-y-4 pt-8 border-t border-border">
                    <h2 className="text-2xl">Before Contacting</h2>
                    <p className="text-foreground/80">
                        Most questions are answered in our documentation:
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a href="/how-it-works" className="underline text-accent hover:text-foreground">
                            How It Works
                        </a>
                        <a href="/ownership-model" className="underline text-accent hover:text-foreground">
                            Ownership Model
                        </a>
                        <a href="/faq" className="underline text-accent hover:text-foreground">
                            FAQ
                        </a>
                    </div>
                </section>
            </div>
        </main>
    );
}
