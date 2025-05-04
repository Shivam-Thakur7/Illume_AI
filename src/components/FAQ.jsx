import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaRobot } from 'react-icons/fa';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Illume AI?",
      answer: "Illume AI is a futuristic image generator that uses advanced machine learning models to create stunning, imaginative visuals from simple text prompts."
    },
    {
      question: "Do I need design skills to use Illume AI?",
      answer: "Not at all! Illume AI is built for everyone. Whether you’re a designer, developer, storyteller, or just curious, you can create beautiful AI art with ease."
    },
    {
      question: "Can I use the generated images for commercial use?",
      answer: "Yes, Illume AI grants you the rights to use generated images for personal and commercial projects, depending on the plan you’re subscribed to."
    },
    {
      question: "What kind of images can Illume AI generate?",
      answer: "From dreamlike landscapes to robotic characters, cyberpunk cities to surreal portraits — if you can imagine it, Illume AI can bring it to life."
    },
    {
      question: "Is there a free trial available?",
      answer: "Absolutely! New users can try Illume AI for free with limited credits to explore its features before committing to a plan."
    }
  ];

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-purple-800/10 via-indigo-700/10 to-pink-600/10"
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-500 mb-6"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            Answers to your most cosmic questions about how Illume AI works.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-[#0d0d0d] rounded-2xl shadow-xl hover:shadow-purple-700/30 transition-all duration-300 overflow-hidden border border-purple-900/40">
                {/* Question */}
                <motion.button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-indigo-600 flex items-center justify-center">
                        <FaRobot className="text-xl text-white" />
                      </div>
                    </div>
                    <span className="text-lg font-medium text-white">{faq.question}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="text-white/50" />
                  </motion.div>
                </motion.button>

                {/* Answer */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
