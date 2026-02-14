import React from 'react'
import { motion } from 'framer-motion'
import './Loading.css'

const Loading = () => {
  return (
    <div className="loading-container">
      <motion.div
        className="loading-spinner"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="spinner-inner"></div>
      </motion.div>
      <p>Loading...</p>
    </div>
  )
}

export default Loading
