import { useEffect, useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import { AuthService } from '@/services/auth.service';
import type { LoginCredentials } from '@/types/auth.types';

export const useAuth = () => {
  const {
    user,
    isLoading,
    isAuthenticated,
    authError,
    setUser,
    setLoading,
    setError,
    logout: storeLogout,
  } = useAuthStore();

  // Clear any stale auth state on mount
  const clearStaleState = useCallback(() => {
    const storedAuth = localStorage.getItem('auth-storage');
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        // If user exists but session is invalid, clear it
        if (parsed.state?.user && !parsed.state?.isAuthenticated) {
          localStorage.removeItem('auth-storage');
          storeLogout();
        }
      } catch (error) {
        console.warn('Invalid auth storage, clearing...');
        localStorage.removeItem('auth-storage');
        storeLogout();
      }
    }
  }, [storeLogout]);

  // Initialize auth state on mount with timeout protection
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isComponentMounted = true;

    const initializeAuth = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Clear any stale state first
        clearStaleState();

        // Set timeout for auth initialization
        timeoutId = setTimeout(() => {
          if (isComponentMounted) {
            console.warn('Auth initialization timeout');
            setLoading(false);
            setError('Timeout de autenticación');
          }
        }, 8000);

        const session = await AuthService.getSession();
        
        if (!isComponentMounted) return;
        
        if (session?.user) {
          const profile = await AuthService.getUserProfile(session.user.id);
          if (isComponentMounted && profile) {
            setUser(profile);
          } else if (isComponentMounted) {
            setError('No se pudo obtener el perfil del usuario');
            await AuthService.signOut();
            storeLogout();
          }
        } else {
          if (isComponentMounted) {
            setUser(null);
          }
        }
        
        clearTimeout(timeoutId);
      } catch (error: any) {
        clearTimeout(timeoutId);
        if (isComponentMounted) {
          console.error('Auth initialization error:', error);
          setError('Error de inicialización');
          // Clear potentially corrupted session
          localStorage.removeItem('auth-storage');
          storeLogout();
        }
      } finally {
        if (isComponentMounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Subscribe to auth changes with cleanup
    const { data: { subscription } } = AuthService.onAuthStateChange(async (user) => {
      if (isComponentMounted) {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    });

    return () => {
      isComponentMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
      subscription?.unsubscribe();
    };
  }, [setUser, setLoading, setError, storeLogout, clearStaleState]);

  // Login function with improved error handling
  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError('');
      
      // Timeout for login request
      const loginPromise = AuthService.signIn(credentials);
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout de conexión')), 10000);
      });

      const { profile } = await Promise.race([loginPromise, timeoutPromise]) as any;
      
      setUser(profile);
      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error);
      
      let errorMessage = 'Error de autenticación';
      
      if (error.message?.includes('Invalid login credentials')) {
        errorMessage = 'Credenciales inválidas';
      } else if (error.message?.includes('timeout') || error.message?.includes('Timeout')) {
        errorMessage = 'Tiempo de espera agotado. Verifica tu conexión.';
      } else if (error.message?.includes('Network')) {
        errorMessage = 'Error de conexión. Verifica tu internet.';
      }
      
      setError(errorMessage);
      return { 
        success: false, 
        error: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  };

  // Enhanced logout function
  const logout = async () => {
    try {
      setLoading(true);
      await AuthService.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Force logout even if API call fails
      localStorage.removeItem('auth-storage');
      storeLogout();
      setLoading(false);
      // Force reload to clear any cached state
      window.location.href = '/login';
    }
  };

  // Force refresh auth state
  const refreshAuth = async () => {
    try {
      setLoading(true);
      setError('');
      
      const session = await AuthService.getSession();
      if (session?.user) {
        const profile = await AuthService.getUserProfile(session.user.id);
        setUser(profile);
      } else {
        storeLogout();
      }
    } catch (error: any) {
      console.error('Refresh auth error:', error);
      setError('Error al actualizar sesión');
      storeLogout();
    } finally {
      setLoading(false);
    }
  };

  // Check if user has specific permission
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return AuthService.hasPermission(user.role, permission);
  };

  // Get user permissions
  const permissions = {
    canViewBankData: hasPermission('view_bank_data'),
    canExportData: hasPermission('export_data'),
    canViewAll: hasPermission('view_all'),
    canViewAuditLogs: hasPermission('audit_logs'),
  };

  return {
    // State
    user,
    isLoading,
    isAuthenticated,
    authError,
    permissions,
    
    // Actions
    login,
    logout,
    refreshAuth,
    hasPermission,
  };
};