import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Surveys = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState(null); // Initialize as null

  const allQuestions = [
    {
      question: "What is the most important aspect of a good AI prompt?",
      options: [
        { text: "Clarity", points: 10 },
        { text: "Length", points: 5 },
        { text: "Complexity", points: 3 },
        { text: "Randomness", points: 1 }
      ]
    },
    {
      question: "Which AI model is commonly used for text generation?",
      options: [
        { text: "GPT", points: 10 },
        { text: "CNN", points: 3 },
        { text: "RNN", points: 5 },
        { text: "SVM", points: 1 }
      ]
    },
    {
      question: "What is the best way to improve AI-generated outputs?",
      options: [
        { text: "Provide detailed prompts", points: 10 },
        { text: "Use random inputs", points: 3 },
        { text: "Rely on default settings", points: 1 },
        { text: "Avoid feedback loops", points: 5 }
      ]
    },
    {
      question: "What is a key benefit of using AI for content generation?",
      options: [
        { text: "Speed and efficiency", points: 10 },
        { text: "Guaranteed accuracy", points: 5 },
        { text: "Human-like creativity", points: 8 },
        { text: "Cost reduction", points: 7 }
      ]
    },
    {
      question: "Which of the following is a popular AI framework?",
      options: [
        { text: "TensorFlow", points: 10 },
        { text: "React", points: 3 },
        { text: "Django", points: 5 },
        { text: "Flask", points: 1 }
      ]
    },
    {
      question: "What does GPT stand for?",
      options: [
        { text: "Generative Pre-trained Transformer", points: 10 },
        { text: "General Purpose Transformer", points: 5 },
        { text: "Generative Prompting Tool", points: 3 },
        { text: "General Pre-trained Tool", points: 1 }
      ]
    },
    {
      question: "What is the purpose of fine-tuning an AI model?",
      options: [
        { text: "To adapt it to specific tasks", points: 10 },
        { text: "To make it faster", points: 5 },
        { text: "To reduce its size", points: 3 },
        { text: "To improve its randomness", points: 1 }
      ]
    },
    {
      question: "Which of the following is a common use case for AI?",
      options: [
        { text: "Image recognition", points: 10 },
        { text: "Spreadsheet calculations", points: 3 },
        { text: "Manual data entry", points: 1 },
        { text: "File compression", points: 5 }
      ]
    },
    {
      question: "What is the role of a tokenizer in NLP?",
      options: [
        { text: "Splitting text into tokens", points: 10 },
        { text: "Compressing text", points: 3 },
        { text: "Encrypting text", points: 1 },
        { text: "Generating random text", points: 5 }
      ]
    },
    {
      question: "What is transfer learning in AI?",
      options: [
        { text: "Using a pre-trained model for a new task", points: 10 },
        { text: "Training a model from scratch", points: 3 },
        { text: "Transferring data between models", points: 5 },
        { text: "Sharing weights between layers", points: 1 }
      ]
    }
    // Add more questions here to reach 30
  ];

  // Shuffle and select 5 random questions
  const shuffleQuestions = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  };

  useEffect(() => {
    setSelectedQuestions(shuffleQuestions());
  }, []);

  const handleOptionClick = (points) => {
    setScore(score + points);
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
    setSelectedQuestions(shuffleQuestions());
  };

  // Generate falling stars for the background
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 50; i++) {
      stars.push({
        id: i,
        left: Math.random() * 100 + '%',
        animationDuration: Math.random() * 3 + 2 + 's',
        animationDelay: Math.random() * 5 + 's'
      });
    }
    return stars;
  };

  const stars = generateStars();

  if (!selectedQuestions) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Falling Stars Background */}
      <div className="absolute inset-0 z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: star.left,
              top: '-10%',
              animation: `fall ${star.animationDuration} linear infinite`,
              animationDelay: star.animationDelay
            }}
          ></div>
        ))}
      </div>

      {/* Quiz Content */}
      <div className="relative z-10 w-full max-w-2xl p-6 bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-70 backdrop-blur-md rounded-lg shadow-lg">
        {!quizCompleted ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">
              {selectedQuestions[currentQuestionIndex].question}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {selectedQuestions[currentQuestionIndex].options.map((option, index) => (
                <motion.button
                  key={index}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-md hover:scale-105 transition-transform"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOptionClick(option.points)}
                >
                  {option.text}
                </motion.button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
            <p className="text-xl mb-6">Your Score: <span className="text-purple-400">{score}</span></p>
            <motion.button
              className="py-3 px-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-md hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRestart}
            >
              Restart Quiz
            </motion.button>
          </div>
        )}
      </div>

      {/* Falling Stars Animation */}
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(0);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Surveys;