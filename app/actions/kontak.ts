"use server";

import { createClient } from "@/lib/supabase/server";

export async function kirimPesan(prevState: any, formData: FormData) {
  const nama = formData.get("nama") as string;
  const email = formData.get("email") as string;
  const pesan = formData.get("pesan") as string;

  if (!nama || !email || !pesan) {
    return { error: "Semua field wajib diisi.", success: false };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("pesan_kontak")
    .insert([{ nama, email, pesan }]);

  if (error) {
    console.error("Error mengirim pesan:", error);
    return { error: "Gagal mengirim pesan. Silakan coba lagi.", success: false };
  }

  return { error: null, success: true };
}
