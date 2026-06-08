"use client";

import React, { useState, useEffect } from "react";
import ToastContainer from "@/src/components/admin/Toast";
import Sidebar from "@/src/components/admin/Sidebar";
import DashboardTab from "@/src/components/admin/DashboardTab";
import ArticlesTab from "@/src/components/admin/ArticlesTab";
import TestimonialsTab from "@/src/components/admin/TestimonialsTab";
import RegistrationsTab from "@/src/components/admin/RegistrationsTab";
import AcrTab from "@/src/components/admin/AcrTab";

type TabKey = "dashboard" | "articles" | "testimonials" | "registrations" | "acr";

/* ──────────────── MAIN ──────────────── */
export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === "armedia2026") {
      sessionStorage.setItem("admin_logged_in", "true");
      setLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Password salah!");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("admin_logged_in") === "true") setLoggedIn(true);
  }, []);

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-xl border border-slate-200 p-10 w-full max-w-md space-y-6">
          <div className="text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-3xl mb-4">🛡️</div>
            <h1 className="text-2xl font-black text-slate-900">Admin ARMEDIA</h1>
            <p className="text-xs text-slate-500 mt-2">PT AKSES ARTHA MEDIA — Management Console</p>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Password Admin</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full rounded-xl border border-slate-300 px-4 py-3.5 text-sm focus:border-red-600 focus:ring-2 focus:ring-red-100 focus:outline-none transition-all"
              autoFocus
            />
            {loginError && <p className="mt-2 text-xs text-red-600 font-bold">{loginError}</p>}
          </div>
          <button type="submit" className="w-full rounded-xl bg-red-600 py-3.5 text-sm font-black uppercase tracking-wider text-white hover:bg-slate-900 transition-all shadow-lg shadow-red-600/20 cursor-pointer">
            🔐 Masuk Admin
          </button>
          <p className="text-center text-[10px] text-slate-400">Default: armedia2026 — ganti di .env.local</p>
        </form>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <AdminDashboard />
    </>
  );
}

/* ──────────────── DASHBOARD ──────────────── */
function AdminDashboard() {
  const [tab, setTab] = useState<TabKey>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_logged_in");
    window.location.reload();
  };

  const tabTitles: Record<TabKey, string> = {
    dashboard: "📊 Dashboard",
    articles: "📄 Manajemen Artikel",
    testimonials: "⭐ Manajemen Testimoni",
    registrations: "📋 Data Pendaftaran",
    acr: "🏆 ACR Reward Management",
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar
        tab={tab}
        setTab={setTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onLogout={handleLogout}
      />

      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-black text-slate-900">{tabTitles[tab]}</h1>
            <p className="text-[11px] text-slate-500 mt-0.5">PT AKSES ARTHA MEDIA — Admin Console</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">System Online</span>
          </div>
        </header>

        <main className="p-8">
          {tab === "dashboard" && <DashboardTab setTab={setTab} />}
          {tab === "articles" && <ArticlesTab />}
          {tab === "testimonials" && <TestimonialsTab />}
          {tab === "registrations" && <RegistrationsTab />}
          {tab === "acr" && <AcrTab />}
        </main>
      </div>
    </div>
  );
}