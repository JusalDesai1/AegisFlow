'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/stores/authstore';
import { useOperationsStore } from '@/stores/operationsStore';
import clsx from 'clsx';

const DashboardHeader = () => {
  const { user } = useAuthStore();
  const { metrics } = useOperationsStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const statusItems = [
    {
      label: 'Active Incidents',
      value: metrics.activeIncidents,
      icon: '🚨',
      color: 'text-aegis-accent',
    },
    {
      label: 'Deployed Units',
      value: metrics.deployedUnits,
      icon: '🚁',
      color: 'text-aegis-info',
    },
    {
      label: 'Shelters Open',
      value: metrics.sheltersOpen,
      icon: '🏢',
      color: 'text-aegis-success',
    },
    {
      label: 'System Uptime',
      value: `${metrics.systemUptime}%`,
      icon: '✅',
      color: 'text-aegis-success',
    },
  ];

  return (
    <header
      className="bg-aegis-card border-b border-aegis-border px-6 py-4"
      role="banner"
    >
      <div className="flex items-center justify-between mb-4">
        {/* Breadcrumb/Title */}
        <div>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm mb-1">
            <span className="text-aegis-text-primary">Dashboard</span>
            <span className="text-aegis-text-tertiary">/</span>
            <span className="text-aegis-text-secondary">{user?.role}</span>
          </nav>
          <h1 className="text-2xl font-bold text-aegis-text-primary">
            Command Center
          </h1>
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className={clsx(
              'flex items-center gap-3 px-4 py-2 rounded-lg',
              'bg-aegis-darker border border-aegis-border',
              'hover:border-aegis-accent transition-colors',
              'focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-aegis-accent'
            )}
            aria-haspopup="true"
            aria-expanded={showUserMenu}
            aria-label="User menu"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-aegis-accent to-aegis-accent-light flex items-center justify-center text-sm font-bold text-aegis-darker">
              {user?.name?.charAt(0)}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium text-aegis-text-primary">{user?.name}</p>
              <p className="text-xs text-aegis-text-tertiary">{user?.role}</p>
            </div>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div
              className="absolute right-0 mt-2 w-48 bg-aegis-card border border-aegis-border rounded-lg shadow-lg z-50"
              role="menu"
            >
              <button className="w-full text-left px-4 py-2 hover:bg-white/5 text-sm" role="menuitem">
                Profile Settings
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-white/5 text-sm" role="menuitem">
                Help & Support
              </button>
              <hr className="border-aegis-border" />
              <button className="w-full text-left px-4 py-2 text-aegis-critical text-sm hover:bg-aegis-critical/10" role="menuitem">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {statusItems.map((item) => (
          <div
            key={item.label}
            className="bg-aegis-darker border border-aegis-border rounded-lg p-3"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{item.icon}</span>
              <p className="text-xs text-aegis-text-tertiary truncate">{item.label}</p>
            </div>
            <p className={clsx('text-xl font-bold', item.color)}>{item.value}</p>
          </div>
        ))}
      </div>
    </header>
  );
};

export default DashboardHeader;
