import { NextResponse } from "next/server"

const CHANNEL_HANDLE = "İşteLinuxBu"
const API_KEY = process.env.YOUTUBE_API_KEY

export interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  publishedAt: string
  viewCount: string
  duration: string
  channelTitle: string
}

export interface ChannelStats {
  subscriberCount: string
  videoCount: string
  viewCount: string
  title: string
  thumbnail: string
}

function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return "0:00"
  const h = parseInt(match[1] || "0")
  const m = parseInt(match[2] || "0")
  const s = parseInt(match[3] || "0")
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
  }
  return `${m}:${String(s).padStart(2, "0")}`
}

function formatViewCount(count: string): string {
  const n = parseInt(count)
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

async function getAllVideos(channelId: string): Promise<YouTubeVideo[]> {
  const videos: YouTubeVideo[] = []
  let pageToken: string | undefined

  // Fetch all video IDs via search (max 50 per page, loop through all pages)
  const videoIds: string[] = []
  do {
    const searchUrl = new URL("https://www.googleapis.com/youtube/v3/search")
    searchUrl.searchParams.set("key", API_KEY!)
    searchUrl.searchParams.set("channelId", channelId)
    searchUrl.searchParams.set("part", "id")
    searchUrl.searchParams.set("type", "video")
    searchUrl.searchParams.set("order", "date")
    searchUrl.searchParams.set("maxResults", "50")
    if (pageToken) searchUrl.searchParams.set("pageToken", pageToken)

    const res = await fetch(searchUrl.toString(), { next: { revalidate: 3600 } })
    if (!res.ok) {
      console.error("[v0] YouTube search error:", await res.text())
      break
    }
    const data = await res.json()
    for (const item of data.items ?? []) {
      if (item.id?.videoId) videoIds.push(item.id.videoId)
    }
    pageToken = data.nextPageToken
  } while (pageToken)

  // Fetch video details in chunks of 50
  for (let i = 0; i < videoIds.length; i += 50) {
    const chunk = videoIds.slice(i, i + 50)
    const detailUrl = new URL("https://www.googleapis.com/youtube/v3/videos")
    detailUrl.searchParams.set("key", API_KEY!)
    detailUrl.searchParams.set("id", chunk.join(","))
    detailUrl.searchParams.set("part", "snippet,contentDetails,statistics")

    const res = await fetch(detailUrl.toString(), { next: { revalidate: 3600 } })
    if (!res.ok) {
      console.error("[v0] YouTube videos error:", await res.text())
      continue
    }
    const data = await res.json()
    for (const item of data.items ?? []) {
      videos.push({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail:
          item.snippet.thumbnails?.maxres?.url ||
          item.snippet.thumbnails?.high?.url ||
          item.snippet.thumbnails?.medium?.url ||
          "",
        publishedAt: item.snippet.publishedAt,
        viewCount: formatViewCount(item.statistics?.viewCount || "0"),
        duration: parseDuration(item.contentDetails?.duration || "PT0S"),
        channelTitle: item.snippet.channelTitle,
      })
    }
  }

  // Sort by date descending
  videos.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  return videos
}

async function getChannelData(): Promise<{ id: string; stats: ChannelStats } | null> {
  const url = new URL("https://www.googleapis.com/youtube/v3/channels")
  url.searchParams.set("key", API_KEY!)
  url.searchParams.set("forHandle", CHANNEL_HANDLE)
  url.searchParams.set("part", "id,snippet,statistics")

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } })
  if (!res.ok) {
    console.error("[v0] Channel lookup error:", await res.text())
    return null
  }
  const data = await res.json()
  const item = data.items?.[0]
  if (!item) return null

  const raw = item.statistics
  function fmtCount(n: string) {
    const num = parseInt(n || "0")
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
    return String(num)
  }

  return {
    id: item.id,
    stats: {
      subscriberCount: fmtCount(raw?.subscriberCount ?? "0"),
      videoCount: raw?.videoCount ?? "0",
      viewCount: fmtCount(raw?.viewCount ?? "0"),
      title: item.snippet?.title ?? "İşte Linux Bu",
      thumbnail:
        item.snippet?.thumbnails?.high?.url ||
        item.snippet?.thumbnails?.default?.url ||
        "",
    },
  }
}

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json({ error: "YOUTUBE_API_KEY is not set" }, { status: 500 })
  }

  try {
    const channel = await getChannelData()
    if (!channel) {
      return NextResponse.json({ error: "Channel not found" }, { status: 404 })
    }

    const videos = await getAllVideos(channel.id)
    return NextResponse.json({ videos, total: videos.length, channelStats: channel.stats })
  } catch (err) {
    console.error("[v0] YouTube API error:", err)
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 })
  }
}
