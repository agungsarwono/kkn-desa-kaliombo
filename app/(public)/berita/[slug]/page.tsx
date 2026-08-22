import Link from "next/link";
import { ArrowLeft, Calendar, Tag, User, Image as ImageIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ShareButtons from "@/components/berita/ShareButtons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const revalidate = 0;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.kknkaliombo.my.id";

export default async function BeritaDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const supabase = await createClient();

  const { data: berita, error } = await supabase
    .from("berita")
    .select("*")
    .eq("slug", resolvedParams.slug)
    .single();

  if (error || !berita) {
    notFound();
  }

  const articleUrl = `${SITE_URL}/berita/${berita.slug}`;

  return (
    <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
      <Link href="/berita" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Kembali ke Berita
      </Link>

      <header className="space-y-6 mb-12">
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Tag className="mr-1.5 h-4 w-4" />
            <span className="font-medium px-2 py-0.5 bg-muted rounded-full">{berita.kategori}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-1.5 h-4 w-4" />
            <time>{new Date(berita.tanggal_publish || berita.created_at).toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</time>
          </div>
          <div className="flex items-center">
            <User className="mr-1.5 h-4 w-4" />
            <span>{berita.penulis}</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-balance">
          {berita.judul}
        </h1>
      </header>

      {berita.gambar_cover_url ? (
        <div className="aspect-[21/9] w-full rounded-xl bg-muted border border-border overflow-hidden mb-12">
          <img src={berita.gambar_cover_url} alt={berita.judul} className="object-cover w-full h-full" />
        </div>
      ) : (
        <div className="aspect-[21/9] w-full rounded-xl bg-muted border border-border flex items-center justify-center mb-12">
           <div className="flex flex-col items-center text-muted-foreground opacity-50">
             <ImageIcon className="h-12 w-12 mb-2" />
             <span className="font-medium">Gambar Cover Tidak Tersedia</span>
           </div>
        </div>
      )}

      {/* Konten Berita - Merender markdown agar format seperti bold, italic, dan list bisa berjalan */}
      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-accent hover:prose-a:text-accent/80">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {berita.konten}
        </ReactMarkdown>
      </div>

      {/* Share Buttons */}
      <div className="mt-12 pt-8 border-t border-border">
        <ShareButtons url={articleUrl} title={berita.judul} />
      </div>

    </article>
  );
}

