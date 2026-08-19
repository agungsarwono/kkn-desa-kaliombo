"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useActionState } from "react";
import { login } from "@/app/actions/auth";

export default function AdminLogin() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
      <div className="w-full max-w-md bg-background rounded-xl border border-border shadow-sm p-8">
        <div className="mb-8 text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Login Admin</h1>
          <p className="text-sm text-muted-foreground">
            Masukkan email dan password Anda untuk mengelola konten website.
          </p>
        </div>

        {state?.error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-md text-sm text-red-500 text-center font-medium">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input 
              id="email" 
              name="email"
              type="email" 
              required
              className="w-full px-4 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="admin@kaliombo.com"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
            </div>
            <input 
              id="password" 
              name="password"
              type="password" 
              required
              className="w-full px-4 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            className="w-full mt-6 px-4 py-2 rounded-md text-sm font-medium transition-colors bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-70 flex justify-center items-center"
          >
            {isPending ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
