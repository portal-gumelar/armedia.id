import React from "react";

export default function CoverageSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
      <span className="text-xs font-bold uppercase tracking-widest text-red-600">
        WE ARE EVERYWHERE
      </span>

      <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
        Check Your Network Coverage
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-sm text-slate-600">
        Kami memperluas jangkauan ke berbagai area guna memastikan jaringan
        internet stabil dan merata di lokasi Anda.
      </p>

      <div className="mt-10 inline-flex items-center justify-center">
        <a
          href="#"
          className="rounded-md bg-emerald-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/10 transition-all duration-300 hover:bg-slate-900"
        >
          Check Coverage Area
        </a>
      </div>
    </section>
  );
}