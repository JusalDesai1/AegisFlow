'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

const cn = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

const DashboardSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout, switchRole } = useAuthStore();
  const router = useRouter();

  const menuItems = [
    { icon: '📊', label: 'Dashboard', href: '/dashboard' },
    { icon: '🗺️', label: 'GIS Intelligence', href: '/dashboard/gis' },
    { icon: '🚨', label: 'Incident Command', href: '/dashboard/incidents' },
    { icon: '🚑', label: 'Dispatch & Units', href: '/dashboard/dispatch' },
    { icon: '🏢', label: 'Shelters & Logistics', href: '/dashboard/logistics' },
    { icon: '📈', label: 'Analytics', href: '/dashboard/analytics' },
    { icon: '⚙️', label: 'Settings', href: '/dashboard/settings' },
  ];

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <aside
      className={cn(
        'flex h-screen flex-col border-r border-aegis-border bg-aegis-card transition-all duration-300',
        isCollapsed ? 'w-20' : 'w-64',
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between border-b border-aegis-border p-4">
        {!isCollapsed && (
          <div>
            <h1 className="text-lg font-bold text-aegis-accent">AegisFlow</h1>
            <p className="text-xs text-aegis-text-tertiary">Command Center</p>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="rounded p-2 transition-colors hover:bg-white/5"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {!isCollapsed && user && (
        <div className="border-b border-aegis-border p-4">
          <p className="truncate text-sm font-semibold text-aegis-text-primary">{user.name}</p>
          <p className="truncate text-xs text-aegis-text-tertiary">{user.role}</p>
          <p className="mt-1 truncate text-xs text-aegis-text-tertiary">{user.agency}</p>
        </div>
      )}

      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors',
              'text-aegis-text-secondary hover:bg-white/5 hover:text-aegis-text-primary',
            )}
            title={isCollapsed ? item.label : undefined}
          >
            <span className="flex-shrink-0 text-xl">{item.icon}</span>
            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {!isCollapsed && user && (
        <div className="space-y-2 border-t border-aegis-border p-4">
          <p className="text-xs font-semibold uppercase text-aegis-text-tertiary">Switch Role</p>
          <select
            value={user.role}
            onChange={(event) => switchRole(event.target.value as any)}
            className="w-full rounded border border-aegis-border bg-aegis-darker px-2 py-1 text-xs text-aegis-text-primary"
            aria-label="User role selector"
          >
            <option value="NDRF">NDRF Commander</option>
            <option value="GOVERNMENT">Government</option>
            <option value="MEDICAL">Medical</option>
            <option value="NGO">NGO</option>
            <option value="ANALYST">Analyst</option>
            <option value="CIVILIAN">Civilian</option>
          </select>
        </div>
      )}

      <div className="border-t border-aegis-border p-4">
        <button
          onClick={handleLogout}
          className={cn(
            'w-full rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            'bg-aegis-critical/10 text-aegis-critical hover:bg-aegis-critical/20',
          )}
          aria-label="Logout"
        >
          {isCollapsed ? '🚪' : 'Logout'}
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
