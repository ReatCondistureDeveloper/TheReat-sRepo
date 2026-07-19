"use client"

import { useState } from "react"
import { ExternalLink, Star, Users, Package } from "lucide-react"

const distros = [
  {
    name: "Ubuntu",
    version: "24.04 LTS",
    tag: "Yeni Başlayanlar",
    tagColor: "#4ade80",
    desc: "En popüler Linux dağıtımı. Kullanıcı dostu arayüzü ve geniş topluluk desteğiyle ideal başlangıç noktası.",
    pkg: "apt",
    de: "GNOME",
    stars: 5,
    users: "50M+",
    packages: "60.000+",
    color: "#e95420",
    href: "https://ubuntu.com",
    cmd: "sudo apt install ubuntu-desktop",
  },
  {
    name: "Arch Linux",
    version: "Rolling Release",
    tag: "İleri Seviye",
    tagColor: "#facc15",
    desc: "Minimalist ve özelleştirilebilir yapısıyla ileri seviye kullanıcıların tercihi. Her şeyi kendin kurarsın.",
    pkg: "pacman",
    de: "İsteğe Bağlı",
    stars: 4,
    users: "2M+",
    packages: "12.000+",
    color: "#1793d1",
    href: "https://archlinux.org",
    cmd: "pacman -S base-devel",
  },
  {
    name: "Debian",
    version: "12 Bookworm",
    tag: "Kararlı",
    tagColor: "#22d3ee",
    desc: "Kararlılığıyla öne çıkan, sunucu ve masaüstü için güvenilir seçim. Pek çok dağıtımın anası.",
    pkg: "apt",
    de: "GNOME / KDE",
    stars: 5,
    users: "30M+",
    packages: "59.000+",
    color: "#a80030",
    href: "https://debian.org",
    cmd: "sudo apt-get update && upgrade",
  },
  {
    name: "Fedora",
    version: "40",
    tag: "Güncel",
    tagColor: "#4ade80",
    desc: "Red Hat destekli, her zaman güncel teknolojileri sunan modern Linux deneyimi.",
    pkg: "dnf",
    de: "GNOME",
    stars: 4,
    users: "10M+",
    packages: "50.000+",
    color: "#3c6eb4",
    href: "https://fedoraproject.org",
    cmd: "sudo dnf install @workstation-product",
  },
  {
    name: "Linux Mint",
    version: "21.3",
    tag: "Windows'tan Geçiş",
    tagColor: "#4ade80",
    desc: "Windows kullanıcıları için tasarlanmış, tanıdık arayüzü ve kolay kurulumu ile mükemmel geçiş noktası.",
    pkg: "apt",
    de: "Cinnamon",
    stars: 5,
    users: "15M+",
    packages: "60.000+",
    color: "#86be43",
    href: "https://linuxmint.com",
    cmd: "sudo apt install mint-meta-cinnamon",
  },
  {
    name: "Manjaro",
    version: "23.1",
    tag: "Arch Tabanlı",
    tagColor: "#facc15",
    desc: "Arch Linux'un gücünü kullanıcı dostu bir arayüzle sunan, rolling release dağıtım.",
    pkg: "pamac",
    de: "KDE / GNOME",
    stars: 4,
    users: "5M+",
    packages: "12.000+",
    color: "#35bf5c",
    href: "https://manjaro.org",
    cmd: "pamac install manjaro-kde-settings",
  },
]

export function DistroShowcase() {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = distros[activeIdx]

  return (
    <section id="dagitimlar" className="py-24 border-t border-[#1e2e1e]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#4ade80] mb-3">
            <span className="text-muted-foreground">$</span>
            <span>ls /distros/</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-mono font-bold text-foreground text-balance">
            Linux Dağıtımları
          </h2>
          <p className="mt-2 text-muted-foreground text-sm max-w-xl leading-relaxed">
            Hangi dağıtım sana göre? Her seviye ve kullanım amacı için öneriler.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Distro list */}
          <div className="md:col-span-1 space-y-1">
            {distros.map((d, i) => (
              <button
                key={d.name}
                onClick={() => setActiveIdx(i)}
                className={`w-full text-left px-4 py-3 rounded border transition-all duration-200 ${
                  i === activeIdx
                    ? "border-[#4ade80] bg-[#0f140f] text-[#4ade80]"
                    : "border-[#1e2e1e] bg-transparent text-muted-foreground hover:border-[#1e2e1e] hover:bg-[#0f140f] hover:text-foreground"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm">{d.name}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded font-mono"
                    style={{
                      color: d.tagColor,
                      borderColor: `${d.tagColor}40`,
                      border: `1px solid ${d.tagColor}40`,
                      background: `${d.tagColor}10`,
                    }}
                  >
                    {d.tag}
                  </span>
                </div>
                <div className="text-xs mt-0.5 font-mono opacity-60">{d.version}</div>
              </button>
            ))}
          </div>

          {/* Distro detail */}
          <div className="md:col-span-2 border border-[#1e2e1e] rounded-lg bg-[#0f140f] overflow-hidden">
            {/* Detail header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e2e1e]">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: active.color, boxShadow: `0 0 8px ${active.color}80` }}
                />
                <span className="font-mono font-bold text-lg text-foreground">{active.name}</span>
                <span className="text-xs font-mono text-muted-foreground">{active.version}</span>
              </div>
              <a
                href={active.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-[#4ade80] transition-colors"
              >
                Resmi Site <ExternalLink size={10} />
              </a>
            </div>

            <div className="p-6 space-y-6">
              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">{active.desc}</p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#162016] rounded p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-[#4ade80] mb-1">
                    <Users size={12} />
                    <span className="text-xs font-mono text-muted-foreground">Kullanıcı</span>
                  </div>
                  <span className="font-mono font-bold text-sm text-foreground">{active.users}</span>
                </div>
                <div className="bg-[#162016] rounded p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-[#facc15] mb-1">
                    <Package size={12} />
                    <span className="text-xs font-mono text-muted-foreground">Paket</span>
                  </div>
                  <span className="font-mono font-bold text-sm text-foreground">{active.packages}</span>
                </div>
                <div className="bg-[#162016] rounded p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-[#22d3ee] mb-1">
                    <Star size={12} />
                    <span className="text-xs font-mono text-muted-foreground">Puan</span>
                  </div>
                  <div className="flex items-center justify-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-xs ${i < active.stars ? "text-[#facc15]" : "text-[#1e2e1e]"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs font-mono text-muted-foreground">Paket Yöneticisi</span>
                  <div className="mt-1 px-2 py-1 bg-[#162016] rounded font-mono text-sm text-[#4ade80] inline-block">
                    {active.pkg}
                  </div>
                </div>
                <div>
                  <span className="text-xs font-mono text-muted-foreground">Masaüstü Ortamı</span>
                  <div className="mt-1 px-2 py-1 bg-[#162016] rounded font-mono text-sm text-[#facc15] inline-block">
                    {active.de}
                  </div>
                </div>
              </div>

              {/* Example command */}
              <div>
                <span className="text-xs font-mono text-muted-foreground mb-2 block">Örnek komut:</span>
                <div className="flex items-center gap-2 px-4 py-3 bg-[#080c08] rounded border border-[#1e2e1e] font-mono text-sm">
                  <span className="text-[#4ade80]">$</span>
                  <span className="text-foreground">{active.cmd}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
