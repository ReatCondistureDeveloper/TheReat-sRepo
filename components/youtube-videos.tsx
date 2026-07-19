"use client"

import { useState } from "react"
import useSWR from "swr"
import { TvMinimalPlay, Play, ExternalLink, Loader2, AlertCircle, ChevronDown } from "lucide-react"
import type { YouTubeVideo } from "@/app/api/youtube/route"
import { VideoModal } from "@/components/video-modal"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const INITIAL_VISIBLE = 12

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days < 1) return "Bugün"
  if (days < 7) return `${days} gün önce`
  if (days < 30) return `${Math.floor(days / 7)} hafta önce`
  if (days < 365) return `${Math.floor(days / 30)} ay önce`
  return `${Math.floor(days / 365)} yıl önce`
}

export function YoutubeVideos() {
  const { data, error, isLoading } = useSWR<{ videos: YouTubeVideo[]; total: number }>(
    "/api/youtube",
    fetcher
  )
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null)
  const [visible, setVisible] = useState(INITIAL_VISIBLE)

  const videos = data?.videos ?? []
  const shown = videos.slice(0, visible)

  return (
    <section id="videolar" className="py-24 border-t border-[#1e2e1e]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="mb-12 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#4ade80] mb-3">
              <span className="text-muted-foreground">$</span>
              <span>yt-dlp --list-formats youtube.com/@İşteLinuxBu</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-mono font-bold text-foreground text-balance">
              Tüm Videolar
            </h2>
            <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
              {isLoading
                ? "Videolar yükleniyor..."
                : error
                ? "Videolar yüklenemedi."
                : `Kanalda toplam ${data?.total ?? 0} video bulunuyor.`}
            </p>
          </div>
          <a
            href="https://www.youtube.com/@%C4%B0%C5%9FteLinuxBu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-[#ef4444]/40 text-[#ef4444] text-sm font-mono rounded hover:bg-[#ef4444]/10 transition-colors whitespace-nowrap"
          >
            <TvMinimalPlay size={14} />
            Kanala Git
            <ExternalLink size={11} />
          </a>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-muted-foreground">
            <Loader2 size={28} className="animate-spin text-[#4ade80]" />
            <p className="text-sm font-mono">Videolar getiriliyor...</p>
          </div>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
            <AlertCircle size={28} className="text-[#ef4444]" />
            <p className="text-sm font-mono">Videolar yüklenemedi. API anahtarınızı kontrol edin.</p>
          </div>
        )}

        {/* Video grid */}
        {!isLoading && !error && videos.length > 0 && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {shown.map((video) => (
                <button
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="group border border-[#1e2e1e] rounded-lg bg-[#0f140f] overflow-hidden hover:border-[#4ade80]/30 hover:bg-[#111811] transition-all duration-200 text-left"
                  aria-label={`${video.title} videosunu oynat`}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-[#080c08] overflow-hidden">
                    {video.thumbnail ? (
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#0f140f]">
                        <TvMinimalPlay size={32} className="text-muted-foreground" />
                      </div>
                    )}

                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#ef4444] flex items-center justify-center shadow-lg scale-90 group-hover:scale-100 transition-transform duration-200">
                        <Play size={20} fill="white" className="text-white ml-0.5" />
                      </div>
                    </div>

                    {/* Duration badge */}
                    <span className="absolute bottom-2 right-2 text-xs font-mono bg-[#080c08]/90 text-foreground px-1.5 py-0.5 rounded">
                      {video.duration}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h3 className="text-xs font-mono font-bold text-foreground leading-snug group-hover:text-[#4ade80] transition-colors line-clamp-2 text-balance">
                      {video.title}
                    </h3>
                    <div className="mt-1.5 flex items-center gap-2 text-xs font-mono text-muted-foreground">
                      <span>{video.viewCount} görüntülenme</span>
                      <span>•</span>
                      <span>{timeAgo(video.publishedAt)}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Load more */}
            {visible < videos.length && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setVisible((v) => v + INITIAL_VISIBLE)}
                  className="flex items-center gap-2 px-6 py-2.5 border border-[#1e2e1e] text-sm font-mono text-muted-foreground hover:text-foreground hover:border-[#4ade80]/30 rounded transition-colors"
                >
                  <ChevronDown size={14} />
                  Daha Fazla Göster ({videos.length - visible} video kaldı)
                </button>
              </div>
            )}
          </>
        )}

        {/* Subscribe banner */}
        <div className="mt-16 border border-[#ef4444]/20 rounded-lg bg-[#ef4444]/5 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#ef4444] flex items-center justify-center shrink-0">
              <TvMinimalPlay size={24} className="text-white" />
            </div>
            <div>
              <div className="font-mono font-bold text-foreground text-lg">İşte Linux Bu</div>
              <div className="text-xs font-mono text-muted-foreground">
                Türkçe Linux içerikleri için abone ol
              </div>
            </div>
          </div>
          <a
            href="https://www.youtube.com/@%C4%B0%C5%9FteLinuxBu?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#ef4444] text-white text-sm font-mono font-bold rounded hover:bg-[#dc2626] transition-colors shrink-0"
          >
            <TvMinimalPlay size={16} />
            Abone Ol
          </a>
        </div>
      </div>

      {/* Video modal */}
      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </section>
  )
}
