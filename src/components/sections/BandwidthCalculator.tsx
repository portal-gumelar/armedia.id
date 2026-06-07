"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function BandwidthCalculator({ onSelectPackage }: { onSelectPackage?: (pkgId: string) => void }) {
  const [phones, setPhones] = useState<number>(0);
  const [livePhones, setLivePhones] = useState<number>(0);
  const [tv32, setTv32] = useState<number>(0);
  const [tv43, setTv43] = useState<number>(0);
  const [tv50, setTv50] = useState<number>(0);
  const [tv55, setTv55] = useState<number>(0);

  const calculateBandwidth = () => {
    const min = (phones * 3) + (livePhones * 10) + (tv32 * 5) + (tv43 * 10) + (tv50 * 15) + (tv55 * 25);
    const max = (phones * 5) + (livePhones * 20) + (tv32 * 10) + (tv43 * 15) + (tv50 * 25) + (tv55 * 50);

    let recommended = "20 Mbps";
    let recommendedId = "PAKET_1";
    if (max === 0) { recommended = "-"; recommendedId = ""; }
    else if (max <= 20) { recommended = "20 Mbps"; recommendedId = "PAKET_1"; }
    else if (max <= 30) { recommended = "30 Mbps"; recommendedId = "PAKET_2"; }
    else if (max <= 50) { recommended = "50 Mbps"; recommendedId = "PAKET_3"; }
    else if (max <= 75) { recommended = "75 Mbps"; recommendedId = "PAKET_4"; }
    else { recommended = "100 Mbps"; recommendedId = "PAKET_5"; }

    return { min, max, recommended, recommendedId };
  };

  const result = calculateBandwidth();

  const handleIncrement = (setter: React.Dispatch<React.SetStateAction<number>>) => {
    setter(prev => prev + 1);
  };
  
  const handleDecrement = (setter: React.Dispatch<React.SetStateAction<number>>) => {
    setter(prev => (prev > 0 ? prev - 1 : 0));
  };

  const Counter = ({ label, desc, value, setter }: { label: string, desc: string, value: number, setter: React.Dispatch<React.SetStateAction<number>> }) => (
    <div className="flex items-center p-3 sm:p-4 border border-slate-100 rounded-xl bg-slate-50/50 hover:bg-white transition-colors gap-3 sm:gap-4">
      <div className="flex items-center gap-2 sm:gap-3 bg-white border border-slate-200 rounded-lg p-1 shadow-sm shrink-0">
        <motion.button whileTap={{ scale: 0.85 }} onClick={() => handleDecrement(setter)} className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md bg-slate-50 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors font-bold cursor-pointer">-</motion.button>
        <motion.span key={value} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-5 sm:w-6 text-center text-sm font-black text-slate-900 inline-block">{value}</motion.span>
        <motion.button whileTap={{ scale: 0.85 }} onClick={() => handleIncrement(setter)} className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors font-bold cursor-pointer">+</motion.button>
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-slate-900 leading-tight">{label}</p>
        <p className="text-[10px] text-slate-500 font-medium mt-0.5 leading-tight">{desc}</p>
      </div>
    </div>
  );

  return (
    <section id="bandwidth-calculator" className="mx-auto max-w-7xl px-4 sm:px-6 py-12 lg:py-24 lg:px-8 border-t border-slate-100 scroll-mt-20">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
      >
        <div className="lg:col-span-5 flex flex-col justify-center">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600">EDUKASI BANDWIDTH</span>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Kalkulator Kebutuhan <span className="text-red-600">Internet</span>
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-slate-600 font-medium">
            Banyak pelanggan mengira internet lambat selalu karena Mbps kecil. Padahal, jumlah perangkat aktif dan jenis aktivitas (seperti Live Streaming atau Smart TV) sangat mempengaruhi penggunaan bandwidth. Hitung kebutuhan ideal Anda sekarang!
          </p>
          
          <div className="mt-8 space-y-4">
            <div className="bg-red-50 rounded-xl p-5 border border-red-100">
              <h3 className="text-xs font-black uppercase text-red-600 tracking-wider mb-2">Informasi Penggunaan:</h3>
              <ul className="text-xs text-slate-700 space-y-2 font-medium">
                <li>• <span className="font-bold text-slate-900">HP Normal (Scroll/Chat):</span> 3 - 5 Mbps / perangkat</li>
                <li>• <span className="font-bold text-slate-900">HP Live (TikTok/Shopee):</span> 10 - 20 Mbps / perangkat</li>
                <li>• <span className="font-bold text-slate-900">Smart TV Android:</span> 5 - 50 Mbps (tergantung ukuran layar)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col">
          <div className="p-6 md:p-8 flex-1 space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4 border-b border-slate-100 pb-2">1. Smartphone / Gadget</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Counter label="HP Normal" desc="Chat, Scroll IG/TikTok, YouTube" value={phones} setter={setPhones} />
              <Counter label="HP Live Streaming" desc="TikTok/Shopee/IG Live" value={livePhones} setter={setLivePhones} />
            </div>

            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mt-8 mb-4 border-b border-slate-100 pb-2">2. Smart TV / Android TV</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Counter label="TV 32 Inch" desc="Estimasi: 5 - 10 Mbps" value={tv32} setter={setTv32} />
              <Counter label="TV 43 Inch" desc="Estimasi: 10 - 15 Mbps" value={tv43} setter={setTv43} />
              <Counter label="TV 50 Inch" desc="Estimasi: 15 - 25 Mbps" value={tv50} setter={setTv50} />
              <Counter label="TV 55+ Inch" desc="Estimasi: 25 - 50 Mbps" value={tv55} setter={setTv55} />
            </div>
          </div>
          
          <div className="bg-slate-900 p-6 md:p-10 flex flex-col items-center text-center border-t border-slate-800">
            <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400 mb-1">
              Total Kebutuhan: <motion.span key={`${result.min}-${result.max}`} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-block text-white mx-1">{result.min} - {result.max}</motion.span> Mbps
            </p>
            <p className="text-xs sm:text-sm font-medium text-slate-500 mb-5">
              Rekomendasi Paket Ideal Untuk Anda:
            </p>
            
            <motion.div 
              key={result.recommended}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="inline-block bg-gradient-to-r from-red-600 to-orange-600 px-8 py-3 sm:px-12 sm:py-4 rounded-2xl text-white font-black text-3xl sm:text-5xl shadow-xl shadow-red-600/20 mb-6"
            >
              {result.recommended}
            </motion.div>

            {result.recommendedId && onSelectPackage && (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectPackage(result.recommendedId)}
                className="font-black bg-white text-slate-900 px-8 py-3.5 sm:py-4 rounded-xl hover:bg-slate-200 transition-all uppercase tracking-widest shadow-lg shadow-white/10 text-xs sm:text-sm w-full max-w-[300px]"
              >
                Pilih Paket Sekarang
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
