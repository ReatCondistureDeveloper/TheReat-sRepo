import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { DistroShowcase } from "@/components/distro-showcase"
import { Tutorials } from "@/components/tutorials"
import { TerminalTips } from "@/components/terminal-tips"
import { YoutubeVideos } from "@/components/youtube-videos"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <DistroShowcase />
      <Tutorials />
      <TerminalTips />
      <YoutubeVideos />
      <Footer />
    </main>
  )
}
