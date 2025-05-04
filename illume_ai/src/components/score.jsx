import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaImage, FaMagic, FaTrophy, FaPencilAlt } from 'react-icons/fa';
import { useUser } from './UserContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Challenge = () => {
  const [score, setScore] = useState(null);
  const [idealPrompt, setIdealPrompt] = useState("");
  const [aiExplanation, setAiExplanation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showScore, setShowScore] = useState(false);
  const [showError, setShowError] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userPrompt = e.target["user-prompt"].value;

    // Simulate backend interaction
    fetch("/api/score-prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userPrompt }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setScore(data.score);
          setIdealPrompt(data.idealPrompt);
          setAiExplanation(data.aiExplanation);
          setShowScore(true);
          setShowError(false);
        } else {
          setErrorMessage(data.error);
          setShowError(true);
          setShowScore(false);
        }
      })
      .catch((error) => {
        setErrorMessage("An unexpected error occurred.");
        setShowError(true);
        setShowScore(false);
      });
  };

  const stats = [
    {
      icon: <FaImage className="text-3xl text-purple-400" />,
      title: "Images Generated",
      value: user?.imageCount || 0,
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaMagic className="text-3xl text-blue-400" />,
      title: "Prompts Created",
      value: user?.promptCount || 0,
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: <FaStar className="text-3xl text-yellow-400" />,
      title: "Creativity Score",
      value: ((user?.imageCount || 0) * 10) + ((user?.promptCount || 0) * 5),
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <FaTrophy className="text-3xl text-emerald-400" />,
      title: "Achievement Level",
      value: Math.floor(((user?.imageCount || 0) + (user?.promptCount || 0)) / 10) + 1,
      color: "from-emerald-500 to-teal-500"
    }
  ];

  const [promptInput, setPromptInput] = useState("");
  const [promptScore, setPromptScore] = useState(null);
  const [feedback, setFeedback] = useState("");

  const scorePrompt = (prompt) => {
    // Enhanced scoring criteria
    const criteria = {
      length: {
        score: prompt.length > 100 ? 15 : prompt.length > 50 ? 10 : 5,
        feedback: prompt.length < 50 ? "• Add more details to make your prompt richer\n" : ""
      },
      
      artisticElements: {
        score: (prompt.match(/\b(color|lighting|mood|texture|perspective|composition|shadow|highlight|contrast|tone|depth|focus|blur|sharp|soft|vivid|muted)\b/g) || []).length * 3,
        feedback: "• Include more artistic elements like lighting, shadows, or color tones\n"
      },
      
      styleKeywords: {
        score: (prompt.match(/\b(cinematic|photorealistic|abstract|minimalist|surreal|impressionist|digital art|oil painting|watercolor|sketch|anime|cartoon|realistic|hyper-realistic)\b/g) || []).length * 4,
        feedback: "• Specify art styles like 'cinematic', 'photorealistic', or 'abstract'\n"
      },
      
      atmosphericWords: {
        score: (prompt.match(/\b(mystical|ethereal|dreamy|dramatic|peaceful|chaotic|serene|dynamic|mysterious|magical|enchanted|cosmic|celestial|gothic|cyberpunk)\b/g) || []).length * 3,
        feedback: "• Add atmospheric words to set the mood\n"
      },
      
      technicalDetails: {
        score: (prompt.match(/\b(8k|4k|HD|high detail|ultra detailed|octane render|unreal engine|ray tracing|volumetric lighting|bokeh|studio quality)\b/g) || []).length * 3,
        feedback: "• Include technical specifications for better quality\n"
      },
      
      composition: {
        score: (prompt.match(/\b(foreground|background|middle ground|close-up|wide shot|portrait|landscape|aerial view|symmetrical|rule of thirds|centered|diagonal|frame)\b/g) || []).length * 4,
        feedback: "• Specify composition elements like 'foreground' or 'background'\n"
      },
      
      timeAndSetting: {
        score: (prompt.match(/\b(dawn|dusk|morning|night|sunset|sunrise|golden hour|blue hour|medieval|futuristic|ancient|modern|winter|summer|spring|autumn)\b/g) || []).length * 3,
        feedback: "• Define time period or setting for context\n"
      },
      
      materialAndTextures: {
        score: (prompt.match(/\b(metallic|wooden|glass|crystal|fabric|silk|leather|stone|marble|water|fire|smoke|mist|fog|ice)\b/g) || []).length * 3,
        feedback: "• Describe materials and textures\n"
      },
      
      structure: {
        score: (prompt.match(/,/) || []).length * 2 + (prompt.match(/\bin the style of\b|\bfeaturing\b|\bwith\b/) || []).length * 3,
        feedback: "• Structure your prompt better using commas and connecting phrases\n"
      },

      characterPresence: {
        score: (prompt.match(/\b(character|figure|person|silhouette|hero|villain|creature|animal|robot|alien|humanoid|avatar|model|subject)\b/g) || []).length * 3,
        feedback: "• Mention characters, creatures, or figures to populate the scene\n"
      },
      
      emotionAndExpression: {
        score: (prompt.match(/\b(happy|sad|angry|fearful|joyful|melancholic|intense|calm|serene|ecstatic|gritty|hopeful|nostalgic|fierce|gentle)\b/g) || []).length * 3,
        feedback: "• Add emotional tones or character expressions for depth\n"
      },
      
      environmentAndLocation: {
        score: (prompt.match(/\b(forest|city|space|underwater|desert|mountains|castle|temple|market|island|cave|lab|ship|garden|ruins|valley)\b/g) || []).length * 3,
        feedback: "• Specify environments or locations to set the scene\n"
      },
      
      colorPalette: {
        score: (prompt.match(/\b(monochrome|pastel|neon|vibrant|warm|cool|earth tones|sepia|black and white|complementary|analogous|colorful)\b/g) || []).length * 3,
        feedback: "• Define a color palette for visual consistency\n"
      },
      
      cameraLensAndAngle: {
        score: (prompt.match(/\b(wide-angle|macro|fisheye|telephoto|close-up|low angle|high angle|bird's eye view|worm's eye view|overhead|tilt|POV)\b/g) || []).length * 3,
        feedback: "• Include lens types or camera angles for framing control\n"
      },
      
      lightingType: {
        score: (prompt.match(/\b(soft light|harsh light|rim light|spotlight|ambient light|natural light|backlight|side light|studio lighting|diffused light|glow|bioluminescent)\b/g) || []).length * 3,
        feedback: "• Describe lighting styles to control mood and focus\n"
      },
      
      artMovementInfluence: {
        score: (prompt.match(/\b(baroque|gothic|renaissance|cubist|pop art|art deco|futurism|expressionism|surrealism|vaporwave|modernism)\b/g) || []).length * 4,
        feedback: "• Reference art movements or periods for stylistic influence\n"
      },
      
      specialEffectsAndDetails: {
        score: (prompt.match(/\b(particles|smoke|glow|motion blur|fireflies|lens flare|glitch|rain|snow|dust|sparks|vortex|shimmer|halo)\b/g) || []).length * 3,
        feedback: "• Include special effects or subtle details for realism\n"
      }
      
    };

    // Calculate total score
    const total = Object.values(criteria).reduce((sum, criterion) => sum + criterion.score, 0);
    const normalizedScore = Math.min(100, Math.round(total * 1.2)); // Adjusted multiplier

    // Generate comprehensive feedback
    let feedbackText = "🎨 Prompt Analysis:\n\n";
    
    // Only show feedback for low-scoring criteria
    Object.entries(criteria).forEach(([key, criterion]) => {
      if (criterion.score < 10 && criterion.feedback) {
        feedbackText += criterion.feedback;
      }
    });

    // Add score-based encouragement
    feedbackText += "\n✨ ";
    if (normalizedScore >= 90) {
      feedbackText += "Outstanding prompt! Your attention to detail is exceptional!";
    } else if (normalizedScore >= 70) {
      feedbackText += "Great prompt! Just a few tweaks could make it even better.";
    } else if (normalizedScore >= 50) {
      feedbackText += "Good start! Try adding more details from the suggestions above.";
    } else {
      feedbackText += "Keep building your prompt using the tips above!";
    }

    return { score: normalizedScore, feedback: feedbackText };
  };

  const handlePromptSubmit = (e) => {
    e.preventDefault();
    if (!promptInput.trim()) {
      toast.error("Please enter a prompt to score");
      return;
    }

    const result = scorePrompt(promptInput);
    setPromptScore(result.score);
    setFeedback(result.feedback);
  };

  const renderPromptScorer = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9 }}
      className="mt-16 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl"
    >
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Prompt Scorer</h2>
      <form onSubmit={handlePromptSubmit} className="space-y-6">

                    {/* Add the image here */}
                    <div className="flex justify-center mt-4">
        <img
          src="/todays-challenge.jpeg" // Replace with the actual path to your image
          alt="Creativity Illustration"
          className="w-48 h-auto rounded-lg"
        />
      </div>

        <div>
          <textarea
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder="Enter your prompt to get a creativity score..."
            className="w-full h-32 px-4 py-3 bg-white/5 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
          />
        </div>





        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2"
        >
          <FaPencilAlt /> Score My Prompt
        </motion.button>
        
      </form>

      <AnimatePresence>
        {promptScore !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 space-y-6"
          >
            <div className="text-center">
              <div className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text mb-2">
                {promptScore}/100
              </div>
              <div className="text-white/70">Creativity Score</div>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Feedback:</h3>
              {feedback.split('\n').map((line, index) => (
                line && <p key={index} className="text-white/70 mb-2">{line}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-black pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl mt-10 md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 text-transparent bg-clip-text">
            Your Creative Journey
          </h1>
          <p className="text-lg text-white/70">
            Track your progress and achievements in the AI art universe
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="flex flex-col items-center">
                <div className="mb-4">{stat.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{stat.title}</h3>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                  className={`text-4xl font-bold bg-gradient-to-r ${stat.color} text-transparent bg-clip-text`}
                >
                  {stat.value}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add achievement cards here */}
            {[
              { title: "Novice Creator", description: "Generated your first image", unlocked: user?.imageCount > 0 },
              { title: "Prompt Master", description: "Created 10+ unique prompts", unlocked: (user?.promptCount || 0) >= 10 },
              { title: "Gallery Artist", description: "Generated 20+ images", unlocked: (user?.imageCount || 0) >= 20 }
            ].map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.8 }}
                className={`p-6 rounded-xl ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20' 
                    : 'bg-gray-800/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${
                    achievement.unlocked ? 'bg-purple-500' : 'bg-gray-700'
                  }`}>
                    <FaTrophy className={achievement.unlocked ? 'text-white' : 'text-gray-500'} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{achievement.title}</h3>
                    <p className="text-white/60">{achievement.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Add the prompt scorer section */}
        {renderPromptScorer()}
      </div>
    </div>
  );
};

const Score = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-black text-white relative">
      <div className="container mx-auto px-4 pt-24 pb-32 flex flex-col items-center">
        <motion.div className="text-center mb-16">
          <motion.h1
            className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 text-transparent bg-clip-text mb-4"
            initial="visible"
            animate="visible"
            variants={fadeInUp}
          >
            Your Creative Journey
          </motion.h1>
          
          <motion.h2
            className="text-2xl text-gray-300 font-medium mb-12"
            initial="visible"
            animate="visible"
            variants={fadeInUp}
          >
            Track Your Progress
          </motion.h2>

          
        </motion.div>

    
      </div>
    </div>
  );
};

export default Challenge;
export { Score };
