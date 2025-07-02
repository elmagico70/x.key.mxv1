import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  GlobeAltIcon,
  BoltIcon,
  UsersIcon,
  ShieldCheckIcon,
  ServerIcon
} from '@heroicons/react/24/outline';

interface CompactStatProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
  isAnimating?: boolean;
}

const CompactStat: React.FC<CompactStatProps> = ({ 
  icon: Icon, 
  label, 
  value, 
  color,
  isAnimating = false 
}) => {
  return (
    <motion.div
      className="flex items-center gap-2 p-2 rounded-lg bg-omni-surface2/30 backdrop-blur-sm border border-omni-border/30"
      whileHover={{ scale: 1.02, borderColor: color + '40' }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="p-1.5 rounded"
        style={{ backgroundColor: color + '20' }}
        animate={isAnimating ? { 
          scale: [1, 1.1, 1],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Icon 
          className="w-3 h-3" 
          style={{ color }} 
        />
      </motion.div>
      
      <div className="flex-1 min-w-0">
        <motion.p 
          className="text-sm font-bold text-omni-text font-mono leading-none"
          key={value}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {typeof value === 'number' ? value.toLocaleString() : value}
        </motion.p>
        <p className="text-xs text-omni-textDim uppercase tracking-wide leading-none mt-0.5">
          {label}
        </p>
      </div>
    </motion.div>
  );
};

export const LiveStats: React.FC = () => {
  // Simulated live data
  const [stats, setStats] = useState({
    searches: 1247859,
    databases: 15,
    responseTime: 47,
    activeUsers: 342,
    uptime: 99.8,
    dataPoints: 2847392
  });

  const [animatingStats, setAnimatingStats] = useState<Set<string>>(new Set());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const statToUpdate = Math.random();
      const newAnimating = new Set<string>();
      
      setStats(prev => {
        const newStats = { ...prev };
        
        if (statToUpdate < 0.4) {
          newStats.searches += Math.floor(Math.random() * 5) + 1;
          newAnimating.add('searches');
        } else if (statToUpdate < 0.7) {
          const change = Math.floor(Math.random() * 4) - 1;
          newStats.activeUsers = Math.max(300, newStats.activeUsers + change);
          newAnimating.add('activeUsers');
        } else {
          newStats.responseTime = Math.floor(Math.random() * 15) + 40;
          newAnimating.add('responseTime');
        }
        
        return newStats;
      });
      
      setAnimatingStats(newAnimating);
      setTimeout(() => setAnimatingStats(new Set()), 2000);
    }, 4000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, []);

  const statsData = [
    {
      icon: MagnifyingGlassIcon,
      label: 'Searches',
      value: stats.searches,
      color: '#0A84FF',
      key: 'searches'
    },
    {
      icon: GlobeAltIcon,
      label: 'Databases',
      value: stats.databases,
      color: '#00D762',
      key: 'databases'
    },
    {
      icon: BoltIcon,
      label: 'Response',
      value: `${stats.responseTime}ms`,
      color: '#FFD60A',
      key: 'responseTime'
    },
    {
      icon: UsersIcon,
      label: 'Active',
      value: stats.activeUsers,
      color: '#00C7BE',
      key: 'activeUsers'
    },
    {
      icon: ShieldCheckIcon,
      label: 'Uptime',
      value: `${stats.uptime}%`,
      color: '#00D762',
      key: 'uptime'
    },
    {
      icon: ServerIcon,
      label: 'Records',
      value: `${Math.round(stats.dataPoints/1000000*10)/10}M`,
      color: '#BF5AF2',
      key: 'dataPoints'
    }
  ];

  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, staggerChildren: 0.1 }}
    >
      {/* Compact Header */}
      <motion.div 
        className="flex items-center gap-2 mb-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="w-1.5 h-1.5 bg-omni-green rounded-full animate-pulse" />
        <h3 className="text-xs font-bold text-omni-text uppercase tracking-wider">
          Live Status
        </h3>
      </motion.div>

      {/* Compact Stats Grid */}
      <div className="grid grid-cols-2 gap-2">
        <AnimatePresence>
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <CompactStat
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                color={stat.color}
                isAnimating={animatingStats.has(stat.key)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* System Status Indicator */}
      <motion.div
        className="mt-3 p-2 rounded-lg bg-gradient-to-r from-omni-green/10 to-omni-cyan/10 border border-omni-green/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 bg-omni-green rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className="text-xs font-medium text-omni-green">
              All Systems Operational
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};