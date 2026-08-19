import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import EditBeritaForm from "@/components/admin/EditBeritaForm";

export default async function EditBerita({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const supabase = await createClient();

  const { data: berita, error } = await supabase
    .from("berita")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (error || !berita) {
    notFound();
  }

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
          <h1 className="text-3xl font-bold tracking-tight">Edit Berita</h1>
          <p className="text-muted-foreground text-sm mt-1">Perbarui isi atau status publikasi berita ini.</p>
        </div>
      </div>

      <div className="bg-background rounded-xl border border-border p-6 md:p-8">
        <EditBeritaForm berita={berita} />
      </div>
    </div>
  );
}
