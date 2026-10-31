'use client';

import { useOperationsStore } from '@/stores/operationsStore';

export default function LogisticsPage() {
  const { shelters } = useOperationsStore();

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-aegis-text-primary">Shelters & Logistics</h2>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {shelters.map((shelter) => (
          <div key={shelter.id} className="rounded-2xl border border-aegis-border bg-aegis-card p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-aegis-text-primary">{shelter.name}</h3>
              <span className="text-xs uppercase text-aegis-success">{shelter.status}</span>
            </div>
            <div className="mt-4 text-sm text-aegis-text-secondary">Capacity: {shelter.occupied}/{shelter.capacity}</div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-aegis-darker">
              <div
                className="h-full rounded-full bg-aegis-accent"
                style={{ width: `${(shelter.occupied / shelter.capacity) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
