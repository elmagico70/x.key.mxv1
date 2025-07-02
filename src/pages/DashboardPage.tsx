import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  MapIcon, 
  Cog6ToothIcon,
  ArrowPathIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { useAuth } from '@/hooks/useAuth';

const QuickActionCard = ({ 
  title, 
  description, 
  icon: Icon, 
  onClick, 
  color,
  disabled = false
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  onClick: () => void;
  color: string;
  disabled?: boolean;
}) => (
  <motion.div
    whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
    whileTap={!disabled ? { scale: 0.98 } : {}}
    onClick={!disabled ? onClick : undefined}
    className={`omni-card group h-32 flex flex-col justify-between ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    }`}
  >
    <div className="flex items-start justify-between">
      <div className={`p-3 rounded-lg bg-gradient-to-br ${color} ${
        disabled ? '' : 'group-hover:scale-110'
      } transition-transform duration-200`}>
        <Icon className="w-6 h-6 text-omni-bg" />
      </div>
      <div className="text-right">
        <h3 className="text-sm font-semibold text-omni-text mb-1">{title}</h3>
        <p className="text-xs text-omni-textDim">{description}</p>
      </div>
    </div>
    <div className="flex items-center justify-end">
      <span className="text-xs text-omni-cyan font-mono">
        {disabled ? 'PRÓXIMAMENTE' : 'ACCEDER →'}
      </span>
    </div>
  </motion.div>
);

const MapPlaceholder = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="omni-card h-96 flex flex-col items-center justify-center relative overflow-hidden"
  >
    {/* Animated background grid */}
    <div className="absolute inset-0 omni-grid-bg opacity-10" />
    
    {/* Animated dots representing locations */}
    <div className="absolute inset-0">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute w-3 h-3 bg-omni-cyan rounded-full"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${20 + Math.random() * 60}%`,
          }}
        />
      ))}
    </div>

    <div className="relative z-10 text-center">
      <MapIcon className="w-16 h-16 text-omni-cyan/50 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-omni-text mb-2">
        Mapa Interactivo
      </h3>
      <p className="text-omni-textDim mb-4 max-w-md">
        Visualización geográfica de la distribución de personas registradas
      </p>
      <div className="flex items-center justify-center gap-2">
        <div className="w-2 h-2 bg-omni-yellow rounded-full animate-pulse" />
        <span className="text-xs text-omni-textDim font-mono">
          PRÓXIMAMENTE
        </span>
      </div>
    </div>

    {/* Scanning line effect */}
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: '100%' }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear"
      }}
      className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-omni-cyan to-transparent opacity-50"
    />
  </motion.div>
);

export const DashboardPage = () => {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simular actualización de datos
    setTimeout(() => setRefreshing(false), 1500);
  };

  const quickActions = [
    {
      title: 'Gestión de Usuarios',
      description: 'Administrar cuentas y permisos',
      icon: UserGroupIcon,
      color: 'from-omni-green to-omni-greenDim',
      onClick: () => console.log('User management'),
      disabled: true
    },
    {
      title: 'Análisis',
      description: 'Gráficos y estadísticas',
      icon: ChartBarIcon,
      color: 'from-omni-purple to-purple-600',
      onClick: () => console.log('Analytics'),
      disabled: true
    },
    {
      title: 'Configuración',
      description: 'Ajustes del sistema',
      icon: Cog6ToothIcon,
      color: 'from-omni-red to-omni-redDim',
      onClick: () => console.log('Settings'),
      disabled: true
    }
  ];

  return (
    <div className="min-h-screen bg-omni-bg relative p-6">
      {/* Background effects */}
      <div className="fixed inset-0 omni-grid-bg opacity-5 pointer-events-none" />
      
      <div className="relative z-10 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">
              Centro de Control
            </h1>
            <p className="text-omni-textDim">
              Bienvenido, <span className="text-omni-cyan font-medium">{user?.full_name || user?.email}</span>
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={refreshing}
            className="omni-btn-primary flex items-center gap-2"
          >
            <ArrowPathIcon className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Actualizando...' : 'Actualizar'}</span>
          </motion.button>
        </motion.div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-omni-text mb-2">
                Distribución Geográfica
              </h2>
              <p className="text-omni-textDim text-sm">
                Visualización de ubicaciones y densidad poblacional
              </p>
            </div>
            <MapPlaceholder />
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-omni-text mb-2">
                Acciones Rápidas
              </h2>
              <p className="text-omni-textDim text-sm mb-4">
                Herramientas del sistema
              </p>
            </div>
            
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <QuickActionCard {...action} />
                </motion.div>
              ))}
            </div>

            {/* System Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="omni-card"
            >
              <h3 className="text-sm font-semibold text-omni-text mb-3">
                Estado del Sistema
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-omni-textDim">Base de Datos</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-omni-green rounded-full animate-pulse" />
                    <span className="text-xs text-omni-green font-mono">ONLINE</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-omni-textDim">API</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-omni-green rounded-full animate-pulse" />
                    <span className="text-xs text-omni-green font-mono">ACTIVE</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-omni-textDim">Permisos</span>
                  <span className="text-xs text-omni-cyan font-mono">
                    {user?.role?.toUpperCase()}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom scanning line */}
        <div className="scan-line" />
      </div>
    </div>
  );
};