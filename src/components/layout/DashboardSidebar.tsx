'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import Link from 'next/link';
import clsx from 'clsx';

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
      className={clsx(
        'bg-aegis-card border-r border-aegis-border transition-all duration-300',
        'flex flex-col h-screen',
        isCollapsed ? 'w-20' : 'w-64'
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Header */}
      <div className="p-4 border-b border-aegis-border flex items-center justify-between">
        {!isCollapsed && (
          <div>
            <h1 className="text-lg font-bold text-aegis-accent">AegisFlow</h1>
            <p className="text-xs text-aegis-text-tertiary">Command Center</p>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-white/5 rounded transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* User Info */}
      {!isCollapsed && user && (
        <div className="p-4 border-b border-aegis-border">
          <p className="text-sm font-semibold text-aegis-text-primary truncate">{user.name}</p>
          <p className="text-xs text-aegis-text-tertiary truncate">{user.role}</p>
          {user.agency && (
            <p className="text-xs text-aegis-text-tertiary truncate mt-1">{user.agency}</p>
          )}
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
              'hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-aegis-accent',
              'text-aegis-text-secondary hover:text-aegis-text-primary'
            )}
            title={isCollapsed ? item.label : undefined}
          >
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Role Selector */}
      {!isCollapsed && user && (
        <div className="p-4 border-t border-aegis-border space-y-2">
          <p className="text-xs font-semibold text-aegis-text-tertiary uppercase">Switch Role</p>
          <select
            value={user.role}
            onChange={(e) => switchRole(e.target.value as any)}
            className="w-full px-2 py-1 text-xs rounded border border-aegis-border bg-aegis-darker hover:border-aegis-accent transition-colors"
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

      {/* Footer */}
      <div className="p-4 border-t border-aegis-border">
        <button
          onClick={handleLogout}
          className={clsx(
            'w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors',
            'bg-aegis-critical/10 text-aegis-critical hover:bg-aegis-critical/20',
            'focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-aegis-critical'
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
