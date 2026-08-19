import { MapPin, Info, Briefcase, Leaf } from "lucide-react";

export default function ProfilDesa() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-5xl">
      <div className="space-y-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Profil Desa Kaliombo</h1>
        <p className="text-lg text-muted-foreground max-w-2xl text-balance">
          Mengenal lebih dekat kondisi geografis, demografis, dan potensi Desa Kaliombo, Kecamatan Pecangaan, Kabupaten Jepara.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Letak Geografis */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3 border-b border-border pb-4">
            <MapPin className="h-6 w-6 text-muted-foreground" />
            <h2 className="text-2xl font-bold tracking-tight">Letak & Geografis</h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Desa Kaliombo adalah salah satu desa di Kecamatan Pecangaan, Kabupaten Jepara. Wilayah desa ini dialiri sungai yang membentuk pola permukiman <i>waterfront</i>, serta memadukan kawasan permukiman, pertanian, dan area hijau yang menunjang perekonomian lokal.
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Luas wilayah: <strong>301 Ha (3,01 km²)</strong></li>
              <li>Batas Utara: <strong>Desa Troso dan Desa Ngeling</strong></li>
              <li>Batas Selatan: <strong>Desa Tedunan</strong></li>
              <li>Batas Timur: <strong>Desa Gerdu dan Desa Karangrandu</strong></li>
              <li>Batas Barat: <strong>Desa Tedunan dan Desa Sowan Lor</strong></li>
            </ul>
            <p className="text-xs mt-2 italic">*Sumber data: BPS dan Direktori Kampung KB (Diakses Tahun 2026)</p>
          </div>
        </section>

        {/* Demografi */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3 border-b border-border pb-4">
            <Info className="h-6 w-6 text-muted-foreground" />
            <h2 className="text-2xl font-bold tracking-tight">Demografi Penduduk</h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Masyarakat Desa Kaliombo dikenal guyub rukun dan menjunjung tinggi nilai-nilai kearifan lokal. Penduduk desa ini mayoritas beragama Islam dengan tingkat partisipasi sosial yang tinggi dalam kegiatan kemasyarakatan.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-muted border border-border">
                <span className="block text-3xl font-bold text-foreground">3.274</span>
                <span className="text-sm">Total Jiwa Penduduk</span>
              </div>
              <div className="p-4 rounded-lg bg-muted border border-border">
                <span className="block text-3xl font-bold text-foreground">990</span>
                <span className="text-sm">Kepala Keluarga (KK)</span>
              </div>
            </div>
            <p className="text-xs mt-2 italic">*Sumber data: BPS dan Direktori Kampung KB (Data Februari 2026)</p>
          </div>
        </section>

        {/* Potensi Desa */}
        <section className="space-y-6 md:col-span-2 mt-8">
          <div className="flex items-center space-x-3 border-b border-border pb-4">
            <Briefcase className="h-6 w-6 text-muted-foreground" />
            <h2 className="text-2xl font-bold tracking-tight">Potensi Desa</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <Leaf className="h-8 w-8 text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">Pertanian & Peternakan</h3>
              <p className="text-sm text-muted-foreground">
                Desa ini memiliki lahan pertanian subur dengan dukungan irigasi teknis untuk komoditas padi. Selain itu, terdapat usaha peternakan unggulan seperti kerbau dan itik yang menunjang ketahanan pangan lokal.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <Briefcase className="h-8 w-8 text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">UMKM & Budaya Lokal</h3>
              <p className="text-sm text-muted-foreground">
                Potensi ekonomi kreatif warga terus berkembang melalui usaha mikro (UMKM). Masyarakat juga aktif melestarikan tradisi budaya lokal seperti sedekah bumi dan menjaga situs makam Ronggo Joyo Kusumo.
              </p>
            </div>
          </div>
        </section>
        
        {/* Peta Lokasi */}
        <section className="space-y-6 md:col-span-2 mt-8">
          <div className="flex items-center space-x-3 border-b border-border pb-4">
            <MapPin className="h-6 w-6 text-muted-foreground" />
            <h2 className="text-2xl font-bold tracking-tight">Peta Lokasi</h2>
          </div>
          <div className="w-full h-[400px] bg-muted border border-border rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15840.308074474888!2d110.66!3d-6.72!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70df9b1c4b8e7f%3A0xdesakaliombo!2sDesa+Kaliombo%2C+Pecangaan%2C+Jepara!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi Desa Kaliombo"
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
}
