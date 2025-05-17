import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useAuth } from './AuthContext';

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  
  const handleLogin = async (email, password) => {
    setError('');
    try {
      await login(email, password);
      // Login successful - will be redirected by AuthRoute
    } catch (err) {
      setError(err.message || 'Failed to log in. Please try again.');
    }
  };
  
  const handleRegister = async (name, email, password) => {
    setError('');
    try {
      await register(name, email, password);
      // Registration successful - will be redirected by AuthRoute
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {showLogin ? (
          <LoginForm 
            onLogin={handleLogin} 
            onShowRegister={() => setShowLogin(false)}
            errorMessage={error}
          />
        ) : (
          <RegisterForm 
            onRegister={handleRegister} 
            onShowLogin={() => setShowLogin(true)}
            errorMessage={error}
          />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
