import { Users, User as UserIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function StrukturOrganisasi() {
  const supabase = await createClient();

  // Ambil data perangkat desa
  const { data: perangkatDesa } = await supabase
    .from("struktur_anggota")
    .select("*")
    .eq("tipe", "perangkat_desa")
    .order("urutan", { ascending: true })
    .order("created_at", { ascending: true });

  // Ambil data tim kkn
  const { data: timKkn } = await supabase
    .from("struktur_anggota")
    .select("*")
    .eq("tipe", "tim_kkn")
    .order("urutan", { ascending: true })
    .order("created_at", { ascending: true });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-5xl">
      <div className="space-y-4 mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Struktur Organisasi</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
          Mengenal para perangkat Desa Kaliombo dan susunan panitia Tim KKN UNISNU Jepara.
        </p>
      </div>

      {/* Perangkat Desa */}
      <section className="mb-24">
        <div className="flex flex-col items-center mb-12 space-y-2">
          <Users className="h-8 w-8 text-muted-foreground" />
          <h2 className="text-3xl font-bold tracking-tight">Perangkat Desa</h2>
          <div className="h-1 w-20 bg-border mt-4"></div>
        </div>

        {(!perangkatDesa || perangkatDesa.length === 0) ? (
          <p className="text-center text-muted-foreground py-12">Data perangkat desa belum ditambahkan.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {perangkatDesa.map((item) => (
              <div key={item.id} className="flex flex-col items-center p-6 text-center rounded-lg border border-border bg-muted/20">
                <div className="w-24 h-24 rounded-full bg-muted mb-4 flex items-center justify-center overflow-hidden border border-border">
                  {item.foto_url ? (
                    <img src={item.foto_url} alt={item.nama} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="h-8 w-8 text-muted-foreground opacity-50" />
                  )}
                </div>
                <h3 className="font-bold text-lg">{item.nama}</h3>
                <p className="text-sm text-muted-foreground">{item.jabatan}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Tim KKN */}
      <section>
        <div className="flex flex-col items-center mb-12 space-y-2">
          <Users className="h-8 w-8 text-muted-foreground" />
          <h2 className="text-3xl font-bold tracking-tight">Tim KKN UNISNU</h2>
          <div className="h-1 w-20 bg-border mt-4"></div>
        </div>

        {(!timKkn || timKkn.length === 0) ? (
          <p className="text-center text-muted-foreground py-12">Data Tim KKN belum ditambahkan.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {timKkn.map((item) => (
              <div key={item.id} className="flex flex-col items-center p-6 text-center rounded-lg border border-border bg-muted/20 hover:border-accent/50 transition-colors">
                <div className="w-20 h-20 rounded-full bg-muted mb-4 flex items-center justify-center overflow-hidden border border-border">
                  {item.foto_url ? (
                    <img src={item.foto_url} alt={item.nama} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="h-8 w-8 text-muted-foreground opacity-50" />
                  )}
                </div>
                <h3 className="font-bold text-base leading-tight">{item.nama}</h3>
                <p className="text-xs text-muted-foreground mt-1">{item.jabatan}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
