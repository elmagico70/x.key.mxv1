import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/auth.types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  authError: string;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  logout: () => void;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isLoading: true,
      isAuthenticated: false,
      authError: '',

      // Actions
      setUser: (user) => 
        set({ 
          user, 
          isAuthenticated: !!user,
          isLoading: false,
          authError: user ? '' : get().authError // Clear error on successful auth
        }),

      setLoading: (isLoading) => 
        set({ isLoading }),

      setError: (authError) =>
        set({ authError, isLoading: false }),

      clearError: () =>
        set({ authError: '' }),

      logout: () => 
        set({ 
          user: null, 
          isAuthenticated: false, 
          isLoading: false,
          authError: ''
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
      // Clear persisted state if it's corrupted
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Validate persisted state
          if (state.user && !state.isAuthenticated) {
            state.user = null;
            state.isAuthenticated = false;
          }
        }
      },
    }
  )
);