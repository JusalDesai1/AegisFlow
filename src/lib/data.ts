import { mockAlerts, mockDispatches, mockIncidents, mockMetrics, mockMapFeatures, mockShelters, mockUnits } from '@/lib/mockData';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import type { Alert, DashboardMetrics, Dispatch, Incident, Shelter, Unit } from '@/types';

export type DashboardSnapshot = {
  metrics: DashboardMetrics;
  incidents: Incident[];
  alerts: Alert[];
  units: Unit[];
  shelters: Shelter[];
  dispatches: Dispatch[];
  features: Array<{
    id: string;
    type: 'incident' | 'unit' | 'shelter' | 'weather';
    layerId: string;
    coordinates: [number, number];
    properties: Record<string, string | number | boolean | undefined>;
  }>;
};

const normalizeIncident = (row: Record<string, any>): Incident => ({
  id: String(row.id ?? row.uuid ?? `incident-${Math.random()}`),
  title: String(row.title ?? 'Untitled incident'),
  type: (row.type ?? 'Flood') as Incident['type'],
  severity: (row.severity ?? 'medium') as Incident['severity'],
  status: (row.status ?? 'active') as Incident['status'],
  affectedArea: String(row.affected_area ?? row.affectedArea ?? 'Unknown area'),
  summary: String(row.summary ?? 'No summary provided.'),
  coordinate: Array.isArray(row.coordinate)
    ? [Number(row.coordinate[0]), Number(row.coordinate[1])]
    : [Number(row.latitude ?? 19.076), Number(row.longitude ?? 72.8777)],
  agency: String(row.agency ?? 'NDRF'),
  reportedAt: row.reported_at ? new Date(row.reported_at) : new Date(),
  unitsAssigned: Number(row.units_assigned ?? row.unitsAssigned ?? 0),
});

const normalizeAlert = (row: Record<string, any>): Alert => ({
  id: String(row.id ?? row.uuid ?? `alert-${Math.random()}`),
  title: String(row.title ?? 'System alert'),
  type: (row.type ?? 'Infrastructure') as Alert['type'],
  severity: (row.severity ?? 'medium') as Alert['severity'],
  message: String(row.message ?? 'New alert received.'),
  timestamp: row.created_at ? new Date(row.created_at) : new Date(),
  acknowledged: Boolean(row.acknowledged ?? false),
  acknowledgedBy: row.acknowledged_by ? String(row.acknowledged_by) : undefined,
  incidentId: row.incident_id ? String(row.incident_id) : undefined,
});

const normalizeUnit = (row: Record<string, any>): Unit => ({
  id: String(row.id ?? row.uuid ?? `unit-${Math.random()}`),
  name: String(row.name ?? 'Unnamed unit'),
  type: (row.type ?? 'ambulance') as Unit['type'],
  status: (row.status ?? 'available') as Unit['status'],
  location: Array.isArray(row.location)
    ? [Number(row.location[0]), Number(row.location[1])]
    : [Number(row.latitude ?? 19.076), Number(row.longitude ?? 72.8777)],
  agency: String(row.agency ?? 'Response Team'),
  capacity: Number(row.capacity ?? 0),
  etaMinutes: Number(row.eta_minutes ?? row.etaMinutes ?? 0),
  responseScore: Number(row.response_score ?? row.responseScore ?? 90),
});

const normalizeShelter = (row: Record<string, any>): Shelter => ({
  id: String(row.id ?? row.uuid ?? `shelter-${Math.random()}`),
  name: String(row.name ?? 'Unnamed shelter'),
  capacity: Number(row.capacity ?? 0),
  occupied: Number(row.occupied ?? 0),
  location: Array.isArray(row.location)
    ? [Number(row.location[0]), Number(row.location[1])]
    : [Number(row.latitude ?? 19.076), Number(row.longitude ?? 72.8777)],
  type: (row.type ?? 'community-center') as Shelter['type'],
  status: (row.status ?? 'open') as Shelter['status'],
});

