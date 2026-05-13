import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email?: string;
  profilePicture: string;
  isPremium: boolean;
}

interface StoreState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  setPremium: (status: boolean) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      setPremium: (status) => set((state) => ({ user: state.user ? { ...state.user, isPremium: status } : null })),
    }),
    {
      name: 'greetify-user-storage',
    }
  )
);
