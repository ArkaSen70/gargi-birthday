import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface ThemeImageProps {
  text: string
  theme: string
  className?: string
  priority?: boolean
}

// Base64 blur placeholder for common image dimensions (16:9)
const blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAJABADAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABgj/xAAhEAABAwMFAQAAAAAAAAAAAAABAAIDBAURBhIhMUFRYf/EABUBAQEAAAAAAAAAAAAAAAAAAAUG/8QAHBEAAQQDAQAAAAAAAAAAAAAAAgABAxEEEhMxUf/aAAwDAQACEQMRAD8AXL7qfvBlYy8Ol/CyQEpOiYxITbhPKrZ1rblI5zmF4DtyeUB2j6JYYJKRSRkdI+8vkOgN2/VJ4jxuRqHVZMB2RRGwk//Z";

const ThemeImage: React.FC<ThemeImageProps> = ({ text, theme, className = '', priority = false }) => {
  const [imgError, setImgError] = useState<boolean>(false)
  const [imagePath, setImagePath] = useState<string>('')
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  // Get the base image path without extension
  const getImageBasePath = useCallback((): string => {
    const sanitizedText = text.toLowerCase().replace(/\s+/g, '-')
    return `/images/${theme}/${sanitizedText}`;
  }, [text, theme]);

  // Try loading the image with different extensions
  const tryLoadImage = useCallback(async (basePath: string): Promise<void> => {
    // Prefer WebP for better performance if supported
    const extensions = ['webp', 'jpg', 'jpeg', 'png', 'gif'];
    
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
    setIsLoaded(false);
    
    const basePath = getImageBasePath();
    
    // Try to find the image with different extensions
    tryLoadImage(basePath);

    // Cleanup function
    return () => {
      // Cancel any pending operations if component unmounts
    };
  }, [text, theme, getImageBasePath, tryLoadImage]);

  // Check if an image exists
  const checkImage = (path: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const imgElement = new window.Image();
      imgElement.onload = () => resolve(true);
      imgElement.onerror = () => resolve(false);
      imgElement.src = path;
    });
  }

  const handleError = (): void => {
    console.error(`ThemeImage: Error loading image from: ${imagePath}`);
    setImgError(true);
  }

  const handleImageLoad = (): void => {
    setIsLoaded(true);
  };

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
              <div className="relative w-full h-full">
                <Image
                  src={imagePath}
            alt={text}
                  fill
                  priority={priority}
                  quality={80}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={`object-contain transition-all duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    filter: isHovered ? 'brightness(1.1)' : 'brightness(1)'
            }}
                  blurDataURL={blurDataURL}
                  placeholder="blur"
            onError={handleError}
                  onLoad={handleImageLoad}
          />
              </div>
              <div 
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 transition-all duration-500 z-10"
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