// Disaster Types
export interface Disaster {
  id: string;
  type: 'earthquake' | 'flood' | 'wildfire' | 'hurricane' | 'tornado' | 'tsunami' | 'drought';
  severity: 'low' | 'medium' | 'high' | 'critical';
  latitude: number;
  longitude: number;
  radius: number; // in km
  detectedAt: Date;
  affectedPopulation: number;
  estimatedDamage: number; // in USD
  status: 'active' | 'contained' | 'resolved';
  description: string;
  resources: Resource[];
}

// Resource Management
export interface Resource {
  id: string;
  type: 'ambulance' | 'fire-truck' | 'police' | 'rescue-team' | 'shelter' | 'supply' | 'personnel';
  status: 'available' | 'deployed' | 'in-transit' | 'busy';
  latitude: number;
  longitude: number;
  capacity: number;
  currentLoad: number;
  agencyId: string;
}

// Alert System
export interface Alert {
  id: string;
  disasterId: string;
  level: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: Date;
  recipients: string[];
  acknowledged: boolean;
}

// Agency/Organization
export interface Agency {
  id: string;
  name: string;
  type: 'ndma' | 'sdma' | 'district' | 'hospital' | 'police';
  jurisdiction: string;
  contactEmail: string;
  contactPhone: string;
  resources: string[]; // Resource IDs
}

// User/Operator
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'coordinator' | 'responder' | 'viewer';
  agencyId: string;
  permissions: string[];
}

// Analytics
export interface DisasterMetrics {
  totalIncidents: number;
  activeIncidents: number;
  affectedPopulation: number;
  resourcesDeployed: number;
  responseTime: number; // average in minutes
  casualtyCount: number;
  shelterCapacity: number;
  sheltersActive: number;
}

// Dashboard State
export interface DashboardState {
  disasters: Disaster[];
  resources: Resource[];
  alerts: Alert[];
  agencies: Agency[];
  metrics: DisasterMetrics;
  selectedDisaster: Disaster | null;
  mapCenter: { lat: number; lng: number };
  mapZoom: number;
}
