import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'joachim.design — Full-stack freelance, Oslo',
  description: 'Freelance developer building websites, AI agents, and keeping them alive on Railway. Based in Oslo, Norway.',
  openGraph: {
    title: 'joachim.design',
    description: 'Freelance developer. Websites, AI agents, Railway infra.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&family=Caveat:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
