"use client";

import React, { useState, useEffect, useSyncExternalStore } from 'react';

/* ─────────────────────────────────────────────
   FOMO DATA — 500 entri random dari kota Indonesia
   ───────────────────────────────────────────── */
const FIRST_NAMES = [
  "Ahmad","Budi","Citra","Dewi","Eko","Fitri","Gilang","Hendra","Indah","Joko",
  "Kartika","Lia","Maman","Nina","Oki","Putri","Rudi","Sari","Tono","Udin",
  "Vina","Wawan","Yanti","Zainal","Adi","Bagus","Cindy","Dimas","Elsa","Farhan",
  "Gita","Hadi","Intan","Januar","Kiki","Lina","Mira","Nanda","Oka","Prita",
  "Rian","Sinta","Tommy","Umar","Vivi","Widya","Yoga","Zara","Agus","Bayu"
];

const LAST_NAMES = [
  "Santoso","Wijaya","Kusuma","Pratama","Hidayat","Nugroho","Saputra","Maulana",
  "Putra","Setiawan","Gunawan","Hartono","Wahyudi","Susanto","Hermawan","Rahman",
  "Lestari","Handayani","Anggraini","Puspita","Ramadhani","Kurniawan","Sudrajat",
  "Utami","Permata","Halim","Firdaus","Iskandar","Siregar","Nasution","Hutapea"
];

const CITIES = [
  "Jakarta","Surabaya","Bandung","Medan","Semarang","Makassar","Palembang",
  "Tangerang","Depok","Bekasi","Yogyakarta","Malang","Solo","Denpasar","Batam",
  "Pekanbaru","Bogor","Tasikmalaya","Cimahi","Pontianak","Banjarmasin","Balikpapan",
  "Samarinda","Manado","Ambon","Jayapura","Mataram","Kupang","Palu","Kendari",
  "Gorontalo","Ternate","Padang","Jambi","Bengkulu","Bandar Lampung","Pangkal Pinang",
  "Serang","Cilegon","Sukabumi","Cirebon","Tegal","Pekalongan","Salatiga","Magelang",
  "Probolinggo","Pasuruan","Mojokerto","Kediri","Blitar","Madiun","Batu","Banyuwangi"
];

const ACTIONS = [
  "baru saja mendaftar paket",
  "baru saja konsultasi via WhatsApp",
  "baru saja melakukan cek cakupan",
  "baru saja terhubung dengan tim sales",
  "baru saja memasang internet",
  "baru saja upgrade ke paket",
  "baru saja isi form registrasi",
  "baru saja request survey lokasi"
];

function generateFomoData(count: number) {
  const data: { name: string; city: string; action: string }[] = [];
  for (let i = 0; i < count; i++) {
    const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const last = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const city = CITIES[Math.floor(Math.random() * CITIES.length)];
    const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
    data.push({ name: `${first} ${last}`, city, action });
  }
  return data;
}

export default function FomoNotification() {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [fomoEntries] = useState(() => generateFomoData(500));
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [minutesAgo, setMinutesAgo] = useState(1);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const startCycle = () => {
      // 1. Initial wait before first popup (5 seconds)
      timer = setTimeout(() => {
        setMinutesAgo(Math.floor(Math.random() * 59) + 1);
        setVisible(true);
        scheduleHide();
      }, 5000);
    };

    const scheduleHide = () => {
      // 2. Keep visible for 7 seconds
      timer = setTimeout(() => {
        setVisible(false);
        scheduleNextShow();
      }, 7000);
    };

    const scheduleNextShow = () => {
      // 3. Wait for exit animation (500ms) then advance index
      timer = setTimeout(() => {
        setIndex((prev) => (prev + 1) % fomoEntries.length);
        setMinutesAgo(Math.floor(Math.random() * 59) + 1);
        
        // 4. Stay hidden for 15-25 seconds before showing next
        const hiddenDuration = 15000 + Math.floor(Math.random() * 10000);
        timer = setTimeout(() => {
          setVisible(true);
          scheduleHide();
        }, hiddenDuration);
      }, 500);
    };

    startCycle();

    return () => {
      clearTimeout(timer);
    };
  }, [fomoEntries]);

  if (!isClient) return null;

  const entry = fomoEntries[index];

  return (
    <div
      className={`fixed z-40 bottom-20 right-4 md:bottom-6 md:right-6 max-w-[92vw] md:max-w-xs transition-all duration-500 ease-out ${
        visible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-4 opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white/95 backdrop-blur-md p-3.5 shadow-xl shadow-slate-900/10">
        <div className="flex-shrink-0 h-9 w-9 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-xs font-bold uppercase shadow-sm shadow-red-500/20">
          {entry.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-slate-800 leading-tight truncate">
            {entry.name}
          </p>
          <p className="text-[10px] text-slate-500 leading-snug mt-0.5">
            dari <span className="font-semibold text-slate-700">{entry.city}</span>{" "}
            {entry.action}
          </p>
          <p className="text-[9px] text-slate-400 mt-1">
            Baru saja • {minutesAgo} menit yang lalu
          </p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="flex-shrink-0 h-5 w-5 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors text-[10px] leading-none"
        >
          ✕
        </button>
      </div>
    </div>
  );
}