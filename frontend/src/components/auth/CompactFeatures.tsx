import React from 'react';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CloudIcon
} from '@heroicons/react/24/outline';

interface FeatureItemProps {
  icon: React.ElementType;
  title: string;
  delay: number;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, title, delay }) => {
  return (
    <motion.div
      className="flex items-center gap-2 p-2 rounded-lg hover:bg-omni-surface2/30 transition-colors duration-200"
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ x: 3 }}
    >
      <motion.div
        className="w-1.5 h-1.5 bg-omni-key rounded-full flex-shrink-0"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 3, repeat: Infinity, delay }}
      />
      <Icon className="w-4 h-4 text-omni-cyan flex-shrink-0" />
      <span className="text-xs font-medium text-omni-text">
        {title}
      </span>
    </motion.div>
  );
};

export const CompactFeatures: React.FC = () => {
  const features = [
    {
      icon: MagnifyingGlassIcon,
      title: "Real-time Search"
    },
    {
      icon: GlobeAltIcon,
      title: "Multi-source Intel"
    },
    {
      icon: ShieldCheckIcon,
      title: "Enterprise Security"
    },
    {
      icon: ChartBarIcon,
      title: "Advanced Analytics"
    },
    {
      icon: CloudIcon,
      title: "API Integration"
    }
  ];

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Compact Header */}
      <motion.div 
        className="flex items-center gap-2 mb-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="w-1.5 h-1.5 bg-omni-key rounded-full animate-pulse" />
        <h3 className="text-xs font-bold text-omni-text uppercase tracking-wider">
          Platform Features
        </h3>
      </motion.div>

      {/* Features List */}
      <div className="space-y-1">
        {features.map((feature, index) => (
          <FeatureItem
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            delay={0.3 + index * 0.1}
          />
        ))}
      </div>
    </motion.div>
  );
};