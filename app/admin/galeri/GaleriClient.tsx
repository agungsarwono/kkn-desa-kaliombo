"use client";

import { createClient } from "@/lib/supabase/server";
import { Plus, Image as ImageIcon, Trash2, Calendar } from "lucide-react";
import { createAlbum, deleteAlbum } from "@/app/actions/galeri";
import { useActionState } from "react";
import { useEffect, useRef } from "react";

function FormTambahAlbum() {
  const [state, formAction, isPending] = useActionState(createAlbum, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="bg-background rounded-xl border border-border p-6">
      <h2 className="text-lg font-bold mb-4">Buat Album Baru</h2>

      {state?.error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-md text-sm text-red-500">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="mb-4 p-3 bg-green-500/10 border border-green-500/50 rounded-md text-sm text-green-500">
          Album berhasil dibuat!
        </div>
      )}

      <form ref={formRef} action={formAction} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="judul_album" className="text-sm font-medium">Judul Album</label>
          <input
            id="judul_album"
            name="judul_album"
            type="text"
            required
            className="w-full px-4 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Contoh: Gotong Royong Bersama Warga"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="deskripsi" className="text-sm font-medium">Deskripsi (Opsional)</label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            rows={2}
            className="w-full px-4 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            placeholder="Deskripsi singkat album..."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="tanggal_kegiatan" className="text-sm font-medium">Tanggal Kegiatan (Opsional)</label>
          <input
            id="tanggal_kegiatan"
            name="tanggal_kegiatan"
            type="date"
            className="w-full px-4 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full px-4 py-2 bg-accent text-accent-foreground rounded-md text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-70"
        >
          {isPending ? "Menyimpan..." : "Simpan Album"}
        </button>
      </form>
    </div>
  );
}

export default function AdminGaleriClient({ albumList }: { albumList: any[] | null }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Kelola Galeri</h1>
        <p className="text-muted-foreground text-sm mt-1">Daftar album foto kegiatan KKN dan informasi desa.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom kiri: Form */}
        <div className="lg:col-span-1">
          <FormTambahAlbum />
        </div>

        {/* Kolom kanan: Daftar Album */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold">Album yang Tersedia</h2>
          {!albumList || albumList.length === 0 ? (
            <div className="p-12 text-center border border-border rounded-xl bg-background">
              <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground font-medium">Belum ada album galeri.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {albumList.map((album) => (
                <div key={album.id} className="border border-border rounded-xl p-4 bg-background hover:bg-muted/30 transition-colors">
                  <div className="aspect-[4/3] bg-muted rounded-lg mb-4 flex items-center justify-center text-muted-foreground text-sm border border-border/50">
                    <ImageIcon className="h-8 w-8 opacity-20" />
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-base truncate">{album.judul_album}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{album.deskripsi || "Tanpa deskripsi"}</p>
                      {album.tanggal_kegiatan && (
                        <div className="flex items-center text-xs text-muted-foreground mt-2">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{new Date(album.tanggal_kegiatan).toLocaleDateString("id-ID")}</span>
                        </div>
                      )}
                    </div>
                    <form action={async () => {
                      await deleteAlbum(album.id);
                      window.location.reload();
                    }}>
                      <button
                        type="submit"
                        className="p-2 text-muted-foreground hover:text-red-500 rounded-md hover:bg-red-500/10 transition-colors"
                        title="Hapus Album"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
