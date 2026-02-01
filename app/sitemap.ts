import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://grounded.com' // Replace with production URL

    // Static routes
    const routes = [
        '',
        '/models',
        '/locations',
        '/land-partner',
        '/blog',
        '/login',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Add dynamic routes (blog posts) here if we were fetching them in build time
    // For now just returning static map

    return routes
}
