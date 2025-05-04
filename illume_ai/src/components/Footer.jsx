import React from 'react';
import { FaHome, FaInfoCircle, FaUsers, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <footer className="bg-gradient-to-br from-black via-purple-950 to-indigo-900 text-[#f3eee5] py-12 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-700 flex items-center justify-center">
                  <FaUsers className="text-white text-xl" />
                </div>
              </h2>
              <p className="text-[#f3eee5]/80 leading-relaxed">
              Illume AI — Where Imagination Meets Intelligence.
              </p>
            </div>
            <div className="flex space-x-4 mt-6">
              {[FaLinkedin, FaTwitter, FaGithub].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 rounded-full bg-[#f3eee5]/10 flex items-center justify-center hover:bg-[#f3eee5]/20 transition-all duration-300">
                  <Icon className="text-[#f3eee5]" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4 text-pink-200">Quick Links</h3>
            <ul className="space-y-3">
              {[['Home', FaHome], ['About', FaInfoCircle], ['Network', FaUsers], ['Contact', FaEnvelope]].map(([label, Icon], i) => (
                <li key={i}>
                  <a href="#" className="flex items-center space-x-2 group">
                    <span className="h-8 w-8 rounded bg-[#f3eee5]/10 flex items-center justify-center group-hover:bg-[#f3eee5]/20 transition-all duration-300">
                      <Icon className="text-[#f3eee5]" />
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4 text-pink-200">Our Features</h3>
            <ul className="space-y-3">
              {['Text-to-Image Prompting', 'Style Control', 'Aspect Ratio Selection', 'Personalized Testimonials Carousel', 'One-Click Downloads'].map((item, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f3eee5]"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4 text-pink-200">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a href="mailto:support@aroha.com" className="flex items-center space-x-3 group">
                  <span className="h-10 w-10 rounded-full bg-[#f3eee5]/10 flex items-center justify-center group-hover:bg-[#f3eee5]/20 transition-all duration-300">
                    <FaEnvelope className="text-pink-400" />
                  </span>
                  <span className="text-pink-300 group-hover:text-pink-200 transition-colors duration-300">
                    support@IllumeAI.com
                  </span>
                </a>
              </li>
              <li>
                <a href="tel:+917508267254" className="flex items-center space-x-3 group">
                  <span className="h-10 w-10 rounded-full bg-[#f3eee5]/10 flex items-center justify-center group-hover:bg-[#f3eee5]/20 transition-all duration-300">
                    <FaPhoneAlt className="text-[#f3eee5]" />
                  </span>
                  <span className="text-[#f3eee5]/80 group-hover:text-[#f3eee5] transition-colors duration-300">
                    +91 7508267254
                  </span>
                </a>
              </li>
              <li>
                <div className="flex items-center space-x-3">
                  <span className="h-10 w-10 rounded-full bg-[#f3eee5]/10 flex items-center justify-center">
                    <FaMapMarkerAlt className="text-[#f3eee5]" />
                  </span>
                  <span className="text-[#f3eee5]/80">
                    Chitkara University, Punjab 147001
                  </span>
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 py-8 px-6 border border-[#f3eee5]/10 rounded-lg bg-gradient-to-br from-purple-950 to-indigo-900 shadow-inner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-2 text-pink-200">Stay Connected with us</h3>
              <p className="text-[#f3eee5]/70">Get prompt tricks, latest AI drops, art battles & exclusive Illume tools straight to your inbox.</p>
            </div>
            <div className="w-full md:w-1/2">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-[#f3eee5]/10 border border-[#f3eee5]/20 rounded px-4 py-2.5 text-[#f3eee5] focus:outline-none focus:ring-2 focus:ring-pink-400/50 w-full"
                />
                <button className="bg-pink-500 text-white rounded px-6 py-2.5 font-medium hover:bg-pink-600 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 pt-8 border-t border-[#f3eee5]/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="mb-4 md:mb-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-[#f3eee5]/70 text-sm">
                &copy; {currentYear} IllumeAI. All rights reserved.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-sm text-[#f3eee5]/70"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              {['Terms', 'Privacy', 'Cookie Policy'].map((item, i) => (
                <React.Fragment key={i}>
                  <a href="#" className="hover:text-[#f3eee5] transition-colors duration-300">{item}</a>
                  {i !== 2 && <span className="hidden md:inline">•</span>}
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;