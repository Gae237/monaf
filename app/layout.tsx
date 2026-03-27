import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

const geistSans = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Olympic Monaf Sport Academy - OMSA | Football Training Cameroon',
  description: 'Premier football academy in Yaoundé, Cameroon. Sport-Études programs for ages 7-21. Professional training with academic excellence.',
  keywords: 'football academy, Cameroon, youth training, sport education, OMSA',
  openGraph: {
    title: 'Olympic Monaf Sport Academy',
    description: 'Former des talents, bâtir des champions',
    images: [{ url: '/football-academy.jpg' }],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e3a8a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} font-sans bg-background text-foreground antialiased`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
