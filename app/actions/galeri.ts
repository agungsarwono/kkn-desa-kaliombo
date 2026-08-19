"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createAlbum(prevState: any, formData: FormData) {
  const judul_album = formData.get("judul_album") as string;
  const deskripsi = formData.get("deskripsi") as string;
  const tanggal_kegiatan = formData.get("tanggal_kegiatan") as string;

  if (!judul_album) {
    return { error: "Judul album wajib diisi.", success: false };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("galeri_album")
    .insert([{
      judul_album,
      deskripsi: deskripsi || null,
      tanggal_kegiatan: tanggal_kegiatan || null,
    }]);

  if (error) {
    console.error("Error creating album:", error);
    return { error: "Gagal membuat album. " + error.message, success: false };
  }

  revalidatePath("/admin/galeri");
  revalidatePath("/galeri");
  return { error: null, success: true };
}

export async function deleteAlbum(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("galeri_album")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting album:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/galeri");
  revalidatePath("/galeri");
}