const normalizeDispatch = (row: Record<string, any>): Dispatch => ({
  id: String(row.id ?? row.uuid ?? `dispatch-${Math.random()}`),
  incidentId: String(row.incident_id ?? 'unknown-incident'),
  unitId: String(row.unit_id ?? 'unknown-unit'),
  status: (row.status ?? 'assigned') as Dispatch['status'],
  etaMinutes: Number(row.eta_minutes ?? row.etaMinutes ?? 0),
  destination: String(row.destination ?? 'Unknown destination'),
  assignedAt: row.assigned_at ? new Date(row.assigned_at) : new Date(),
});

const buildFeatures = (incidents: Incident[], units: Unit[], shelters: Shelter[]): DashboardSnapshot['features'] => [
  ...incidents.map((incident) => ({
    id: `incident-${incident.id}`,
    type: 'incident',
    layerId: 'incidents',
    coordinates: incident.coordinate,
    properties: {
      title: incident.title,
      severity: incident.severity,
      status: incident.status,
    },
  })),
  ...units.map((unit) => ({
    id: `unit-${unit.id}`,
    type: 'unit',
    layerId: 'units',
    coordinates: unit.location,
    properties: {
      title: unit.name,
      status: unit.status,
      unitType: unit.type,
    },
  })),
  ...shelters.map((shelter) => ({
    id: `shelter-${shelter.id}`,
    type: 'shelter',
    layerId: 'shelters',
    coordinates: shelter.location,
    properties: {
      title: shelter.name,
      status: shelter.status,
    },
  })),
];

export const defaultDashboardSnapshot: DashboardSnapshot = {
  metrics: mockMetrics,
  incidents: mockIncidents,
  alerts: mockAlerts,
  units: mockUnits,
  shelters: mockShelters,
  dispatches: mockDispatches,
  features: mockMapFeatures,
};

export async function getDashboardSnapshotFromDb(): Promise<DashboardSnapshot> {
  if (!isSupabaseConfigured || !supabase) {
    return defaultDashboardSnapshot;
  }

  const [incidentsResult, alertsResult, unitsResult, sheltersResult, dispatchesResult] = await Promise.all([
    supabase.from('incidents').select('*').order('reported_at', { ascending: false }),
    supabase.from('alerts').select('*').order('created_at', { ascending: false }),
    supabase.from('units').select('*').order('name', { ascending: true }),
    supabase.from('shelters').select('*').order('name', { ascending: true }),
    supabase.from('dispatches').select('*').order('assigned_at', { ascending: false }),
  ]);

  const incidents = (incidentsResult.data ?? []).map(normalizeIncident);
  const alerts = (alertsResult.data ?? []).map(normalizeAlert);
  const units = (unitsResult.data ?? []).map(normalizeUnit);
  const shelters = (sheltersResult.data ?? []).map(normalizeShelter);
  const dispatches = (dispatchesResult.data ?? []).map(normalizeDispatch);

  const metrics: DashboardMetrics = {
    activeIncidents: incidents.filter((incident) => incident.status === 'active').length || mockMetrics.activeIncidents,
    affectedPopulation: incidents.reduce((sum, incident) => sum + (incident.unitsAssigned * 1250), 0) || mockMetrics.affectedPopulation,
    deployedUnits: units.filter((unit) => unit.status === 'deployed' || unit.status === 'en-route').length || mockMetrics.deployedUnits,
    sheltersOpen: shelters.filter((shelter) => shelter.status === 'open').length || mockMetrics.sheltersOpen,
    aiAccuracy: mockMetrics.aiAccuracy,
    systemUptime: mockMetrics.systemUptime,
    responseTimeAverage: mockMetrics.responseTimeAverage,
    evacuationProgress: mockMetrics.evacuationProgress,
  };

  return {
    metrics,
    incidents,
    alerts,
    units,
    shelters,
    dispatches,
    features: buildFeatures(incidents, units, shelters),
  };
}
