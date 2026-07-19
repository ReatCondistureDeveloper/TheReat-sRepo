import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'İşte Linux Bu — Türkçe Linux Kaynağı',
  description: 'Linux dağıtımları, terminal ipuçları, eğitimler ve açık kaynak dünyasından haberler. Türkçe Linux topluluğunun buluşma noktası.',
  keywords: ['linux', 'türkçe linux', 'ubuntu', 'arch linux', 'debian', 'terminal', 'açık kaynak'],
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#080c08',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${jetbrainsMono.variable} bg-background`}>
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
