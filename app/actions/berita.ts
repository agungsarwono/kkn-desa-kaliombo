"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createBerita(formData: FormData) {
  const supabase = await createClient();

  const judul = formData.get("judul") as string;
  const konten = formData.get("konten") as string;
  const kategori = formData.get("kategori") as string;
  const penulis = formData.get("penulis") as string;
  const gambar_cover_url = formData.get("gambar_cover_url") as string;
  const status = formData.get("status") as string || "draft";
  const tanggal_publish = formData.get("tanggal_publish") as string;

  // Generate a simple slug from title
  const slug = judul
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "") + "-" + Date.now().toString().slice(-4);

  const { data, error } = await supabase
    .from("berita")
    .insert([
      {
        judul,
        slug,
        konten,
        kategori,
        penulis,
        gambar_cover_url,
        status,
        tanggal_publish: tanggal_publish ? new Date(tanggal_publish).toISOString() : new Date().toISOString(),
      },
    ]);

  if (error) {
    console.error("Error creating berita:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/berita");
  revalidatePath("/berita");
  revalidatePath("/");
}

export async function deleteBerita(id: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("berita")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting berita:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/berita");
  revalidatePath("/berita");
}

export async function updateBerita(id: string, formData: FormData) {
  const supabase = await createClient();

  const judul = formData.get("judul") as string;
  const konten = formData.get("konten") as string;
  const kategori = formData.get("kategori") as string;
  const penulis = formData.get("penulis") as string;
  const gambar_cover_url = formData.get("gambar_cover_url") as string;
  const status = formData.get("status") as string || "draft";
  const tanggal_publish = formData.get("tanggal_publish") as string;

  const { error } = await supabase
    .from("berita")
    .update({
      judul,
      konten,
      kategori,
      penulis,
      gambar_cover_url,
      status,
      tanggal_publish: tanggal_publish ? new Date(tanggal_publish).toISOString() : undefined,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating berita:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/berita");
  revalidatePath("/berita");
  revalidatePath("/");
}
