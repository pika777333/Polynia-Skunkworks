import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Check if there's a token in localStorage on initial load
  useEffect(() => {
    const token = localStorage.getItem('earworm_token');
    const userData = localStorage.getItem('earworm_user');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setCurrentUser(user);
        // Here we could also verify the token with the backend
      } catch (e) {
        console.error('Error parsing user data:', e);
        localStorage.removeItem('earworm_token');
        localStorage.removeItem('earworm_user');
      }
    }
    
    setLoading(false);
  }, []);
  
  // Register a new user
  const register = async (name, email, password) => {
    setError('');
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      // Store token and user data
      localStorage.setItem('earworm_token', data.token);
      localStorage.setItem('earworm_user', JSON.stringify(data.user));
      
      setCurrentUser(data.user);
      return data.user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };
  
  // Login user
  const login = async (email, password) => {
    setError('');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Store token and user data
      localStorage.setItem('earworm_token', data.token);
      localStorage.setItem('earworm_user', JSON.stringify(data.user));
      
      setCurrentUser(data.user);
      return data.user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };
  
  // Logout user
  const logout = () => {
    localStorage.removeItem('earworm_token');
    localStorage.removeItem('earworm_user');
    setCurrentUser(null);
  };
  
  // Get auth header for API requests
  const getAuthHeader = () => {
    const token = localStorage.getItem('earworm_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };
  
  // Context value
  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    getAuthHeader
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
