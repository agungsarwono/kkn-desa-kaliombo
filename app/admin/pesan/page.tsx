import { createClient } from "@/lib/supabase/server";
import { MessageSquare, Trash2, Mail, User } from "lucide-react";

export const revalidate = 0;

async function hapusPesan(id: string) {
  "use server";
  const { createClient } = await import("@/lib/supabase/server");
  const { revalidatePath } = await import("next/cache");
  const supabase = await createClient();
  await supabase.from("pesan_kontak").delete().eq("id", id);
  revalidatePath("/admin/pesan");
}

export default async function AdminPesan() {
  const supabase = await createClient();

  const { data: pesanList, error } = await supabase
    .from("pesan_kontak")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pesan Masuk</h1>
        <p className="text-muted-foreground text-sm mt-1">Pesan yang dikirim pengunjung melalui halaman Kontak.</p>
      </div>

      <div className="space-y-4">
        {!pesanList || pesanList.length === 0 ? (
          <div className="p-12 text-center border border-border rounded-xl bg-background">
            <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground mb-4 opacity-50" />
            <p className="text-muted-foreground font-medium">Belum ada pesan masuk.</p>
            <p className="text-sm text-muted-foreground mt-1">Pesan dari pengunjung akan muncul di sini.</p>
          </div>
        ) : (
          pesanList.map((pesan) => (
            <div key={pesan.id} className="bg-background rounded-xl border border-border p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-bold">{pesan.nama}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${pesan.email}`} className="text-sm text-accent hover:underline">{pesan.email}</a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <time className="text-xs text-muted-foreground">
                    {new Date(pesan.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </time>
                  <form action={async () => {
                    "use server";
                    await hapusPesan(pesan.id);
                  }}>
                    <button
                      type="submit"
                      className="p-2 text-muted-foreground hover:text-red-500 rounded-md hover:bg-red-500/10 transition-colors"
                      title="Hapus Pesan"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">{pesan.pesan}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
