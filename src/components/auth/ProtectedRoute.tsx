import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/utils/constants';
import { ShieldCheckIcon, ArrowPathIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import type { UserRole } from '@/types/auth.types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requiredPermission?: string;
}

export const ProtectedRoute = ({ 
  children, 
  requiredRole,
  requiredPermission 
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user, hasPermission, authError, refreshAuth, logout } = useAuth();
  const location = useLocation();

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
            <ShieldCheckIcon className="h-6 w-6 text-blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Verificando autenticación</h3>
          <p className="text-gray-400 text-sm">Por favor espera un momento...</p>
          
          {authError && (
            <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg max-w-md mx-auto">
              <p className="text-red-300 text-sm mb-2">{authError}</p>
              <div className="flex space-x-2 justify-center">
                <button
                  onClick={refreshAuth}
                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1"
                >
                  <ArrowPathIcon className="h-3 w-3" />
                  <span>Reintentar</span>
                </button>
                <span className="text-gray-500">|</span>
                <button
                  onClick={logout}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // If not authenticated or no user, handle the redirect
  if (!isAuthenticated || !user) {
    // Show error screen if there's an auth error (but not timeout)
    if (authError && !authError.includes('Timeout')) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900 flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-red-500/20 p-8 text-center">
              <ExclamationTriangleIcon className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Error de Autenticación</h2>
              <p className="text-gray-300 mb-6">{authError}</p>
              <div className="space-y-3">
                <button
                  onClick={() => window.location.href = ROUTES.LOGIN}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all"
                >
                  Ir al Login
                </button>
                <button
                  onClick={refreshAuth}
                  className="w-full bg-gray-700 text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-600 transition-all flex items-center justify-center space-x-2"
                >
                  <ArrowPathIcon className="h-4 w-4" />
                  <span>Reintentar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Normal redirect to login
    return (
      <Navigate 
        to={ROUTES.LOGIN} 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // Check role requirement
  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-red-500/20 p-8 text-center">
            <ExclamationTriangleIcon className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Acceso Denegado</h2>
            <p className="text-gray-300 mb-2">
              Tu rol actual: <span className="text-blue-400 font-semibold">{user.role}</span>
            </p>
            <p className="text-gray-300 mb-6">
              Se requiere el rol: <span className="text-red-400 font-semibold">{requiredRole}</span>
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.history.back()}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all"
              >
                Volver
              </button>
              <button
                onClick={() => window.location.href = ROUTES.DASHBOARD}
                className="w-full bg-gray-700 text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-600 transition-all"
              >
                Ir al Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Check permission requirement
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-red-500/20 p-8 text-center">
            <ExclamationTriangleIcon className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Permisos Insuficientes</h2>
            <p className="text-gray-300 mb-6">
              No tienes el permiso "{requiredPermission}" para acceder a esta sección.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.history.back()}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all"
              >
                Volver
              </button>
              <button
                onClick={() => window.location.href = ROUTES.DASHBOARD}
                className="w-full bg-gray-700 text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-600 transition-all"
              >
                Ir al Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If all checks pass, render the protected content
  return <>{children}</>;
};