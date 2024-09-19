import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useCustomToast } from '../hooks/useCustomToast';

// Define the shape of the user data and context
interface User {
    userId: string;
    email: string;
}

interface UserContextType {
    user: User | null;
    // login: (username: string, password: string) => void;
    // logout: () => void;
}

// Create a default value for the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Step 2: Create the provider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { showToast } = useCustomToast();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
  <UserContext.Provider value={{ user }}>
      {children}
  </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
  };