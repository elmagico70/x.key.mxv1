export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'Employee Profile System',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  description: 'Sistema de consulta de perfiles de empleados',
} as const;

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
} as const;

export const API_ENDPOINTS = {
  USERS: 'users',
} as const;

export const ROLE_LABELS: Record<string, string> = {
  admin: 'Administrador',
  hr: 'Recursos Humanos',
  readonly: 'Solo Lectura',
  auditor: 'Auditor',
} as const;