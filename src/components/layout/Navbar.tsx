import React from "react";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <a href="#" className="text-2xl font-black tracking-tight text-slate-900">
          NETBOX<span className="text-red-600">.</span>
        </a>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
          <a href="#" className="text-red-600 transition-colors">
            HOME
          </a>
          <a href="#" className="transition-colors hover:text-red-600">
            ABOUT
          </a>
          <a href="#" className="transition-colors hover:text-red-600">
            SERVICES
          </a>
          <a href="#" className="transition-colors hover:text-red-600">
            PAGES
          </a>
          <a href="#" className="transition-colors hover:text-red-600">
            BLOG
          </a>
          <a href="#" className="transition-colors hover:text-red-600">
            CONTACT
          </a>
        </nav>

        {/* CTA Button */}
        <a
          href="#"
          className="rounded-md bg-red-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-slate-900"
        >
          GET A QUOTE
        </a>
      </div>
    </header>
  );
}