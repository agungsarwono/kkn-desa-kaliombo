import Link from "next/link";
import { ArrowRight, MapPin, Users, Calendar, Tag, Image as ImageIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function Home() {
  const supabase = await createClient();
  const { data: latestBerita } = await supabase
    .from("berita")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden flex items-center justify-center border-b border-border">
        {/* Subtle Background Pattern (Minimalist) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-muted text-muted-foreground text-xs font-medium tracking-wide mb-6 uppercase">
            Tim KKN UNISNU Jepara
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground text-balance mb-6">
            Selamat Datang di <br className="hidden sm:block" />
            <span className="text-muted-foreground">Desa Kaliombo</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance leading-relaxed">
            Menjelajahi potensi, mengikuti perkembangan kegiatan, dan mengenal lebih dekat masyarakat serta struktur pemerintahan Desa Kaliombo, Pecangaan.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/berita" 
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-md text-sm font-medium transition-colors bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Lihat Kegiatan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link 
              href="/profil-desa" 
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-md text-sm font-medium transition-colors border border-border bg-transparent hover:bg-muted text-foreground"
            >
              Profil Desa
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats / Info Section */}
      <section className="py-16 bg-muted/30 border-b border-border">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="flex flex-col items-center p-4">
              <MapPin className="h-8 w-8 text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">Lokasi Strategis</h3>
              <p className="text-sm text-muted-foreground text-balance">Terletak di Kecamatan Pecangaan, dengan akses mudah dan potensi alam yang asri.</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <Users className="h-8 w-8 text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">Keramahan Warga</h3>
              <p className="text-sm text-muted-foreground text-balance">Masyarakat yang rukun, bergotong-royong, dan terbuka terhadap inovasi baru.</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="h-8 w-8 rounded-full border-2 border-muted-foreground flex items-center justify-center mb-4">
                <span className="text-xs font-bold text-muted-foreground">UMKM</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Potensi Ekonomi</h3>
              <p className="text-sm text-muted-foreground text-balance">Didukung oleh industri rumahan dan pertanian yang menjadi urat nadi perekonomian.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-24">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Berita & Kegiatan Terbaru</h2>
              <p className="text-muted-foreground">Ikuti pembaruan terkini dari Desa dan Tim KKN.</p>
            </div>
            <Link href="/berita" className="hidden sm:inline-flex items-center text-sm font-medium hover:underline text-muted-foreground hover:text-foreground">
              Lihat semua <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {!latestBerita || latestBerita.length === 0 ? (
              <div className="col-span-full py-12 text-center border border-border rounded-xl">
                <p className="text-muted-foreground">Belum ada berita yang dipublikasikan.</p>
              </div>
            ) : (
              latestBerita.map((item) => (
                <Link href={`/berita/${item.slug}`} key={item.id} className="group flex flex-col space-y-4">
                  <div className="aspect-[4/3] rounded-lg bg-muted border border-border overflow-hidden relative">
                    {item.gambar_cover_url ? (
                      <img src={item.gambar_cover_url} alt={item.judul} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                        <ImageIcon className="h-8 w-8 mb-2 opacity-20" />
                        <span className="text-sm font-medium">Tanpa Gambar</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-xs text-muted-foreground space-x-4">
                      <div className="flex items-center space-x-1">
                        <Tag className="h-3 w-3" />
                        <span>{item.kategori}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(item.tanggal_publish || item.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold leading-tight group-hover:underline text-balance line-clamp-2">
                      {item.judul}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.konten.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
          
          <div className="mt-8 sm:hidden">
            <Link href="/berita" className="w-full inline-flex items-center justify-center px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-muted">
              Lihat semua berita
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
