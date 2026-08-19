import Link from "next/link"
import { createClient } from "@/lib/supabase/server";

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const supabase = await createClient();

  const { data: pengaturan } = await supabase
    .from("pengaturan_web")
    .select("*")
    .eq("id", 1)
    .single();

  const namaDesa = pengaturan?.nama_desa || "Desa Kaliombo";
  const deskripsi = pengaturan?.deskripsi_singkat || "Website resmi informasi desa dan dokumentasi kegiatan Tim KKN UNISNU Jepara di Desa Kaliombo, Kecamatan Pecangaan.";

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-lg font-bold tracking-tight">{namaDesa}</h3>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed whitespace-pre-wrap">
              {deskripsi}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wide uppercase text-foreground">Menu</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/berita" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Berita & Kegiatan
                </Link>
              </li>
              <li>
                <Link href="/profil-desa" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Profil Desa
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Galeri Foto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wide uppercase text-foreground">Bantuan</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/kontak" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Hubungi Kami
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Login Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            &copy; {currentYear} Tim KKN UNISNU. Hak Cipta Dilindungi.
          </p>
          <div className="flex space-x-4 items-center">
            {pengaturan?.link_instagram && (
              <a href={pengaturan.link_instagram} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                Instagram
              </a>
            )}
            {pengaturan?.link_tiktok && (
              <a href={pengaturan.link_tiktok} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                TikTok
              </a>
            )}
            {pengaturan?.link_youtube && (
              <a href={pengaturan.link_youtube} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                YouTube
              </a>
            )}
            {!pengaturan?.link_instagram && !pengaturan?.link_tiktok && !pengaturan?.link_youtube && (
              <span className="text-xs text-muted-foreground">Dibuat dengan Next.js & Tailwind</span>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
