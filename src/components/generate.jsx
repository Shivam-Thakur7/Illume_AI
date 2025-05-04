import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from 'react-toastify';
import { FaMagic, FaDownload, FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { useUser } from './UserContext';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import 'react-toastify/dist/ReactToastify.css';

export default function Generate() {
  const [prompt, setPrompt] = useState("");
  const [statusText, setStatusText] = useState("");
  const [resultImages, setResultImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { updateGenerationStats } = useUser();
  const [isListening, setIsListening] = useState(false);
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const handleMicClick = () => {
    if (!browserSupportsSpeechRecognition) {
      alert('Browser doesn\'t support speech recognition.');
      return;
    }

    if (!isListening) {
      // Start listening
      setIsListening(true);
      SpeechRecognition.startListening({ continuous: true });
    } else {
      // Stop listening and update prompt
      setIsListening(false);
      SpeechRecognition.stopListening();
      setPrompt(prev => prev + ' ' + transcript);
      resetTranscript();
    }
  };

  const generate = async () => {
    if (!prompt.trim()) {
      toast.warning("Please enter a prompt!");
      return;
    }

    setIsLoading(true);
    setStatusText("✨ Illume AI is creating its magic 🧠 ...");

    try {
      const response = await fetch("http://localhost:3001/generate-image", {  // Update this URL to match your backend
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await response.json();

      if (data.error) {
        toast.error(data.error);
        return;
      }

      const imageUrl = data.imageUrl;
      const refinedPrompt = data.revisedPrompt || prompt;

      setResultImages((prev) => [
        {
          url: imageUrl,
          prompt: refinedPrompt,
        },
        ...prev,
      ]);
      
      updateGenerationStats();
      toast.success("Image generated successfully!");

    } catch (err) {
      console.error(err);
      toast.error("Failed to generate image.");
    } finally {
      setIsLoading(false);
      setStatusText("");
    }
  };

  const downloadImage = async (url, prompt) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      a.download = `AI_Image_${timestamp}.jpg`;
      a.click();
      URL.revokeObjectURL(blobUrl);
      toast.success("Image downloaded successfully!");
    } catch (err) {
      toast.error("Failed to download image.");
    }
  };

  const copyPrompt = (prompt) => {
    navigator.clipboard.writeText(prompt)
      .then(() => toast.success("Prompt copied to clipboard!"))
      .catch(() => toast.error("Failed to copy prompt."));
  };

  const regenerate = (prompt) => {
    setPrompt(prompt);
    generate();
  };

  const styles = {
    container: {
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px'
    },
    inputContainer: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      width: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '8px'
    },
    input: {
      width: 'calc(100% - 140px)', // Make space for both buttons
      padding: '15px',
      fontSize: '16px',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#fff',
      outline: 'none'
    },
    buttonGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '0 10px'
    },
    micButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      transition: 'all 0.3s ease',
      backgroundColor: isListening ? 'rgba(255, 68, 68, 0.1)' : 'transparent'
    },
    generateButton: {
      padding: '8px 15px',
      borderRadius: '6px',
      border: 'none',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-black via-purple-900 to-indigo-900 text-white">
      <ToastContainer position="top-right" theme="dark" />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl"
        >
          <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Illume AI Generator
          </h1>
          
          <div style={styles.inputContainer}>
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your vision..."
              style={styles.input}
            />
            <div style={styles.buttonGroup}>
              <button
                onClick={handleMicClick}
                style={styles.micButton}
                title={isListening ? 'Stop listening' : 'Start listening'}
              >
                {isListening ? (
                  <FaMicrophone style={{ color: '#ff4444', fontSize: '20px' }} />
                ) : (
                  <FaMicrophoneSlash style={{ color: '#888', fontSize: '20px' }} />
                )}
              </button>
              <button
                onClick={generate}
                disabled={isLoading}
                style={styles.generateButton}
              >
                {isLoading ? "Generating..." : "Generate ✨"}
              </button>
            </div>
            {isListening && (
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                left: '15px',
                fontSize: '12px',
                color: '#ff4444',
                animation: 'pulse 1.5s infinite'
              }}>
                Listening...
              </div>
            )}
          </div>

          {statusText && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center text-lg animate-pulse bg-white/20 p-4 rounded-lg"
            >
              {statusText}
            </motion.p>
          )}

          <AnimatePresence>
            <motion.div
              layout
              className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {resultImages.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden"
                >
                  <img 
                    src={item.url} 
                    alt="Generated" 
                    className="w-full h-64 object-cover rounded-t-xl" 
                  />
                  <div className="p-4">
                    <p className="mb-4 text-sm">
                      <span className="font-semibold text-purple-300">Prompt:</span>{" "}
                      {item.prompt}
                    </p>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => downloadImage(item.url, item.prompt)}
                        className="flex-1 bg-green-500/80 hover:bg-green-500 text-white px-3 py-2 rounded-lg transition-all"
                      >
                        ⬇️ Download
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => copyPrompt(item.prompt)}
                        className="flex-1 bg-blue-500/80 hover:bg-blue-500 text-white px-3 py-2 rounded-lg transition-all"
                      >
                        📋 Copy
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => regenerate(item.prompt)}
                        className="flex-1 bg-yellow-500/80 hover:bg-yellow-500 text-white px-3 py-2 rounded-lg transition-all"
                      >
                        🔄 Regenerate
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
