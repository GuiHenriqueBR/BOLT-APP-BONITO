import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ApiProvider } from './contexts/ApiContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import SearchPage from './pages/SearchPage';
import ServiceDetailsPage from './pages/services/ServiceDetailsPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import ChatPage from './pages/chat/ChatPage';
import CreateRequestPage from './pages/requests/CreateRequestPage';
import BookingsPage from './pages/bookings/BookingsPage';
import ReviewsPage from './pages/reviews/ReviewsPage';
import AnalyticsPage from './pages/analytics/AnalyticsPage';
import EnhancedClientDashboard from './pages/dashboard/EnhancedClientDashboard';
import EnhancedProfessionalDashboard from './pages/dashboard/EnhancedProfessionalDashboard';
import ProfilePage from './pages/profile/ProfilePage';
import OnboardingPage from './pages/onboarding/OnboardingPage';
import HowItWorksPage from './pages/HowItWorksPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import FavoritesPage from './pages/FavoritesPage';
import { useAuth } from './contexts/AuthContext';

function App() {
  return (
    <ThemeProvider>
      <ApiProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
              <Header />
              <main>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/service/:id" element={<ServiceDetailsPage />} />
                  <Route path="/how-it-works" element={<HowItWorksPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  
                  {/* Protected Routes */}
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <DashboardRouter />
                      </ProtectedRoute>
                    } 
                  />
                  
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    } 
                  />
                  
                  <Route 
                    path="/favorites" 
                    element={
                      <ProtectedRoute>
                        <FavoritesPage />
                      </ProtectedRoute>
                    } 
                  />
                  
                  <Route 
                    path="/chat" 
                    element={
                      <ProtectedRoute>
                        <ChatPage />
                      </ProtectedRoute>
                    } 
                  />
                  
                  <Route 
                    path="/bookings" 
                    element={
                      <ProtectedRoute>
                        <BookingsPage />
                      </ProtectedRoute>
                    } 
                  />
                  
                  <Route 
                    path="/reviews" 
                    element={
                      <ProtectedRoute>
                        <ReviewsPage />
                      </ProtectedRoute>
                    } 
                  />
                  
                  <Route 
                    path="/analytics" 
                    element={
                      <ProtectedRoute requiredUserType="professional">
                        <AnalyticsPage />
                      </ProtectedRoute>
                    } 
                  />
                  
                  <Route 
                    path="/create-request" 
                    element={
                      <ProtectedRoute requiredUserType="client">
                        <CreateRequestPage />
                      </ProtectedRoute>
                    } 
                  />
                  
                  <Route 
                    path="/checkout/:serviceId" 
                    element={
                      <ProtectedRoute requiredUserType="client">
                        <CheckoutPage />
                      </ProtectedRoute>
                    } 
                  />
                  
                  <Route 
                    path="/onboarding" 
                    element={
                      <ProtectedRoute requiredUserType="professional">
                        <OnboardingPage />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </ApiProvider>
    </ThemeProvider>
  );
}

// Dashboard Router Component
const DashboardRouter: React.FC = () => {
  const { user } = useAuth();
  
  if (user?.type === 'professional') {
    return <EnhancedProfessionalDashboard />;
  }
  
  return <EnhancedClientDashboard />;
};

export default App;