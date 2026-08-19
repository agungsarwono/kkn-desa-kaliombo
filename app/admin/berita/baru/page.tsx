"use client";

import { useState } from "react";
import { createBerita } from "@/app/actions/berita";
import Link from "next/link";
import { ArrowLeft, Loader2, Image as ImageIcon } from "lucide-react";
import imageCompression from 'browser-image-compression';
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function TambahBerita() {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
      let uploadedUrl = "";

      if (file) {
        // Compress image
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1280,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);

        // Upload to Supabase Storage
        const supabase = createClient();
        const fileExt = compressedFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

        const { error } = await supabase.storage
          .from('kkn-images')
          .upload(`berita/${fileName}`, compressedFile);

        if (error) throw error;

        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from('kkn-images')
          .getPublicUrl(`berita/${fileName}`);
        
        uploadedUrl = publicUrlData.publicUrl;
      }

      // Add to formData
      if (uploadedUrl) {
        formData.set('gambar_cover_url', uploadedUrl);
      } else {
        const urlText = formData.get('gambar_cover_url_text');
        if (urlText) {
          formData.set('gambar_cover_url', urlText);
        } else {
          formData.set('gambar_cover_url', '');
        }
      }

      // Execute Server Action
      await createBerita(formData);
      router.push('/admin/berita');
      router.refresh();
    } catch (error) {
      console.error("Error uploading/saving:", error);
      alert("Terjadi kesalahan saat mengupload gambar atau menyimpan berita.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link 
          href="/admin/berita" 
          className="p-2 border border-border rounded-md hover:bg-muted text-muted-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tulis Berita Baru</h1>
          <p className="text-muted-foreground text-sm mt-1">Publikasikan kegiatan terbaru dari Desa Kaliombo.</p>
        </div>
      </div>

      <div className="bg-background rounded-xl border border-border p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="judul" className="text-sm font-medium">Judul Berita</label>
            <input 
              id="judul" 
              name="judul"
              type="text" 
              required
              className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Contoh: Gotong Royong Membersihkan Balai Desa"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="kategori" className="text-sm font-medium">Kategori</label>
              <select 
                id="kategori" 
                name="kategori"
                required
                className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">Pilih Kategori</option>
                <option value="Kegiatan KKN">Kegiatan KKN</option>
                <option value="Informasi Desa">Informasi Desa</option>
                <option value="Sosialisasi">Sosialisasi</option>
                <option value="Gotong Royong">Gotong Royong</option>
                <option value="Pendidikan">Pendidikan</option>
                <option value="UMKM">UMKM</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="penulis" className="text-sm font-medium">Penulis / Tim</label>
              <input 
                id="penulis" 
                name="penulis"
                type="text" 
                required
                className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Nama anggota atau divisi"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="tanggal_publish" className="text-sm font-medium">Tanggal Publish</label>
              <input 
                id="tanggal_publish" 
                name="tanggal_publish"
                type="date" 
                defaultValue={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium">Gambar Cover (Opsional)</label>
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-1/3">
                <div 
                  className="w-full aspect-video rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center bg-muted/30 overflow-hidden relative"
                >
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-4">
                      <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                      <p className="text-xs text-muted-foreground">Preview Gambar</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="w-full md:w-2/3 space-y-4">
                <div className="space-y-2">
                  <label htmlFor="file_upload" className="text-sm text-muted-foreground">Upload dari Device (Max ~5MB, akan dikompresi otomatis)</label>
                  <input 
                    id="file_upload"
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-accent file:text-accent-foreground hover:file:bg-accent/90 cursor-pointer"
                  />
                </div>
                
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-border"></div>
                  <span className="flex-shrink-0 mx-4 text-xs text-muted-foreground">ATAU</span>
                  <div className="flex-grow border-t border-border"></div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="gambar_cover_url_text" className="text-sm text-muted-foreground">Gunakan URL Gambar Publik</label>
                  <input 
                    id="gambar_cover_url_text" 
                    name="gambar_cover_url_text"
                    type="url" 
                    className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="https://example.com/gambar.jpg"
                    disabled={!!file}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="konten" className="text-sm font-medium">Isi Berita</label>
            <textarea 
              id="konten" 
              name="konten"
              rows={10}
              required
              className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent resize-y"
              placeholder="Tuliskan isi berita atau detail kegiatan di sini..."
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">Status Publikasi</label>
            <select 
              id="status" 
              name="status"
              className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="published">Langsung Publikasikan (Published)</option>
              <option value="draft">Simpan sebagai Draf (Draft)</option>
            </select>
          </div>

          <div className="pt-4 border-t border-border flex justify-end gap-4">
            <Link 
              href="/admin/berita"
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
                  Mengupload...
                </>
              ) : (
                'Simpan Berita'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
