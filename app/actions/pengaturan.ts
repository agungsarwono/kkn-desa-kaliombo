"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updatePengaturan(formData: FormData) {
  const supabase = await createClient();

  const nama_desa = formData.get("nama_desa") as string;
  const deskripsi_singkat = formData.get("deskripsi_singkat") as string;
  const alamat = formData.get("alamat") as string;
  const no_telepon = formData.get("no_telepon") as string;
  const email = formData.get("email") as string;
  const link_instagram = formData.get("link_instagram") as string;
  const link_tiktok = formData.get("link_tiktok") as string;
  const link_youtube = formData.get("link_youtube") as string;

  const { error } = await supabase
    .from("pengaturan_web")
    .update({
      nama_desa,
      deskripsi_singkat,
      alamat,
      no_telepon,
      email,
      link_instagram,
      link_tiktok,
      link_youtube,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (error) {
    console.error("Error updating pengaturan:", error);
    return { success: false, error: error.message };
  }

  // Revalidate layout and pages so data updates globally
  revalidatePath("/", "layout");
  
  return { success: true };
}
