import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/apiService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in when app loads
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
        
        // Add token to axios defaults for future requests
        if (apiService.axiosClient) {
          apiService.axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      // Clear invalid data
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const result = await apiService.login({ email, password });
      
      if (result.success) {
        const { token, user: userData } = result.data;
        
        // Store in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Update state
        setUser(userData);
        setIsAuthenticated(true);
        
        // Add token to axios defaults
        if (apiService.axiosClient) {
          apiService.axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        
        return { success: true, user: userData };
      }
      
      return result;
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      return { success: false, error: 'Error de conexión' };
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        // Call logout API
        await apiService.logout();
      }
    } catch (error) {
      console.error('Logout API error:', error);
      // Continue with logout even if API call fails
    } finally {
      // Clear all data regardless of API call result
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      
      // Reset state
      setUser(null);
      setIsAuthenticated(false);
      
      // Remove token from axios defaults
      if (apiService.axiosClient) {
        delete apiService.axiosClient.defaults.headers.common['Authorization'];
      }
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const contextValue = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    updateUser,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};