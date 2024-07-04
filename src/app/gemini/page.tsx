'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Button = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const buttonVariants = {
    initial: {
      scale: 1,
      translateX: 0,
    },
    animate: {
      scale: 1.2, // Adjust scaling factor for desired effect
      translateX: 50, // Adjust right translation for desired movement
      transition: { duration: 0.3 }, // Customize transition duration
    },
  };

  const circleVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: { delay: 0.1 }, // Add a slight delay for a smoother effect
    },
  };

  return (
    <div className="flex items-center">
      <motion.button
        className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-700 focus:outline-none"
        onClick={handleClick}
        variants={buttonVariants}
        animate={isClicked ? 'animate' : 'initial'}
      >
        Click Me
      </motion.button>
      <motion.div
        className="h-8 w-8 rounded-full bg-blue-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        variants={circleVariants}
        animate={isClicked ? 'animate' : 'initial'}
      />
    </div>
  );
};

export default Button;
