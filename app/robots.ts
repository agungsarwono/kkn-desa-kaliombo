import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kknkaliombo.my.id'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/'], // Cegah Google membaca area admin
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
