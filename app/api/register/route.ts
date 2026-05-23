import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Gunakan service_role key di server-side
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-co.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-role-key"
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

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
    } = body;

    if (!nama || !whatsapp || !desa || !alamat) {
      return NextResponse.json(
        { error: "Field wajib belum lengkap." },
        { status: 400 }
      );
    }

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