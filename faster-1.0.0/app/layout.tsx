import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CookieConsent } from '@/components/cookie-consent'
import { FloatingActions } from '@/components/floating-actions'
import { LoadingScreen } from '@/components/loading-screen'
import { Providers } from '@/components/providers'

export const metadata: Metadata = {
  title: { default: 'Gideon Freight | Reliable delivery, every time', template: '%s | Gideon Freight' },
  description: 'Delivery management for Kenyan SMEs. Book verified couriers, track shipments and automate dispatch.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-KE"><head><link rel="preconnect" href="https://fonts.gstatic.com"/><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/></head><body><Providers><LoadingScreen /><div className="site-shell"><Header /><main>{children}</main><Footer /></div><FloatingActions /><CookieConsent /></Providers><Analytics /><SpeedInsights /></body></html>
}
