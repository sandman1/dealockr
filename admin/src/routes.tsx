// routes.tsx
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import UserDetails from './pages/UserDetails';
import AdminDashboard from './pages/DashboardTwo';
import { useEffect, useState } from 'react';
import SiteNav from './Common/SiteNav';
import SiteFooter from './Common/SiteFooter';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('idToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('idToken');
    setIsAuthenticated(false); 
  };

  return (
    <Router>
      <SiteNav isAuthenticated={isAuthenticated}/>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} /> */}
        <Route path="/dashboard" element={<AdminDashboard />} />
        {/* <Route path="/user/:id" element={<PrivateRoute><UserDetails /></PrivateRoute>} /> */}
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
      <SiteFooter />
    </Router>
  );
};

export default AppRoutes;
