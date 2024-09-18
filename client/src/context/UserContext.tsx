import React, { createContext, useState, useContext, ReactNode } from 'react';
import { signIn, signOut, getCurrentUser } from '@aws-amplify/auth';
import { useCustomToast } from '../hooks/useCustomToast';
import { FormData } from '../types';

// Define the shape of the user data and context
interface User {
    userId: string;
    email: string;
}

interface UserContextType {
    user: User | null;
    login: (username: string, password: string) => void;
    logout: () => void;
}

// Create a default value for the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Step 2: Create the provider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const { showToast } = useCustomToast();

    const login = async (username: string, password: string) => {
        try {
            const { isSignedIn } = await signIn({username, password});
            if(isSignedIn) {
                
                showToast("You have successfully logged in.", { type: 'success', autoClose: 500 });
                const { userId, username } = await getCurrentUser();
                setUser({
                    email: username,
                    userId: userId
                });

                localStorage.setItem('userId', JSON.stringify(userId));
            }
        } catch (err) { 
            showToast("There was an error with your login.", { type: 'error', autoClose: 500 });
        }
    };

    const logout = async () => {
        try {
            await signOut();
            setUser({
                email: '',
                userId: ''
            });
            localStorage.setItem('userId', '');
            showToast("You have successfully logged out.", { type: 'success', autoClose: 500 });
            setUser(null);
        } catch (err) { console.log(err) }
    };

    return (
    <UserContext.Provider value={{ user, login, logout }}>
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