import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedLogo } from "./AnimatedLogo";
import { LiveStats } from "./LiveStats";
// Si usas CompactFeatures, descomenta la línea siguiente
// import { CompactFeatures } from "./CompactFeatures";

// --- TypewriterText component ---
const TypewriterText: React.FC<{
  texts: string[];
  className?: string;
}> = ({ texts, className = "" }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = texts[currentTextIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (currentText.length < fullText.length) {
        timeout = setTimeout(() => {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1500);
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        }, 50);
      } else {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts]);

  return (
    <span className={className}>
      {currentText}
      <motion.span
        className="inline-block w-0.5 h-4 bg-omni-cyan ml-1"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </span>
  );
};

// --- Opcional: FeatureHighlight, si quieres la lista de features ---
/*
const FeatureHighlight: React.FC<{
  title: string;
  description: string;
  delay: number;
}> = ({ title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -15 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="rounded-md px-3 py-2 bg-omni-cyan/5 border border-omni-cyan/10"
  >
    <div className="text-omni-key font-bold text-xs">{title}</div>
    <div className="text-omni-textDim text-xs">{description}</div>
  </motion.div>
);
*/

export const BrandPanel: React.FC = () => {
  const taglines = [
    "Digital Intelligence Platform",
    "Advanced Research Engine",
    "Data Discovery Hub",
    "Intelligence Operations"
  ];

  // --- Opcional: Si quieres mostrar features, descomenta esta sección ---
  /*
  const features = [
    {
      title: "Real-time Data Search",
      description: "Instant access to millions of records with lightning-fast response times"
    },
    {
      title: "Multi-source Intelligence",
      description: "Aggregate data from multiple databases and sources for comprehensive insights"
    },
    {
      title: "Enterprise Security",
      description: "Military-grade encryption and zero-trust architecture for maximum protection"
    },
    {
      title: "Advanced Analytics",
      description: "AI-powered analysis and pattern recognition for deeper intelligence"
    },
    {
      title: "API Integration",
      description: "Seamless integration with existing systems and third-party applications"
    }
  ];
  */

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-br from-omni-cyan/5 via-transparent to-omni-key/5" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-omni-cyan/20 rounded-full"
            initial={{
              x: Math.random() * 400,
              y: Math.random() * 600,
              opacity: 0
            }}
            animate={{
              x: Math.random() * 400,
              y: Math.random() * 600,
              opacity: [0, 0.4, 0]
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 h-full flex flex-col py-8 px-6">
        {/* Logo & tagline */}
        <motion.div
          className="pb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <AnimatedLogo size="lg" className="justify-start" />
          <motion.div
            className="mt-4 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-base font-light text-omni-text">
              <TypewriterText texts={taglines} className="font-mono" />
            </h2>
            <p className="text-xs text-omni-textDim max-w-sm leading-relaxed">
              Your gateway to comprehensive digital intelligence and advanced data discovery.
            </p>
          </motion.div>
        </motion.div>

        {/* Live Stats */}
        <motion.div
          className="pb-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <LiveStats />
        </motion.div>

        {/* Features (si usas CompactFeatures, deja esto; si usas lista, descomenta la sección de features arriba y usa el mapeo que sigue) */}
        {/* <motion.div
          className="pb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <CompactFeatures />
        </motion.div> */}

        {/* --- Si prefieres usar la lista de features, descomenta esto: --- */}
        {/* 
        <motion.div
          className="py-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-omni-key rounded-full animate-pulse" />
            <h3 className="text-sm font-bold text-omni-text uppercase tracking-wider">
              Platform Features
            </h3>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
            {features.map((feature, index) => (
              <FeatureHighlight
                key={feature.title}
                title={feature.title}
                description={feature.description}
                delay={1.4 + index * 0.1}
              />
            ))}
          </div>
        </motion.div>
        */}

        {/* Bottom Status */}
        <motion.div
          className="mt-auto pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-omni-key/50 to-transparent mb-3" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 bg-omni-green rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs text-omni-green font-medium">ONLINE</span>
            </div>
            <motion.span
              className="text-xs text-omni-textDim font-mono tracking-wider"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              SECURE • FAST • RELIABLE
            </motion.span>
          </div>
        </motion.div>
      </div>

      {/* Side scanning line */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-omni-cyan to-transparent"
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};