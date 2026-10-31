'use client';

import { useOperationsStore } from '@/stores/operationsStore';

export default function IncidentsPage() {
  const { incidents } = useOperationsStore();

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-aegis-text-primary">Incident Command</h2>

      <div className="grid gap-4">
        {incidents.map((incident) => (
          <div key={incident.id} className="rounded-2xl border border-aegis-border bg-aegis-card p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xl font-semibold text-aegis-text-primary">{incident.title}</div>
                <div className="mt-1 text-sm text-aegis-text-tertiary">{incident.affectedArea}</div>
              </div>
              <span className="rounded-full border border-aegis-critical/40 bg-aegis-critical/10 px-2 py-1 text-xs uppercase text-aegis-critical">
                {incident.severity}
              </span>
            </div>

            <p className="mt-3 text-aegis-text-secondary">{incident.summary}</p>

            <div className="mt-4 grid gap-3 md:grid-cols-3 text-sm text-aegis-text-secondary">
              <div>Type: {incident.type}</div>
              <div>Status: {incident.status}</div>
              <div>Agency: {incident.agency}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
