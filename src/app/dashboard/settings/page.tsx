'use client';

import { useOperationsStore } from '@/stores/operationsStore';

export default function AnalyticsPage() {
  const { metrics } = useOperationsStore();

  const bars = [
    { label: 'AI Accuracy', value: metrics.aiAccuracy },
    { label: 'Evacuation', value: metrics.evacuationProgress },
    { label: 'System Uptime', value: metrics.systemUptime },
    { label: 'Response Speed', value: 88 },
  ];

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-aegis-text-primary">Analytics</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {bars.map((bar) => (
          <div key={bar.label} className="rounded-2xl border border-aegis-border bg-aegis-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-aegis-text-primary">{bar.label}</span>
              <span className="text-aegis-text-secondary">{bar.value}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-aegis-darker">
              <div className="h-full rounded-full bg-aegis-accent" style={{ width: `${bar.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
