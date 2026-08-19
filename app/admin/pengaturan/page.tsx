import { createClient } from "@/lib/supabase/server";
import PengaturanForm from "@/components/admin/PengaturanForm";

export const revalidate = 0;

export default async function AdminPengaturan() {
  const supabase = await createClient();
  
  // Mengambil data pengaturan (selalu row dengan ID 1)
  const { data: pengaturan } = await supabase
    .from("pengaturan_web")
    .select("*")
    .eq("id", 1)
    .single();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pengaturan Web</h1>
        <p className="text-muted-foreground text-sm mt-1">Konfigurasi informasi umum, kontak, dan sosial media website.</p>
      </div>

      <div className="bg-background rounded-xl border border-border p-6 md:p-8 mt-8">
        <PengaturanForm pengaturan={pengaturan || {}} />
      </div>
    </div>
  );
}
