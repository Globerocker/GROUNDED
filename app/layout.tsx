import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import Header from '@/components/grounded/Header'
import Footer from '@/components/grounded/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata: Metadata = {
    title: 'Grounded | Autonomous Living Infrastructure',
    description: 'Prefabricated, self-sustaining homes for the next generation of living.',
}

export default function RootLayout({
    children,
    modal
}: {
    children: React.ReactNode
    modal: React.ReactNode
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${inter.variable} ${outfit.variable} font-sans bg-background text-foreground antialiased selection:bg-accent selection:text-white`}>
                <Header />
                {children}
                {modal}
                <Footer />
                <WhatsAppButton />
            </body>
        </html>
    )
}
