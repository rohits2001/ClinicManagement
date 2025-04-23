import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthState, User } from '../types';
import { users } from '../data/mockData';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  const login = async (email: string, password: string) => {
    console.log('Login attempt started:', { email });
    setState({ ...state, isLoading: true, error: null });

    try {
      console.log('Simulating API call...');
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find user in mock data
      const user = users.find(u => u.email === email);
      console.log('User found:', user ? 'Yes' : 'No');

      if (user && password === 'password') { // Simple password check for demo
        console.log('Login successful');
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        console.log('Login failed: Invalid credentials');
        setState({
          ...state,
          isLoading: false,
          error: 'Invalid email or password',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setState({
        ...state,
        isLoading: false,
        error: 'An error occurred during login',
      });
    }
  };

  const logout = () => {
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
