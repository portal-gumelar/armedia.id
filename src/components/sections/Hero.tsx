import React from "react";

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left Content */}
      <div className="text-left">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded">
          FAST SPEED + NO SERVICE CHARGE
        </span>

        <h1 className="mt-4 text-5xl font-black tracking-tight text-slate-900 sm:text-6xl">
          Journey With <br />
          <span className="text-red-600">Fast Internet</span>
        </h1>

        <p className="mt-6 max-w-lg text-base leading-7 text-slate-600">
          Powerful Coverage No Contracts. Banyak desktop Wifi packages and web
          page editors now use Lorem Ipsum budgets sebagai standarisasi
          kecepatan optimal.
        </p>

        <div className="mt-10 flex items-center gap-6">
          <a
            href="#"
            className="rounded-md bg-red-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:bg-slate-900"
          >
            GET STARTED
          </a>

          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              START FROM
            </span>
            <span className="text-2xl font-black text-red-600">
              $25.00
              <span className="text-sm font-normal text-slate-500">
                /Month
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Right Placeholder */}
      <div className="relative h-[400px] w-full rounded-2xl border border-slate-200 bg-slate-100 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
        <span className="relative text-sm font-medium text-slate-400">
          [ Visual Asset Banner / Image ]
        </span>
      </div>
    </section>
  );
}