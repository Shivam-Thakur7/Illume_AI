import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    title: 'AI Image Generation ',
    description: 'Illume AI allows you to create endless number of images from text prompts.',
    image: 'https://i.pinimg.com/736x/4f/d4/16/4fd4168d5704432d7c8ed4231d6b313c.jpg',
    alt: 'Dark and Light mode with color customization',
  },
  {
    title: 'Daily Challenges',
    description: 'Enhance your prompt writing skills with Illume AI.',
    image: 'https://i.pinimg.com/736x/41/01/6b/41016b8b4a0d92d0fec562a69dad3264.jpg',
    alt: 'Stacked projects user interface',
  },
  {
    title: 'Join our Community',
    description: 'Come join us on discrod where you get to interact with other creators.',
    image: 'https://i.pinimg.com/736x/de/3e/51/de3e51c66462d8e6c2d337c3a017ead5.jpg',
    alt: 'Onion skin layered images example',
  },
  {
    title: 'Explore the creativity of other creators',
    description: 'Select your favourites and keep them saved with you.',
    image: 'https://i.pinimg.com/736x/91/4e/ec/914eecd891ca3a2fa8ffb32afcb195aa.jpg',
    alt: 'Prompt templates screen for generative AI',
  },
  {
    title: 'Top Creations of the Week',
    description: 'Get inspired by trending community-generated masterpieces.',
    image: 'https://i.pinimg.com/736x/da/c0/99/dac0999658cb871b9cf4d0f3f0f9d935.jpg',
    alt: 'Top creations leaderboard visual',
  },
];

const FeatureCard = ({ feature, index, activeIndex, setActiveIndex }) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      setActiveIndex(index);
    }
  }, [inView, index, setActiveIndex]);

  return (
    <motion.div
      ref={ref}
      key={feature.title}
      className={`p-6 rounded-xl snap-start transition-transform duration-300 ${
        index === activeIndex
          ? 'bg-white bg-opacity-20 shadow-lg backdrop-blur-sm scale-105'
          : 'opacity-60'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
      <p className="text-white/80 mt-2">{feature.description}</p>
    </motion.div>
  );
};

const FeaturesShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400 py-24 px-8">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left Image */}
        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[500px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={features[activeIndex].image}
              src={features[activeIndex].image}
              alt={features[activeIndex].alt}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
              className="rounded-xl shadow-2xl object-contain max-h-full max-w-full"
            />
          </AnimatePresence>
        </div>

        {/* Right Feature Stack */}
        <div
          className="w-full lg:w-1/2 max-h-[500px] overflow-y-auto scroll-smooth snap-y snap-mandatory space-y-12 pr-2"
          style={{
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE 10+
          }}
        >
          <style>
            {`
              ::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;