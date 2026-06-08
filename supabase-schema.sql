-- ============================================================
-- ARMEDIA Portal — Supabase Database Schema
-- Jalankan di SQL Editor Supabase (https://app.supabase.com)
-- ============================================================

-- 1. Tabel Registrasi Pelanggan (Form Pendaftaran)
CREATE TABLE IF NOT EXISTS registrations (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  paket         TEXT NOT NULL,
  langganan_sebelumnya TEXT,
  nama          TEXT NOT NULL,
  whatsapp      TEXT NOT NULL,
  kecamatan     TEXT DEFAULT 'GUMELAR',
  desa          TEXT NOT NULL,
  alamat        TEXT NOT NULL,
  tanggal_pemasangan TEXT DEFAULT 'Secepatnya',
  waktu_survei  TEXT DEFAULT 'Pagi (08:00 - 11:00)',
  status        TEXT DEFAULT 'baru',
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabel Testimoni
CREATE TABLE IF NOT EXISTS testimonials (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  quote         TEXT NOT NULL,
  author_name   TEXT NOT NULL,
  author_role   TEXT NOT NULL,
  avatar_initials TEXT NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabel Artikel / Berita
CREATE TABLE IF NOT EXISTS articles (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  category      TEXT NOT NULL,
  title         TEXT NOT NULL,
  excerpt       TEXT NOT NULL,
  image_url     TEXT NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SEED DATA (Opsional — langsung isi konten awal)
-- ============================================================

-- Testimoni Seed
INSERT INTO testimonials (quote, author_name, author_role, avatar_initials) VALUES
('Internet dari ARMEDIA sangat stabil. Sangat membantu operasional kantor kami yang membutuhkan koneksi cepat setiap hari.', 'Budi Santoso', 'Manager IT, Jakarta', 'BS'),
('Layanan pelanggan ARMEDIA sangat responsif. Jika ada kendala teknis, tim mereka langsung datang menangani.', 'Siti Aminah', 'Pemilik Café, Bandung', 'SA'),
('Sejak menggunakan Armedia, lab komputer sekolah dan ujian online siswa berjalan tanpa hambatan sama sekali. Ping stabil dan bandwidth sangat bisa diandalkan.', 'Ahmad Fauzi', 'Kepala Sekolah, Surabaya', 'AF');

-- Artikel Seed
INSERT INTO articles (category, title, excerpt, image_url) VALUES
('TEKNOLOGI', 'Masa Depan 5G di Indonesia', 'Bagaimana teknologi 5G akan merubah cara kita berinteraksi secara digital.', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=400&auto=format&fit=crop'),
('KEAMANAN', 'Cybersecurity Bagi UMKM', 'Tips melindungi data bisnis Anda dari serangan siber yang marak.', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400&auto=format&fit=crop'),
('INFRASTRUKTUR', 'Fiber Optic Enterprise', 'Infrastruktur kabel optik sebagai tulang punggung bisnis modern.', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=400&auto=format&fit=crop'),
('INTERNET OF THINGS', 'Smart Home & IoT 2026', 'Rumah cerdas butuh kestabilan bandwidth tinggi penopang multi-device.', 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=400&auto=format&fit=crop');

-- ============================================================
-- ARMEDIA COMMUNITY REWARD (ACR) SCHEMA
-- ============================================================

-- 1. Tabel Anggota ACR (Member)
CREATE TABLE IF NOT EXISTS acr_members (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  id_pelanggan  TEXT UNIQUE NOT NULL, 
  nama          TEXT NOT NULL,
  whatsapp      TEXT NOT NULL,
  total_poin    INT DEFAULT 0,
  level_member  TEXT DEFAULT 'Reguler', -- Reguler, Silver, Gold, Platinum
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabel Catatan Transaksi Poin (History)
CREATE TABLE IF NOT EXISTS acr_point_transactions (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  id_member     BIGINT REFERENCES acr_members(id) ON DELETE CASCADE,
  jenis         TEXT NOT NULL, -- 'MASUK' (Earn) atau 'KELUAR' (Redeem)
  jumlah_poin   INT NOT NULL,  
  keterangan    TEXT,          
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Katalog Hadiah (Voucher/Reward yang tersedia)
CREATE TABLE IF NOT EXISTS acr_rewards_catalog (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nama_hadiah   TEXT NOT NULL,  
  poin_dibutuhkan INT NOT NULL, 
  stok          INT DEFAULT 99,
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Catatan Penukaran Hadiah (Redemption History)
CREATE TABLE IF NOT EXISTS acr_redemptions (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  id_member     BIGINT REFERENCES acr_members(id),
  id_hadiah     BIGINT REFERENCES acr_rewards_catalog(id),
  status        TEXT DEFAULT 'Menunggu Proses', -- Menunggu Proses, Dikirim, Selesai
  tanggal_tukar TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- DUMMY DATA UNTUK LARAVEL DASHBOARD
-- ============================================================

-- Dummy Data Registrasi Klien Baru
INSERT INTO registrations (paket, langganan_sebelumnya, nama, whatsapp, kecamatan, desa, alamat, tanggal_pemasangan, waktu_survei, status) VALUES
('PAKET_2', 'Belum Pernah Pasang', 'Rudi Hartono', '081234567890', 'GUMELAR', 'GUMELAR', 'Jl. Raya Gumelar RT 01/02', 'Hari Ini', 'Pagi (08:00 - 11:00)', 'baru'),
('PAKET_3', 'Internet Lokal (RT/RW NET)', 'Dewi Sartika', '081987654321', 'GUMELAR', 'CIHONJE', 'Dusun Krajan RT 03/01', 'Besok', 'Sore (14:00 - 17:00)', 'diproses'),
('PAKET_1', 'ISP Besar', 'Agus Supriyanto', '085678901234', 'GUMELAR', 'TLAGA', 'Perumahan Tlaga Asri Blok B No 5', 'Secepatnya', 'Siang (11:00 - 14:00)', 'baru');

-- Dummy Data ACR Rewards Catalog
INSERT INTO acr_rewards_catalog (nama_hadiah, poin_dibutuhkan, stok) VALUES
('Voucher BBM Rp 50.000', 500, 20),
('Potongan Tagihan Internet Rp 25.000', 250, 100),
('Pulsa Telkomsel Rp 100.000', 1000, 50),
('Merchandise T-Shirt Armedia', 1500, 30);

-- Dummy Data ACR Members
INSERT INTO acr_members (id_pelanggan, nama, whatsapp, total_poin, level_member) VALUES
('ARM-10001', 'Bapak Sudirman', '08111222333', 1250, 'Gold'),
('ARM-10002', 'Ibu Ratna', '08222333444', 400, 'Reguler'),
('ARM-10003', 'CV Makmur Jaya', '08333444555', 3500, 'Platinum');

-- Dummy Data Point Transactions
INSERT INTO acr_point_transactions (id_member, jenis, jumlah_poin, keterangan) VALUES
(1, 'MASUK', 100, 'Pembayaran Tagihan Bulan Mei'),
(1, 'MASUK', 150, 'Bonus Pembayaran Tepat Waktu'),
(2, 'MASUK', 100, 'Pembayaran Tagihan Bulan Mei'),
(3, 'MASUK', 500, 'Program Referensi Pelanggan Baru (2 Orang)'),
(1, 'KELUAR', 250, 'Tukar Potongan Tagihan Internet Rp 25.000');

-- Dummy Data Redemptions
INSERT INTO acr_redemptions (id_member, id_hadiah, status) VALUES
(1, 2, 'Selesai');