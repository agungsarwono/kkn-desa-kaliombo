import { CheckCircle2 } from "lucide-react";

export default function TentangKKN() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-4xl">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Tentang Tim KKN</h1>
        <p className="text-lg text-muted-foreground max-w-2xl text-balance">
          Mengabdi dengan sinergi dan inovasi. Tim KKN UNISNU Jepara hadir di Desa Kaliombo untuk memberdayakan UMKM, membantu administrasi publik, serta membangun kesadaran pendidikan dan sosial kemasyarakatan.
        </p>
      </div>

      <section className="prose prose-neutral dark:prose-invert max-w-none mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Latar Belakang</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          Kuliah Kerja Nyata (KKN) adalah bentuk pengabdian kepada masyarakat yang menjadi bagian tak terpisahkan dari kurikulum pendidikan tinggi di UNISNU Jepara. Melalui program ini, mahasiswa diharapkan dapat menerapkan ilmu yang telah dipelajari di bangku kuliah secara langsung di tengah masyarakat.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Desa Kaliombo terpilih sebagai lokasi pengabdian kami karena potensi desa yang luar biasa dan semangat gotong-royong masyarakatnya yang tinggi. Tim kami hadir dengan harapan dapat membawa dampak positif yang berkelanjutan melalui berbagai program kerja.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-bold tracking-tight border-b border-border pb-4">Program Kerja Utama</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Proker 1 */}
          <div className="flex space-x-4 p-6 rounded-lg border border-border bg-muted/20">
            <CheckCircle2 className="h-6 w-6 text-muted-foreground shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">Pembuatan Peta Administrasi</h3>
              <p className="text-sm text-muted-foreground">Pembaruan dan pembuatan peta batas wilayah serta administrasi Desa Kaliombo untuk keperluan inventarisasi dan informasi publik desa.</p>
            </div>
          </div>
          
          {/* Proker 2 */}
          <div className="flex space-x-4 p-6 rounded-lg border border-border bg-muted/20">
            <CheckCircle2 className="h-6 w-6 text-muted-foreground shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">Semarak Kemerdekaan (17 Agustus)</h3>
              <p className="text-sm text-muted-foreground">Turut serta dalam mengorganisir dan menyemarakkan berbagai perlombaan dan kegiatan peringatan Hari Kemerdekaan RI di desa.</p>
            </div>
          </div>
          
          {/* Proker 3 */}
          <div className="flex space-x-4 p-6 rounded-lg border border-border bg-muted/20">
            <CheckCircle2 className="h-6 w-6 text-muted-foreground shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">Sosialisasi Anti Bullying</h3>
              <p className="text-sm text-muted-foreground">Penyuluhan mengenai pencegahan perundungan (bullying) yang ditujukan untuk siswa-siswi di SDN 3 Kaliombo guna menciptakan lingkungan sekolah yang aman.</p>
            </div>
          </div>

          {/* Proker 4 */}
          <div className="flex space-x-4 p-6 rounded-lg border border-border bg-muted/20">
            <CheckCircle2 className="h-6 w-6 text-muted-foreground shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">Sosialisasi Pembukuan UMKM</h3>
              <p className="text-sm text-muted-foreground">Pendampingan dan edukasi pembukuan finansial sederhana bagi para pelaku UMKM setempat untuk membantu memonitor arus kas usaha mereka.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
