"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight, TvMinimalPlay, Terminal } from "lucide-react"
import useSWR from "swr"
import type { ChannelStats } from "@/app/api/youtube/route"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const terminalLines = [
  { prompt: "user@linux:~$", cmd: " sudo apt update", delay: 0 },
  { prompt: "", cmd: "Paket listeleri güncelleniyor...", delay: 800, info: true },
  { prompt: "", cmd: "Tüm paketler güncel. ✓", delay: 1400, success: true },
  { prompt: "user@linux:~$", cmd: " neofetch", delay: 2000 },
  { prompt: "", cmd: "OS: Arch Linux x86_64", delay: 2600, info: true },
  { prompt: "", cmd: "Kernel: 6.9.3-arch1-1", delay: 3000, info: true },
  { prompt: "", cmd: "Shell: zsh 5.9", delay: 3400, info: true },
]

export function Hero() {
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { data } = useSWR<{ channelStats: ChannelStats; total: number }>(
    "/api/youtube",
    fetcher
  )
  const stats = data?.channelStats

  useEffect(() => {
    terminalLines.forEach((line, i) => {
      intervalRef.current = setTimeout(() => {
        setVisibleLines((prev) => [...prev, i])
      }, line.delay)
    })
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#4ade80 1px, transparent 1px), linear-gradient(90deg, #4ade80 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#4ade80]/5 blur-[80px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div className="space-y-8 fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#1e2e1e] rounded text-xs font-mono text-[#4ade80] bg-[#0f140f]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
            Türkçe Linux Topluluğu
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-mono leading-tight">
              <span className="text-[#4ade80] text-glow">İşte</span>
              <br />
              <span className="text-[#facc15] text-glow-amber">Linux</span>
              <br />
              <span className="text-foreground">Bu.</span>
            </h1>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-md text-base">
              Linux dağıtımları, terminal komutları, sistem yönetimi ve açık kaynak
              dünyasından her şey. Türkçe anlatım, gerçek içerik.
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 py-4 border-y border-[#1e2e1e]">
            <div>
              <div className="text-2xl font-mono font-bold text-[#4ade80] text-glow">
                {stats ? `${stats.videoCount}` : "—"}
              </div>
              <div className="text-xs text-muted-foreground font-mono">Video</div>
            </div>
            <div className="w-px h-8 bg-[#1e2e1e]" />
            <div>
              <div className="text-2xl font-mono font-bold text-[#facc15] text-glow-amber">
                {stats ? stats.subscriberCount : "—"}
              </div>
              <div className="text-xs text-muted-foreground font-mono">Abone</div>
            </div>
            <div className="w-px h-8 bg-[#1e2e1e]" />
            <div>
              <div className="text-2xl font-mono font-bold text-foreground">
                {stats ? stats.viewCount : "—"}
              </div>
              <div className="text-xs text-muted-foreground font-mono">İzlenme</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://www.youtube.com/@%C4%B0%C5%9FteLinuxBu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#4ade80] text-[#080c08] font-mono font-bold text-sm rounded hover:bg-[#22c55e] transition-colors"
            >
              <TvMinimalPlay size={16} />
              YouTube Kanalı
            </a>
            <a
              href="#egitimler"
              className="flex items-center justify-center gap-2 px-6 py-3 border border-[#1e2e1e] text-foreground font-mono text-sm rounded hover:border-[#4ade80] hover:text-[#4ade80] transition-colors"
            >
              Eğitimleri Keşfet
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Right: Terminal Window */}
        <div className="fade-in-up">
          <div className="border border-[#1e2e1e] rounded-lg overflow-hidden shadow-2xl shadow-[#4ade80]/5">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#0f140f] border-b border-[#1e2e1e]">
              <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
              <div className="w-3 h-3 rounded-full bg-[#facc15]" />
              <div className="w-3 h-3 rounded-full bg-[#4ade80]" />
              <div className="ml-2 flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                <Terminal size={11} />
                bash — 80×24
              </div>
            </div>

            {/* Terminal Body */}
            <div className="bg-[#080c08] p-4 font-mono text-sm min-h-[280px] space-y-1">
              {terminalLines.map((line, i) => (
                <div
                  key={i}
                  className={`transition-opacity duration-300 ${
                    visibleLines.includes(i) ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {line.prompt ? (
                    <span>
                      <span className="text-[#4ade80]">{line.prompt}</span>
                      <span className="text-foreground">{line.cmd}</span>
                    </span>
                  ) : line.success ? (
                    <span className="text-[#4ade80]">{line.cmd}</span>
                  ) : line.info ? (
                    <span className="text-muted-foreground">{line.cmd}</span>
                  ) : (
                    <span className="text-foreground">{line.cmd}</span>
                  )}
                </div>
              ))}
              {/* Blinking cursor */}
              <div className="flex items-center gap-1">
                <span className="text-[#4ade80]">user@linux:~$</span>
                <span className="inline-block w-2 h-4 bg-[#4ade80] cursor-blink" />
              </div>
            </div>
          </div>

          {/* Tux image */}
          <div className="mt-6 flex items-center justify-center">
            <div className="relative w-24 h-24 opacity-60 hover:opacity-100 transition-opacity">
              <Image src="/tux.png" alt="Tux, Linux maskotu" fill className="object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
