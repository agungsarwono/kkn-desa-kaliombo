import Link from "next/link";
import { LayoutDashboard, FileText, Image as ImageIcon, Users, LogOut, Settings, MessageSquare } from "lucide-react";
import { logout } from "@/app/actions/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar Admin */}
      <aside className="w-64 border-r border-border bg-background hidden md:flex flex-col">
        <div className="p-6 border-b border-border">
          <Link href="/admin" className="text-xl font-bold tracking-tight">
            Admin Panel
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted text-muted-foreground hover:text-foreground">
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/berita" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted text-muted-foreground hover:text-foreground">
            <FileText className="h-4 w-4" />
            <span>Kelola Berita</span>
          </Link>
          <Link href="/admin/galeri" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted text-muted-foreground hover:text-foreground">
            <ImageIcon className="h-4 w-4" />
            <span>Kelola Galeri</span>
          </Link>
          <Link href="/admin/struktur" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted text-muted-foreground hover:text-foreground">
            <Users className="h-4 w-4" />
            <span>Kelola Struktur</span>
          </Link>
          <Link href="/admin/pesan" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted text-muted-foreground hover:text-foreground">
            <MessageSquare className="h-4 w-4" />
            <span>Pesan Masuk</span>
          </Link>
          <Link href="/admin/pengaturan" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted text-muted-foreground hover:text-foreground">
            <Settings className="h-4 w-4" />
            <span>Pengaturan</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-border">
          <form action={logout}>
            <button type="submit" className="flex w-full items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer">
              <LogOut className="h-4 w-4" />
              <span>Keluar</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Header (Placeholder) */}
        <header className="h-16 border-b border-border bg-background flex items-center justify-between px-4 md:hidden">
          <span className="font-bold">Admin Panel</span>
          <button className="p-2 text-muted-foreground">Menu</button>
        </header>

        <div className="flex-1 p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
