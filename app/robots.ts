import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/terima-kasih'],
      },
    ],
    sitemap: 'https://armedia.id/sitemap.xml',
    host: 'https://armedia.id',
  }
}
