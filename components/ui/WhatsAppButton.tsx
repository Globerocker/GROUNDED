import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
    // Replace with actual phone number
    const phoneNumber = "525512345678";
    const message = encodeURIComponent("Hi Grounded Team, I'm interested in...");

    return (
        <a
            href={`https://wa.me/${phoneNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-50 group"
            aria-label="Chat on WhatsApp"
        >
            <div className="relative">
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20 group-hover:opacity-40" />
                <div className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center">
                    <MessageCircle size={28} fill="currentColor" className="text-white" />
                </div>
            </div>
        </a>
    );
}
