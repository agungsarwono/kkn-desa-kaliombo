import { ImageIcon, Calendar } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function GaleriList() {
  const supabase = await createClient();

  // Ambil data album dari Supabase
  const { data: albumList, error } = await supabase
    .from("galeri_album")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gagal mengambil data galeri:", error);
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-6xl">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Galeri Kegiatan</h1>
        <p className="text-lg text-muted-foreground max-w-2xl text-balance">
          Kumpulan album foto yang merekam momen berharga masyarakat dan Tim KKN.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!albumList || albumList.length === 0 ? (
          <div className="col-span-full py-16 text-center border border-border rounded-xl">
            <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-20" />
            <p className="text-muted-foreground text-lg">Belum ada album galeri yang diunggah.</p>
          </div>
        ) : (
          albumList.map((album) => (
            <div key={album.id} className="group relative cursor-pointer border border-border rounded-xl overflow-hidden bg-muted/30 hover:shadow-md transition-shadow">
              {/* Tampilan Placeholder Gambar Album */}
              <div className="aspect-[4/3] bg-muted flex items-center justify-center border-b border-border/50">
                 <ImageIcon className="h-10 w-10 text-muted-foreground/30 group-hover:scale-110 transition-transform duration-300" />
              </div>
              
              {/* Info Album */}
              <div className="p-5 bg-background">
                <h3 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors line-clamp-1">
                  {album.judul_album}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {album.deskripsi || "Tidak ada deskripsi."}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 mr-1.5" />
                  <span>
                    {album.tanggal_kegiatan 
                      ? new Date(album.tanggal_kegiatan).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })
                      : new Date(album.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })
                    }
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
