import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kknkaliombo.my.id'
  const supabase = await createClient()

  // Base routes
  const routes = [
    '',
    '/berita',
    '/galeri',
    '/profil-desa',
    '/struktur',
    '/tim-kkn',
    '/kontak',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Berita routes
  const { data: berita } = await supabase
    .from('berita')
    .select('slug, updated_at, created_at')
    .eq('status', 'published')

  const beritaRoutes = (berita || []).map((post) => ({
    url: `${SITE_URL}/berita/${post.slug}`,
    lastModified: new Date(post.updated_at || post.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...routes, ...beritaRoutes]
}
