'use client';

import { useGISStore } from '@/stores/gisStore';

export default function GISPage() {
  const { features, layers, activeLayerIds, toggleLayer } = useGISStore();

  return (
    <div className="space-y-6 p-6">
      <div className="rounded-2xl border border-aegis-border bg-aegis-card p-5">
        <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
          <h2 className="text-2xl font-bold text-aegis-text-primary">GIS Intelligence</h2>
          <div className="rounded-full border border-aegis-info/40 bg-aegis-info/10 px-3 py-1 text-sm text-aegis-info">
            11.4 km risk radius
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
          <div className="relative h-[420px] overflow-hidden rounded-xl border border-aegis-border bg-[radial-gradient(circle_at_center,_rgba(255,107,74,0.14),_rgba(10,15,31,1)_60%)] p-4">
            <div className="absolute left-6 top-6 h-24 w-24 rounded-full border border-aegis-accent/40 bg-aegis-accent/10 blur-2xl" />
            <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full border border-aegis-info/40 bg-aegis-info/10 blur-2xl" />

            {features.map((feature) => (
              <div
                key={feature.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${((feature.coordinates[0] - 19.02) / 0.09) * 100}%`,
                  top: `${((72.9 - feature.coordinates[1]) / 0.07) * 100}%`,
                }}
              >
                <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-aegis-accent shadow-[0_0_12px_rgba(255,107,74,0.6)]" />
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-aegis-text-primary">Layers</h3>
            {layers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => toggleLayer(layer.id)}
                className="flex w-full items-center justify-between rounded-xl border border-aegis-border bg-aegis-darker p-3 text-left"
              >
                <span className="text-aegis-text-primary">{layer.name}</span>
                <span
                  className={`h-3 w-3 rounded-full ${activeLayerIds.includes(layer.id) ? 'bg-aegis-success' : 'bg-aegis-border'}`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
