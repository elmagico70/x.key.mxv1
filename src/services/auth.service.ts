import { supabase } from './supabase';
import type { LoginCredentials, User } from '@/types/auth.types';

export class AuthService {
  /**
   * Sign in with email and password
   */
  static async signIn(credentials: LoginCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw error;
    
    // Get user profile with role
    const userProfile = await this.getUserProfile(data.user.id);
    return { user: data.user, profile: userProfile };
  }

  /**
   * Sign out current user
   */
  static async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  /**
   * Get current session
   */
  static async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  }

  /**
   * Get user profile with role information
   */
  static async getUserProfile(userId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data;
  }

  /**
   * Check if user has specific permission
   */
  static hasPermission(userRole: string, permission: string): boolean {
    const permissions = {
      admin: ['view_bank_data', 'view_all'],
      hr: ['view_all'],
      auditor: ['view_all'],
      readonly: ['view_all'],
    };

    const rolePermissions = permissions[userRole as keyof typeof permissions] || [];
    return rolePermissions.includes(permission);
  }

  /**
   * Subscribe to auth state changes
   */
  static onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const profile = await this.getUserProfile(session.user.id);
        callback(profile);
      } else {
        callback(null);
      }
    });
  }
}