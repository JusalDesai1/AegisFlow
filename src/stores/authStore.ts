import { create } from 'zustand';
import { User, Permission, UserRole } from '@/types';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  offlineMode: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => Promise<void>;
  setOfflineMode: (enabled: boolean) => void;
  hasPermission: (permission: Permission) => boolean;
  getUserPermissions: () => Permission[];
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  offlineMode: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      // Mock authentication - replace with actual API call
      const mockUser: User = {
        id: 'user-123',
        email,
        name: 'Operations Commander',
        role: 'GOVERNMENT',
        permissions: ['view_dashboard', 'view_gis', 'dispatch_units', 'create_alerts'],
        agency: 'National Disaster Management Authority',
        lastActive: new Date(),
        offlineMode: false,
      };
      set({ user: mockUser, isAuthenticated: true });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  switchRole: async (role: UserRole) => {
    const { user } = get();
    if (!user) return;

    const rolePermissions: Record<UserRole, Permission[]> = {
      NDRF: ['view_dashboard', 'view_gis', 'dispatch_units', 'view_analytics'],
      GOVERNMENT: ['view_dashboard', 'view_gis', 'dispatch_units', 'create_alerts', 'access_classified'],
      MEDICAL: ['view_dashboard', 'view_gis', 'manage_shelters', 'view_analytics'],
      NGO: ['view_dashboard', 'view_gis', 'manage_shelters', 'manage_logistics'],
      ANALYST: ['view_dashboard', 'view_gis', 'view_analytics'],
      CIVILIAN: ['view_dashboard'],
    };

    set({
      user: {
        ...user,
        role,
        permissions: rolePermissions[role],
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

  hasPermission: (permission: Permission) => {
    const { user } = get();
    return user?.permissions.includes(permission) ?? false;
  },

  getUserPermissions: () => {
    const { user } = get();
    return user?.permissions ?? [];
  },
}));
