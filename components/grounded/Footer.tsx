import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t border-border mt-24">
            <div className="max-w-7xl mx-auto px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-medium mb-4">Grounded</h3>
                        <p className="text-sm text-foreground/60">
                            Permanent infrastructure outside fragile systems.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-foreground/60">
                            <li>
                                <Link href="/locations" className="hover:text-accent transition-colors">
                                    Locations
                                </Link>
                            </li>
                            <li>
                                <Link href="/models" className="hover:text-accent transition-colors">
                                    House Models
                                </Link>
                            </li>
                            <li>
                                <Link href="/waitlist" className="hover:text-accent transition-colors">
                                    Waitlist
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium mb-4">Information</h4>
                        <ul className="space-y-2 text-sm text-foreground/60">
                            <li>
                                <Link href="/about" className="hover:text-accent transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/how-it-works" className="hover:text-accent transition-colors">
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <Link href="/ownership-model" className="hover:text-accent transition-colors">
                                    Ownership Model
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-accent transition-colors">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-foreground/60">
                            <li>
                                <Link href="/terms" className="hover:text-accent transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-accent transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-accent transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border text-center text-sm text-foreground/40">
                    © {new Date().getFullYear()} Grounded. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
