import React, { useState } from 'react';

const LoginForm = ({ onLogin, onShowRegister, errorMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onLogin(email, password);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <div className="text-center mb-8">
        <svg className="mx-auto h-12 w-auto" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
          <g className="logo-worm">
            <path className="logo-segment" d="M30,30 C40,15 50,45 60,30" strokeWidth="10" stroke="#e83e8c" fill="none" />
            <path className="logo-segment" d="M60,30 C70,15 80,45 90,30" strokeWidth="10" stroke="#e83e8c" fill="none" />
            <path className="logo-segment" d="M90,30 C100,15 110,45 120,30" strokeWidth="10" stroke="#e83e8c" fill="none" />
            <circle className="logo-segment" cx="25" cy="30" r="5" fill="#e83e8c" />
          </g>
          <text x="30" y="55" fontFamily="Poppins" fontWeight="700" fontSize="14" fill="#333">EARWORM</text>
        </svg>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      </div>

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMessage}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-pink-600 hover:text-pink-500">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white earworm-gradient focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            {isLoading ? (
              <span className="spinner mr-2"></span>
            ) : null}
            Sign in
          </button>
        </div>
      </div>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onShowRegister}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
