import React, { useState, memo, useCallback } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface NavItem {
  name: string;
  path: string;
}

const Navbar: React.FC = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const navItems: NavItem[] = [
    { name: 'Home', path: '/' },
    { name: 'BTS', path: '/bts' },
    { name: 'Attack on Titan', path: '/aot' },
    { name: 'Cats', path: '/cats' },
    { name: 'Dogs', path: '/dogs' },
    { name: 'Nature', path: '/nature' },
    { name: 'Wildlife', path: '/wildlife' },
    { name: 'Surprise Gifts', path: '/surprise-gifts' },
  ]

  const toggleMenu = useCallback((): void => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const closeMenu = useCallback((): void => {
    setIsMenuOpen(false)
  }, [])

  return (
    <nav className="fixed top-0 w-full z-50 bg-black bg-opacity-30 backdrop-blur-lg shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" onClick={closeMenu}>
            <span className="text-white font-bold text-xl cursor-pointer hover:text-pink-400 transition-colors">
              Gargi&apos;s Birthday 🎉
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                href={item.path}
                className={`text-white hover:text-pink-400 transition-colors px-3 py-2 rounded-md ${
                  router.pathname === item.path ? 'text-pink-400 font-bold' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className="text-white focus:outline-none p-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-black bg-opacity-50 backdrop-blur-lg"
          >
            <div className="container mx-auto px-4 py-2">
              <div className="flex flex-col">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={closeMenu}
                    className={`text-white hover:text-pink-400 transition-colors text-left py-3 px-2 ${
                      router.pathname === item.path ? 'text-pink-400 font-bold' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default memo(Navbar) 