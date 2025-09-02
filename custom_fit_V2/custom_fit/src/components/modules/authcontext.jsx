import React, { createContext, useState, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [storedUser, setStoredUser] = useLocalStorage('user', null);
  const [authToken, setAuthToken] = useLocalStorage('authToken', null);

  useEffect(() => {
    console.log('AuthProvider useEffect triggered');
    
    if (storedUser && authToken) {
      console.log('Retrieved stored user and token:', storedUser, authToken);
      setUser(storedUser);
      setIsAuthenticated(true);
    } else {
      console.log('No stored user found');
    }
  }, [storedUser, authToken]);

  const login = (userData, token) => {
    console.log('Login function called with:', userData, token);
    setUser(userData);
    setIsAuthenticated(true);
    setStoredUser(userData);
    setAuthToken(token);
    console.log('User logged in successfully');
  };

  const logout = () => {
    console.log('Logout function called');
    setUser(null);
    setIsAuthenticated(false);
    setStoredUser(null);
    setAuthToken(null);
    console.log('User logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
