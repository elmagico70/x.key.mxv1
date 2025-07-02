import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  LockClosedIcon, 
  EyeSlashIcon,
  CpuChipIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';

interface CompactSecurityBadgeProps {
  icon: React.ElementType;
  title: string;
  verified?: boolean;
  delay?: number;
}

const CompactSecurityBadge: React.FC<CompactSecurityBadgeProps> = ({ 
  icon: Icon, 
  title, 
  verified = true,
  delay = 0 
}) => {
  return (
    <motion.div
      className="flex items-center gap-2 p-2 rounded-lg bg-omni-surface2/20 border border-omni-border/30 backdrop-blur-sm"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ 
        borderColor: verified ? '#00D762' : '#FFD60A',
        backgroundColor: 'rgba(26, 26, 26, 0.4)'
      }}
    >
      <motion.div
        className={`p-1.5 rounded ${
          verified 
            ? 'bg-omni-green/20 text-omni-green' 
            : 'bg-omni-yellow/20 text-omni-yellow'
        }`}
        animate={verified ? {
          boxShadow: [
            '0 0 0px rgba(0, 215, 98, 0)',
            '0 0 8px rgba(0, 215, 98, 0.3)',
            '0 0 0px rgba(0, 215, 98, 0)'
          ]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Icon className="w-3 h-3" />
      </motion.div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <p className="text-xs font-medium text-omni-text truncate">
            {title}
          </p>
          {verified && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.2, type: "spring" }}
            >
              <CheckBadgeIcon className="w-3 h-3 text-omni-green flex-shrink-0" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const SecurityBadges: React.FC = () => {
  const securityFeatures = [
    {
      icon: LockClosedIcon,
      title: "256-bit Encryption",
      verified: true
    },
    {
      icon: ShieldCheckIcon,
      title: "SOC 2 Compliant",
      verified: true
    },
    {
      icon: EyeSlashIcon,
      title: "Zero-Trust",
      verified: true
    },
    {
      icon: CpuChipIcon,
      title: "AI Security",
      verified: true
    }
  ];

  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0, y: 20 }}
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
        <ShieldCheckIcon className="w-4 h-4 text-omni-security" />
        <h3 className="text-xs font-bold text-omni-text uppercase tracking-wider">
          Security
        </h3>
      </motion.div>

      {/* Security Badges Grid */}
      <div className="grid grid-cols-2 gap-2">
        {securityFeatures.map((feature, index) => (
          <CompactSecurityBadge
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            verified={feature.verified}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Trust Score */}
      <motion.div
        className="mt-3 p-2 rounded-lg bg-gradient-to-r from-omni-security/10 to-omni-cyan/10 border border-omni-security/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-omni-text">
            Trust Score
          </span>
          <motion.span 
            className="text-sm font-bold text-omni-security font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            A+
          </motion.span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-omni-border rounded-full h-1.5 mt-1 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-omni-security to-omni-cyan rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "95%" }}
            transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {/* Certification Logos */}
      <motion.div
        className="flex items-center justify-center gap-2 pt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {['ISO', 'SOC2', 'GDPR'].map((cert, index) => (
          <motion.div
            key={cert}
            className="px-2 py-1 rounded border border-omni-border/30 bg-omni-surface2/20"
            whileHover={{ scale: 1.05, borderColor: '#00C7BE' }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span className="text-xs font-mono text-omni-textDim">
              {cert}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};