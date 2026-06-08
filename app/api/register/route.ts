import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

// Gunakan service_role key di server-side
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-co.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-role-key"
);

// --- Zod Schema ---
const registrationSchema = z.object({
  paket: z.string().optional(),
  langganan_sebelumnya: z.string().optional(),
  nama: z.string().min(2, "Nama minimal 2 karakter").max(100, "Nama maksimal 100 karakter"),
  whatsapp: z.string().regex(/^[0-9+ \-]+$/, "Nomor WhatsApp hanya boleh berisi angka dan simbol + atau -").min(9, "Nomor WhatsApp terlalu pendek").max(20, "Nomor WhatsApp terlalu panjang"),
  kecamatan: z.string().optional(),
  desa: z.string().min(2, "Desa wajib diisi").max(100, "Desa terlalu panjang"),
  alamat: z.string().min(5, "Alamat wajib diisi minimal 5 karakter").max(500, "Alamat maksimal 500 karakter"),
  tanggal_pemasangan: z.string().optional(),
  waktu_survei: z.string().optional(),
});

// --- In-Memory Rate Limiter ---
// Struktur: { ip: { count: number, resetTime: number } }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const MAX_REQUESTS = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 jam dalam milidetik

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return true;
  }

  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(request: Request) {
  try {
    // --- Rate Limit Check ---
    // Di Next.js App Router, cara mendapatkan IP bergantung pada provider (Vercel/Cloudflare/dll)
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown-ip";
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Terlalu banyak pendaftaran dari perangkat ini. Silakan coba lagi 1 jam kemudian." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // --- Zod Validation Check ---
    const validationResult = registrationSchema.safeParse(body);

    if (!validationResult.success) {
      // Ambil pesan error pertama dari Zod
      const errorMessage = validationResult.error.issues[0].message;
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

    const {
      paket,
      langganan_sebelumnya,
      nama,
      whatsapp,
      kecamatan,
      desa,
      alamat,
      tanggal_pemasangan,
      waktu_survei,
    } = validationResult.data;

    const { error } = await supabaseAdmin.from("registrations").insert([
      {
        paket,
        langganan_sebelumnya,
        nama,
        whatsapp,
        kecamatan: kecamatan || "GUMELAR",
        desa,
        alamat,
        tanggal_pemasangan: tanggal_pemasangan || "Secepatnya",
        waktu_survei: waktu_survei || "Pagi (08:00 - 11:00)",
        status: "baru",
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Gagal menyimpan data. Silakan coba lagi." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Register API error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}