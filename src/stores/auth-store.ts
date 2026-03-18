// store/useAuthStore.ts
import { create } from 'zustand';

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  setUser: (user: any) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
}));
