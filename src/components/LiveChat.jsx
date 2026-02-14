import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaComments, FaTimes, FaPaperPlane, FaRobot } from 'react-icons/fa'
import './LiveChat.css'

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! Welcome to E Flash 👋 How can we help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')

  const quickReplies = [
    "I need a website",
    "Logo design quote",
    "View pricing",
    "Contact team"
  ]

  const botResponses = {
    website: "Great! We offer professional website design and development. Would you like to see our packages or get a custom quote?",
    logo: "We'd love to help with your logo! Our branding packages start from LKR 15,000. Can I get your contact details to send you more information?",
    pricing: "You can view all our pricing packages at /packages. We offer transparent pricing for all our services!",
    contact: "You can reach us at:\n📞 +94 76 487 6464\n📧 info@eflash24.tech\nOr fill out our contact form and we'll get back to you within 24 hours!",
    default: "Thanks for your message! Our team will review and respond shortly. In the meantime, feel free to explore our portfolio or services!"
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages([...messages, newMessage])
    setInputValue('')

    // Simulate bot response
    setTimeout(() => {
      const responseText = getBotResponse(inputValue)
      const botMessage = {
        id: messages.length + 2,
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  const getBotResponse = (input) => {
    const lowerInput = input.toLowerCase()
    if (lowerInput.includes('website') || lowerInput.includes('web')) {
      return botResponses.website
    } else if (lowerInput.includes('logo') || lowerInput.includes('brand')) {
      return botResponses.logo
    } else if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('package')) {
      return botResponses.pricing
    } else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('phone')) {
      return botResponses.contact
    } else {
      return botResponses.default
    }
  }

  const handleQuickReply = (reply) => {
    setInputValue(reply)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="chat-toggle-btn"
          >
            <FaComments />
            <span className="chat-badge">1</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25 }}
            className="chat-window"
          >
            {/* Chat Header */}
            <div className="chat-header">
              <div className="chat-header-info">
                <FaRobot className="bot-icon" />
                <div>
                  <h4>E Flash Support</h4>
                  <span className="online-status">● Online</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="close-chat-btn">
                <FaTimes />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="chat-messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`chat-message ${message.sender}`}
                >
                  <div className="message-bubble">
                    <p>{message.text}</p>
                    <span className="message-time">
                      {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="quick-replies">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="quick-reply-btn"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Chat Input */}
            <div className="chat-input-container">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="chat-input"
              />
              <button onClick={handleSendMessage} className="send-btn">
                <FaPaperPlane />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default LiveChat
