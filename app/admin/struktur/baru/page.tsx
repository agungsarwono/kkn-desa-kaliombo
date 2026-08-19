import StrukturForm from "@/components/admin/StrukturForm";

export default function BaruStruktur() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tambah Anggota</h1>
        <p className="text-muted-foreground text-sm mt-1">Masukkan data anggota Perangkat Desa atau Tim KKN baru.</p>
      </div>

      <div className="bg-background rounded-xl border border-border p-6 md:p-8 mt-8">
        <StrukturForm mode="tambah" />
      </div>
    </div>
  );
}
