import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';

// Pages
// Pages
import LandingPage from './pages/LandingPage';
import StickyCTA from './components/StickyCTA';

// Admin Import (Lazy load for performance)
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const DashboardHome = lazy(() => import('./admin/DashboardHome'));
const PatientsModule = lazy(() => import('./admin/PatientsModule'));
const DoctorsModule = lazy(() => import('./admin/DoctorsModule'));
const ReputationModule = lazy(() => import('./admin/ReputationModule'));
const SettingsModule = lazy(() => import('./admin/SettingsModule'));

// Fallback loader
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Website */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />

            {/* Admin Panel (Protected) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="pacientes" element={<PatientsModule />} />
                <Route path="medicos" element={<DoctorsModule />} />
                <Route path="avaliacoes" element={<ReputationModule />} />
                <Route path="configuracoes" element={<SettingsModule />} />
              </Route>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Global Elements */}
          <StickyCTA />

        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
