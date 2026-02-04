import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import Header from '@/components/grounded/Header'
import Footer from '@/components/grounded/Footer'


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata: Metadata = {
    title: {
        template: '%s | Fallback Home',
        default: 'Fallback Home | Strategic Infrastructure',
    },
    description: 'Autonomous living infrastructure for the sovereign individual. Choose your location, choose your home, choose your add-ons. Off-grid, resilient, and secure.',
    keywords: ['fallback home', 'off-grid living', 'autonomous housing', 'bunker alternative', 'resilient infrastructure'],
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://fallback-home.com',
        siteName: 'Fallback Home',
        images: [
            {
                url: '/settlement_aerial_forest_1769977872697.png',
                width: 1200,
                height: 630,
                alt: 'Fallback Home Settlement',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@fallback_home',
        creator: '@fallback_home',
    },
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
            </body>
        </html>
    )
}
