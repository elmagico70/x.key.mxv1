import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { LoginPageV2 } from '@/components/auth/LoginPageV2';
import { DashboardPage } from '@/pages/DashboardPage';
import { ROUTES } from '@/utils/constants';
import '@/styles/globals.css';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on 401/403 errors
        if (error && 'status' in error && [401, 403].includes(error.status as number)) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path={ROUTES.LOGIN} element={<LoginPageV2 />} />
            
            {/* Protected routes */}
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
            
            {/* 404 fallback */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center bg-omni-bg">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-omni-text mb-4">404</h1>
                    <p className="text-omni-textDim mb-6">Página no encontrada</p>
                    <a
                      href={ROUTES.DASHBOARD}
                      className="omni-btn-primary"
                    >
                      Volver al inicio
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;