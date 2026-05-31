import { create } from 'zustand';
import { Incident, Alert, Unit, Shelter, Dispatch, DashboardMetrics } from '@/types';

interface OperationsStore {
  // Core operational data
  incidents: Incident[];
  alerts: Alert[];
  units: Unit[];
  shelters: Shelter[];
  dispatches: Dispatch[];
  metrics: DashboardMetrics;
  
  // UI state
  selectedIncidentId: string | null;
  selectedUnitId: string | null;
  activeTab: string;
  mapZoom: number;
  mapCenter: [number, number];
  
  // Actions
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
  mapCenter: [0, 0],

  addIncident: (incident: Incident) =>
    set((state) => ({
      incidents: [incident, ...state.incidents],
    })),

  updateIncident: (incidentId: string, updates: Partial<Incident>) =>
    set((state) => ({
      incidents: state.incidents.map((inc) =>
        inc.id === incidentId ? { ...inc, ...updates } : inc
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
              acknowledgedAt: new Date(),
            }
          : alert
      ),
    })),

  updateUnit: (unitId: string, updates: Partial<Unit>) =>
    set((state) => ({
      units: state.units.map((unit) =>
        unit.id === unitId ? { ...unit, ...updates } : unit
      ),
    })),

  createDispatch: (dispatch: Dispatch) =>
    set((state) => ({
      dispatches: [dispatch, ...state.dispatches],
    })),

  updateDispatchStatus: (dispatchId: string, status: string) =>
    set((state) => ({
      dispatches: state.dispatches.map((dispatch) =>
        dispatch.id === dispatchId ? { ...dispatch, status: status as any } : dispatch
      ),
    })),

  selectIncident: (incidentId: string | null) =>
    set({ selectedIncidentId: incidentId }),

  selectUnit: (unitId: string | null) =>
    set({ selectedUnitId: unitId }),

  updateMapView: (zoom: number, center: [number, number]) =>
    set({ mapZoom: zoom, mapCenter: center }),

  setActiveTab: (tab: string) =>
    set({ activeTab: tab }),

  updateMetrics: (metrics: Partial<DashboardMetrics>) =>
    set((state) => ({
      metrics: { ...state.metrics, ...metrics },
    })),
}));
