import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { useEffect } from 'react';


function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Form submitted:', formData);
  // };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  
  function formSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    fetch("https://getform.io/f/amdkwqmb", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {console.log(response)
      document.getElementById('form').reset();}
)
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    const form = document.getElementById("form");
    form.addEventListener("submit", formSubmit);
  }, []);


  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10"
          animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center mb-16 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10"
          >
            Get in Touch
          </motion.h2>
          <motion.div
            className="absolute inset-x-0 top-1/2 h-32 bg-gradient-to-r from-purple-900/10 via-pink-900/10 to-purple-900/10 blur-xl"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/70 text-lg max-w-2xl mx-auto z-10 relative"
          >
            Have questions or want to learn more? We're here to help. 
            Reach out to us through the form below or contact us directly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {[{
              icon: <FaEnvelope className="text-xl text-white" />,
              title: "Email",
              info: "support@IllumeAI.com",
              infoIcon: <FaEnvelope className="text-white/70" />
            }, {
              icon: <FaPhone className="text-xl text-white" />,
              title: "Phone",
              info: "+91 7508267254"
            }, {
              icon: <FaMapMarkerAlt className="text-xl text-white" />,
              title: "Location",
              info: "Chitkara University\nPunjab"
            }].map(({ icon, title, info, infoIcon }, i) => (
              <div key={i} className="bg-[#1c1b25] rounded-2xl p-8 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-700 to-pink-700 flex items-center justify-center">
                    {icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                    <div className="flex items-start space-x-2 whitespace-pre-line text-white/70">
                      {infoIcon && infoIcon}
                      <p>{info}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#1c1b25] rounded-2xl p-8 shadow-lg"
          >
            <form   method="POST"
              acceptCharset="UTF-8"
              id="form"className="space-y-6">
              {["name", "email", "subject"].map((field, i) => (
                <div key={i}>
                  <label htmlFor={field} className="block text-sm font-medium text-white mb-2 capitalize">
                    {field}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-pink-700/40 transition duration-300"
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-pink-700/40 transition duration-300"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-gradient-to-r from-purple-700 to-pink-700 text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
                <FaPaperPlane className="text-lg" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;