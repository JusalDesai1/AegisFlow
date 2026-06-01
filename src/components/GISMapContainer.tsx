'use client';

import React, { useEffect, useRef } from 'react';
import { useGISStore } from '@/stores/gisStore';
import clsx from 'clsx';

const GISMapContainer = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { center, zoom, layers, activeLayerIds } = useGISStore();

  return (
    <div
      ref={mapRef}
      className="relative w-full h-full bg-gradient-to-b from-slate-900 to-slate-950 rounded-lg overflow-hidden"
      role="region"
      aria-label="Geographic information system map"
    >
      {/* Map background with grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,107,74,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,107,74,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Placeholder: Mapbox integration would go here */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto text-aegis-text-tertiary mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 003 16.382V5.618a1 1 0 011.553-.894L9 7.5m0 0l6.553-3.776A1 1 0 0117 5.618v10.764a1 1 0 01-1.553.894L9 12.5m0 0V20m6.553-13.224A1 1 0 0117 5.618v10.764" />
            </svg>
            <p className="text-aegis-text-secondary">GIS Map View</p>
            <p className="text-xs text-aegis-text-tertiary mt-2">Zoom: {zoom}x</p>
          </div>
        </div>
      </div>

      {/* Layer Indicators */}
      <div className="absolute top-4 right-4 space-y-2 z-10">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className={clsx(
              'px-3 py-1 rounded-full text-xs font-medium transition-all',
              activeLayerIds.includes(layer.id)
                ? 'bg-aegis-accent text-aegis-darker shadow-glow-md'
                : 'bg-aegis-card border border-aegis-border text-aegis-text-secondary opacity-50'
            )}
          >
            {layer.name}
          </div>
        ))}
      </div>

      {/* Coordinates Display */}
      <div className="absolute bottom-4 right-4 bg-aegis-card border border-aegis-border rounded px-3 py-2 text-xs text-aegis-text-secondary font-mono">
        📍 {center[0].toFixed(4)}° N | {center[1].toFixed(4)}° E
      </div>

      {/* Zoom Controls */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
        <button
          className="w-10 h-10 flex items-center justify-center bg-aegis-card border border-aegis-border rounded hover:border-aegis-accent transition-colors"
          aria-label="Zoom in"
        >
          <span className="text-lg font-bold">+</span>
        </button>
        <button
          className="w-10 h-10 flex items-center justify-center bg-aegis-card border border-aegis-border rounded hover:border-aegis-accent transition-colors"
          aria-label="Zoom out"
        >
          <span className="text-lg font-bold">−</span>
        </button>
      </div>
    </div>
  );
};

export default GISMapContainer;
