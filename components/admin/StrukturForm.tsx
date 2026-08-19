"use client";

import { useState } from "react";
import { tambahAnggota, updateAnggota } from "@/app/actions/struktur";
import Link from "next/link";
import { Loader2, User as UserIcon } from "lucide-react";
import imageCompression from 'browser-image-compression';
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function StrukturForm({ anggota, mode }: { anggota?: any, mode: "tambah" | "edit" }) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(anggota?.foto_url || null);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const nama = formData.get("nama") as string;
      const jabatan = formData.get("jabatan") as string;
      const tipe = formData.get("tipe") as "perangkat_desa" | "tim_kkn";
      const urutan = parseInt(formData.get("urutan") as string) || 0;
      
      let uploadedUrl = anggota?.foto_url || null;

      if (file) {
        // Compress image
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);

        // Upload to Supabase Storage
        const supabase = createClient();
        const fileExt = compressedFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

        const { error } = await supabase.storage
          .from('kkn-images')
          .upload(`struktur/${fileName}`, compressedFile);

        if (error) throw error;

        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from('kkn-images')
          .getPublicUrl(`struktur/${fileName}`);
        
        uploadedUrl = publicUrlData.publicUrl;
      } else {
        const urlText = formData.get('foto_url_text') as string;
        if (urlText) {
          uploadedUrl = urlText;
        }
      }

      // Execute Server Action
      if (mode === "tambah") {
        await tambahAnggota(nama, jabatan, tipe, urutan, uploadedUrl);
      } else if (anggota?.id) {
        await updateAnggota(anggota.id, nama, jabatan, tipe, urutan, uploadedUrl);
      }
      
      router.push('/admin/struktur');
      router.refresh();
    } catch (error) {
      console.error("Error uploading/saving:", error);
      alert("Terjadi kesalahan saat mengupload gambar atau menyimpan data.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="nama" className="text-sm font-medium">Nama Lengkap</label>
          <input
            id="nama"
            name="nama"
            type="text"
            required
            defaultValue={anggota?.nama}
            className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="jabatan" className="text-sm font-medium">Jabatan</label>
          <input
            id="jabatan"
            name="jabatan"
            type="text"
            required
            defaultValue={anggota?.jabatan}
            className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="tipe" className="text-sm font-medium">Kategori</label>
          <select
            id="tipe"
            name="tipe"
            required
            defaultValue={anggota?.tipe || "tim_kkn"}
            className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="perangkat_desa">Perangkat Desa</option>
            <option value="tim_kkn">Tim KKN</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="urutan" className="text-sm font-medium">Urutan Tampil (Opsional)</label>
          <input
            id="urutan"
            name="urutan"
            type="number"
            defaultValue={anggota?.urutan || 0}
            className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <p className="text-xs text-muted-foreground">Angka lebih kecil akan tampil lebih dulu. Contoh: 1 untuk Ketua.</p>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-border">
        <label className="text-sm font-medium">Foto Profil (Opsional)</label>
        
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-1/4">
            <div 
              className="w-full aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center bg-muted/30 overflow-hidden relative"
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-4">
                  <UserIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                  <p className="text-xs text-muted-foreground">Preview</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="w-full md:w-3/4 space-y-4">
            <div className="space-y-2">
              <label htmlFor="file_upload" className="text-sm text-muted-foreground">Upload dari Device</label>
              <input 
                id="file_upload"
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 bg-background border border-border rounded-md file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-accent file:text-accent-foreground hover:file:bg-accent/90"
              />
            </div>
            
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-border"></div>
              <span className="flex-shrink-0 mx-4 text-xs text-muted-foreground">ATAU</span>
              <div className="flex-grow border-t border-border"></div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="foto_url_text" className="text-sm text-muted-foreground">Ganti dengan URL Publik</label>
              <input 
                id="foto_url_text" 
                name="foto_url_text"
                type="url" 
                defaultValue={anggota?.foto_url || ""}
                className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="https://example.com/foto.jpg"
                disabled={!!file}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-border flex justify-end gap-4">
        <Link
          href="/admin/struktur"
          className="px-6 py-2 border border-border rounded-md text-sm font-medium hover:bg-muted transition-colors"
        >
          Batal
        </Link>
        <button
          type="submit"
          disabled={isUploading}
          className="inline-flex items-center justify-center px-6 py-2 bg-accent text-accent-foreground rounded-md text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            'Simpan Data'
          )}
        </button>
      </div>
    </form>
  );
}
