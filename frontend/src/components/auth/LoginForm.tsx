import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { loginSchema } from '@/utils/validators';
import type { LoginCredentials } from '@/types/auth.types';

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  isLoading?: boolean;
  authError?: string;
  onRetry?: () => void;
}

export const LoginForm = ({ onSubmit, isLoading = false, authError = '', onRetry }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [focusedField, setFocusedField] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  });

  const watchEmail = watch('email');
  const watchPassword = watch('password');

  useEffect(() => {
    if (authError) {
      setSubmitError(authError);
    }
  }, [authError]);

  const handleFormSubmit = async (data: LoginCredentials) => {
    setSubmitError('');
    const result = await onSubmit(data);
    if (!result.success && result.error) {
      setSubmitError(result.error);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
      {/* Error Display */}
      {submitError && (
        <div className="relative group">
          <div className="absolute inset-0 bg-red-500/10 rounded-lg blur-sm"></div>
          <div className="relative bg-red-900/20 border border-red-500/30 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 animate-pulse"></div>
              <div className="flex-1">
                <p className="text-red-300 text-sm font-mono">{submitError}</p>
                {submitError.includes('Timeout') && (
                  <button
                    type="button"
                    onClick={onRetry}
                    className="mt-2 text-xs text-red-200 hover:text-white transition-colors font-mono uppercase tracking-wider"
                  >
                    → Retry Connection
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Field */}
      <div className="relative group">
        <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">
          Email Address
        </label>
        <div className="relative">
          <input
            {...register('email')}
            type="email"
            autoComplete="email"
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField('')}
            className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white font-mono text-sm
              transition-all duration-300 placeholder-gray-500 backdrop-blur-sm
              ${errors.email 
                ? 'border-red-500/50 shadow-red-500/20' 
                : focusedField === 'email' || watchEmail
                ? 'border-emerald-400/50 shadow-emerald-400/20' 
                : 'border-gray-700/50'
              } 
              ${(focusedField === 'email' || watchEmail) ? 'shadow-lg' : ''}
              focus:outline-none focus:border-emerald-400/70 focus:shadow-emerald-400/30
              hover:border-gray-600/70`}
            placeholder="user@domain.com"
          />
          
          {/* Field Indicator */}
          <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-300 ${
            errors.email 
              ? 'bg-red-500 animate-pulse' 
              : watchEmail 
              ? 'bg-emerald-400 animate-pulse' 
              : 'bg-gray-600'
          }`}></div>
        </div>
        
        {errors.email && (
          <p className="mt-2 text-xs text-red-400 font-mono animate-fade-in">
            → {errors.email.message}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="relative group">
        <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">
          Access Key
        </label>
        <div className="relative">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField('')}
            className={`w-full bg-black/50 border rounded-lg px-4 py-3 pr-12 text-white font-mono text-sm
              transition-all duration-300 placeholder-gray-500 backdrop-blur-sm
              ${errors.password 
                ? 'border-red-500/50 shadow-red-500/20' 
                : focusedField === 'password' || watchPassword
                ? 'border-blue-400/50 shadow-blue-400/20' 
                : 'border-gray-700/50'
              }
              ${(focusedField === 'password' || watchPassword) ? 'shadow-lg' : ''}
              focus:outline-none focus:border-blue-400/70 focus:shadow-blue-400/30
              hover:border-gray-600/70`}
            placeholder="••••••••••••"
          />
          
          {/* Toggle Password Visibility */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            {showPassword ? (
              <EyeSlashIcon className="w-4 h-4" />
            ) : (
              <EyeIcon className="w-4 h-4" />
            )}
          </button>
        </div>
        
        {errors.password && (
          <p className="mt-2 text-xs text-red-400 font-mono animate-fade-in">
            → {errors.password.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading || !isValid}
          className={`w-full relative overflow-hidden rounded-lg py-3 px-6 font-mono text-sm uppercase tracking-wider
            transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
            ${isLoading || !isValid
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' 
              : 'bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white border border-emerald-500/30 hover:border-emerald-400/50 shadow-lg hover:shadow-emerald-500/25'
            }`}
        >
          {/* Button Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/10 to-emerald-400/0 -translate-x-full transition-transform duration-1000 group-hover:translate-x-full"></div>
          
          {/* Button Content */}
          <div className="relative flex items-center justify-center space-x-3">
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Authenticating</span>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </>
            ) : (
              <>
                <span>Initialize Access</span>
                <div className="transform group-hover:translate-x-1 transition-transform duration-200">
                  →
                </div>
              </>
            )}
          </div>
        </button>
      </div>

      {/* Progress Bar */}
      {isLoading && (
        <div className="w-full bg-gray-800 rounded-full h-1 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-400 to-blue-400 h-full rounded-full animate-pulse"></div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </form>
  );
};