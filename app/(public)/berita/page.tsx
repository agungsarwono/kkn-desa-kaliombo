import Link from "next/link";
import { ArrowRight, Search, Calendar, Tag, Image as ImageIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0; // Disable caching for now to always show fresh data

export default async function BeritaList() {
  const supabase = await createClient();

  const { data: beritaList, error } = await supabase
    .from("berita")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gagal mengambil berita publik:", error);
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Berita & Kegiatan</h1>
          <p className="text-lg text-muted-foreground max-w-2xl text-balance">
            Dokumentasi lengkap program kerja dan publikasi informasi terkini seputar Desa Kaliombo.
          </p>
        </div>

        {/* Search Bar Placeholder */}
        <div className="w-full md:w-auto relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-border rounded-md leading-5 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent sm:text-sm"
            placeholder="Cari berita..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {!beritaList || beritaList.length === 0 ? (
          <div className="col-span-full py-12 text-center border border-border rounded-xl">
            <p className="text-muted-foreground">Belum ada berita yang dipublikasikan.</p>
          </div>
        ) : (
          beritaList.map((item) => (
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

      {/* Pagination Placeholder */}
      {beritaList && beritaList.length > 0 && (
        <div className="mt-16 flex items-center justify-center space-x-2">
          <button className="px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-muted disabled:opacity-50" disabled>
            Sebelumnya
          </button>
          <button className="px-4 py-2 border border-border rounded-md text-sm font-medium bg-accent text-accent-foreground">
            1
          </button>
          <button className="px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-muted disabled:opacity-50" disabled>
            Selanjutnya
          </button>
        </div>
      )}
    </div>
  );
}
