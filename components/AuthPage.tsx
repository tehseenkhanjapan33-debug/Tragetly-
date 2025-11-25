
import React, { useState } from 'react';
import type { User } from '../types';

interface AuthPageProps {
  onLogin: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');

    if (isLogin) {
      // Mock login - in a real app, this would be an API call
      console.log('Logging in with:', email, password);
      const isAdmin = email.includes('admin');
      onLogin({ id: email, email, isAdmin });
    } else {
      // Mock signup
      console.log('Signing up with:', email, password);
      alert('Sign up successful! A verification email has been sent. Please log in.');
      setIsLogin(true); // Switch to login form after signup
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-card shadow-xl rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-text mb-6">
          {isLogin ? 'Welcome Back!' : 'Create an Account'}
        </h2>
        
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-text-secondary text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-text-secondary text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="******************"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline w-full"
            >
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </div>
        </form>
        <p className="text-center text-text-secondary text-sm mt-6">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button onClick={() => setIsLogin(!isLogin)} className="font-bold text-primary hover:underline ml-1">
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
