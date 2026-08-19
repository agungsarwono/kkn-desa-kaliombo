"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function tambahAnggota(
  nama: string,
  jabatan: string,
  tipe: "perangkat_desa" | "tim_kkn",
  urutan: number,
  foto_url: string | null
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("struktur_anggota")
    .insert([{ nama, jabatan, tipe, urutan, foto_url }]);

  if (error) {
    console.error("Error tambah anggota:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/struktur");
  revalidatePath("/struktur");
  return { success: true };
}

export async function updateAnggota(
  id: string,
  nama: string,
  jabatan: string,
  tipe: "perangkat_desa" | "tim_kkn",
  urutan: number,
  foto_url: string | null
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("struktur_anggota")
    .update({ nama, jabatan, tipe, urutan, foto_url })
    .eq("id", id);

  if (error) {
    console.error("Error update anggota:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/struktur");
  revalidatePath("/struktur");
  return { success: true };
}

export async function hapusAnggota(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("struktur_anggota")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error hapus anggota:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/struktur");
  revalidatePath("/struktur");
  return { success: true };
}
