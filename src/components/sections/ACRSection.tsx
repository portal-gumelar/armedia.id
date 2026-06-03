"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function ACRSection() {
  const benefits = [
    "Mendapatkan Poin dari setiap pembayaran tagihan.",
    "Bonus Poin untuk pembayaran tepat waktu.",
    "Bonus Poin loyalitas bagi pelanggan yang aktif berlangganan dalam jangka panjang.",
    "Bonus Poin dari Program referensi pelanggan baru.",
    "Poin dapat ditukarkan dengan berbagai hadiah dan voucher.",
    "Kesempatan mengikuti Program Undian dan hadiah spesial Armedia."
  ];

  const rewards = [
    "Voucher BBM",
    "Potongan Tagihan Internet",
    "Pulsa",
    "Paket Data",
    "Merchandise Eksklusif",
    "Program Undian Berhadiah"
  ];

  return (
    <section id="acr-section" className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 border-t border-slate-100 scroll-mt-20 overflow-hidden bg-white">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-red-600/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-orange-500/5 blur-3xl"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <div className="text-center mb-16">
          <span className="inline-block rounded-full bg-red-50 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-red-600 mb-4 ring-1 ring-red-600/10">
            ✨ PROGRAM LOYALITAS PELANGGAN ✨
          </span>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Armedia Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Reward</span> (ACR)
          </h2>
          <p className="mt-6 text-base leading-relaxed text-slate-600 max-w-3xl mx-auto">
            Bentuk penghargaan kepada seluruh pelanggan setia Armedia. 
            Setiap pembayaran tagihan kini menjadi <span className="font-bold text-slate-900">poin investasi</span> yang dapat 
            memberikan berbagai manfaat dan keuntungan tambahan secara langsung.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Info */}
          <div className="space-y-8 text-slate-600 text-sm md:text-base leading-relaxed">
            <p>
              Semakin lama menjadi pelanggan dan semakin disiplin dalam melakukan pembayaran, semakin banyak poin yang akan diperoleh. Program ini hadir sebagai wujud komitmen Armedia untuk tidak hanya menyediakan layanan internet yang stabil dan terjangkau, tetapi juga memberikan nilai tambah bagi pelanggan melalui berbagai keuntungan yang dapat dinikmati.
            </p>
            
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:shadow-xl hover:shadow-red-900/5 transition-all duration-300">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-red-600 to-red-400 group-hover:w-2 transition-all duration-300"></div>
              <h3 className="text-lg font-black text-slate-900 mb-5 flex items-center gap-2">
                <span className="text-xl">🏆</span> Keuntungan Menjadi Member
              </h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li 
                    key={index} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <div className="h-5 w-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold">✓</span>
                    </div>
                    <span className="text-sm font-medium text-slate-700">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side - Visuals & Rewards */}
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-red-600 to-slate-900 rounded-2xl p-6 text-white shadow-lg shadow-red-600/20 flex flex-col justify-between h-48 relative overflow-hidden"
              >
                <div className="absolute -right-4 -bottom-4 text-7xl opacity-10">💰</div>
                <div className="text-3xl mb-2 relative z-10">🎁</div>
                <div className="relative z-10">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-red-200">Kumpulkan</div>
                  <div className="text-xl font-black">Poin Reward</div>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-900 shadow-sm flex flex-col justify-between h-48 relative overflow-hidden"
              >
                <div className="absolute -right-4 -bottom-4 text-7xl opacity-[0.03]">💎</div>
                <div className="text-3xl mb-2 relative z-10">💎</div>
                <div className="relative z-10">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tukarkan dengan</div>
                  <div className="text-xl font-black text-red-600 leading-tight">Hadiah &<br/>Voucher</div>
                </div>
              </motion.div>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 text-center">Pilihan Reward Anda</h4>
              <div className="flex flex-wrap justify-center gap-2">
                {rewards.map((reward, index) => (
                  <span key={index} className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600 border border-slate-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-colors cursor-default">
                    {reward}
                  </span>
                ))}
              </div>
            </div>

            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-4 bg-slate-900 rounded-2xl p-6 shadow-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <p className="text-sm font-black text-white tracking-wide uppercase relative z-10 leading-relaxed">
                Internet Tetap Terhubung,<br/>
                Poin Terus Bertumbuh,<br/>
                <span className="text-red-400">Hadiah Menanti Anda.</span>
              </p>
              <div className="mt-4 inline-block bg-red-600 text-white text-[10px] sm:text-xs font-black px-6 py-2.5 rounded-full uppercase tracking-widest relative z-10 animate-bounce shadow-lg shadow-red-600/30">
                Tunggu Tanggal Launchingnya!
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
