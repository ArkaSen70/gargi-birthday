import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import Head from 'next/head'

interface Card {
  id: number;
  title: string;
  content: string;
  isFlipped: boolean;
  hasBeenFlipped: boolean;
}

const SurpriseGifts = () => {
  const [cards, setCards] = useState<Card[]>([
    { id: 1, title: "Key Chain", content: "A beautiful personalized key chain to carry with you wherever you go!", isFlipped: false, hasBeenFlipped: false },
    { id: 2, title: "Ring", content: "A stunning ring that matches your style perfectly.", isFlipped: false, hasBeenFlipped: false },
    { id: 3, title: "Jhumka", content: "Elegant jhumka earrings to complement your traditional outfits.", isFlipped: false, hasBeenFlipped: false },
    { id: 4, title: "Payel", content: "Delicate anklet that adds grace to every step you take.", isFlipped: false, hasBeenFlipped: false },
    { id: 5, title: "Flowers", content: "Your favorite flowers to brighten up your special day.", isFlipped: false, hasBeenFlipped: false },
    { id: 6, title: "Chocolates", content: "A box of your favorite chocolates, because you deserve all the sweetness!", isFlipped: false, hasBeenFlipped: false },
  ]);
  
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Load flipped state from localStorage
    if (typeof window !== 'undefined') {
      const savedCards = localStorage.getItem('birthdaySurpriseGifts');
      
      if (savedCards) {
        setCards(JSON.parse(savedCards));
      }
      
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    // Save to localStorage whenever cards change (after initial load)
    if (initialized && typeof window !== 'undefined') {
      localStorage.setItem('birthdaySurpriseGifts', JSON.stringify(cards));
    }
  }, [cards, initialized]);

  const flipCard = (id: number) => {
    // Check if any card is already flipped
    const anyCardFlipped = cards.some(card => card.isFlipped);
    
    // If a card is already flipped or this card has been flipped before, don't allow flipping
    const targetCard = cards.find(card => card.id === id);
    if (anyCardFlipped || (targetCard && targetCard.hasBeenFlipped)) {
      return;
    }
    
    // Flip the card
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === id 
          ? { ...card, isFlipped: true, hasBeenFlipped: true } 
          : card
      )
    );
  };

  return (
    <Layout
      title="Surprise Gifts"
      description="Special birthday gifts for Gargi"
    >
      <Head>
        <style jsx global>{`
          .perspective-1000 {
            perspective: 1000px;
          }
          .transform-style-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}</style>
      </Head>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
          Surprise Gifts
          <span className="block text-pink-400 mt-2 text-3xl md:text-4xl">Flip a card to reveal your gift</span>
        </h1>
        
        <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Each card holds a special gift for you. You can flip each card only once, so choose wisely!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto p-4">
          {cards.map(card => (
            <div 
              key={card.id}
              className="perspective-1000 h-64 cursor-pointer"
              onClick={() => flipCard(card.id)}
            >
              <motion.div
                initial={false}
                animate={{ rotateY: card.isFlipped ? 180 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="relative w-full h-full transform-style-3d"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front face */}
                <div 
                  className={`absolute w-full h-full backface-hidden rounded-xl p-6 bg-gradient-to-br ${
                    card.hasBeenFlipped ? 'from-gray-700 to-gray-900 opacity-50' : 'from-purple-600 to-pink-600'
                  } flex items-center justify-center transition-all duration-500 ${
                    card.hasBeenFlipped ? 'hover:shadow-none' : 'hover:shadow-xl hover:scale-105'
                  }`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      {card.hasBeenFlipped ? 'Already opened' : 'Surprise Gift'}
                    </div>
                    {!card.hasBeenFlipped && (
                      <div className="text-white opacity-75 mt-2">Click to unwrap</div>
                    )}
                  </div>
                </div>
                
                {/* Back face */}
                <div 
                  className="absolute w-full h-full backface-hidden rounded-xl p-6 bg-white flex items-center justify-center"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-purple-600 mb-3">{card.title}</h3>
                    <p className="text-gray-800">{card.content}</p>
                    <div className="mt-4 text-pink-500 font-semibold">
                      Happy Birthday, Gargi!
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </Layout>
  )
}

export default SurpriseGifts 