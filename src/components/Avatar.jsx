import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaCamera, FaMagic, FaDownload, FaUser } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const Avatar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState('');
  const [imageError, setImageError] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { updateProfilePicture } = useUser();

  const generate = async () => {
    const prompt = inputRef.current.value.trim();

    if (!prompt) {
      toast.warning('Please enter a prompt!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3001/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        toast.success('Your cosmic avatar has been created! ✨');
      } else {
        toast.error('Failed to generate avatar. Please try again.');
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error('Error generating avatar. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadAvatar = async () => {
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cosmic-avatar-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Avatar downloaded successfully! 🚀');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download avatar');
    }
  };

  const saveAsProfilePicture = async (imageUrl) => {
    try {
      if (!imageUrl) {
        toast.warning('Please generate an avatar first!');
        return;
      }

      // Create a copy of the image URL to ensure it's accessible
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const localUrl = URL.createObjectURL(blob);

      updateProfilePicture(localUrl);
      toast.success('Profile picture updated successfully! 🎉');
      navigate('/profile');
    } catch (error) {
      console.error('Error saving profile picture:', error);
      toast.error('Failed to update profile picture');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-24 pb-20 px-4 bg-gradient-to-b from-black via-purple-900 to-indigo-900"
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl pt-10 font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Create Your Cosmic Avatar
          </h1>
          <p className="text-lg text-white/80">
            Let AI transform your vision into a stellar profile picture
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Avatar Preview Section */}
          <motion.div
            layout
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                  >
                    <div className="space-y-4 text-center">
                      <div className="animate-spin w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full" />
                      <p className="text-white/80">Creating your avatar...</p>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full h-full"
                style={{
                  backgroundImage: generatedImage && !imageError
                    ? `url(${generatedImage})`
                    : 'linear-gradient(45deg, #4f46e5, #7c3aed)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                onError={() => {
                  setImageError(true);
                  toast.error('Failed to load image');
                }}
              />
            </div>

            {generatedImage && (
              <div className="flex gap-4 mt-4">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadAvatar}
                  className="flex-1 py-3 flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-all"
                >
                  <FaDownload /> Download
                </motion.button>
                
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => saveAsProfilePicture(generatedImage)}
                  className="flex-1 py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl text-white transition-all"
                >
                  <FaUser /> Set as Profile Picture
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Control Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
              <div className="relative">
                <textarea
                  ref={inputRef}
                  placeholder="Describe your perfect avatar... (e.g., 'A cosmic explorer with ethereal purple aura')"
                  className="w-full h-32 px-4 py-3 bg-white/5 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                />
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={generate}
                  disabled={isLoading}
                  className="mt-4 w-full py-4 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl text-white font-medium transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <FaMagic className="text-xl" /> Generate Avatar
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Tips Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl"
            >
              <h3 className="text-xl font-semibold text-white mb-4">✨ Pro Tips</h3>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">•</span>
                  Be specific about style and colors
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">•</span>
                  Include lighting and mood details
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">•</span>
                  Mention artistic influences
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Avatar;