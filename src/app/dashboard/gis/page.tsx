'use client';

import Map, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

type MapFeatureLike = {
  id: string;
  coordinates: [number, number];
  type: 'incident' | 'unit' | 'shelter' | 'weather';
  properties: Record<string, string | number | boolean | undefined>;
};

type MapboxMapProps = {
  center?: [number, number];
  zoom?: number;
  features?: MapFeatureLike[];
};

const getMarkerColor = (type: string) => {
  switch (type) {
    case 'incident':
      return '#ff6b4a';
    case 'unit':
      return '#00b8e6';
    case 'shelter':
      return '#00d084';
    case 'weather':
      return '#ffa500';
    default:
      return '#ffffff';
  }
};

export default function MapboxMapInner({
  center = [19.076, 72.8777],
  zoom = 11,
  features = [],
}: MapboxMapProps) {
  if (!token) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-2xl border border-dashed border-aegis-border bg-aegis-card text-center">
        <div className="max-w-md px-6">
          <div className="mb-3 text-4xl">🗺️</div>
          <h3 className="text-xl font-semibold text-aegis-text-primary">Mapbox integration is ready</h3>
          <p className="mt-2 text-sm text-aegis-text-secondary">
            Add <code className="rounded bg-aegis-darker px-2 py-1 text-aegis-accent">NEXT_PUBLIC_MAPBOX_TOKEN</code> to your environment to visualize live incident data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[420px] overflow-hidden rounded-2xl border border-aegis-border bg-aegis-card">
      <Map
        mapboxAccessToken={token}
        initialViewState={{
          longitude: center[1],
          latitude: center[0],
          zoom,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        attributionControl={false}
      >
        <NavigationControl position="top-right" />

        {features.map((feature) => (
          <Marker
            key={feature.id}
            longitude={feature.coordinates[1]}
            latitude={feature.coordinates[0]}
            anchor="center"
          >
            <div
              className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-white shadow-lg"
              style={{
                backgroundColor: getMarkerColor(feature.type),
                boxShadow: `0 0 12px ${getMarkerColor(feature.type)}80`,
              }}
              title={String(feature.properties.title ?? feature.type)}
            />
          </Marker>
        ))}
      </Map>
    </div>
  );
}
