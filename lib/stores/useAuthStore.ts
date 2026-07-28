import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import immer from 'zustand/middleware/immer';

export type UserRole = 'government_command' | 'ndrf_dispatch' | 'medical_triage' | 'ngo_logistics' | 'data_analyst' | 'civilian';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  agency?: string;
  permissions: string[];
  avatar?: string;
  lastLogin?: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string, refreshToken?: string, expiresIn?: number) => void;
  refreshAuthToken: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  isRole: (role: UserRole) => boolean;
  checkTokenExpiry: () => boolean;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: null,
  refreshToken: null,
  expiresAt: null,
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        ...initialState,

        login: async (email: string, password: string) => {
          set((state) => {
            state.isLoading = true;
            state.error = null;
          });

          try {
            const response = await fetch('/api/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
              throw new Error('Login failed');
            }

            const data = await response.json();

            set((state) => {
              state.user = data.user;
              state.isAuthenticated = true;
              state.token = data.token;
              state.refreshToken = data.refreshToken;
              state.expiresAt = Date.now() + (data.expiresIn || 3600) * 1000;
              state.isLoading = false;
            });
          } catch (error) {
            set((state) => {
              state.error = error instanceof Error ? error.message : 'Login failed';
              state.isLoading = false;
            });
            throw error;
          }
        },

        logout: () => {
          set((state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
            state.refreshToken = null;
            state.expiresAt = null;
            state.error = null;
          });
        },

        setUser: (user: User) => {
          set((state) => {
            state.user = user;
            state.isAuthenticated = true;
          });
        },

        setToken: (token: string, refreshToken?: string, expiresIn?: number) => {
          set((state) => {
            state.token = token;
            if (refreshToken) state.refreshToken = refreshToken;
            if (expiresIn) state.expiresAt = Date.now() + expiresIn * 1000;
          });
        },

        refreshAuthToken: async () => {
          const state = get();
          if (!state.refreshToken) {
            throw new Error('No refresh token available');
          }

          try {
            const response = await fetch('/api/auth/refresh', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refreshToken: state.refreshToken }),
            });

            if (!response.ok) {
              throw new Error('Token refresh failed');
            }

            const data = await response.json();
            set((state) => {
              state.token = data.token;
              state.expiresAt = Date.now() + (data.expiresIn || 3600) * 1000;
            });
          } catch (error) {
            set((state) => {
              state.error = error instanceof Error ? error.message : 'Token refresh failed';
            });
            throw error;
          }
        },

        hasPermission: (permission: string) => {
          const state = get();
          return state.user?.permissions.includes(permission) ?? false;
        },

        isRole: (role: UserRole) => {
          const state = get();
          return state.user?.role === role;
        },

        checkTokenExpiry: () => {
          const state = get();
          if (!state.expiresAt) return false;
          if (Date.now() >= state.expiresAt) {
            get().logout();
            return true;
          }
          return false;
        },
      })),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          refreshToken: state.refreshToken,
          expiresAt: state.expiresAt,
        }),
      }
    )
  )
);
