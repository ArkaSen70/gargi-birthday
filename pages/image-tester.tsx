import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

interface ImageItem {
  name: string;
  path: string;
}

interface ImageCategories {
  [key: string]: ImageItem[];
}

const allImages: ImageCategories = {
  bts: [
    { name: 'RM', path: '/images/bts/rm.jpg' },
    { name: 'Jin', path: '/images/bts/jin.jpg' },
    { name: 'Suga', path: '/images/bts/suga.jpg' },
    { name: 'J-Hope', path: '/images/bts/j-hope.jpg' },
    { name: 'Jimin', path: '/images/bts/jimin.jpg' },
    { name: 'V', path: '/images/bts/v.jpg' },
    { name: 'Jungkook', path: '/images/bts/jungkook.jpg' }
  ],
  aot: [
    { name: 'Eren Transformation', path: '/images/aot/eren-transformation.jpg' },
    { name: 'Levi vs Beast Titan', path: '/images/aot/levi-vs-beast-titan.jpg' },
    { name: 'Mikasa in Battle', path: '/images/aot/mikasa-in-battle.jpg' },
    { name: 'Colossal Titan Reveal', path: '/images/aot/colossal-titan-reveal.jpg' }
  ],
  cats: [
    { name: 'Whiskers', path: '/images/cats/whiskers.jpg' },
    { name: 'Mittens', path: '/images/cats/mittens.jpg' },
    { name: 'Shadow', path: '/images/cats/shadow.jpg' },
    { name: 'Luna', path: '/images/cats/luna.jpg' },
    { name: 'Oliver', path: '/images/cats/oliver.jpg' },
    { name: 'Bella', path: '/images/cats/bella.jpg' }
  ],
  dogs: [
    { name: 'Buddy', path: '/images/dogs/buddy.jpg' },
    { name: 'Max', path: '/images/dogs/max.jpg' },
    { name: 'Bailey', path: '/images/dogs/bailey.jpg' },
    { name: 'Charlie', path: '/images/dogs/charlie.jpg' },
    { name: 'Lucy', path: '/images/dogs/lucy.jpg' },
    { name: 'Daisy', path: '/images/dogs/daisy.jpg' }
  ],
  nature: [
    { name: 'Mountain Peak', path: '/images/nature/mountain-peak.jpg' },
    { name: 'Serene Lake', path: '/images/nature/serene-lake.jpg' },
    { name: 'Forest Trail', path: '/images/nature/forest-trail.jpg' },
    { name: 'Ocean Sunset', path: '/images/nature/ocean-sunset.jpg' }
  ],
  wildlife: [
    { name: 'Majestic Lion', path: '/images/wildlife/majestic-lion.jpg' },
    { name: 'Graceful Elephant', path: '/images/wildlife/graceful-elephant.jpg' },
    { name: 'Playful Dolphins', path: '/images/wildlife/playful-dolphins.jpg' },
    { name: 'Soaring Eagle', path: '/images/wildlife/soaring-eagle.jpg' },
    { name: 'Colorful Parrot', path: '/images/wildlife/colorful-parrot.jpg' },
    { name: 'Peaceful Giraffe', path: '/images/wildlife/peaceful-giraffe.jpg' }
  ]
};

const ImageTester: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('bts');
  const categories = Object.keys(allImages);

  return (
    <div className="min-h-screen bg-white p-6">
      <Head>
        <title>Image Test Page</title>
        <style>{`
          body { font-family: Arial, sans-serif; }
          .category-btn { 
            padding: 8px 16px; 
            margin: 0 4px 8px 0; 
            border: 1px solid #ccc; 
            border-radius: 4px;
            cursor: pointer;
          }
          .category-btn.active {
            background-color: #4A5568;
            color: white;
          }
          .image-card {
            border: 1px solid #ccc;
            border-radius: 8px;
            overflow: hidden;
            margin-bottom: 16px;
          }
          .image-container {
            height: 200px;
            overflow: hidden;
            position: relative;
            background: #f0f0f0;
          }
          .image-info {
            padding: 12px;
            background-color: white;
          }
          .img-path {
            font-family: monospace;
            font-size: 12px;
            color: #666;
            word-break: break-all;
          }
          .error-box {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #FEF2F2;
            color: #DC2626;
            text-align: center;
            padding: 16px;
          }
          .nav-links {
            margin-bottom: 16px;
          }
          .nav-link {
            display: inline-block;
            margin-right: 8px;
            color: #3B82F6;
            text-decoration: underline;
          }
        `}</style>
      </Head>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Image Tester</h1>
        
        <div className="nav-links">
          <Link href="/" className="nav-link">Home</Link>
          {categories.map(cat => (
            <Link href={`/${cat}`} key={cat} className="nav-link">
              {cat.charAt(0).toUpperCase() + cat.slice(1)} Page
            </Link>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Select Category:</h2>
          <div>
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allImages[selectedCategory].map((img, index) => (
            <div key={index} className="image-card">
              <div className="image-container">
                <ImageWithFallback 
                  src={img.path} 
                  alt={img.name} 
                  fallback={`Loading ${img.name} failed`}
                />
              </div>
              <div className="image-info">
                <h3 className="font-bold text-lg">{img.name}</h3>
                <p className="img-path">{img.path}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallback: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, fallback }) => {
  const [error, setError] = useState<boolean>(false);

  return error ? (
    <div className="error-box">{fallback}</div>
  ) : (
    <div className="relative w-full h-full">
      <Image 
      src={src} 
      alt={alt} 
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
      onError={() => {
        console.error(`Failed to load image: ${src}`);
        setError(true);
      }} 
    />
    </div>
  );
};

export default ImageTester; 