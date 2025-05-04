import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const hoverEffect = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const Community = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const styles = {
    quizButton: {
      position: 'absolute',
      bottom: '10px',
      right: '100px',
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s ease'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white font-poppins px-6 py-16 space-y-20">
      <motion.header
        className="text-center text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        Illume AI Community
      </motion.header>

      <motion.button
        style={styles.quizButton}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/surveys')}
      >
        Play Quiz ✨
      </motion.button>

      <AnimatePresence>
        {isVisible && (
          <>
            {/* Welcome Section */}
            <motion.section
              className="max-w-4xl mx-auto text-center space-y-6"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h2 className="text-3xl text-purple-400 font-semibold">Welcome to the Community</h2>
              <p className="text-gray-300 text-lg">
                Join fellow creators, innovators, and dreamers using Illume AI to bring their visions to life.
                Connect, share, learn, and grow together in this vibrant space.
              </p>
              <motion.img
                className="rounded-xl mx-auto max-w-full shadow-xl"
                src="https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif"
                alt="Community GIF"
                variants={fadeInUp}
              />
            </motion.section>

            {/* What's Happening */}
            <motion.section className="max-w-6xl mx-auto" initial="hidden" animate="visible" variants={fadeInUp}>
              <h2 className="text-3xl text-pink-500 font-semibold mb-6 text-center">What's Happening</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: '🎨 Art Battles', desc: 'Submit your AI-generated art, vote, and win rewards.' },
                  { title: '💬 Forums', desc: 'Discuss ideas and collaborate with fellow creators.' },
                  { title: '🎓 Learn & Share', desc: 'Contribute to guides and help others grow.' },
                  { title: '🚀 Project Spotlight', desc: 'Get your project featured across platforms!' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="bg-[#1f1f2e] p-6 rounded-2xl shadow-md text-center"
                    variants={hoverEffect}
                    whileHover="hover"
                  >
                    <h3 className="text-xl text-purple-300 font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-300 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Why Join */}
            <motion.section
              className="max-w-4xl mx-auto text-center space-y-6"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h2 className="text-3xl text-indigo-400 font-semibold">Why Join?</h2>
              <p className="text-gray-300 text-lg">
                Being part of Illume AI means being on the frontier of creativity. Whether you're a coder, designer,
                or dreamer — there's a place for you here.
              </p>
              <motion.img
                className="rounded-xl mx-auto max-w-full shadow-xl"
                src="https://media.giphy.com/media/QBd2kLB5qDmysEXre9/giphy.gif"
                alt="Creativity GIF"
                variants={fadeInUp}
              />
            </motion.section>

            {/* Discord Call-to-Action */}
            <motion.section
              className="bg-[#292948] py-12 px-8 rounded-2xl max-w-4xl mx-auto text-center space-y-4"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h2 className="text-2xl font-bold text-purple-400">Join Our Discord</h2>
              <p className="text-gray-300">
                Connect live with the Illume AI community! Share ideas, get help, or just vibe with creators.
              </p>
              <motion.a
                href="https://discord.gg/mRVnjPyx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#7289da] hover:bg-[#5a6dc9] text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join the Discord Server
              </motion.a>
            </motion.section>

            {/* Events */}
            <motion.section className="max-w-6xl mx-auto" initial="hidden" animate="visible" variants={fadeInUp}>
              <h2 className="text-3xl text-pink-400 font-semibold mb-6 text-center">Community Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: '🎤 Live Talks', desc: 'Inspiring sessions with AI creators & pros.' },
                  { title: '🧠 Challenges', desc: 'Weekly creative AI tasks to stretch your skills.' },
                  { title: '🌐 Collab Lounge', desc: 'Find partners for projects & ideas.' },
                  { title: '🎁 Giveaways', desc: 'Win merch, AI credits & surprises!' },
                ].map((event, i) => (
                  <motion.div
                    key={i}
                    className="bg-[#1f1f2e] p-6 rounded-2xl shadow-md text-center"
                    variants={hoverEffect}
                    whileHover="hover"
                  >
                    <h3 className="text-xl text-pink-300 font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-300 text-sm">{event.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </>
        )}
      </AnimatePresence>

      <motion.footer
        className="text-center text-sm text-gray-500 pt-10"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        © 2025 Illume AI | Built with passion and pixels.
      </motion.footer>
    </div>
  );
};

export default Community;
