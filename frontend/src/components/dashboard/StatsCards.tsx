import React from 'react';
import { motion } from 'framer-motion';
import { 
  UsersIcon, 
  MapPinIcon, 
  PhoneIcon, 
  DocumentTextIcon,
  CreditCardIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: React.ElementType;
  color: string;
  description?: string;
  loading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  color,
  description,
  loading = false
}) => {
  const changeColor = {
    increase: 'text-omni-green',
    decrease: 'text-omni-red',
    neutral: 'text-omni-textDim'
  }[changeType];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
      className="omni-card group cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${color} group-hover:scale-110 transition-transform duration-200`}>
              <Icon className="w-5 h-5 text-omni-bg" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-omni-textDim uppercase tracking-wider">
                {title}
              </h3>
            </div>
          </div>
          
          <div className="space-y-2">
            {loading ? (
              <div className="h-8 bg-omni-surface2 rounded animate-pulse" />
            ) : (
              <p className="text-2xl font-bold text-omni-text font-mono">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </p>
            )}
            
            {change && (
              <div className="flex items-center gap-2">
                <ArrowTrendingUpIcon className={`w-4 h-4 ${changeColor}`} />
                <span className={`text-sm font-medium ${changeColor}`}>
                  {change}
                </span>
                <span className="text-xs text-omni-textDim">vs último mes</span>
              </div>
            )}
            
            {description && (
              <p className="text-xs text-omni-textDim">{description}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-omni-cyan/5 via-transparent to-omni-green/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </motion.div>
  );
};

export const StatsCards: React.FC = () => {
  // Mock data - Replace with real data when needed
  const mockStats = {
    total: 125847,
    withPhone: 98234,
    withRFC: 87456,
    withCURP: 92103,
    withBank: 45234,
    byState: {
      'Ciudad de México': 25000,
      'Jalisco': 18000,
      'Nuevo León': 15000,
      'Puebla': 12000,
      'Veracruz': 10000
    },
    recentlyAdded: 1247
  };

  const statsData = [
    {
      title: 'Total Personas',
      value: mockStats.total,
      change: '+12.5%',
      changeType: 'increase' as const,
      icon: UsersIcon,
      color: 'from-omni-cyan to-omni-cyanDim',
      description: 'Registros en la base de datos'
    },
    {
      title: 'Con Teléfono',
      value: mockStats.withPhone,
      change: '+8.2%',
      changeType: 'increase' as const,
      icon: PhoneIcon,
      color: 'from-omni-green to-omni-greenDim',
      description: `${Math.round((mockStats.withPhone / mockStats.total) * 100)}% del total`
    },
    {
      title: 'Con RFC',
      value: mockStats.withRFC,
      change: '+5.1%',
      changeType: 'increase' as const,
      icon: DocumentTextIcon,
      color: 'from-omni-purple to-purple-600',
      description: `${Math.round((mockStats.withRFC / mockStats.total) * 100)}% completitud`
    },
    {
      title: 'Con CURP',
      value: mockStats.withCURP,
      change: '+3.8%',
      changeType: 'increase' as const,
      icon: CreditCardIcon,
      color: 'from-omni-yellow to-yellow-600',
      description: `${Math.round((mockStats.withCURP / mockStats.total) * 100)}% completitud`
    },
    {
      title: 'Estados Cubiertos',
      value: Object.keys(mockStats.byState).length,
      icon: MapPinIcon,
      color: 'from-blue-500 to-blue-600',
      description: 'Distribución geográfica'
    },
    {
      title: 'Datos Bancarios',
      value: mockStats.withBank,
      change: '-2.1%',
      changeType: 'decrease' as const,
      icon: CreditCardIcon,
      color: 'from-omni-red to-omni-redDim',
      description: 'Información financiera'
    },
    {
      title: 'Datos Incompletos',
      value: mockStats.total - Math.round((mockStats.withRFC + mockStats.withCURP + mockStats.withPhone) / 3),
      icon: ExclamationTriangleIcon,
      color: 'from-orange-500 to-orange-600',
      description: 'Requieren atención'
    },
    {
      title: 'Recientes',
      value: mockStats.recentlyAdded,
      change: '+24.8%',
      changeType: 'increase' as const,
      icon: ClockIcon,
      color: 'from-emerald-500 to-emerald-600',
      description: 'Últimos 30 días'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-omni-text mb-2">
            Métricas del Sistema
          </h2>
          <p className="text-omni-textDim">
            Resumen general de la información de personas registradas
          </p>
        </div>
        
        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-omni-green rounded-full animate-pulse" />
          <span className="text-sm text-omni-textDim font-mono">DEMO DATA</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard
              {...stat}
              loading={false}
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-omni-cyan to-transparent opacity-30" />
    </div>
  );
};