import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import DietaryTrackingPage from './Pages/Dietary';
import MealPlanner from './Pages/MealPlanner';
import RecipeLibrary from './Pages/Library';
import HealthMonitoring from './Pages/Monitoring';
import NotificationsPage from './Pages/Notifications'; 
import Signup from './Componets/SignUp';
import Dashboard from './Pages/Dashboard';
import { ThemeContextProvider } from './Componets/Theme';
import NavbarPage from './Componets/Navbar';
import Signin from './Componets/SignIn';
import Footer from './Componets/Footer';
import ScrollToTop from './Componets/Scroll';
import Profile from './Pages/Profile';
import PaymentIntegrationPage from './Pages/Payment';
import HelpAndSupport from './Pages/Help';

import HomePage from './Pages/HomePage'; // Import your Homepage component

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <NavbarPage />
        <MainContent />
      </Router>
    </ThemeContextProvider>
  );
}

const MainContent = () => {
  const location = useLocation();
  const hideFooterPaths = ['/signin', '/signup'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flexGrow: 1 }}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Added homepage route */}
          <Route path="/dietary" element={<DietaryTrackingPage />} />
          <Route path="/meal" element={<MealPlanner />} />
          <Route path="/recipes" element={<RecipeLibrary />} />
          <Route path="/health-monitoring" element={<HealthMonitoring />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/analytics" element={<Dashboard />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment" element={<PaymentIntegrationPage />} />
          <Route path="/help" element={<HelpAndSupport />} />
        </Routes>
      </div>

      {!hideFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
