import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const topCreations = [
  {
    image: 'https://img.freepik.com/free-photo/neon-hologram-tiger_23-2151558646.jpg?uid=R66200938&ga=GA1.1.1846088034.1724574762&semt=ais_country_boost&w=740',
    creator: 'Shivam',
    prompt: 'A cyberpunk tiger leaping over neon rooftops at night',
    style: 'Cyberpunk',
  },
  {
    image: 'https://img.freepik.com/free-photo/portrait-astronaut-space-suit-with-solar-panels_23-2151263688.jpg?uid=R66200938&ga=GA1.1.1846088034.1724574762&semt=ais_country_boost&w=740',
    creator: 'Poorvika',
    prompt: 'A floating village in the sky powered by solar energy',
    style: 'Studio Ghibli Inspired',
  },
  {
    image: 'https://img.freepik.com/free-photo/technological-exploration-settlement_23-2151768581.jpg?uid=R66200938&ga=GA1.1.1846088034.1724574762&semt=ais_country_boost&w=740',
    creator: 'Tvisha',
    prompt: 'An astronaut watering flowers on an alien planet',
    style: 'Surrealism',
  },
];

const TopCreations = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % topCreations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-black py-20 px-6 overflow-hidden">
      <div className="container mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500">
            Top Creations of the Week
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-pink-500 to-indigo-500 mx-auto mb-5"></div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            Dive into the most stunning AI-generated visuals created by our community this week.
          </motion.p>
        </div>

        <div className="relative h-[420px] mx-auto max-w-4xl">
          {topCreations.map((creation, index) => (
            <motion.div
              key={index}
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${
                index === activeIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-95'
              }`}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-[#111] p-6 rounded-xl shadow-xl border border-purple-800 max-w-md text-center">
                <img
                  className="rounded-lg object-cover w-full h-56 mb-4 shadow-md"
                  src={creation.image}
                  alt={creation.prompt}
                />
                <p className="text-white italic mb-2 text-base">"{creation.prompt}"</p>
                <p className="text-purple-300 font-semibold">{creation.creator}</p>
                <p className="text-indigo-300 text-sm">{creation.style}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {topCreations.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === activeIndex ? 'bg-pink-500' : 'bg-white/30'
              }`}
              aria-label={`Go to creation ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCreations;
