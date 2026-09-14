"use client";

import React, { useSyncExternalStore, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the client-side-only map component
const LeafletMap = dynamic(
  () => import("./LeafletMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] w-full rounded-2xl bg-slate-100 animate-pulse flex items-center justify-center">
        <span className="text-sm text-slate-600">Memuat peta...</span>
      </div>
    ),
  }
);


// Placeholder saat SSR
function MapPlaceholder() {
  return (
    <div className="h-[400px] w-full rounded-2xl bg-slate-100 animate-pulse flex items-center justify-center">
      <span className="text-sm text-slate-600">Memuat peta...</span>
    </div>
  );
}

const COVERED_AREAS = [
  "Gumelar", "Banyumas", "Cihonje", "Tlaga", 
  "Samudra", "Paningkaban", "Karang Kemojing", 
  "Gancang", "Kedungurang"
];

export default function CoverageSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [checkResult, setCheckResult] = useState({ searched: false, isCovered: false, query: "" });

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  return (
    <section className="relative py-24 overflow-hidden border-t border-b border-slate-100 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Interactive Map (Leaflet + OSM) */}
          <div className="relative order-2 lg:order-1">
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 z-0">
              {isClient ? <LeafletMap /> : <MapPlaceholder />}
            </div>

            {/* Floating Badges */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-slate-100 z-[999]">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                Area Terkover
              </span>
              <p className="text-xl font-black text-red-600">50+</p>
              <p className="text-[9px] text-slate-600">Kota & Kabupaten</p>
            </div>

            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-slate-100 z-[999]">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                Pelanggan Aktif
              </span>
              <p className="text-xl font-black text-red-600">10K+</p>
              <p className="text-[9px] text-slate-600">Rumah & Bisnis</p>
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-2xl bg-red-600/10 -z-10 hidden lg:block"></div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2 text-left">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded">
              WE ARE EVERYWHERE
            </span>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Check Your{" "}
              <span className="text-red-600">Network Coverage</span>
            </h2>

            <p className="mt-5 max-w-full text-base leading-7 text-slate-600 dark:text-slate-400 text-justify">
              Kami terus memperluas jangkauan infrastruktur fiber optic ke berbagai wilayah di Banyumas. Ketik nama Desa atau Kecamatan Anda di bawah ini untuk mengecek ketersediaan jaringan.
            </p>

            {/* Coverage Checker Form */}
            <div className="mt-8">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const query = searchQuery.toLowerCase().trim();
                  if (!query) return;
                  
                  const isCovered = COVERED_AREAS.some(area => area.toLowerCase().includes(query));
                  setCheckResult({ searched: true, isCovered, query });
                }}
                className="flex gap-2"
              >
                <input 
                  type="text" 
                  placeholder="Ketik nama Desa / Kecamatan..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="shrink-0 inline-flex items-center gap-2 rounded-md bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:bg-slate-900 dark:hover:bg-red-700"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="hidden sm:inline">Cek</span>
                </button>
              </form>

              {checkResult.searched && (
                <div className={`mt-4 p-4 rounded-md border ${checkResult.isCovered ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800' : 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800'} animate-fade-in`}>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {checkResult.isCovered ? (
                        <span className="text-xl">✅</span>
                      ) : (
                        <span className="text-xl">⚠️</span>
                      )}
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${checkResult.isCovered ? 'text-emerald-800 dark:text-emerald-400' : 'text-amber-800 dark:text-amber-400'}`}>
                        {checkResult.isCovered ? 'Selamat! Area Anda Terkover' : 'Mohon Maaf, Area Belum Terkover'}
                      </h4>
                      <p className={`mt-1 text-xs ${checkResult.isCovered ? 'text-emerald-700 dark:text-emerald-500' : 'text-amber-700 dark:text-amber-500'}`}>
                        {checkResult.isCovered 
                          ? `Layanan ARMEDIA sudah tersedia di area "${checkResult.query}". Anda dapat langsung melakukan pendaftaran pemasangan baru sekarang.` 
                          : `Saat ini layanan kami belum menjangkau area "${checkResult.query}". Kami sedang terus memperluas jaringan kami.`}
                      </p>
                      {checkResult.isCovered && (
                        <a href="https://gumelar.armedia.id/" className="inline-block mt-3 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 hover:underline">
                          Lanjut Daftar →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stat Cards */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
                <span className="text-2xl font-black text-red-600">99.9%</span>
                <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mt-1">Uptime Jaminan</p>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
                <span className="text-2xl font-black text-red-600">24/7</span>
                <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mt-1">Support Teknis</p>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
                <span className="text-2xl font-black text-red-600">{"<10ms"}</span>
                <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mt-1">Latency Lokal</p>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
                <span className="text-2xl font-black text-red-600">Fiber</span>
                <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mt-1">Teknologi Utama</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}