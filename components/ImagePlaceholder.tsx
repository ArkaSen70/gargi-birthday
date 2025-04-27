import React from 'react'

interface ImagePlaceholderProps {
  text: string
  className?: string
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({ text, className = '' }) => {
  return (
    <div 
      className={`flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold ${className}`}
    >
      <div className="text-center p-4">{text}</div>
    </div>
  )
}

export default ImagePlaceholder 