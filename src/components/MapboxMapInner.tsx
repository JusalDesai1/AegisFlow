'use client';

import dynamic from 'next/dynamic';

const MapboxMap = dynamic(() => import('@/components/MapboxMapInner'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] items-center justify-center rounded-2xl border border-aegis-border bg-aegis-card text-aegis-text-secondary">
      Loading map...
    </div>
  ),
});

export default MapboxMap;
