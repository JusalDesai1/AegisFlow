'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import DashboardHeader from '@/components/layout/DashboardHeader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, hydrateSession, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    async function syncSession() {
      const ok = await hydrateSession();
      if (!ok) {
        await logout();
        router.replace('/auth/login');
      }
    }

    if (!isAuthenticated) {
      syncSession();
    }
  }, [hydrateSession, isAuthenticated, logout, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-aegis-darker">
      <DashboardSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
