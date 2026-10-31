'use client';

import { useOperationsStore } from '@/stores/operationsStore';

export default function DispatchPage() {
  const { units, dispatches } = useOperationsStore();

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-aegis-text-primary">Dispatch & Units</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-aegis-border bg-aegis-card p-5">
          <h3 className="mb-4 text-xl font-semibold text-aegis-text-primary">Teams</h3>
          <div className="space-y-3">
            {units.map((unit) => (
              <div key={unit.id} className="rounded-xl border border-aegis-border bg-aegis-darker p-3">
                <div className="flex justify-between">
                  <span className="font-medium text-aegis-text-primary">{unit.name}</span>
                  <span className="text-xs uppercase text-aegis-info">{unit.status}</span>
                </div>
                <div className="mt-2 text-sm text-aegis-text-secondary">{unit.type} • {unit.agency}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-aegis-border bg-aegis-card p-5">
          <h3 className="mb-4 text-xl font-semibold text-aegis-text-primary">Active dispatches</h3>
          <div className="space-y-3">
            {dispatches.map((dispatch) => (
              <div key={dispatch.id} className="rounded-xl border border-aegis-border bg-aegis-darker p-3">
                <div className="flex justify-between">
                  <span className="text-aegis-text-primary">{dispatch.destination}</span>
                  <span className="text-xs uppercase text-aegis-success">{dispatch.status}</span>
                </div>
                <div className="mt-2 text-sm text-aegis-text-secondary">ETA: {dispatch.etaMinutes} minutes</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
