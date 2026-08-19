import StrukturForm from "@/components/admin/StrukturForm";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function EditStruktur({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: anggota } = await supabase
    .from("struktur_anggota")
    .select("*")
    .eq("id", id)
    .single();

  if (!anggota) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Anggota</h1>
        <p className="text-muted-foreground text-sm mt-1">Ubah data anggota Perangkat Desa atau Tim KKN.</p>
      </div>

      <div className="bg-background rounded-xl border border-border p-6 md:p-8 mt-8">
        <StrukturForm mode="edit" anggota={anggota} />
      </div>
    </div>
  );
}
