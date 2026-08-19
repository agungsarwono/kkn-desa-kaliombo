-- Skema Database Supabase untuk Website KKN Desa Kaliombo

-- 1. Tabel Berita
CREATE TABLE public.berita (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    judul TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    konten TEXT NOT NULL,
    kategori TEXT NOT NULL,
    gambar_cover_url TEXT,
    penulis TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    tanggal_publish TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabel Galeri Album
CREATE TABLE public.galeri_album (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    judul_album TEXT NOT NULL,
    deskripsi TEXT,
    tanggal_kegiatan DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabel Galeri Foto
CREATE TABLE public.galeri_foto (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    album_id UUID NOT NULL REFERENCES public.galeri_album(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    caption TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tabel Struktur Anggota (Perangkat Desa & Tim KKN)
CREATE TABLE public.struktur_anggota (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama TEXT NOT NULL,
    jabatan TEXT NOT NULL,
    tipe TEXT NOT NULL CHECK (tipe IN ('perangkat_desa', 'tim_kkn')),
    foto_url TEXT,
    urutan INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Tabel Pesan Kontak
CREATE TABLE public.pesan_kontak (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama TEXT NOT NULL,
    email TEXT NOT NULL,
    pesan TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mengaktifkan Row Level Security (RLS)
ALTER TABLE public.berita ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galeri_album ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galeri_foto ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.struktur_anggota ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pesan_kontak ENABLE ROW LEVEL SECURITY;

-- Membuat Kebijakan RLS (Hanya baca untuk publik, modifikasi hanya untuk admin yang sudah login)
-- Kebijakan untuk Berita
CREATE POLICY "Berita dapat dilihat oleh publik" ON public.berita FOR SELECT USING (status = 'published');
CREATE POLICY "Admin dapat melakukan semuanya di berita" ON public.berita FOR ALL USING (auth.role() = 'authenticated');

-- Kebijakan untuk Galeri Album
CREATE POLICY "Album galeri dapat dilihat publik" ON public.galeri_album FOR SELECT USING (true);
CREATE POLICY "Admin dapat melakukan semuanya di album" ON public.galeri_album FOR ALL USING (auth.role() = 'authenticated');

-- Kebijakan untuk Galeri Foto
CREATE POLICY "Foto galeri dapat dilihat publik" ON public.galeri_foto FOR SELECT USING (true);
CREATE POLICY "Admin dapat melakukan semuanya di foto" ON public.galeri_foto FOR ALL USING (auth.role() = 'authenticated');

-- Kebijakan untuk Struktur Anggota
CREATE POLICY "Struktur anggota dapat dilihat publik" ON public.struktur_anggota FOR SELECT USING (true);
CREATE POLICY "Admin dapat melakukan semuanya di struktur" ON public.struktur_anggota FOR ALL USING (auth.role() = 'authenticated');

-- Kebijakan untuk Pesan Kontak
CREATE POLICY "Publik dapat mengirim pesan" ON public.pesan_kontak FOR INSERT WITH CHECK (true);
CREATE POLICY "Hanya admin yang dapat membaca pesan" ON public.pesan_kontak FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Hanya admin yang dapat mengelola pesan" ON public.pesan_kontak FOR ALL USING (auth.role() = 'authenticated');
