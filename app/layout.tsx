import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Internet Fiber Optic Gumelar | ARMEDIA — Mulai Rp 115.000/bln",
  description:
    "Pasang internet fiber optic di Gumelar, Banyumas mulai Rp 115.000/bulan. PT AKSES ARTHA MEDIA (ARMEDIA) — ISP terpercaya untuk rumah, warung, kantor & UMKM. Daftar online sekarang!",
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
  ],
  authors: [{ name: "PT AKSES ARTHA MEDIA" }],
  metadataBase: new URL("https://armedia.id"),
  alternates: {
    canonical: "https://armedia.id",
  },
  openGraph: {
    title: "Internet Fiber Optic Gumelar | ARMEDIA — Mulai Rp 115.000/bln",
    description:
      "Pasang internet fiber optic di Gumelar, Banyumas mulai Rp 115.000/bulan. Koneksi stabil, support lokal, daftar online sekarang!",
    url: "https://armedia.id",
    siteName: "ARMEDIA — PT Akses Artha Media",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Internet Fiber Optic Gumelar | ARMEDIA — Mulai Rp 115.000/bln",
    description:
      "Pasang internet fiber optic di Gumelar, Banyumas mulai Rp 115.000/bulan. Daftar online sekarang!",
  },
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
};

// JSON-LD Structured Data untuk Google (Local Business)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "InternetCafe",
  "@id": "https://armedia.id",
  name: "PT AKSES ARTHA MEDIA (ARMEDIA)",
  alternateName: "ARMEDIA",
  description:
    "Penyedia layanan internet Fiber Optic dan VSAT untuk rumah, kantor, dan UMKM di Gumelar, Banyumas.",
  url: "https://armedia.id",
  telephone: "+62212247-2319",
  email: "care@aksesartamedia.id",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gumelar",
    addressRegion: "Banyumas",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "-7.4167",
    longitude: "108.9833",
  },
  areaServed: [
    "Gumelar",
    "Banyumas",
    "Cihonje",
    "Tlaga",
    "Samudra",
    "Paningkaban",
    "Gancang",
    "Kedungurang",
  ],
  priceRange: "Rp 115.000 - Rp 182.000",
  openingHours: "Mo-Su 08:00-20:00",
  sameAs: ["https://github.com/portal-gumelar"],
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
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
