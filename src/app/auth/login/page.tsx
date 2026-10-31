import { create } from 'zustand';
import { defaultPermissionsByRole, type Permission, type User, type UserRole } from '@/types';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  offlineMode: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  switchRole: (role: UserRole) => Promise<void>;
  setOfflineMode: (enabled: boolean) => void;
  hasPermission: (permission: Permission) => boolean;
  getUserPermissions: () => Permission[];
  hydrateSession: () => Promise<boolean>;
}

const demoUser: User = {
  id: 'user-123',
  email: 'admin@aegis.gov',
  name: 'Operations Commander',
  role: 'GOVERNMENT',
  permissions: defaultPermissionsByRole.GOVERNMENT,
  agency: 'National Disaster Management Authority',
  lastActive: new Date(),
  offlineMode: false,
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  offlineMode: false,

  hydrateSession: async () => {
    try {
      const response = await fetch('/api/auth/me', { method: 'GET', cache: 'no-store' });
      if (!response.ok) {
        set({ user: null, isAuthenticated: false });
        return false;
      }

      const data = await response.json();
      if (!data.user) {
        set({ user: null, isAuthenticated: false });
        return false;
      }

      set({
        user: {
          ...demoUser,
          ...data.user,
          permissions: data.user.permissions ?? defaultPermissionsByRole[data.user.role as UserRole],
          lastActive: new Date(),
        },
        isAuthenticated: true,
      });
      return true;
    } catch {
      set({ user: null, isAuthenticated: false });
      return false;
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok || !data.user) {
        throw new Error(data.error || 'Login failed.');
      }

      set({
        user: {
          ...demoUser,
          ...data.user,
          permissions: data.user.permissions ?? defaultPermissionsByRole[data.user.role as UserRole],
          lastActive: new Date(),
        },
        isAuthenticated: true,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore network issue during logout
    }
    set({ user: null, isAuthenticated: false });
  },

  switchRole: async (role: UserRole) => {
    const { user } = get();
    if (!user) return;

    set({
      user: {
        ...user,
        role,
        permissions: defaultPermissionsByRole[role],
      },
    });
  },

  setOfflineMode: (enabled: boolean) => {
    const { user } = get();
    if (user) {
      set({
        user: { ...user, offlineMode: enabled },
        offlineMode: enabled,
      });
    }
  },

  hasPermission: (permission: Permission) => get().user?.permissions.includes(permission) ?? false,

  getUserPermissions: () => get().user?.permissions ?? [],
}));
