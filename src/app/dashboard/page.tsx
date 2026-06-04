'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-aegis-darker via-aegis-dark to-aegis-card p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-aegis-text-primary mb-2">Emergency Command Center</h1>
          <p className="text-aegis-text-secondary">Real-time incident monitoring and response coordination</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Incidents', value: '24', color: 'aegis-critical' },
            { label: 'Units Deployed', value: '156', color: 'aegis-success' },
            { label: 'Shelters Active', value: '18', color: 'aegis-info' },
            { label: 'Affected Population', value: '45K+', color: 'aegis-warning' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-lg bg-aegis-card border border-aegis-border hover:border-aegis-accent transition-colors"
            >
              <div className="text-aegis-text-tertiary text-sm font-medium mb-2">{stat.label}</div>
              <div className={`text-3xl font-bold text-${stat.color}`}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Placeholder */}
          <div className="lg:col-span-2 h-96 rounded-lg bg-aegis-card border border-aegis-border p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold text-aegis-text-primary mb-2">GIS Map</h3>
              <p className="text-aegis-text-tertiary mb-4">Configure Mapbox token to view live incident map</p>
              <code className="text-sm bg-aegis-darker p-2 rounded inline-block text-aegis-accent">
                NEXT_PUBLIC_MAPBOX_TOKEN
              </code>
            </div>
          </div>

          {/* Sidebar */}
          <div className="h-96 rounded-lg bg-aegis-card border border-aegis-border p-6 overflow-y-auto">
            <h3 className="text-lg font-semibold text-aegis-text-primary mb-4">Recent Incidents</h3>
            <div className="space-y-3">
              {[
                { id: 1, type: 'Flood', status: 'Active', level: 'Critical' },
                { id: 2, type: 'Fire', status: 'Active', level: 'High' },
                { id: 3, type: 'Landslide', status: 'Monitoring', level: 'Medium' },
              ].map((incident) => (
                <div key={incident.id} className="p-3 bg-aegis-darker rounded border border-aegis-border">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-aegis-text-primary">{incident.type}</div>
                      <div className="text-xs text-aegis-text-tertiary">{incident.status}</div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-aegis-critical text-white">
                      {incident.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
