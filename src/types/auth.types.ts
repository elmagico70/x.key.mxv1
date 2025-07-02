export interface User {
  id: string;
  email: string;
  role: UserRole;
  full_name?: string;
  created_at: string;
}

export type UserRole = 'admin' | 'hr' | 'readonly' | 'auditor';

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserPermissions {
  canViewBankData: boolean;
  canExportData: boolean;
  canViewAll: boolean;
  canViewAuditLogs: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, UserPermissions> = {
  admin: {
    canViewBankData: true,
    canExportData: false,
    canViewAll: true,
    canViewAuditLogs: false,
  },
  hr: {
    canViewBankData: false,
    canExportData: false,
    canViewAll: true,
    canViewAuditLogs: false,
  },
  readonly: {
    canViewBankData: false,
    canExportData: false,
    canViewAll: true,
    canViewAuditLogs: false,
  },
  auditor: {
    canViewBankData: false,
    canExportData: false,
    canViewAll: true,
    canViewAuditLogs: false,
  },
};