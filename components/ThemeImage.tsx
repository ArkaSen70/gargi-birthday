import React, { useState, useEffect, useCallback } from 'react'

interface ThemeImageProps {
  text: string
  theme: string
  className?: string
}

const ThemeImage: React.FC<ThemeImageProps> = ({ text, theme, className = '' }) => {
  const [imgError, setImgError] = useState(false)
  const [imagePath, setImagePath] = useState('')
  const [isHovered, setIsHovered] = useState(false)

  // Get the base image path without extension
  const getImageBasePath = useCallback(() => {
    const sanitizedText = text.toLowerCase().replace(/\s+/g, '-')
    return `/images/${theme}/${sanitizedText}`;
  }, [text, theme]);
  
  // Try loading the image with different extensions
  const tryLoadImage = useCallback(async (basePath) => {
    // Move the extensions array inside the callback
    const extensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    
    for (const ext of extensions) {
      const path = `${basePath}.${ext}`;
      const exists = await checkImage(path);
      
      if (exists) {
        console.log(`ThemeImage: Found image at ${path}`);
        setImagePath(path);
        return;
      }
    }
    
    // If we get here, no valid image was found
    console.error(`ThemeImage: No valid image found for ${basePath}`);
    setImgError(true);
  }, []);
  
  useEffect(() => {
    // Reset state when props change
    setImgError(false);
    
    const basePath = getImageBasePath();
    console.log(`ThemeImage: Base path for ${text}: ${basePath}`);
    
    // Try to find the image with different extensions
    tryLoadImage(basePath);
  }, [text, theme, getImageBasePath, tryLoadImage]);

  // Check if an image exists
  const checkImage = (path) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = path;
    });
  }

  const handleError = () => {
    console.error(`ThemeImage: Error loading image from: ${imagePath}`);
    setImgError(true);
  }

  return (
    <div 
      className={`w-full h-full rounded-lg overflow-hidden ${className}`}
      style={{ 
        border: '2px solid #d53f8c',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: isHovered ? '0 10px 25px rgba(213, 63, 140, 0.4)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.5s ease'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imgError ? (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold">
          <div className="text-center p-4">{text}</div>
        </div>
      ) : (
        <>
          {imagePath && (
            <>
              <img
                src={imagePath}
                alt={text}
                className="w-full h-full object-contain transition-all duration-700 ease-in-out"
                style={{ 
                  maxHeight: '100%', 
                  maxWidth: '100%',
                  display: 'block',
                  transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                  filter: isHovered ? 'brightness(1.1)' : 'brightness(1)'
                }}
                onError={handleError}
              />
              <div 
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 transition-all duration-500"
                style={{
                  transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
                  opacity: isHovered ? 1 : 0
                }}
              >
                <div className="font-bold">{text}</div>
              </div>
            </>
          )}
          {!imagePath && !imgError && (
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-pink-400 opacity-50 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-pink-300 opacity-40 rounded"></div>
                    <div className="h-4 bg-pink-300 opacity-40 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ThemeImage 