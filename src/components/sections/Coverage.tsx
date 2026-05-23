"use client";

import React, { useEffect, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon issue in Leaflet + bundler
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Red custom marker
const redIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Coverage locations (city coordinates in Indonesia)
const coverageLocations = [
  { name: "Jakarta", lat: -6.2088, lng: 106.8456, type: "Kantor Pusat" },
  { name: "Surabaya", lat: -7.2575, lng: 112.7521, type: "Cabang" },
  { name: "Bandung", lat: -6.9175, lng: 107.6191, type: "Cabang" },
  { name: "Semarang", lat: -6.9932, lng: 110.4203, type: "Cabang" },
  { name: "Yogyakarta", lat: -7.7956, lng: 110.3695, type: "Cabang" },
  { name: "Medan", lat: 3.5952, lng: 98.6722, type: "Coverage" },
  { name: "Makassar", lat: -5.1477, lng: 119.4327, type: "Coverage" },
  { name: "Denpasar", lat: -8.6705, lng: 115.2126, type: "Coverage" },
  { name: "Balikpapan", lat: -1.2675, lng: 116.8287, type: "Coverage" },
  { name: "Palembang", lat: -2.9761, lng: 104.7754, type: "Coverage" },
  { name: "Batam", lat: 1.0456, lng: 104.0305, type: "Coverage" },
  { name: "Pekanbaru", lat: 0.5333, lng: 101.4667, type: "Coverage" },
  { name: "Banjarmasin", lat: -3.3186, lng: 114.5944, type: "Coverage" },
  { name: "Manado", lat: 1.4748, lng: 124.8421, type: "Coverage" },
  { name: "Jayapura", lat: -2.5916, lng: 140.669, type: "Coverage" },
];

// Lazy-loaded Leaflet map — only renders on client-side after mount
const LeafletMap = dynamic(
  () =>
    import("react-leaflet").then((mod) => {
      const { MapContainer, TileLayer, Marker, Popup, useMap } = mod;

      function FitBounds() {
        const map = useMap();
        useEffect(() => {
          const bounds = L.latLngBounds(
            coverageLocations.map((loc) => [loc.lat, loc.lng])
          );
          map.fitBounds(bounds, { padding: [60, 60], maxZoom: 10 });
        }, [map]);
        return null;
      }

      return function MapComponent() {
        return (
          <MapContainer
            center={[-2.5, 118]}
            zoom={5}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {coverageLocations.map((loc) => (
              <Marker
                key={loc.name}
                position={[loc.lat, loc.lng]}
                icon={loc.type === "Kantor Pusat" || loc.type === "Cabang" ? redIcon : defaultIcon}
              >
                <Popup>
                  <div className="text-center min-w-[120px]">
                    <p className="text-xs font-black uppercase tracking-wider text-slate-900">
                      {loc.name}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      {loc.type}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
            <FitBounds />
          </MapContainer>
        );
      };
    }),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] w-full rounded-2xl bg-slate-100 animate-pulse flex items-center justify-center">
        <span className="text-sm text-slate-400">Memuat peta...</span>
      </div>
    ),
  }
);

// Placeholder saat SSR
function MapPlaceholder() {
  return (
    <div className="h-[400px] w-full rounded-2xl bg-slate-100 animate-pulse flex items-center justify-center">
      <span className="text-sm text-slate-400">Memuat peta...</span>
    </div>
  );
}

export default function CoverageSection() {
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
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                Area Terkover
              </span>
              <p className="text-xl font-black text-red-600">50+</p>
              <p className="text-[9px] text-slate-400">Kota & Kabupaten</p>
            </div>

            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-slate-100 z-[999]">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                Pelanggan Aktif
              </span>
              <p className="text-xl font-black text-red-600">10K+</p>
              <p className="text-[9px] text-slate-400">Rumah & Bisnis</p>
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

            <p className="mt-5 max-w-md text-base leading-7 text-slate-600">
              Kami terus memperluas jangkauan infrastruktur fiber optic ke berbagai wilayah di Indonesia. Cek ketersediaan layanan di lokasi Anda sekarang dan rasakan koneksi internet super cepat tanpa hambatan.
            </p>

            {/* Stat Cards */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="text-2xl font-black text-red-600">99.9%</span>
                <p className="text-[11px] font-bold text-slate-500 mt-1">Uptime Jaminan</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="text-2xl font-black text-red-600">24/7</span>
                <p className="text-[11px] font-bold text-slate-500 mt-1">Support Teknis</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="text-2xl font-black text-red-600">{"<10ms"}</span>
                <p className="text-[11px] font-bold text-slate-500 mt-1">Latency Lokal</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="text-2xl font-black text-red-600">Fiber</span>
                <p className="text-[11px] font-bold text-slate-500 mt-1">Teknologi Utama</p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-md bg-red-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:bg-slate-900"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Check Coverage Area
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}