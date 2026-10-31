export type UserRole = 'NDRF' | 'GOVERNMENT' | 'MEDICAL' | 'NGO' | 'ANALYST' | 'CIVILIAN';

export type Permission =
  | 'view_dashboard'
  | 'view_gis'
  | 'dispatch_units'
  | 'create_alerts'
  | 'manage_shelters'
  | 'view_analytics'
  | 'manage_logistics'
  | 'access_classified';

export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';
export type IncidentStatus = 'active' | 'monitoring' | 'contained' | 'resolved';
export type UnitStatus = 'available' | 'deployed' | 'en-route' | 'maintenance';
export type DispatchStatus = 'assigned' | 'en-route' | 'on-scene' | 'resolved';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
  agency: string;
  lastActive: Date;
  offlineMode: boolean;
}

export interface Incident {
  id: string;
  title: string;
  type: 'Flood' | 'Fire' | 'Landslide' | 'Storm' | 'Earthquake' | 'Medical';
  severity: IncidentSeverity;
  status: IncidentStatus;
  affectedArea: string;
  summary: string;
  coordinate: [number, number];
  agency: string;
  reportedAt: Date;
  unitsAssigned: number;
}

export interface Alert {
  id: string;
  title: string;
  type: 'Weather' | 'Medical' | 'Infrastructure' | 'Security';
  severity: IncidentSeverity;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  acknowledgedBy?: string;
  incidentId?: string;
}

export interface Unit {
  id: string;
  name: string;
  type: 'ambulance' | 'fire-truck' | 'rescue-team' | 'helicopter' | 'police' | 'logistics';
  status: UnitStatus;
  location: [number, number];
  agency: string;
  capacity: number;
  etaMinutes: number;
  responseScore: number;
}

export interface Shelter {
  id: string;
  name: string;
  capacity: number;
  occupied: number;
  location: [number, number];
  type: 'school' | 'community-center' | 'hospital' | 'temporary';
  status: 'open' | 'limited' | 'full';
}

export interface Dispatch {
  id: string;
  incidentId: string;
  unitId: string;
  status: DispatchStatus;
  etaMinutes: number;
  destination: string;
  assignedAt: Date;
}

export interface DashboardMetrics {
  activeIncidents: number;
  affectedPopulation: number;
  deployedUnits: number;
  sheltersOpen: number;
  aiAccuracy: number;
  systemUptime: number;
  responseTimeAverage: number;
  evacuationProgress: number;
}

export interface GISLayer {
  id: string;
  name: string;
  type: 'INCIDENTS' | 'UNITS' | 'SHELTERS' | 'WEATHER' | 'EVACUATION' | 'THERMAL';
  visible: boolean;
  opacity: number;
  style?: Record<string, unknown>;
}

export interface MapFeature {
  id: string;
  type: 'incident' | 'unit' | 'shelter' | 'weather';
  layerId: string;
  coordinates: [number, number];
  properties: Record<string, string | number | boolean | undefined>;
}

export interface SensorReading {
  label: string;
  value: number;
  unit: string;
}

export const defaultPermissionsByRole: Record<UserRole, Permission[]> = {
  NDRF: ['view_dashboard', 'view_gis', 'dispatch_units', 'view_analytics'],
  GOVERNMENT: ['view_dashboard', 'view_gis', 'dispatch_units', 'create_alerts', 'access_classified'],
  MEDICAL: ['view_dashboard', 'view_gis', 'manage_shelters', 'view_analytics'],
  NGO: ['view_dashboard', 'view_gis', 'manage_shelters', 'manage_logistics'],
  ANALYST: ['view_dashboard', 'view_gis', 'view_analytics'],
  CIVILIAN: ['view_dashboard'],
};
