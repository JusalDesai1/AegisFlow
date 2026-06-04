'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-aegis-darker via-aegis-dark to-aegis-card flex items-center justify-center">
      <div className="container mx-auto px-4 py-12 text-center">
        {/* Logo/Title */}
        <div className="mb-8 animate-pulse-glow">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-aegis-accent to-aegis-accent-light bg-clip-text text-transparent mb-4">
            AegisFlow
          </h1>
          <p className="text-2xl text-aegis-text-secondary mb-2">Emergency Operations Intelligence</p>
          <p className="text-lg text-aegis-text-tertiary">AI-Powered Disaster Response Coordination Platform</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="p-6 rounded-lg bg-aegis-card border border-aegis-border hover:border-aegis-accent transition-colors">
            <div className="text-aegis-accent text-3xl mb-3">🗺️</div>
            <h3 className="text-lg font-semibold mb-2">Real-time GIS</h3>
            <p className="text-aegis-text-tertiary text-sm">Live incident tracking with Mapbox integration</p>
          </div>
          <div className="p-6 rounded-lg bg-aegis-card border border-aegis-border hover:border-aegis-accent transition-colors">
            <div className="text-aegis-success text-3xl mb-3">🤖</div>
            <h3 className="text-lg font-semibold mb-2">AI Intelligence</h3>
            <p className="text-aegis-text-tertiary text-sm">Predictive analysis with explainable recommendations</p>
          </div>
          <div className="p-6 rounded-lg bg-aegis-card border border-aegis-border hover:border-aegis-accent transition-colors">
            <div className="text-aegis-info text-3xl mb-3">📊</div>
            <h3 className="text-lg font-semibold mb-2">Multi-Agency</h3>
            <p className="text-aegis-text-tertiary text-sm">Unified command center for all response teams</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/dashboard"
            className="px-8 py-3 bg-aegis-accent hover:bg-aegis-accent-light text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-glow-md"
          >
            Go to Dashboard →
          </Link>
          <a
            href="https://github.com/JusalDesai1/AegisFlow"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-aegis-card hover:bg-aegis-border text-aegis-text-primary rounded-lg font-semibold transition-colors border border-aegis-border"
          >
            View on GitHub
          </a>
        </div>

        {/* Status Badge */}
        <div className="text-center text-sm text-aegis-text-tertiary">
          <span className="inline-block px-3 py-1 bg-aegis-card rounded-full border border-aegis-success">
            ✓ Production Ready
          </span>
        </div>
      </div>
    </main>
  );
}
