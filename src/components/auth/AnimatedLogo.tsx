import React from 'react';
import { motion } from 'framer-motion';
import { KeyIcon } from '@heroicons/react/24/outline';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12', 
  lg: 'w-16 h-16'
};

const textSizes = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-4xl'
};

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  return (
    <motion.div 
      className={`flex items-center gap-3 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Logo Icon Container */}
      <motion.div
        className={`relative ${sizeClasses[size]} flex items-center justify-center`}
        animate={{ 
          rotateZ: [0, 1, 0, -1, 0], // Sutil wobble en lugar de rotación completa
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 ${sizeClasses[size]} bg-key-gradient rounded-lg blur-sm opacity-50`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Hacker icon */}
        <motion.div
          className={`relative z-10 ${sizeClasses[size]} bg-key-gradient rounded-lg flex items-center justify-center`}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <svg 
            className="w-2/3 h-2/3 text-omni-bg drop-shadow-sm" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 9.74s9-4.19 9-9.74V7L12 2zm0 2.18L18 7v10c0 4.07-2.79 7.26-6 7.26S6 21.07 6 17V7l6-2.82zM8 9v2h2v6h4v-6h2V9H8zm2 2h4v2h-4v-2z"/>
          </svg>
        </motion.div>
      </motion.div>

      {/* Text Logo */}
      <motion.div
        className="flex flex-col"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.h1 
          className={`${textSizes[size]} font-bold font-mono text-omni-text leading-none`}
          animate={{
            textShadow: [
              "0 0 10px rgba(10, 132, 255, 0.3)",
              "0 0 20px rgba(0, 199, 190, 0.4)", 
              "0 0 10px rgba(10, 132, 255, 0.3)"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          x.key.mx
        </motion.h1>
        
        {size === 'lg' && (
          <motion.p 
            className="text-sm text-omni-textDim font-mono tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            INTELLIGENCE PLATFORM
          </motion.p>
        )}
      </motion.div>

      {/* Subtle floating particles effect - ONLY for large size */}
      {size === 'lg' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-omni-cyan/40 rounded-full"
              initial={{ 
                x: 50 + Math.random() * 30,
                y: 50 + Math.random() * 30,
                opacity: 0
              }}
              animate={{
                x: 30 + Math.random() * 60,
                y: 30 + Math.random() * 60,
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};