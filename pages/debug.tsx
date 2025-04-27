import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

const Debug = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <Head>
        <title>Image Debug</title>
      </Head>
      
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Image Debug Page</h1>
        
        <div className="mb-4">
          <Link href="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">1. Basic Image Tag</h2>
            <div className="h-40 border mb-2 overflow-hidden">
              <img 
                src="/images/bts/rm.jpg" 
                alt="RM" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-500">Path: /images/bts/rm.jpg</p>
          </div>
          
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">2. Placeholder Image</h2>
            <div className="h-40 border mb-2 overflow-hidden">
              <img 
                src="/images/placeholder.jpg" 
                alt="Placeholder" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-500">Path: /images/placeholder.jpg</p>
          </div>
          
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">3. Direct Public File Test</h2>
            <div className="h-40 border mb-2 overflow-hidden">
              <img 
                src="/test.png" 
                alt="Test Image" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  document.getElementById('test-error')!.style.display = 'block';
                }}
              />
              <div id="test-error" className="hidden h-full flex items-center justify-center bg-red-100 text-red-500">
                Test image failed to load
              </div>
            </div>
            <p className="text-sm text-gray-500">Path: /test.png</p>
          </div>
          
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-bold mb-4">All BTS Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                'rm.jpg', 'jin.jpg', 'suga.jpg', 'j-hope.jpg', 
                'jimin.jpg', 'v.jpg', 'jungkook.jpg'
              ].map((file, index) => (
                <div key={index} className="border rounded bg-white overflow-hidden">
                  <div className="h-32 overflow-hidden">
                    <img 
                      src={`/images/bts/${file}`} 
                      alt={file} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling!.style.display = 'flex';
                      }}
                    />
                    <div className="hidden h-full w-full bg-red-100 text-red-500 items-center justify-center text-sm">
                      Failed to load
                    </div>
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-mono">/images/bts/{file}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Debug 