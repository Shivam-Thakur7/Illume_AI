import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaBriefcase, FaGraduationCap, FaUsers, FaCalendarAlt, FaEdit } from 'react-icons/fa';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { user } = useUser();
  const navigate = useNavigate();

  // Add error handling for profile picture
  const handleImageError = (e) => {
    e.target.src = null;
    e.target.className = "hidden";
    toast.error("Failed to load profile picture");
  };

  if (!user) {
    return (
      <section className="min-h-screen pt-36 pb-20 bg-gradient-to-br from-black via-[#1a0033] to-black text-white relative overflow-hidden">
        <div className="container mx-auto px-6 sm:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Please Sign In</h2>
            <p className="text-white/70 mb-8">
              Sign in to view your cosmic creator profile on Illume AI.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/auth'}
              className="bg-white text-black px-8 py-3 rounded-xl font-medium hover:bg-white/90 transition-colors duration: 300"
            >
              Sign In Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-36 pb-20 bg-gradient-to-br from-black via-[#1a0033] to-black text-white relative overflow-hidden">
      {/* Galaxy Glow Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-purple-900/10 via-transparent to-indigo-900/10"
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
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-purple-700 to-indigo-800 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/30">
                {user.profilePicture ? (
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                ) : (
                  <FaUser className="text-6xl text-white" />
                )}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/avatar')}
                className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-purple-700 transition-colors duration-300"
              >
                Change Profile Picture
              </motion.button>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Welcome back, {user.name || 'Guest'} 🌌
            </h2>
            <p className="text-white/70">
              Explore your creative galaxy and track your AI journey
            </p>
          </motion.div>

          {/* Profile Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-[#1a0033]/60 backdrop-blur-md rounded-2xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Astral Identity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-700/20 flex items-center justify-center">
                    <FaUser className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Username</p>
                    <p className="font-medium text-white">{user.name || 'Not set'}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-[#1a0033]/60 backdrop-blur-md rounded-2xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">AI Generator Stats</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center bg-purple-700/20 rounded-xl p-4">
                  <p className="text-3xl font-bold text-white mb-1">
                    {user.promptCount || 0}
                  </p>
                  <p className="text-sm text-white/60">Total Prompts Generated</p>
                </div>
                <div className="text-center bg-purple-700/20 rounded-xl p-4">
                  <p className="text-3xl font-bold text-white mb-1">
                    {user.imageCount || 0}
                  </p>
                  <p className="text-sm text-white/60">Images Created</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 bg-[#1a0033]/60 backdrop-blur-md rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Recent Missions</h3>
            <div className="text-center py-8">
              <p className="text-white/60">No recent activity yet. Ready to illuminate the void?</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Profile;