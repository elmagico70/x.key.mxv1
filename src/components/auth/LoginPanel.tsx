import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  EnvelopeIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  UserIcon,
  KeyIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { loginSchema } from '@/utils/validators';
import type { LoginCredentials } from '@/types/auth.types';

interface LoginPanelProps {
  onSubmit: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  isLoading?: boolean;
  authError?: string;
  onRetry?: () => void;
}

export const LoginPanel: React.FC<LoginPanelProps> = ({ 
  onSubmit, 
  isLoading = false, 
  authError = '', 
  onRetry 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

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

  React.useEffect(() => {
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
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-tl from-omni-cyan/5 via-transparent to-omni-security/5" />
      
      <div className="relative z-10 h-full flex flex-col px-8 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShieldCheckIcon className="w-6 h-6 text-omni-security" />
            <h1 className="text-xl font-bold text-omni-text">Secure Access</h1>
          </div>
          <p className="text-sm text-omni-textDim">
            Enter your credentials to access the dashboard
          </p>
        </motion.div>

        {/* Error Display */}
        <AnimatePresence>
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-omni-red/20 border border-omni-red/30 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <ExclamationTriangleIcon className="w-5 h-5 text-omni-red flex-shrink-0" />
                <div>
                  <p className="text-omni-red text-sm font-medium">Access Denied</p>
                  <p className="text-omni-red/80 text-xs">{submitError}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login Form */}
        <motion.div
          className="flex-1 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
            {/* Email Field */}
            <div>
              <label className="block text-xs font-medium text-omni-textDim uppercase tracking-wider mb-2">
                Email or Username
              </label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-omni-textDim" />
                <input
                  {...register('email')}
                  type="email"
                  className={`w-full pl-10 pr-4 py-3 bg-omni-surface border rounded-lg text-omni-text text-sm
                    transition-all duration-300 placeholder-omni-textDim
                    ${errors.email 
                      ? 'border-omni-red/50' 
                      : watchEmail
                      ? 'border-omni-cyan/50' 
                      : 'border-omni-border/50'
                    } 
                    focus:outline-none focus:border-omni-cyan/70`}
                  placeholder="user@company.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-omni-red">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-medium text-omni-textDim uppercase tracking-wider mb-2">
                Access Key
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-omni-textDim" />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className={`w-full pl-10 pr-12 py-3 bg-omni-surface border rounded-lg text-omni-text text-sm
                    transition-all duration-300 placeholder-omni-textDim
                    ${errors.password 
                      ? 'border-omni-red/50' 
                      : watchPassword
                      ? 'border-omni-security/50' 
                      : 'border-omni-border/50'
                    }
                    focus:outline-none focus:border-omni-security/70`}
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-omni-textDim hover:text-omni-text"
                >
                  {showPassword ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-omni-red">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading || !isValid}
              className={`w-full py-3 px-6 rounded-lg font-medium text-sm uppercase tracking-wider
                transition-all duration-300 ${
                isLoading || !isValid
                  ? 'bg-omni-surface2 text-omni-textDim cursor-not-allowed' 
                  : 'bg-gradient-to-r from-omni-cyan to-omni-security text-omni-bg hover:shadow-lg'
              }`}
              whileHover={!isLoading && isValid ? { scale: 1.02 } : {}}
              whileTap={!isLoading && isValid ? { scale: 0.98 } : {}}
            >
              <div className="flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-omni-textDim/30 border-t-omni-textDim rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <KeyIcon className="w-4 h-4" />
                    <span>Access System</span>
                  </>
                )}
              </div>
            </motion.button>
          </form>

          {/* Social Login */}
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-omni-border/50" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-omni-bg text-xs text-omni-textDim uppercase tracking-wider">
                  or continue with
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              {['Google', 'Microsoft', 'SSO'].map((provider) => (
                <button
                  key={provider}
                  type="button"
                  disabled
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border border-omni-border/30 bg-omni-surface2/30 text-omni-textDim cursor-not-allowed"
                >
                  <span className="text-sm">{provider}</span>
                  <span className="text-xs">(Soon)</span>
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <button
                type="button"
                disabled
                className="w-full flex items-center justify-center gap-2 p-2 rounded-lg border border-omni-border/30 bg-omni-surface2/30 text-omni-textDim cursor-not-allowed"
              >
                <UserIcon className="w-4 h-4" />
                <span className="text-sm">Create Account (Coming Soon)</span>
              </button>

              <button
                type="button"
                disabled
                className="w-full flex items-center justify-center gap-2 p-2 rounded-lg border border-omni-border/30 bg-omni-surface2/30 text-omni-textDim cursor-not-allowed"
              >
                <ShieldCheckIcon className="w-4 h-4" />
                <span className="text-sm">Two-Factor Auth (Coming Soon)</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Security Info */}
        <motion.div
          className="mt-8 p-4 rounded-lg bg-omni-surface2/30 border border-omni-border/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-omni-text">Security</span>
            <span className="text-sm font-bold text-omni-security">A+</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-omni-textDim">
            <span>🔒 256-bit Encryption</span>
            <span>🛡️ SOC 2</span>
            <span>⚡ Zero-Trust</span>
          </div>
        </motion.div>
      </div>

      {/* Loading Progress Bar */}
      {isLoading && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-omni-cyan to-omni-security origin-left"
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      )}
    </div>
  );
};