
import React from 'react';
import type { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  navigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, navigate }) => {
  return (
    <header className="bg-card shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate(user ? 'dashboard' : 'landing')}>
          <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h1 className="text-2xl font-bold text-text">Tragetly AI</h1>
        </div>
        <nav className="flex items-center space-x-4">
          {user ? (
            <>
              <button onClick={() => navigate('dashboard')} className="text-gray-600 hover:text-primary font-medium">Dashboard</button>
              <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">Logout</button>
            </>
          ) : (
            <button onClick={() => navigate('auth')} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover transition">Login / Sign Up</button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
