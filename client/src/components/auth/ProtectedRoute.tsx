import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({  children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const savedData = localStorage.getItem('accessToken');
    if (savedData) {
        setIsLoggedIn(true);
    } else {
        setIsLoggedIn(false);
    }
}, [])

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
