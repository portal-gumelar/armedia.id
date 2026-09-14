import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://armedia.id";
const SITE_NAME = "ARMEDIA — PT Akses Artha Media";
const TITLE = "Internet Fiber Optic Gumelar Banyumas | ARMEDIA — Mulai Rp 115.000/bln";
const DESCRIPTION =
  "Pasang internet fiber optic di Gumelar, Banyumas mulai Rp 115.000/bulan. PT AKSES ARTHA MEDIA (ARMEDIA) — ISP terpercaya untuk rumah, warnet, kantor & UMKM. Koneksi stabil, latency rendah, support lokal 24 jam. Daftar online sekarang!";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: TITLE,
    template: "%s | ARMEDIA",
  },
  description: DESCRIPTION,
  keywords: [
    "internet Gumelar",
    "wifi Gumelar",
    "pasang internet Gumelar",
    "internet Banyumas",
    "ISP Gumelar",
    "internet fiber optic Gumelar",
    "ARMEDIA",
    "PT Akses Artha Media",
    "internet murah Gumelar",
    "wifi murah Banyumas",
    "provider internet Gumelar",
    "internet rumahan Gumelar",
    "internet UMKM Gumelar",
    "internet Cihonje",
    "internet Paningkaban",
    "internet Tlaga",
    "internet Gancang",
    "internet Kedungurang",
    "pasang wifi Banyumas",
    "internet fiber optic Banyumas",
    "ISP lokal Banyumas",
  ],
  authors: [{ name: "PT AKSES ARTHA MEDIA", url: BASE_URL }],
  creator: "PT AKSES ARTHA MEDIA",
  publisher: "PT AKSES ARTHA MEDIA",
  category: "Technology",

  alternates: {
    canonical: BASE_URL,
  },

  // Open Graph — penting untuk preview di WhatsApp, Facebook, dll
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BASE_URL,
    siteName: SITE_NAME,
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://ik.imagekit.io/Gumelar/LogO/logo%20pt.png?updatedAt=1778213993513",
        width: 1200,
        height: 630,
        alt: "ARMEDIA — Internet Fiber Optic Gumelar Banyumas",
        type: "image/png",
      },
    ],
  },

  // Twitter Card — preview di Twitter/X
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["https://ik.imagekit.io/Gumelar/LogO/logo%20pt.png?updatedAt=1778213993513"],
  },

  // Robots — perintah ke crawler Google, Bing, dll
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // Verifikasi Google Search Console (isi setelah daftar)
  // verification: {
  //   google: "kode-dari-google-search-console",
  //   yandex: "kode-dari-yandex",
  // },
};

// ═══════════════════════════════════════════════
// JSON-LD STRUCTURED DATA — Sangat penting untuk SEO lokal!
// Google menggunakan ini untuk menampilkan rich snippet di hasil pencarian
// ═══════════════════════════════════════════════
const jsonLdLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "TelecommunicationsService",
  "@id": BASE_URL,
  name: "PT AKSES ARTHA MEDIA (ARMEDIA)",
  alternateName: ["ARMEDIA", "Armedia"],
  description: DESCRIPTION,
  url: BASE_URL,
  telephone: "+62212247-2319",
  email: "admin@armedia.id",
  foundingDate: "2020",
  logo: {
    "@type": "ImageObject",
    url: "https://ik.imagekit.io/Gumelar/LogO/logo%20pt.png?updatedAt=1778213993513",
  },
  image: "https://ik.imagekit.io/Gumelar/LogO/logo%20pt.png?updatedAt=1778213993513",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Gumelar",
    addressLocality: "Gumelar",
    addressRegion: "Banyumas",
    postalCode: "53255",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "-7.4167",
    longitude: "108.9833",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Gumelar, Banyumas" },
    { "@type": "AdministrativeArea", name: "Cihonje, Banyumas" },
    { "@type": "AdministrativeArea", name: "Tlaga, Banyumas" },
    { "@type": "AdministrativeArea", name: "Paningkaban, Banyumas" },
    { "@type": "AdministrativeArea", name: "Gancang, Banyumas" },
    { "@type": "AdministrativeArea", name: "Kedungurang, Banyumas" },
  ],
  priceRange: "Rp 115.000 - Rp 330.000",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "20:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Paket Internet Fiber Optic ARMEDIA",
    itemListElement: [
      {
        "@type": "Offer",
        name: "PAKET 1 — 20 Mbps",
        price: "115000",
        priceCurrency: "IDR",
        priceSpecification: { billingDuration: "P1M" },
        description: "Kecepatan 20 Mbps, unlimited, cocok untuk 1-3 perangkat",
      },
      {
        "@type": "Offer",
        name: "PAKET 2 — 30 Mbps",
        price: "142000",
        priceCurrency: "IDR",
        priceSpecification: { billingDuration: "P1M" },
        description: "Kecepatan 30 Mbps, unlimited, cocok untuk keluarga",
      },
      {
        "@type": "Offer",
        name: "PAKET 3 — 50 Mbps",
        price: "182000",
        priceCurrency: "IDR",
        priceSpecification: { billingDuration: "P1M" },
        description: "Kecepatan 50 Mbps, unlimited, cocok untuk WFH & streaming",
      },
    ],
  },
  sameAs: [
    "https://armedia.id",
    // Tambahkan link media sosial Anda di sini jika ada:
    // "https://www.facebook.com/armedia.id",
    // "https://www.instagram.com/armedia.id",
    // "https://www.youtube.com/@armediaid",
  ],
};

// FAQ Schema — Muncul sebagai accordion di hasil Google
const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Berapa harga paket internet ARMEDIA di Gumelar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paket internet ARMEDIA di Gumelar mulai dari Rp 115.000/bulan untuk kecepatan 20 Mbps. Tersedia juga paket 30 Mbps (Rp 142.000) dan 50 Mbps (Rp 182.000).",
      },
    },
    {
      "@type": "Question",
      name: "Apakah ARMEDIA melayani area selain Gumelar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, ARMEDIA melayani beberapa wilayah di Kecamatan Gumelar, Banyumas, antara lain: Gumelar, Cihonje, Tlaga, Paningkaban, Gancang, dan Kedungurang.",
      },
    },
    {
      "@type": "Question",
      name: "Bagaimana cara daftar pasang internet ARMEDIA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Anda dapat mendaftar langsung melalui website ini dengan mengisi formulir online. Tim teknis kami akan menghubungi Anda untuk konfirmasi jadwal survei dan pemasangan.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah ada biaya pemasangan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Untuk informasi biaya pemasangan dan promo yang sedang berjalan, silakan isi formulir pendaftaran atau hubungi tim kami melalui WhatsApp.",
      },
    },
    {
      "@type": "Question",
      name: "Apa itu Program ACR Reward ARMEDIA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ACR (Armedia Community Reward) adalah program loyalitas pelanggan di mana setiap pembayaran tagihan menghasilkan poin yang dapat ditukar dengan hadiah seperti voucher BBM, pulsa, potongan tagihan, dan merchandise eksklusif.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* JSON-LD: Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
        />
        {/* JSON-LD: FAQ Schema untuk rich snippet di Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
        {/* Canonical & Geo Tags */}
        <meta name="geo.region" content="ID-JT" />
        <meta name="geo.placename" content="Gumelar, Banyumas, Jawa Tengah" />
        <meta name="geo.position" content="-7.4167;108.9833" />
        <meta name="ICBM" content="-7.4167, 108.9833" />
        {/* Language */}
        <meta httpEquiv="content-language" content="id" />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers attribute="class" defaultTheme="system" enableSystem>
          {children}
        </Providers>
      </body>
    </html>
  );
}
