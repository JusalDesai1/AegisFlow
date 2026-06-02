'use client';

import { create } from 'zustand';
import type { Disaster, Resource, Alert, Agency, User, DisasterMetrics, DashboardState } from '@/types';

interface DisasterStore extends DashboardState {
  // Disaster Actions
  addDisaster: (disaster: Disaster) => void;
  updateDisaster: (id: string, updates: Partial<Disaster>) => void;
  removeDisaster: (id: string) => void;
  selectDisaster: (disaster: Disaster | null) => void;

  // Resource Actions
  addResource: (resource: Resource) => void;
  updateResource: (id: string, updates: Partial<Resource>) => void;
  removeResource: (id: string) => void;
  deployResource: (resourceId: string, disasterId: string) => void;

  // Alert Actions
  addAlert: (alert: Alert) => void;
  acknowledgeAlert: (alertId: string) => void;
  removeAlert: (alertId: string) => void;

  // Map Actions
  setMapCenter: (lat: number, lng: number) => void;
  setMapZoom: (zoom: number) => void;

  // Metrics Updates
  updateMetrics: (metrics: Partial<DisasterMetrics>) => void;
}

const useDisasterStore = create<DisasterStore>((set) => ({
  disasters: [],
  resources: [],
  alerts: [],
  agencies: [],
  metrics: {
    totalIncidents: 0,
    activeIncidents: 0,
    affectedPopulation: 0,
    resourcesDeployed: 0,
    responseTime: 0,
    casualtyCount: 0,
    shelterCapacity: 0,
    sheltersActive: 0,
  },
  selectedDisaster: null,
  mapCenter: { lat: 20.5937, lng: 78.9629 }, // India center
  mapZoom: 5,

  // Disaster Actions
  addDisaster: (disaster) =>
    set((state) => ({
      disasters: [...state.disasters, disaster],
      metrics: {
        ...state.metrics,
        totalIncidents: state.metrics.totalIncidents + 1,
        activeIncidents: state.metrics.activeIncidents + 1,
        affectedPopulation: state.metrics.affectedPopulation + disaster.affectedPopulation,
      },
    })),

  updateDisaster: (id, updates) =>
    set((state) => ({
      disasters: state.disasters.map((d) => (d.id === id ? { ...d, ...updates } : d)),
      selectedDisaster: state.selectedDisaster?.id === id ? { ...state.selectedDisaster, ...updates } : state.selectedDisaster,
    })),

  removeDisaster: (id) =>
    set((state) => ({
      disasters: state.disasters.filter((d) => d.id !== id),
      selectedDisaster: state.selectedDisaster?.id === id ? null : state.selectedDisaster,
    })),

  selectDisaster: (disaster) => set(() => ({ selectedDisaster: disaster })),

  // Resource Actions
  addResource: (resource) =>
    set((state) => ({
      resources: [...state.resources, resource],
    })),

  updateResource: (id, updates) =>
    set((state) => ({
      resources: state.resources.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    })),

  removeResource: (id) =>
    set((state) => ({
      resources: state.resources.filter((r) => r.id !== id),
    })),

  deployResource: (resourceId, disasterId) =>
    set((state) => ({
      resources: state.resources.map((r) =>
        r.id === resourceId ? { ...r, status: 'deployed' as const } : r
      ),
      metrics: {
        ...state.metrics,
        resourcesDeployed: state.metrics.resourcesDeployed + 1,
      },
    })),

  // Alert Actions
  addAlert: (alert) =>
    set((state) => ({
      alerts: [...state.alerts, alert],
    })),

  acknowledgeAlert: (alertId) =>
    set((state) => ({
      alerts: state.alerts.map((a) => (a.id === alertId ? { ...a, acknowledged: true } : a)),
    })),

  removeAlert: (alertId) =>
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== alertId),
    })),

  // Map Actions
  setMapCenter: (lat, lng) =>
    set(() => ({
      mapCenter: { lat, lng },
    })),

  setMapZoom: (zoom) =>
    set(() => ({
      mapZoom: zoom,
    })),

  // Metrics
  updateMetrics: (metrics) =>
    set((state) => ({
      metrics: { ...state.metrics, ...metrics },
    })),
}));

export default useDisasterStore;
