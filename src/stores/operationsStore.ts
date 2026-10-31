import { create } from 'zustand';
import type { Alert, DashboardMetrics, Dispatch, Incident, Shelter, Unit } from '@/types';

interface OperationsStore {
  incidents: Incident[];
  alerts: Alert[];
  units: Unit[];
  shelters: Shelter[];
  dispatches: Dispatch[];
  metrics: DashboardMetrics;
  selectedIncidentId: string | null;
  selectedUnitId: string | null;
  activeTab: string;
  mapZoom: number;
  mapCenter: [number, number];
  addIncident: (incident: Incident) => void;
  updateIncident: (incidentId: string, updates: Partial<Incident>) => void;
  addAlert: (alert: Alert) => void;
  acknowledgeAlert: (alertId: string, userId: string) => void;
  updateUnit: (unitId: string, updates: Partial<Unit>) => void;
  createDispatch: (dispatch: Dispatch) => void;
  updateDispatchStatus: (dispatchId: string, status: string) => void;
  selectIncident: (incidentId: string | null) => void;
  selectUnit: (unitId: string | null) => void;
  updateMapView: (zoom: number, center: [number, number]) => void;
  setActiveTab: (tab: string) => void;
  updateMetrics: (metrics: Partial<DashboardMetrics>) => void;
  hydrateDashboard: () => Promise<void>;
}

const initialMetrics: DashboardMetrics = {
  activeIncidents: 0,
  affectedPopulation: 0,
  deployedUnits: 0,
  sheltersOpen: 0,
  aiAccuracy: 0,
  systemUptime: 0,
  responseTimeAverage: 0,
  evacuationProgress: 0,
};

export const useOperationsStore = create<OperationsStore>((set) => ({
  incidents: [],
  alerts: [],
  units: [],
  shelters: [],
  dispatches: [],
  metrics: initialMetrics,
  selectedIncidentId: null,
  selectedUnitId: null,
  activeTab: 'dashboard',
  mapZoom: 10,
  mapCenter: [19.076, 72.8777],

  hydrateDashboard: async () => {
    try {
      const response = await fetch('/api/dashboard', { cache: 'no-store' });
      if (!response.ok) {
        return;
      }

      const snapshot = await response.json();
      set({
        incidents: snapshot.incidents ?? [],
        alerts: snapshot.alerts ?? [],
        units: snapshot.units ?? [],
        shelters: snapshot.shelters ?? [],
        dispatches: snapshot.dispatches ?? [],
        metrics: snapshot.metrics ?? initialMetrics,
        mapCenter: snapshot.incidents?.[0]?.coordinate ?? [19.076, 72.8777],
      });
    } catch {
      // ignore fetch errors; mock data remains as fallback
    }
  },

  addIncident: (incident: Incident) =>
    set((state) => ({
      incidents: [incident, ...state.incidents],
    })),

  updateIncident: (incidentId: string, updates: Partial<Incident>) =>
    set((state) => ({
      incidents: state.incidents.map((incident) =>
        incident.id === incidentId ? { ...incident, ...updates } : incident,
      ),
    })),

  addAlert: (alert: Alert) =>
    set((state) => ({
      alerts: [alert, ...state.alerts],
    })),

  acknowledgeAlert: (alertId: string, userId: string) =>
    set((state) => ({
      alerts: state.alerts.map((alert) =>
        alert.id === alertId
          ? {
              ...alert,
              acknowledged: true,
              acknowledgedBy: userId,
              timestamp: new Date(),
            }
          : alert,
      ),
    })),

  updateUnit: (unitId: string, updates: Partial<Unit>) =>
    set((state) => ({
      units: state.units.map((unit) => (unit.id === unitId ? { ...unit, ...updates } : unit)),
    })),

  createDispatch: (dispatch: Dispatch) =>
    set((state) => ({
      dispatches: [dispatch, ...state.dispatches],
    })),

  updateDispatchStatus: (dispatchId: string, status: string) =>
    set((state) => ({
      dispatches: state.dispatches.map((dispatch) =>
        dispatch.id === dispatchId ? { ...dispatch, status: status as Dispatch['status'] } : dispatch,
      ),
    })),

  selectIncident: (incidentId: string | null) => set({ selectedIncidentId: incidentId }),
  selectUnit: (unitId: string | null) => set({ selectedUnitId: unitId }),
  updateMapView: (zoom: number, center: [number, number]) => set({ mapZoom: zoom, mapCenter: center }),
  setActiveTab: (tab: string) => set({ activeTab: tab }),
  updateMetrics: (metrics: Partial<DashboardMetrics>) =>
    set((state) => ({
      metrics: { ...state.metrics, ...metrics },
    })),
}));
