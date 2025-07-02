import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BrandPanel } from '@/components/auth/BrandPanel';
import { LoginPanel } from '@/components/auth/LoginPanel';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/utils/constants';

export const LoginPageV2: React.FC = () => {
  const { login, isAuthenticated, isLoading, authError, refreshAuth } = useAuth();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  // Redirect to intended page after login
  const from = location.state?.from?.pathname || ROUTES.DASHBOARD;

  // Mount animation
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  // Loading screen during auth check
  if (isLoading && !authError) {
    return (
      <div className="min-h-screen bg-omni-bg flex items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-omni-cyan/5 via-transparent to-omni-security/5" />
        
        {/* Loading Animation */}
        <motion.div
          className="relative flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated Logo */}
          <motion.div
            className="w-16 h-16 bg-key-gradient rounded-xl flex items-center justify-center mb-6 relative"
            animate={{ 
              rotateY: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotateY: { duration: 3, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <div className="w-8 h-8 text-omni-bg">
              🔑
            </div>
            
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-key-gradient rounded-xl blur-lg opacity-50"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Loading Text */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-omni-text mb-2 font-mono">
              x.key.mx
            </h3>
            <p className="text-omni-textDim text-sm mb-4">
              Initializing secure connection...
            </p>
            
            {/* Progress dots */}
            <div className="flex justify-center gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-omni-cyan rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Scanning lines */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-omni-cyan to-transparent"
            animate={{ x: [-1000, 1000] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-omni-security to-transparent"
            animate={{ x: [1000, -1000] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 2
            }}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-omni-bg relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-omni-cyan/10 via-transparent to-omni-security/10" />
      <div className="absolute inset-0 bg-gradient-to-tl from-omni-key/5 via-transparent to-omni-cyan/5" />

      {/* Reduced animated particles - less pixelation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-omni-cyan/15 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: 0
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 20 + Math.random() * 15,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-screen flex">
        {/* Left Panel - Brand (45% width) */}
        <motion.div
          className="hidden lg:flex lg:w-[45%]"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : -100 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-full relative">
            <BrandPanel />
            
            {/* Separator */}
            <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-omni-border to-transparent" />
          </div>
        </motion.div>

        {/* Right Panel - Login (55% width) */}
        <motion.div
          className="w-full lg:w-[55%] relative"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : 100 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <LoginPanel 
            onSubmit={login} 
            isLoading={isLoading} 
            authError={authError}
            onRetry={refreshAuth}
          />
        </motion.div>
      </div>

      {/* Mobile Brand Header (shown on mobile when login panel is visible) */}
      <motion.div
        className="lg:hidden absolute top-0 left-0 right-0 z-20 bg-omni-bg/80 backdrop-blur-sm border-b border-omni-border/30"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -50 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center justify-center py-4">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-key-gradient rounded-lg flex items-center justify-center">
              <span className="text-omni-bg text-sm">🔑</span>
            </div>
            <h1 className="text-lg font-bold text-omni-text font-mono">
              x.key.mx
            </h1>
          </motion.div>
        </div>
      </motion.div>

      {/* Ambient Animations */}
      <AnimatePresence>
        {mounted && (
          <>
            {/* Top Border Animation */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-omni-cyan via-omni-security to-omni-key"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />

            {/* Bottom Border Animation */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-omni-key via-omni-security to-omni-cyan"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            />

            {/* Corner Accents */}
            <motion.div
              className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-omni-cyan/50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            />
            <motion.div
              className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-omni-security/50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-omni-key/50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-omni-cyan/50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Continuous Scanning Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted ? 1 : 0 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="absolute -top-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-omni-cyan/30 to-transparent blur-sm"
          animate={{ y: [0, window.innerHeight + 8] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 5
          }}
        />
      </motion.div>
    </div>
  );
};