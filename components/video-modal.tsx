"use client"

import { useEffect } from "react"
import { X, ExternalLink } from "lucide-react"
import type { YouTubeVideo } from "@/app/api/youtube/route"

interface VideoModalProps {
  video: YouTubeVideo | null
  onClose: () => void
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  useEffect(() => {
    if (!video) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handler)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handler)
      document.body.style.overflow = ""
    }
  }, [video, onClose])

  if (!video) return null

  const publishDate = new Date(video.publishedAt).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl bg-[#0f140f] border border-[#1e2e1e] rounded-lg overflow-hidden shadow-2xl">
        {/* Terminal titlebar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#080c08] border-b border-[#1e2e1e]">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
            <div className="w-3 h-3 rounded-full bg-[#facc15]" />
            <div className="w-3 h-3 rounded-full bg-[#4ade80]" />
          </div>
          <span className="text-xs font-mono text-muted-foreground truncate max-w-xs px-4">
            {video.title}
          </span>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Kapat"
          >
            <X size={16} />
          </button>
        </div>

        {/* Thumbnail with play button — opens YouTube on click */}
        <a
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block aspect-video bg-black group overflow-hidden"
          aria-label={`${video.title} — YouTube'da izle`}
        >
          {video.thumbnail ? (
            <img
              src={video.thumbnail}
              alt={video.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 bg-[#0f140f]" />
          )}
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-200" />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#ef4444] flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-200">
              <svg viewBox="0 0 24 24" className="w-9 h-9 fill-white ml-1" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          {/* Duration badge */}
          <span className="absolute bottom-3 right-3 text-xs font-mono bg-[#080c08]/90 text-foreground px-2 py-0.5 rounded">
            {video.duration}
          </span>
          {/* "YouTube'da İzle" label */}
          <span className="absolute bottom-3 left-3 text-xs font-mono bg-[#ef4444]/90 text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            YouTube&apos;da İzle
          </span>
        </a>

        {/* Video info */}
        <div className="p-4 flex items-start justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <h2 className="font-mono font-bold text-foreground text-sm leading-snug text-balance">
              {video.title}
            </h2>
            <div className="mt-1 flex items-center gap-3 text-xs font-mono text-muted-foreground flex-wrap">
              <span>{video.viewCount} görüntülenme</span>
              <span>•</span>
              <span>{publishDate}</span>
              <span>•</span>
              <span>{video.duration}</span>
            </div>
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#1e2e1e] text-xs font-mono text-muted-foreground hover:text-foreground hover:border-[#4ade80]/40 rounded transition-colors shrink-0"
          >
            YouTube&apos;da Aç
            <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </div>
  )
}
