import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      // Simulate API call using JSONPlaceholder
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      const userData = await response.json();
      
      // Create a mock token
      const mockToken = btoa(`${email}:${password}`);
      
      const user: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        token: mockToken,
      };
      
      set({ user, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw new Error('Login failed');
    }
  },

  register: async (name: string, email: string, password: string) => {
    set({ isLoading: true });
    try {
      // Simulate API call using JSONPlaceholder
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const userData = await response.json();
      
      const mockToken = btoa(`${email}:${password}`);
      
      const user: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        token: mockToken,
      };
      
      set({ user, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw new Error('Registration failed');
    }
  },

  logout: () => {
    set({ user: null });
  },
}));