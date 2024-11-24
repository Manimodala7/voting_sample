import React from 'react';
import { Vote, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface HeaderProps {
  onAuthClick: () => void;
}

export default function Header({ onAuthClick }: HeaderProps) {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-indigo-600 text-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Vote className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold">SecureVote</span>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm">Welcome, {user.name}</span>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 bg-indigo-500 hover:bg-indigo-400 px-4 py-2 rounded-md transition"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center space-x-1 bg-indigo-500 hover:bg-indigo-400 px-4 py-2 rounded-md transition"
              >
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}