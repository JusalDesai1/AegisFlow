'use client';

import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useOperationsStore } from '@/stores/operationsStore';

const cn = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

const DashboardHeader = () => {
  const { user, logout } = useAuthStore();
  const { metrics } = useOperationsStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const statusItems = [
    { label: 'Active Incidents', value: metrics.activeIncidents, icon: '🚨', color: 'text-aegis-accent' },
    { label: 'Deployed Units', value: metrics.deployedUnits, icon: '🚁', color: 'text-aegis-info' },
    { label: 'Shelters Open', value: metrics.sheltersOpen, icon: '🏢', color: 'text-aegis-success' },
    { label: 'System Uptime', value: `${metrics.systemUptime}%`, icon: '✅', color: 'text-aegis-success' },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="border-b border-aegis-border bg-aegis-card px-6 py-4" role="banner">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <nav aria-label="Breadcrumb" className="mb-1 flex items-center gap-2 text-sm">
            <span className="text-aegis-text-primary">Dashboard</span>
            <span className="text-aegis-text-tertiary">/</span>
            <span className="text-aegis-text-secondary">{user?.role}</span>
          </nav>
          <h1 className="text-2xl font-bold text-aegis-text-primary">Command Center</h1>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className={cn(
              'flex items-center gap-3 rounded-lg border border-aegis-border bg-aegis-darker px-4 py-2',
              'transition-colors hover:border-aegis-accent',
            )}
            aria-haspopup="true"
            aria-expanded={showUserMenu}
            aria-label="User menu"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-aegis-accent to-aegis-accent-light text-sm font-bold text-aegis-darker">
              {user?.name?.charAt(0)}
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium text-aegis-text-primary">{user?.name}</p>
              <p className="text-xs text-aegis-text-tertiary">{user?.role}</p>
            </div>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-aegis-border bg-aegis-card shadow-lg" role="menu">
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-white/5" role="menuitem">
                Profile Settings
              </button>
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-white/5" role="menuitem">
                Help & Support
              </button>
              <hr className="border-aegis-border" />
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-aegis-critical hover:bg-aegis-critical/10"
                role="menuitem"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {statusItems.map((item) => (
          <div key={item.label} className="rounded-lg border border-aegis-border bg-aegis-darker p-3">
            <div className="mb-1 flex items-center gap-2">
              <span className="text-lg">{item.icon}</span>
              <p className="truncate text-xs text-aegis-text-tertiary">{item.label}</p>
            </div>
            <p className={cn('text-xl font-bold', item.color)}>{item.value}</p>
          </div>
        ))}
      </div>
    </header>
  );
};

export default DashboardHeader;
