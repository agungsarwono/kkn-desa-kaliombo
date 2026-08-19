import { createClient } from "@/lib/supabase/server";
import AdminGaleriClient from "./GaleriClient";

export const revalidate = 0;

export default async function AdminGaleri() {
  const supabase = await createClient();

  const { data: albumList } = await supabase
    .from("galeri_album")
    .select("*")
    .order("created_at", { ascending: false });

  return <AdminGaleriClient albumList={albumList} />;
}
