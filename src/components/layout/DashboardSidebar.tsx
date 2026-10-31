'use client';

import { useAuthStore } from '@/stores/authStore';

export default function SettingsPage() {
  const { offlineMode, setOfflineMode } = useAuthStore();

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-aegis-text-primary">System Settings</h2>

      <div className="rounded-2xl border border-aegis-border bg-aegis-card p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-semibold text-aegis-text-primary">Offline mode</div>
            <div className="text-sm text-aegis-text-secondary">Keep command center available during degraded connectivity.</div>
          </div>
          <button
            onClick={() => setOfflineMode(!offlineMode)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${offlineMode ? 'bg-aegis-success/20 text-aegis-success' : 'bg-aegis-darker text-aegis-text-secondary'}`}
          >
            {offlineMode ? 'Enabled' : 'Disabled'}
          </button>
        </div>
      </div>
    </div>
  );
}
