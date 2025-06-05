import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  loginAsGuest: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isGuest: false,
      
      login: (user: User) => {
        set({ user, isAuthenticated: true, isGuest: false });
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false, isGuest: false });
      },
      
      updateUser: (userData: Partial<User>) => {
        set(state => ({
          user: state.user ? { ...state.user, ...userData } : null
        }));
      },
      
      loginAsGuest: () => {
        set({ user: null, isAuthenticated: false, isGuest: true });
      }
    }),
    {
      name: 'agrolink-auth',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);