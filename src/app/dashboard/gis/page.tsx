'use client';

import { useOperationsStore } from '@/stores/operationsStore';

const statCards = [
  { label: 'Active Incidents', key: 'activeIncidents', value: '24', accent: 'text-aegis-accent' },
  { label: 'Affected Population', key: 'affectedPopulation', value: '45K+', accent: 'text-aegis-warning' },
  { label: 'Units Deployed', key: 'deployedUnits', value: '156', accent: 'text-aegis-success' },
  { label: 'Shelters Open', key: 'sheltersOpen', value: '18', accent: 'text-aegis-info' },
];

export default function DashboardPage() {
  const { incidents, alerts, units, shelters, metrics, dispatches } = useOperationsStore();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-aegis-text-tertiary">Live overview</p>
          <h2 className="text-3xl font-bold text-aegis-text-primary">Command Center</h2>
        </div>
        <div className="rounded-full border border-aegis-success/40 bg-aegis-success/10 px-3 py-1 text-sm text-aegis-success">
          Systems nominal • {metrics.systemUptime}% uptime
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((item) => (
          <div key={item.label} className="rounded-xl border border-aegis-border bg-aegis-card p-5 shadow-glow-sm">
            <div className="mb-3 text-sm text-aegis-text-tertiary">{item.label}</div>
            <div className={`text-3xl font-bold ${item.accent}`}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-aegis-border bg-aegis-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-aegis-text-primary">Active incidents</h3>
            <span className="text-sm text-aegis-text-tertiary">Updated 2m ago</span>
          </div>

          <div className="space-y-3">
            {incidents.map((incident) => (
              <div key={incident.id} className="rounded-xl border border-aegis-border bg-aegis-darker p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h4 className="text-lg font-semibold text-aegis-text-primary">{incident.title}</h4>
                    <p className="text-sm text-aegis-text-secondary">{incident.affectedArea} • {incident.type}</p>
                  </div>
                  <span className="rounded-full border border-aegis-critical/40 bg-aegis-critical/10 px-2 py-1 text-xs font-medium text-aegis-critical uppercase">
                    {incident.severity}
                  </span>
                </div>
                <p className="mt-3 text-sm text-aegis-text-tertiary">{incident.summary}</p>
                <div className="mt-3 flex gap-3 text-xs text-aegis-text-secondary">
                  <span>{incident.unitsAssigned} units assigned</span>
                  <span>{incident.status}</span>
                  <span>{incident.agency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-aegis-border bg-aegis-card p-5">
          <h3 className="mb-4 text-xl font-semibold text-aegis-text-primary">Operational alert feed</h3>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="rounded-xl border border-aegis-border bg-aegis-darker p-3">
                <div className="flex items-center justify-between gap-2">
                  <strong className="text-sm text-aegis-text-primary">{alert.title}</strong>
                  <span className="text-[10px] uppercase text-aegis-warning">{alert.severity}</span>
                </div>
                <p className="mt-2 text-sm text-aegis-text-secondary">{alert.message}</p>
                <div className="mt-2 text-[11px] text-aegis-text-tertiary">
                  {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_1.1fr_0.8fr]">
        <div className="rounded-2xl border border-aegis-border bg-aegis-card p-5">
          <h3 className="mb-4 text-xl font-semibold text-aegis-text-primary">Fleet status</h3>
          <div className="space-y-3">
            {units.map((unit) => (
              <div key={unit.id} className="flex items-center justify-between rounded-xl border border-aegis-border bg-aegis-darker p-3">
                <div>
                  <div className="font-medium text-aegis-text-primary">{unit.name}</div>
                  <div className="text-xs text-aegis-text-tertiary">{unit.type} • {unit.agency}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-aegis-success">{unit.status}</div>
                  <div className="text-xs text-aegis-text-tertiary">ETA {unit.etaMinutes}m</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-aegis-border bg-aegis-card p-5">
          <h3 className="mb-4 text-xl font-semibold text-aegis-text-primary">Dispatch queue</h3>
          <div className="space-y-3">
            {dispatches.map((dispatch) => (
              <div key={dispatch.id} className="rounded-xl border border-aegis-border bg-aegis-darker p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-aegis-text-primary">{dispatch.destination}</span>
                  <span className="text-xs uppercase text-aegis-info">{dispatch.status}</span>
                </div>
                <div className="mt-2 text-xs text-aegis-text-secondary">ETA {dispatch.etaMinutes} mins</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-aegis-border bg-aegis-card p-5">
          <h3 className="mb-4 text-xl font-semibold text-aegis-text-primary">Shelter capacity</h3>
          <div className="space-y-3">
            {shelters.map((shelter) => (
              <div key={shelter.id} className="rounded-xl border border-aegis-border bg-aegis-darker p-3">
                <div className="font-medium text-aegis-text-primary">{shelter.name}</div>
                <div className="mt-1 text-xs text-aegis-text-tertiary">{shelter.occupied}/{shelter.capacity} occupied</div>
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
      </div>
    </div>
  );
}
