'use client';

import dynamic from 'next/dynamic';
import { useGISStore } from '@/stores/gisStore';

const MapboxMap = dynamic(() => import('@/components/MapboxMapInner'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] items-center justify-center rounded-2xl border border-aegis-border bg-aegis-card text-aegis-text-secondary">
      Loading map...
    </div>
  ),
});

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
          <MapboxMap features={features} center={[19.076, 72.8777]} zoom={11} />

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
