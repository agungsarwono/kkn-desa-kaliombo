"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/berita", label: "Berita" },
  { href: "/profil-desa", label: "Profil Desa" },
  { href: "/galeri", label: "Galeri" },
  { href: "/struktur", label: "Struktur" },
  { href: "/tentang-kkn", label: "Tim KKN" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <header className="sticky top-0 z-50 w-full glass">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="/logo-kkn-kaliombo.png"
              alt="Logo KKN Kaliombo"
              className="h-12 w-auto"
            />
            <span className="font-bold text-xl tracking-tight hidden sm:block">KKN Kaliombo</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-foreground bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <Link
              href="/kontak"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-accent text-accent-foreground shadow hover:bg-accent/90 h-9 px-4 py-2"
            >
              Hubungi Kami
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-1">
            <ThemeToggle />
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-16 z-40 bg-background/80 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-16 left-0 right-0 z-50 bg-background border-b border-border shadow-lg transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="container mx-auto px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                pathname === link.href
                  ? "text-foreground bg-muted"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t border-border">
            <Link
              href="/kontak"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-3 rounded-lg text-sm font-medium bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
            >
              Hubungi Kami
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
