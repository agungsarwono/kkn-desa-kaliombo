import Link from "next/link";
import { FileText, Image as ImageIcon, Users, MessageSquare } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { count: beritaCount } = await supabase.from("berita").select("*", { count: "exact", head: true });
  const { count: galeriCount } = await supabase.from("galeri_album").select("*", { count: "exact", head: true });
  const { count: pesanCount } = await supabase.from("pesan_kontak").select("*", { count: "exact", head: true });
  const { count: strukturCount } = await supabase.from("struktur_anggota").select("*", { count: "exact", head: true });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Selamat datang di panel kontrol Website Desa Kaliombo.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-background rounded-xl border border-border shadow-sm flex flex-col">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Berita</p>
              <h3 className="text-2xl font-bold">{beritaCount || 0}</h3>
            </div>
          </div>
          <Link href="/admin/berita" className="mt-auto text-sm text-accent hover:underline font-medium">Kelola Berita &rarr;</Link>
        </div>

        <div className="p-6 bg-background rounded-xl border border-border shadow-sm flex flex-col">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-green-500/10 text-green-500 rounded-lg">
              <ImageIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Album Galeri</p>
              <h3 className="text-2xl font-bold">{galeriCount || 0}</h3>
            </div>
          </div>
          <Link href="/admin/galeri" className="mt-auto text-sm text-accent hover:underline font-medium">Kelola Galeri &rarr;</Link>
        </div>

        <div className="p-6 bg-background rounded-xl border border-border shadow-sm flex flex-col">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-purple-500/10 text-purple-500 rounded-lg">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Struktur / Tim</p>
              <h3 className="text-2xl font-bold">{strukturCount || 0}</h3>
            </div>
          </div>
          <Link href="/admin/struktur" className="mt-auto text-sm text-accent hover:underline font-medium">Kelola Tim &rarr;</Link>
        </div>

        <div className="p-6 bg-background rounded-xl border border-border shadow-sm flex flex-col">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-lg">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pesan Masuk</p>
              <h3 className="text-2xl font-bold">{pesanCount || 0}</h3>
            </div>
          </div>
          <Link href="/admin/pesan" className="mt-auto text-sm text-accent hover:underline font-medium">Kelola Pesan &rarr;</Link>
        </div>
      </div>
    </div>
  );
}
