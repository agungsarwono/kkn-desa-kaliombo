import { Mail, MapPin, Phone } from "lucide-react";
import KontakForm from "@/components/kontak/KontakForm";
import { createClient } from "@/lib/supabase/server";

export default async function Kontak() {
  const supabase = await createClient();
  
  const { data: pengaturan } = await supabase
    .from("pengaturan_web")
    .select("*")
    .eq("id", 1)
    .single();

  const alamat = pengaturan?.alamat || "Jalan Raya Pecangaan Kedung\nRT.2/RW.2, Desa Kaliombo, Kecamatan Pecangaan\nKabupaten Jepara, Jawa Tengah, Indonesia";
  const noTelepon = pengaturan?.no_telepon || "+62 859 7252 7265 (Kormades)";
  const email = pengaturan?.email || "kknkaliombo2026@gmail.com";

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-5xl">
      <div className="space-y-4 mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Hubungi Kami</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
          Kami terbuka untuk diskusi, kolaborasi, maupun pertanyaan seputar kegiatan KKN dan informasi Desa Kaliombo.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        {/* Info Kontak */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Informasi Kontak</h2>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-muted-foreground shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold">Alamat Posko KKN</h3>
                  <p className="text-muted-foreground mt-1 text-sm whitespace-pre-wrap">
                    {alamat}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-muted-foreground shrink-0" />
                <div>
                  <h3 className="font-semibold">Telepon / WhatsApp</h3>
                  <p className="text-muted-foreground mt-1 text-sm">{noTelepon}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-muted-foreground shrink-0" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground mt-1 text-sm">{email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Lokasi Kami</h2>
            <div className="w-full h-[250px] bg-muted border border-border rounded-xl overflow-hidden">
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
          </div>
        </div>

        {/* Form Kontak Component */}
        <KontakForm />
      </div>
    </div>
  );
}
