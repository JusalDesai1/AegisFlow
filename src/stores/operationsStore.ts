import { create } from 'zustand';
import {
  defaultPermissionsByRole,
  type User,
  type UserRole,
  type Permission,
} from '@/types';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  offlineMode: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => Promise<void>;
  setOfflineMode: (enabled: boolean) => void;
  hasPermission: (permission: Permission) => boolean;
  getUserPermissions: () => Permission[];
}

const demoUser: User = {
  id: 'user-123',
  email: 'commander@aegis.gov',
  name: 'Operations Commander',
  role: 'GOVERNMENT',
  permissions: defaultPermissionsByRole.GOVERNMENT,
  agency: 'National Disaster Management Authority',
  lastActive: new Date(),
  offlineMode: false,
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: demoUser,
  isAuthenticated: true,
  isLoading: false,
  offlineMode: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const normalizedEmail = email.trim().toLowerCase();
      if (!normalizedEmail || !password.trim()) throw new Error('Missing credentials');

      set({
        user: {
          ...demoUser,
          email: normalizedEmail,
          name: normalizedEmail.includes('medical') ? 'Medical Triage Lead' : 'Operations Commander',
        },
        isAuthenticated: true,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => set({ user: null, isAuthenticated: false }),

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
    if (!user) return;

    set({
      offlineMode: enabled,
      user: {
        ...user,
        offlineMode: enabled,
      },
    });
  },

  hasPermission: (permission: Permission) => get().user?.permissions.includes(permission) ?? false,

  getUserPermissions: () => get().user?.permissions ?? [],
}));
