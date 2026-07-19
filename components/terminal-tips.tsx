"use client"

import { useState } from "react"
import { Copy, Check, Terminal } from "lucide-react"

const tips = [
  {
    cmd: "ctrl + r",
    desc: "Komut geçmişinde geriye doğru ara",
    category: "Kısayol",
  },
  {
    cmd: "!!",
    desc: "Son komutu tekrar çalıştır",
    category: "Bash",
  },
  {
    cmd: "cd -",
    desc: "Önceki dizine geri dön",
    category: "Gezinme",
  },
  {
    cmd: "grep -r 'pattern' .",
    desc: "Mevcut dizinde özyinelemeli arama",
    category: "Arama",
  },
  {
    cmd: "tar -xzf archive.tar.gz",
    desc: "tar.gz arşivini çıkar",
    category: "Dosya",
  },
  {
    cmd: "ps aux | grep process",
    desc: "Çalışan işlemleri filtrele",
    category: "Süreç",
  },
  {
    cmd: "df -h",
    desc: "Disk kullanımını okunabilir göster",
    category: "Sistem",
  },
  {
    cmd: "chmod 755 file.sh",
    desc: "Dosyaya çalıştırma izni ver",
    category: "İzin",
  },
]

const categoryColors: Record<string, string> = {
  Kısayol: "#4ade80",
  Bash: "#facc15",
  Gezinme: "#22d3ee",
  Arama: "#4ade80",
  Dosya: "#facc15",
  Süreç: "#22d3ee",
  Sistem: "#4ade80",
  İzin: "#facc15",
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const fallbackCopy = () => {
    const el = document.createElement("textarea")
    el.value = text
    el.style.position = "fixed"
    el.style.opacity = "0"
    document.body.appendChild(el)
    el.select()
    document.execCommand("copy")
    document.body.removeChild(el)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopy = () => {
    if (!navigator?.clipboard?.writeText) {
      fallbackCopy()
      return
    }
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      },
      () => fallbackCopy()
    )
  }

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded text-muted-foreground hover:text-[#4ade80] hover:bg-[#162016] transition-colors"
      aria-label="Kopyala"
    >
      {copied ? <Check size={12} className="text-[#4ade80]" /> : <Copy size={12} />}
    </button>
  )
}

export function TerminalTips() {
  return (
    <section id="terminal" className="py-24 border-t border-[#1e2e1e]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#4ade80] mb-3">
            <span className="text-muted-foreground">$</span>
            <span>man linux-tips</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-mono font-bold text-foreground text-balance">
            Terminal İpuçları
          </h2>
          <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
            Günlük işleri hızlandıran pratik komutlar ve kısayollar.
          </p>
        </div>

        {/* Terminal window */}
        <div className="border border-[#1e2e1e] rounded-lg overflow-hidden">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#0f140f] border-b border-[#1e2e1e]">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
            <div className="w-3 h-3 rounded-full bg-[#facc15]" />
            <div className="w-3 h-3 rounded-full bg-[#4ade80]" />
            <div className="ml-2 flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
              <Terminal size={11} />
              linux-tips — cheatsheet
            </div>
          </div>

          {/* Tips grid */}
          <div className="bg-[#080c08] p-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {tips.map((tip) => (
              <div
                key={tip.cmd}
                className="border border-[#1e2e1e] rounded p-3 bg-[#0a0e0a] hover:border-[#1e2e1e]/70 hover:bg-[#0f140f] transition-all duration-200 group"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span
                    className="text-xs font-mono px-1.5 py-0.5 rounded"
                    style={{
                      color: categoryColors[tip.category] ?? "#4ade80",
                      border: `1px solid ${categoryColors[tip.category] ?? "#4ade80"}40`,
                      background: `${categoryColors[tip.category] ?? "#4ade80"}10`,
                    }}
                  >
                    {tip.category}
                  </span>
                  <CopyButton text={tip.cmd} />
                </div>
                <code className="block font-mono text-[#4ade80] text-xs leading-relaxed break-all text-glow mb-2">
                  {tip.cmd}
                </code>
                <p className="text-xs text-muted-foreground leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
