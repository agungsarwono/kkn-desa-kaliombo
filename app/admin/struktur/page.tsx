import { createClient } from "@/lib/supabase/server";
import { Users, Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { hapusAnggota } from "@/app/actions/struktur";

export const revalidate = 0;

export default async function AdminStruktur({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const supabase = await createClient();
  const { tab } = await searchParams;
  const currentTab = tab || "tim_kkn";

  const { data: anggotaList, error } = await supabase
    .from("struktur_anggota")
    .select("*")
    .eq("tipe", currentTab)
    .order("urutan", { ascending: true })
    .order("created_at", { ascending: true });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kelola Struktur</h1>
          <p className="text-muted-foreground text-sm mt-1">Manajemen data Perangkat Desa dan Tim KKN.</p>
        </div>
        <Link
          href="/admin/struktur/baru"
          className="inline-flex items-center justify-center px-4 py-2 bg-accent text-accent-foreground rounded-md text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah Anggota
        </Link>
      </div>

      <div className="bg-background rounded-xl border border-border overflow-hidden">
        <div className="flex border-b border-border">
          <Link
            href="/admin/struktur?tab=tim_kkn"
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              currentTab === "tim_kkn"
                ? "border-b-2 border-accent text-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Tim KKN UNISNU
          </Link>
          <Link
            href="/admin/struktur?tab=perangkat_desa"
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              currentTab === "perangkat_desa"
                ? "border-b-2 border-accent text-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Perangkat Desa
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Profil</th>
                <th className="px-6 py-4 font-medium">Nama Lengkap</th>
                <th className="px-6 py-4 font-medium">Jabatan</th>
                <th className="px-6 py-4 font-medium">Urutan</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {!anggotaList || anggotaList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    Belum ada data anggota untuk kategori ini.
                  </td>
                </tr>
              ) : (
                anggotaList.map((anggota) => (
                  <tr key={anggota.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      {anggota.foto_url ? (
                        <img src={anggota.foto_url} alt={anggota.nama} className="w-10 h-10 rounded-full object-cover border border-border" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border border-border">
                          <Users className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium">{anggota.nama}</td>
                    <td className="px-6 py-4">{anggota.jabatan}</td>
                    <td className="px-6 py-4">{anggota.urutan}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/admin/struktur/${anggota.id}/edit`}
                          className="p-2 text-muted-foreground hover:text-accent rounded-md hover:bg-accent/10 transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <form action={async () => {
                          "use server";
                          await hapusAnggota(anggota.id);
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
