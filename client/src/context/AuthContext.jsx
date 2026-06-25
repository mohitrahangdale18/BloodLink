import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore authentication state on initial load
  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem('bloodlink_token');
      const storedUser = localStorage.getItem('bloodlink_user');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  // Login handler
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token: jwtToken, user: userData } = response.data.data;
      
      localStorage.setItem('bloodlink_token', jwtToken);
      localStorage.setItem('bloodlink_user', JSON.stringify(userData));
      
      setToken(jwtToken);
      setUser(userData);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      return { success: false, message: errorMessage };
    }
  };

  // Registration handler
  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { token: jwtToken, user: userDataResponse } = response.data.data;
      
      localStorage.setItem('bloodlink_token', jwtToken);
      localStorage.setItem('bloodlink_user', JSON.stringify(userDataResponse));
      
      setToken(jwtToken);
      setUser(userDataResponse);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed.';
      return { success: false, message: errorMessage };
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('bloodlink_token');
    localStorage.removeItem('bloodlink_user');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
