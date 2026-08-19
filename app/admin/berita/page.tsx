import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Plus, Edit, Trash2 } from "lucide-react";
import { deleteBerita } from "@/app/actions/berita";

export default async function AdminBerita() {
  const supabase = await createClient();
  
  // Mengambil data berita terbaru
  const { data: beritaList, error } = await supabase
    .from("berita")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gagal mengambil data berita:", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kelola Berita</h1>
          <p className="text-muted-foreground text-sm mt-1">Daftar semua berita dan kegiatan yang telah dipublikasikan atau draf.</p>
        </div>
        <Link 
          href="/admin/berita/baru" 
          className="inline-flex items-center justify-center px-4 py-2 bg-accent text-accent-foreground rounded-md text-sm font-medium hover:bg-accent/90 transition-colors shadow-sm"
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah Berita
        </Link>
      </div>

      <div className="bg-background rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-muted/50 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Judul Berita</th>
                <th className="px-6 py-4 font-medium">Kategori</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Tanggal</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {!beritaList || beritaList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    Belum ada berita yang ditambahkan.
                  </td>
                </tr>
              ) : (
                beritaList.map((berita) => (
                  <tr key={berita.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground max-w-[200px] truncate">
                      {berita.judul}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 bg-muted rounded-full text-xs">
                        {berita.kategori}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {berita.status === 'published' ? (
                        <span className="text-green-600 dark:text-green-400 font-medium">Published</span>
                      ) : (
                        <span className="text-amber-600 dark:text-amber-400 font-medium">Draft</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(berita.tanggal_publish || berita.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link 
                          href={`/admin/berita/${berita.id}/edit`}
                          className="p-2 text-muted-foreground hover:text-blue-500 rounded-md hover:bg-blue-500/10 transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        
                        <form action={async () => {
                          "use server";
                          await deleteBerita(berita.id);
                        }}>
                          <button 
                            type="submit"
                            className="p-2 text-muted-foreground hover:text-red-500 rounded-md hover:bg-red-500/10 transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
