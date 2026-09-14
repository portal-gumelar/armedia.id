import { MetadataRoute } from 'next'
import { supabase } from '@/src/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = 'https://armedia.id'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/artikel`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]

  // Dynamic article pages dari Supabase
  try {
    const { data: articles } = await supabase
      .from('articles')
      .select('id, updated_at')
      .order('id', { ascending: true })

    const articlePages: MetadataRoute.Sitemap = (articles || []).map((a) => ({
      url: `${BASE_URL}/artikel/${a.id}`,
      lastModified: new Date(a.updated_at || Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    return [...staticPages, ...articlePages]
  } catch {
    return staticPages
  }
}
