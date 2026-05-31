import { User, Permission, UserRole } from '@/types';

export const rolePermissions: Record<UserRole, Permission[]> = {
  NDRF: [
    'view_dashboard',
    'view_gis',
    'dispatch_units',
    'view_analytics',
    'manage_users',
  ],
  GOVERNMENT: [
    'view_dashboard',
    'view_gis',
    'dispatch_units',
    'create_alerts',
    'access_classified',
    'override_ai',
  ],
  MEDICAL: [
    'view_dashboard',
    'view_gis',
    'manage_shelters',
    'view_analytics',
  ],
  NGO: [
    'view_dashboard',
    'view_gis',
    'manage_shelters',
    'manage_logistics',
  ],
  ANALYST: [
    'view_dashboard',
    'view_gis',
    'view_analytics',
  ],
  CIVILIAN: [
    'view_dashboard',
  ],
};

export function checkPermission(user: User | null, permission: Permission): boolean {
  if (!user) return false;
  return user.permissions.includes(permission);
}

export function checkAnyPermission(user: User | null, permissions: Permission[]): boolean {
  if (!user) return false;
  return permissions.some((perm) => user.permissions.includes(perm));
}

export function getRole(role: UserRole): string {
  const roles: Record<UserRole, string> = {
    NDRF: 'National Disaster Response Force',
    GOVERNMENT: 'Government Official',
    MEDICAL: 'Medical Coordinator',
    NGO: 'NGO Liaison',
    ANALYST: 'Data Analyst',
    CIVILIAN: 'Civilian User',
  };
  return roles[role];
}
