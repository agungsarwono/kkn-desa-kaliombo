"use client";

import { CheckCircle } from "lucide-react";
import { useActionState } from "react";
import { kirimPesan } from "@/app/actions/kontak";

export default function KontakForm() {
  const [state, formAction, isPending] = useActionState(kirimPesan, null);

  return (
    <div className="bg-muted/20 p-8 rounded-xl border border-border">
      <h2 className="text-2xl font-bold tracking-tight mb-6">Kirim Pesan</h2>

      {state?.success ? (
        <div className="text-center py-12 space-y-4">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <h3 className="text-xl font-bold">Pesan Terkirim!</h3>
          <p className="text-sm text-muted-foreground">Terima kasih telah menghubungi kami. Kami akan segera menanggapi pesan Anda.</p>
        </div>
      ) : (
        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-md text-sm text-red-500 text-center font-medium">
              {state.error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="nama" className="text-sm font-medium">Nama Lengkap</label>
            <input
              id="nama"
              name="nama"
              type="text"
              required
              className="w-full px-4 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Masukkan nama Anda"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Alamat Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="nama@email.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="pesan" className="text-sm font-medium">Pesan</label>
            <textarea
              id="pesan"
              name="pesan"
              rows={4}
              required
              className="w-full px-4 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              placeholder="Tulis pesan Anda di sini..."
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full px-6 py-3 rounded-md text-sm font-medium transition-colors bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-70"
          >
            {isPending ? "Mengirim..." : "Kirim Pesan Sekarang"}
          </button>
        </form>
      )}
    </div>
  );
}
