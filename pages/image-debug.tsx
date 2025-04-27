import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import Link from 'next/link'

const directories = [
  { name: 'aot', items: ['eren-transformation', 'levi-vs-beast-titan', 'mikasa-in-battle', 'colossal-titan-reveal'] },
  { name: 'bts', items: ['rm', 'jin', 'suga', 'j-hope', 'jimin', 'v', 'jungkook'] },
  { name: 'cats', items: ['whiskers', 'mittens', 'shadow', 'luna', 'oliver', 'bella'] },
  { name: 'dogs', items: ['max', 'charlie', 'luna', 'buddy', 'bailey', 'daisy'] },
  { name: 'nature', items: ['mountain-peak', 'serene-lake', 'forest-trail', 'ocean-sunset'] },
  { name: 'wildlife', items: ['graceful-elephant', 'majestic-lion', 'soaring-eagle', 'peaceful-giraffe', 'playful-dolphins', 'colorful-parrot'] }
]

const extensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

const ImageDebug = () => {
  const [imageStatus, setImageStatus] = useState({});
  const [imagePaths, setImagePaths] = useState({});

  useEffect(() => {
    directories.forEach(dir => {
      dir.items.forEach(item => {
        findFirstAvailableImage(dir.name, item);
      });
    });
    // eslint-disable-next-line
  }, []);

  const findFirstAvailableImage = async (dir, item) => {
    for (const ext of extensions) {
      const path = `/images/${dir}/${item}.${ext}`;
      const exists = await checkImage(path);
      if (exists) {
        setImagePaths(prev => ({ ...prev, [`${dir}/${item}`]: path }));
        setImageStatus(prev => ({ ...prev, [`${dir}/${item}`]: 'loaded' }));
        return;
      }
    }
    setImageStatus(prev => ({ ...prev, [`${dir}/${item}`]: 'error' }));
  };

  const checkImage = (path) => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = path;
    });
  };

  return (
    <Layout
      title="Image Debug"
      description="Debug image loading issues"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-white">Image Debug</h1>
          <Link href="/">
            <div className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
              Back to Home
            </div>
          </Link>
        </div>

        {directories.map((dir) => (
          <div key={dir.name} className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4 capitalize">{dir.name} Images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {dir.items.map((item) => {
                const key = `${dir.name}/${item}`;
                const imagePath = imagePaths[key];
                return (
                  <div 
                    key={item} 
                    className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg overflow-hidden"
                  >
                    <div className="p-2 bg-black bg-opacity-50">
                      <p className="text-sm text-white font-mono break-all">{imagePath || `/images/${dir.name}/${item}.[ext]`}</p>
                    </div>
                    <div className="h-48 relative flex items-center justify-center bg-black bg-opacity-20">
                      {imageStatus[key] === 'loaded' && imagePath && (
                        <img
                          src={imagePath}
                          alt={item}
                          className="w-full h-full object-contain"
                        />
                      )}
                      {imageStatus[key] === 'error' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-red-900 bg-opacity-75 text-white">
                          Image Failed to Load
                        </div>
                      )}
                      {!imageStatus[key] && (
                        <div className="w-full h-full flex items-center justify-center animate-pulse">
                          <div className="h-6 w-6 bg-pink-400 rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <div className="p-2">
                      <h3 className="text-lg font-semibold text-white capitalize">{item.replace(/-/g, ' ')}</h3>
                      <p className="text-sm text-gray-300">
                        Status: {imageStatus[key] ? 
                          (imageStatus[key] === 'loaded' ? '✅ Loaded' : '❌ Error') : 
                          '⏳ Loading...'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ImageDebug; 