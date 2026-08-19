"use client";

import { useState } from "react";
import { updatePengaturan } from "@/app/actions/pengaturan";
import { Loader2, Save, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PengaturanForm({ pengaturan }: { pengaturan: any }) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setIsSuccess(false);
    
    try {
      const formData = new FormData(e.currentTarget);
      const result = await updatePengaturan(formData);
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      setIsSuccess(true);
      router.refresh();
      
      // Hide success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving pengaturan:", error);
      alert("Terjadi kesalahan saat menyimpan pengaturan.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {isSuccess && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-600 rounded-md p-4 flex items-center">
          <CheckCircle className="h-5 w-5 mr-3" />
          <p className="font-medium">Pengaturan berhasil disimpan!</p>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4 border-b border-border pb-2">Informasi Umum</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="nama_desa" className="text-sm font-medium">Nama Desa / Website</label>
              <input
                id="nama_desa"
                name="nama_desa"
                type="text"
                required
                defaultValue={pengaturan?.nama_desa}
                className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
          <div className="space-y-2 mt-6">
            <label htmlFor="deskripsi_singkat" className="text-sm font-medium">Deskripsi Singkat (Footer)</label>
            <textarea
              id="deskripsi_singkat"
              name="deskripsi_singkat"
              rows={3}
              required
              defaultValue={pengaturan?.deskripsi_singkat}
              className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent resize-y"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4 border-b border-border pb-2 mt-8">Informasi Kontak</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="alamat" className="text-sm font-medium">Alamat Lengkap</label>
              <textarea
                id="alamat"
                name="alamat"
                rows={2}
                required
                defaultValue={pengaturan?.alamat}
                className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent resize-y"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="no_telepon" className="text-sm font-medium">No. Telepon / WhatsApp</label>
              <input
                id="no_telepon"
                name="no_telepon"
                type="text"
                defaultValue={pengaturan?.no_telepon || ""}
                className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="+62 8..."
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Alamat Email</label>
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={pengaturan?.email || ""}
                className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="email@contoh.com"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4 border-b border-border pb-2 mt-8">Sosial Media (Opsional)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label htmlFor="link_instagram" className="text-sm font-medium">Instagram URL</label>
              <input
                id="link_instagram"
                name="link_instagram"
                type="url"
                defaultValue={pengaturan?.link_instagram || ""}
                className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="https://instagram.com/..."
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="link_tiktok" className="text-sm font-medium">TikTok URL</label>
              <input
                id="link_tiktok"
                name="link_tiktok"
                type="url"
                defaultValue={pengaturan?.link_tiktok || ""}
                className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="https://tiktok.com/@..."
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="link_youtube" className="text-sm font-medium">YouTube URL</label>
              <input
                id="link_youtube"
                name="link_youtube"
                type="url"
                defaultValue={pengaturan?.link_youtube || ""}
                className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="https://youtube.com/..."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-border flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground rounded-md text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Simpan Pengaturan
            </>
          )}
        </button>
      </div>
    </form>
  );
}
