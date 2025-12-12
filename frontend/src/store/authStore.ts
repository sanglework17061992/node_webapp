import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
  hasRole: (roles: string[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        set({ user, token });
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      },
      clearAuth: () => {
        set({ user: null, token: null });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      },
      isAuthenticated: () => {
        const state = get();
        return !!state.token && !!state.user;
      },
      hasRole: (roles: string[]) => {
        const state = get();
        return state.user ? roles.includes(state.user.role) : false;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
