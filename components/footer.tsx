"use client"

import Image from "next/image"
import { TvMinimalPlay, Terminal } from "lucide-react"

const footerLinks = {
  "Konular": [
    { label: "Terminal Rehberleri", href: "#terminal" },
    { label: "Dağıtım İncelemeleri", href: "#dagitimlar" },
    { label: "Sistem Yönetimi", href: "#egitimler" },
    { label: "Ağ Yapılandırması", href: "#egitimler" },
    { label: "Güvenlik", href: "#egitimler" },
  ],
  "Dağıtımlar": [
    { label: "Ubuntu", href: "https://ubuntu.com" },
    { label: "Arch Linux", href: "https://archlinux.org" },
    { label: "Debian", href: "https://debian.org" },
    { label: "Fedora", href: "https://fedoraproject.org" },
    { label: "Linux Mint", href: "https://linuxmint.com" },
  ],
  "Kanal": [
    { label: "YouTube", href: "https://www.youtube.com/@%C4%B0%C5%9FteLinuxBu" },
    { label: "Son Videolar", href: "#videolar" },
    { label: "Hakkında", href: "#hakkinda" },
  ],
}

export function Footer() {
  return (
    <footer id="hakkinda" className="border-t border-[#1e2e1e] bg-[#0a0e0a]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <Image src="/tux.png" alt="Tux Maskot" fill className="object-contain" />
              </div>
              <span className="font-mono font-bold text-base">
                <span className="text-[#4ade80] text-glow">İşte</span>
                <span className="text-[#facc15] text-glow-amber">Linux</span>
                <span className="text-foreground">Bu</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed font-sans">
              Türkçe Linux içerikleriyle topluluğu büyütüyoruz. Eğitimler, rehberler ve açık kaynak haberleri.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.youtube.com/@%C4%B0%C5%9FteLinuxBu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded border border-[#1e2e1e] flex items-center justify-center text-muted-foreground hover:text-[#ef4444] hover:border-[#ef4444]/40 transition-colors"
                aria-label="YouTube"
              >
                <TvMinimalPlay size={14} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-foreground uppercase tracking-widest">
                {section}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-xs font-sans text-muted-foreground hover:text-[#4ade80] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-[#1e2e1e] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Terminal size={11} className="text-[#4ade80]" />
            <span>
              <span className="text-[#4ade80]">user@istelinuxbu</span>
              <span>{`:~$ echo "© ${new Date().getFullYear()} İşte Linux Bu. Özgür yazılım ruhuyla."`}</span>
            </span>
          </div>
          <div className="text-xs font-mono text-muted-foreground">
            Linux kernel 6.x &middot; GPL-2.0
          </div>
        </div>
      </div>
    </footer>
  )
}
