import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

const btsMembers = [
  { name: 'RM', file: 'rm.jpg' },
  { name: 'Jin', file: 'jin.jpg' },
  { name: 'Suga', file: 'suga.jpg' },
  { name: 'J-Hope', file: 'j-hope.jpg' },
  { name: 'Jimin', file: 'jimin.jpg' },
  { name: 'V', file: 'v.jpg' },
  { name: 'Jungkook', file: 'jungkook.jpg' }
]

const TestImages = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Head>
        <title>Test BTS Images</title>
      </Head>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">BTS Image Test Page</h1>
        <Link href="/bts" className="text-blue-500 hover:underline mb-8 block">
          Back to BTS Page
        </Link>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">BTS Member Images</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {btsMembers.map((member, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-bold text-lg mb-2">{member.name}</h3>
                <div className="aspect-w-1 aspect-h-1 relative h-40 mb-2 border">
                  <img 
                    src={`/images/bts/${member.file}`}
                    alt={member.name}
                    className="object-cover"
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                <div className="text-sm text-gray-500">
                  Path: /images/bts/{member.file}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Placeholder Image Test</h2>
            <div className="aspect-w-1 aspect-h-1 relative h-40 border">
              <img 
                src="/images/placeholder.jpg"
                alt="Placeholder"
                className="object-cover"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Path: /images/placeholder.jpg
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestImages 