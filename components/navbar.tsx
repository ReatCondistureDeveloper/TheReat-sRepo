"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X, Terminal, TvMinimalPlay } from "lucide-react"

const navLinks = [
  { label: "Ana Sayfa", href: "#" },
  { label: "Eğitimler", href: "#egitimler" },
  { label: "Dağıtımlar", href: "#dagitimlar" },
  { label: "Terminal", href: "#terminal" },
  { label: "Videolar", href: "#videolar" },
  { label: "Hakkında", href: "#hakkinda" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080c08]/95 backdrop-blur-sm border-b border-[#1e2e1e]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8">
            <Image src="/tux.png" alt="Tux Maskot" fill className="object-contain" />
          </div>
          <span className="font-mono font-bold text-lg">
            <span className="text-[#4ade80] text-glow">İşte</span>
            <span className="text-[#facc15] text-glow-amber">Linux</span>
            <span className="text-foreground">Bu</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="px-3 py-1.5 text-sm font-mono text-muted-foreground hover:text-[#4ade80] hover:bg-[#162016] rounded transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://www.youtube.com/@%C4%B0%C5%9FteLinuxBu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[#4ade80] text-[#080c08] text-sm font-mono font-bold rounded hover:bg-[#22c55e] transition-colors duration-200"
          >
            <TvMinimalPlay size={14} />
            Abone Ol
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menüyü aç/kapat"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#080c08]/98 border-b border-[#1e2e1e] px-4 pb-4">
          <ul className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-mono text-muted-foreground hover:text-[#4ade80] hover:bg-[#162016] rounded transition-colors"
                >
                  <Terminal size={12} className="text-[#4ade80]" />
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="https://www.youtube.com/@%C4%B0%C5%9FteLinuxBu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-[#4ade80] text-[#080c08] text-sm font-mono font-bold rounded"
              >
                <TvMinimalPlay size={14} />
                YouTube&apos;a Git
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
