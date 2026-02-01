export default function PrivacyPage() {
    return (
        <main className="min-h-screen px-8 py-16">
            <div className="max-w-4xl mx-auto space-y-12">
                <div>
                    <h1>Privacy Policy</h1>
                    <p className="text-sm text-foreground/60 mt-2">Last updated: January 31, 2026</p>
                </div>

                <div className="space-y-8 text-foreground/80 leading-relaxed">
                    <section className="space-y-4">
                        <h2 className="text-2xl text-foreground">1. Information We Collect</h2>
                        <p>
                            We collect information you provide directly:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Account information (email, name)</li>
                            <li>Reservation details (plot selections, preferences)</li>
                            <li>Waitlist submissions</li>
                            <li>Communication records</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-foreground">2. How We Use Information</h2>
                        <p>
                            Your information is used to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Process reservations and contracts</li>
                            <li>Communicate regarding plot availability</li>
                            <li>Manage your account</li>
                            <li>Improve platform functionality</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-foreground">3. Data Storage</h2>
                        <p>
                            All user data is stored securely using Supabase (PostgreSQL). We implement industry-standard encryption and access controls.
                        </p>
                        <p>
                            Data is stored in US-based servers. By using this platform, you consent to this storage location.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-foreground">4. Information Sharing</h2>
                        <p>
                            We do not sell your personal information. We may share information with:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Service providers (database, email infrastructure)</li>
                            <li>Legal authorities when required by law</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-foreground">5. Cookies and Tracking</h2>
                        <p>
                            We use essential cookies for authentication and session management. No third-party analytics or advertising cookies are used.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-foreground">6. Your Rights</h2>
                        <p>
                            You have the right to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Access your personal data</li>
                            <li>Request data correction or deletion</li>
                            <li>Withdraw consent for data processing</li>
                            <li>Export your data</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-foreground">7. Data Retention</h2>
                        <p>
                            We retain your information as long as your account is active or as needed to provide services. Deleted accounts are purged within 90 days.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-foreground">8. Security</h2>
                        <p>
                            We implement appropriate technical and organizational measures to protect your data. However, no method of transmission over the internet is 100% secure.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-foreground">9. Changes to Policy</h2>
                        <p>
                            We may update this policy periodically. Significant changes will be communicated via email.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-foreground">10. Contact</h2>
                        <p>
                            For privacy-related inquiries: <a href="/contact" className="underline hover:text-accent">Contact Page</a>
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
