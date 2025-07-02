import { clsx } from 'clsx';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
  variant?: 'default' | 'dots' | 'pulse' | 'bars';
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
};

const textSizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg',
};

export const LoadingSpinner = ({ 
  size = 'md', 
  className,
  text,
  variant = 'default',
  color = 'blue'
}: LoadingSpinnerProps) => {
  
  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={clsx(
                  'rounded-full animate-bounce',
                  size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-2 h-2' : 'w-3 h-3',
                  color === 'blue' ? 'bg-blue-500' :
                  color === 'green' ? 'bg-green-500' :
                  color === 'red' ? 'bg-red-500' :
                  color === 'yellow' ? 'bg-yellow-500' : 'bg-purple-500'
                )}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <div className={clsx(
            'rounded-full animate-pulse',
            sizeClasses[size],
            color === 'blue' ? 'bg-blue-500' :
            color === 'green' ? 'bg-green-500' :
            color === 'red' ? 'bg-red-500' :
            color === 'yellow' ? 'bg-yellow-500' : 'bg-purple-500',
            'opacity-75'
          )} />
        );

      case 'bars':
        return (
          <div className="flex space-x-1 items-end">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={clsx(
                  'animate-pulse',
                  size === 'sm' ? 'w-1' : size === 'md' ? 'w-2' : 'w-3',
                  color === 'blue' ? 'bg-blue-500' :
                  color === 'green' ? 'bg-green-500' :
                  color === 'red' ? 'bg-red-500' :
                  color === 'yellow' ? 'bg-yellow-500' : 'bg-purple-500'
                )}
                style={{ 
                  height: size === 'sm' ? '8px' : size === 'md' ? '16px' : '24px',
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.8s'
                }}
              />
            ))}
          </div>
        );

      default:
        const borderColorClass = 
          color === 'blue' ? 'border-blue-500' :
          color === 'green' ? 'border-green-500' :
          color === 'red' ? 'border-red-500' :
          color === 'yellow' ? 'border-yellow-500' : 'border-purple-500';
          
        const glowColorClass = 
          color === 'blue' ? 'bg-blue-500/20' :
          color === 'green' ? 'bg-green-500/20' :
          color === 'red' ? 'bg-red-500/20' :
          color === 'yellow' ? 'bg-yellow-500/20' : 'bg-purple-500/20';

        return (
          <div className="relative">
            <div
              className={clsx(
                'animate-spin rounded-full border-2 border-gray-600',
                sizeClasses[size],
                borderColorClass
              )}
              style={{
                borderTopColor: 'transparent'
              }}
            />
            {/* Glow effect */}
            <div
              className={clsx(
                'absolute inset-0 rounded-full blur-sm opacity-50',
                sizeClasses[size],
                glowColorClass
              )}
            />
          </div>
        );
    }
  };

  return (
    <div className={clsx('flex items-center justify-center', className)}>
      <div className="flex flex-col items-center space-y-3">
        {renderSpinner()}
        {text && (
          <span className={clsx(
            'text-gray-300 font-medium animate-pulse',
            textSizeClasses[size]
          )}>
            {text}
          </span>
        )}
      </div>
    </div>
  );
};