import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, ArrowLeft } from "lucide-react";
import "./ChatBot.css";
import slackLogo from "./slack-logo.png";

const questionsAndAnswers = [
  { question: "🔑 How do I reset my password?", answer: "Go to Settings > Security > Reset Password." },
  { question: "📞 How can I contact support?", answer: "Contact PayPal support via Help Center or call 1-800-PAYPAL." },
  { question: "💳 Where can I see my transactions?", answer: "Navigate to the 'Activity' tab in your PayPal dashboard." },
];

const slackChannelURL = "https://your-slack-channel-link";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState("");

  const handleQuestionClick = (answer) => {
    setIsThinking(true);
    setTypedAnswer("");

    setTimeout(() => {
      setIsThinking(false);
      let index = 0;
      const typingInterval = setInterval(() => {
        setTypedAnswer((prev) => prev + answer[index]);
        index++;
        if (index === answer.length) clearInterval(typingInterval);
      }, 50);
    }, 1200);
  };

  return (
    <div className="chatbot-container">
      <motion.button
        className="chatbot-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bot size={24} />
        <span>Chat</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-window"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="chat-header">
              <span>Chat Support</span>
              <X className="close-icon" onClick={() => setIsOpen(false)} />
            </div>

            <div className="chat-body">
              {!selectedAnswer ? (
                <>
                  {questionsAndAnswers.map((qa, index) => (
                    <motion.div
                      key={index}
                      className="chat-question"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedAnswer(qa.question);
                        handleQuestionClick(qa.answer);
                      }}
                    >
                      {qa.question}
                    </motion.div>
                  ))}

                  {/* Slack Support Button */}
                  <a href={slackChannelURL} target="_blank" rel="noopener noreferrer" className="slack-button">
                    <img src={slackLogo} alt="Slack" className="slack-logo" />
                    <span>Join Slack Support</span>
                  </a>
                </>
              ) : (
                <motion.div className="chat-answer">
                  {isThinking ? (
                    <div className="thinking-animation">🤔 Thinking...</div>
                  ) : (
                    <span className="typing-effect">{typedAnswer}</span>
                  )}

                  {/* Back Button - Now Fixed on the Next Line */}
                  <div className="back-button-container">
                    <button className="back-button" onClick={() => setSelectedAnswer(null)}>
                      <ArrowLeft size={18} /> <span>Back</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
