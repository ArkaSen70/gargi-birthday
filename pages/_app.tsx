import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// Loading indicator component
function LoadingIndicator() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1">
      <div className="h-full bg-gradient-to-r from-pink-500 to-purple-600 animate-loading-bar" />
    </div>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Route change start event - show loading indicator
    const handleStart = () => setLoading(true)
    
    // Route change complete - hide loading indicator
    const handleComplete = () => setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  return (
    <>
      <Head>
        <title>Gargi&apos;s Birthday</title>
        {/* Preload critical images */}
        <link rel="preload" as="image" href="/images/bts/rm.webp" />
        <link rel="preload" as="image" href="/images/bts/jin.webp" />
        <link rel="preload" as="image" href="/images/aot/eren-transformation.webp" />
        <link rel="preload" as="image" href="/images/cats/whiskers.webp" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {loading && <LoadingIndicator />}
      <div className="bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 min-h-screen">
        <Component {...pageProps} />
      </div>
    </>
  )
} 