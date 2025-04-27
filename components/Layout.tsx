import React, { memo } from 'react'
import dynamic from 'next/dynamic'
import Navbar from './Navbar'
import Head from 'next/head'

const StarryBackground = dynamic(() => import('./StarryBackground'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900"></div>
})

interface LayoutProps {
  children: React.ReactNode
  title: string
  description: string
  animated?: boolean
}

const Layout: React.FC<LayoutProps> = ({ children, title, description, animated = true }) => {
  return (
    <>
      <Head>
        <title>{`${title} - Gargi&apos;s Birthday`}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>

      <Navbar />

      <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900">
        {/* Background Stars - Dynamically loaded */}
        <StarryBackground animated={animated} />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
          {children}
        </div>
      </main>
    </>
  )
}

export default memo(Layout) 