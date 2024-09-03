import React, { createContext, useState, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import axios from './axiosp';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [storedUser, setStoredUser] = useLocalStorage('user', null);

  useEffect(() => {
    console.log('AuthProvider useEffect triggered');
    
    if (storedUser) {
      console.log('Retrieved stored user:', storedUser);
      setUser(storedUser);
      setIsAuthenticated(true);
    } else {
      console.log('No stored user found');
    }
  }, [storedUser]);

  const login = async (userData) => {
    console.log('Login function called with:', userData);
    setUser(userData);
    setIsAuthenticated(true);
    setStoredUser(userData);
    console.log('User logged in successfully');

    try {
      await axios.post('/api/login/', userData);
      console.log('User data sent to backend successfully');
    } catch (error) {
      console.error('Error sending user data to backend:', error);
    }
  };

  const logout = () => {
    console.log('Logout function called');
    setUser(null);
    setIsAuthenticated(false);
    setStoredUser(null);
    console.log('User logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
