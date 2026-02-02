import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import Header from '@/components/grounded/Header'
import Footer from '@/components/grounded/Footer'


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata: Metadata = {
    title: {
        template: '%s | Grounded',
        default: 'Grounded | The Hardware of Living',
    },
    description: 'Autonomous living infrastructure for the sovereign individual. Precision-engineered, off-grid, and globally deployable.',
    keywords: ['prefab homes', 'off-grid living', 'autonomous housing', 'modern architecture', 'luxury cabin'],
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://grounded-living.com',
        siteName: 'Grounded',
        images: [
            {
                url: '/settlement_aerial_forest_1769977872697.png',
                width: 1200,
                height: 630,
                alt: 'Grounded Settlement',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@grounded_living',
        creator: '@grounded_living',
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
