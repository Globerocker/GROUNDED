import WaitlistForm from '@/components/grounded/WaitlistForm';

export default function WaitlistPage() {
    return (
        <main className="min-h-screen px-8 py-16">
            <div className="max-w-2xl mx-auto space-y-12">
                <div className="space-y-4">
                    <h1>Waitlist</h1>
                    <p className="text-xl text-foreground/80">
                        Reserve priority access to secure plots in Mexico.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-2xl">How it works</h2>
                        <ol className="space-y-3 text-foreground/80">
                            <li>1. Submit your information</li>
                            <li>2. We notify you when plots match your criteria</li>
                            <li>3. Select your plot and complete reservation</li>
                        </ol>
                    </div>

                    <div className="p-6 border border-border space-y-4">
                        <h3 className="text-lg">What you get</h3>
                        <ul className="space-y-2 text-sm text-foreground/80">
                            <li>• Priority access to new locations before public listing</li>
                            <li>• Direct contact when plots become available</li>
                            <li>• No obligation to purchase</li>
                        </ul>
                    </div>
                </div>

                <WaitlistForm source="waitlist_page" />
            </div>
        </main>
    );
}
