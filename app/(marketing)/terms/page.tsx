export default function TermsPage() {
    return (
        <main className="min-h-screen px-8 py-16">
            <div className="max-w-4xl mx-auto space-y-12">
                <div>
                    <h1>Terms of Service</h1>
                    <p className="text-sm text-foreground/60 mt-2">Last updated: January 31, 2026</p>
                </div>

                <div className="space-y-8 text-foreground/80 leading-relaxed">
                    <section className="space-y-4">
                        <h2 className="text-2xl text-foreground">1. Agreement to Terms</h2>
                        <p>
                            By accessing Grounded, you agree to these Terms of Service. If you disagree with any part of these terms, you may not access the platform.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-foreground">2. Platform Purpose</h2>
                        <p>
                            Grounded facilitates the purchase of real estate infrastructure in Mexico. We provide information and reservation capabilities for plots and modular housing units.
                        </p>
                        <p>
                            This platform does not constitute legal or financial advice. Consult appropriate professionals before making purchase decisions.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-foreground">3. Reservation Process</h2>
                        <p>
                            Reservations made through this platform are non-binding until a formal contract is executed. Reservation status does not guarantee plot availability.
                        </p>
                        <p>
                            All reservations are subject to verification and confirmation by Grounded.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-foreground">4. Ownership Structure</h2>
                        <p>
                            Real estate ownership in Mexico is governed by Mexican law. See our <a href="/ownership-model" className="underline hover:text-accent">Ownership Model</a> page for detailed information.
                        </p>
                        <p>
                            Yearly usage fees are separate from the one-time purchase price and are required to maintain access rights.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-foreground">5. User Accounts</h2>
                        <p>
                            You are responsible for maintaining the confidentiality of your account credentials. Grounded is not liable for unauthorized access resulting from credential compromise.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-foreground">6. Intellectual Property</h2>
                        <p>
                            All content on this platform, including text, images, and design elements, is owned by Grounded or its licensors.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-foreground">7. Limitation of Liability</h2>
                        <p>
                            Grounded provides this platform "as is" without warranties of any kind. We are not liable for decisions made based on information provided through this platform.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-foreground">8. Modifications</h2>
                        <p>
                            We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of modified terms.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-foreground">9. Contact</h2>
                        <p>
                            For questions regarding these terms, contact: <a href="/contact" className="underline hover:text-accent">Contact Page</a>
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
