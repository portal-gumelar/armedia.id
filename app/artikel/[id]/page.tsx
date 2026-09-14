import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/src/lib/supabase';

const LARAVEL_URL = process.env.NEXT_PUBLIC_LARAVEL_URL || 'http://localhost:8000';

// Helper untuk dapatkan URL gambar (storage Laravel atau URL eksternal)
function resolveImageUrl(path: string | null | undefined, fallback: string): string {
  if (!path) return fallback;
  if (path.startsWith('http')) return path;
  return `${LARAVEL_URL}/storage/${path}`;
}

// Fallback articles jika Supabase/DB tidak ada
const fallbackArticles = [
  { id: 1, category: "TIPS & TRIK", title: "Cara Memaksimalkan Sinyal WiFi di Rumah", excerpt: "Posisikan router di tengah ruangan untuk jangkauan yang lebih baik.", image_url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80", cover_image: null, content: null, gallery: null },
  { id: 2, category: "TEKNOLOGI", title: "Mengenal Keunggulan Internet Fiber Optic", excerpt: "Fiber optic menawarkan kecepatan dan kestabilan yang jauh lebih baik.", image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80", cover_image: null, content: null, gallery: null },
  { id: 3, category: "PROMO", title: "Diskon Pemasangan Baru Bulan Ini", excerpt: "Dapatkan potongan harga khusus untuk pendaftaran di bulan ini.", image_url: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80", cover_image: null, content: null, gallery: null },
  { id: 4, category: "INFORMASI", title: "Perluasan Jaringan ARMEDIA 2026", excerpt: "Kami terus memperluas jaringan ke berbagai pelosok desa.", image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", cover_image: null, content: null, gallery: null }
];

const BASE_URL = 'https://armedia.id';

// ── SEO: Dynamic Metadata per Artikel ─────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const articleId = parseInt(id, 10);
  const LARAVEL_API_META = process.env.NEXT_PUBLIC_LARAVEL_URL || 'http://localhost:8000';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let article: any = null;
  try {
    const res = await fetch(`${LARAVEL_API_META}/api/articles/${articleId}`, { cache: 'no-store' });
    if (res.ok) article = await res.json();
  } catch { /* ignore */ }
  if (!article) article = fallbackArticles.find((a) => a.id === articleId);
  if (!article) return { title: 'Artikel Tidak Ditemukan | ARMEDIA' };
  const heroImage = resolveImageUrl(article.cover_image, article.image_url || '');
  const canonicalUrl = `${BASE_URL}/artikel/${article.id}`;
  return {
    title: `${article.title} | ARMEDIA Blog`,
    description: article.excerpt,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${article.title} | ARMEDIA Blog`,
      description: article.excerpt,
      url: canonicalUrl,
      type: 'article',
      siteName: 'ARMEDIA — PT Akses Artha Media',
      locale: 'id_ID',
      images: heroImage ? [{ url: heroImage, width: 1200, height: 630, alt: article.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: heroImage ? [heroImage] : [],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const articleId = parseInt(id, 10);

  const LARAVEL_API = process.env.NEXT_PUBLIC_LARAVEL_URL || 'http://localhost:8000';

  // Fetch artikel dari Laravel API (data langsung dari MySQL/dashboard)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let article: any = null;
  try {
    const res = await fetch(`${LARAVEL_API}/api/articles/${articleId}`, { cache: 'no-store' });
    if (res.ok) article = await res.json();
  } catch { /* gagal, gunakan fallback */ }

  // Gunakan fallback jika tidak ada di API
  if (!article) {
    article = fallbackArticles.find((a) => a.id === articleId);
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Artikel Tidak Ditemukan</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Maaf, artikel yang Anda cari tidak tersedia atau telah dihapus.</p>
        <Link href="/" className="mt-6 px-6 py-2 bg-red-600 text-white rounded-md text-sm font-bold shadow-lg shadow-red-600/20 hover:bg-slate-900 transition-colors">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  // Tentukan gambar mana yang ditampilkan: cover upload > image_url eksternal
  const heroImage = resolveImageUrl(article.cover_image, article.image_url || '');
  
  // Parse galeri
  let gallery: string[] = [];
  if (article.gallery) {
    try {
      gallery = typeof article.gallery === 'string' 
        ? JSON.parse(article.gallery) 
        : article.gallery;
    } catch {
      gallery = [];
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-red-500/10 transition-colors duration-300">
      
      {/* Header */}
      <header className="border-b border-slate-100 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-red-600 transition-colors">
            <span>←</span> Kembali
          </Link>
          <div className="font-black tracking-widest text-red-600">ARMEDIA BLOG</div>
        </div>
      </header>

      {/* Article Content */}
      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-20">
        <article className="animate-fade-in">
          
          {/* Badge Kategori */}
          <span className="inline-block px-3 py-1 rounded bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-widest mb-4">
            {article.category}
          </span>
          
          {/* Judul */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-slate-900 dark:text-white mb-6">
            {article.title}
          </h1>

          {/* Ringkasan */}
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 text-justify italic border-l-4 border-red-600 pl-4">
            {article.excerpt}
          </p>

          {/* Gambar Cover/Hero */}
          {heroImage && (
            <div className="relative w-full h-[300px] sm:h-[420px] rounded-2xl overflow-hidden mb-10 border border-slate-100 dark:border-slate-800 shadow-md">
              <Image 
                src={heroImage} 
                alt={article.title}
                fill
                className="object-cover"
                priority
                unoptimized={heroImage.includes('localhost')}
              />
            </div>
          )}

          {/* Isi Konten */}
          {article.content ? (
            <div 
              className="prose prose-slate dark:prose-invert max-w-none text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300 prose-headings:font-black prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-red-600 prose-blockquote:border-red-600"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          ) : (
            <div className="mt-4 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Konten penuh akan segera ditambahkan oleh tim redaksi ARMEDIA.
              </p>
            </div>
          )}

          {/* Galeri Foto */}
          {gallery.length > 0 && (
            <div className="mt-12">
              <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-red-600">📷</span> Galeri Foto
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {gallery.map((imgPath: string, idx: number) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm group">
                    <Image
                      src={resolveImageUrl(imgPath, '')}
                      alt={`Foto ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      unoptimized={imgPath.includes('localhost') || !imgPath.startsWith('http')}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <footer className="border-t border-slate-100 dark:border-slate-900 py-8 text-center">
        <p className="text-xs font-semibold text-slate-500">© 2026 PT AKSES ARTHA MEDIA.</p>
      </footer>
    </div>
  );
}
