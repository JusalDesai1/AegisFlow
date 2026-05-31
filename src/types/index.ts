/**
 * Core type definitions for AegisFlow emergency operations platform
 */

// User roles and permissions
export type UserRole = 'NDRF' | 'GOVERNMENT' | 'MEDICAL' | 'NGO' | 'ANALYST' | 'CIVILIAN';

export type Permission =
  | 'view_dashboard'
  | 'view_gis'
  | 'dispatch_units'
  | 'manage_shelters'
  | 'manage_logistics'
  | 'view_analytics'
  | 'create_alerts'
  | 'override_ai'
  | 'access_classified'
  | 'manage_users';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
  agency?: string;
  avatar?: string;
  lastActive: Date;
  offlineMode: boolean;
}

// Incident and alert system
export type IncidentType = 'FLOOD' | 'WILDFIRE' | 'EARTHQUAKE' | 'STORM' | 'LANDSLIDE' | 'OTHER';
export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW' | 'INFO';
export type IncidentStatus = 'ACTIVE' | 'CONTAINED' | 'RESOLVED' | 'MONITORING';

export interface GeoLocation {
  latitude: number;
  longitude: number;
  altitude?: number;
  accuracy?: number;
}

export interface Incident {
  id: string;
  type: IncidentType;
  severity: SeverityLevel;
  status: IncidentStatus;
  title: string;
  description: string;
  location: GeoLocation;
  affectedArea: string;
  reportedAt: Date;
  updatedAt: Date;
  estimatedImpact: number;
  affectedPopulation: number;
  coordinates: [number, number];
  createdBy: string;
  tags: string[];
}

export interface Alert {
  id: string;
  incidentId: string;
  type: 'SYSTEM' | 'AI_RECOMMENDATION' | 'MANUAL' | 'CITIZEN_REPORT';
  severity: SeverityLevel;
  title: string;
  message: string;
  actionable: boolean;
  createdAt: Date;
  expiresAt?: Date;
  metadata: Record<string, any>;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
}

// Dispatch and unit management
export type UnitType = 'RESCUE' | 'MEDICAL' | 'LOGISTICS' | 'DRONE' | 'ROBOT' | 'SHELTER' | 'COMMAND';
export type UnitStatus = 'AVAILABLE' | 'DEPLOYED' | 'IN_TRANSIT' | 'ON_SITE' | 'RETURNING' | 'MAINTENANCE';

export interface Unit {
  id: string;
  callSign: string;
  type: UnitType;
  status: UnitStatus;
  agency: string;
  location: GeoLocation;
  capacity?: number;
  currentLoad?: number;
  personnel?: number;
  equipment: string[];
  lastUpdate: Date;
  commandedBy?: string;
  assignedIncident?: string;
  telemetry?: UnitTelemetry;
}

export interface UnitTelemetry {
  id: string;
  unitId: string;
  location: GeoLocation;
  velocity?: number;
  heading?: number;
  sensorData: Record<string, any>;
  timestamp: Date;
  signalStrength?: number;
  batteryLevel?: number;
}

export interface Dispatch {
  id: string;
  unitId: string;
  incidentId: string;
  priority: SeverityLevel;
  status: 'PENDING' | 'CONFIRMED' | 'DEPARTED' | 'ARRIVED' | 'COMPLETED' | 'CANCELLED';
  createdAt: Date;
  estimatedArrival?: Date;
  actualArrival?: Date;
  completedAt?: Date;
  instructions: string;
  aiGenerated: boolean;
  confirmedBy?: string;
}

// Shelter and logistics
export interface Shelter {
  id: string;
  name: string;
  type: 'EVACUATION' | 'MEDICAL' | 'SUPPLY' | 'COMMAND';
  location: GeoLocation;
  capacity: number;
  currentOccupancy: number;
  status: 'OPEN' | 'PARTIAL' | 'FULL' | 'CLOSED';
  resources: ShelterResource[];
  staffCount: number;
  lastUpdate: Date;
  contactNumber?: string;
}

export interface ShelterResource {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  critical: boolean;
  lastRestocked: Date;
}

export interface LogisticsItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  location: GeoLocation;
  status: 'AVAILABLE' | 'IN_TRANSIT' | 'DEPLOYED';
  priority: SeverityLevel;
  createdAt: Date;
}

// Weather and predictive intelligence
export interface WeatherData {
  id: string;
  location: GeoLocation;
  timestamp: Date;
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  precipitation: number;
  visibility: number;
  conditions: string;
  alerts: string[];
}

export interface PredictiveModel {
  id: string;
  type: 'FLOOD' | 'WILDFIRE' | 'STORM' | 'LANDSLIDE';
  location: GeoLocation;
  probability: number;
  timeframe: string;
  confidence: number;
  affectedArea: GeoLocation[];
  recommendations: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Medical triage
export interface TriageRecord {
  id: string;
  patientId: string;
  category: 'CRITICAL' | 'URGENT' | 'DELAYED' | 'MINOR' | 'DECEASED';
  vitals: {
    heartRate: number;
    bloodPressure: string;
    respiratoryRate: number;
    temperature: number;
  };
  injuries: string[];
  location: GeoLocation;
  shelterId?: string;
  assignedTo?: string;
  notes: string;
  timestamp: Date;
}

// Real-time event system
export type EventType =
  | 'INCIDENT_CREATED'
  | 'INCIDENT_UPDATED'
  | 'ALERT_GENERATED'
  | 'UNIT_DISPATCH'
  | 'TELEMETRY_UPDATE'
  | 'WEATHER_UPDATE'
  | 'PREDICTION_UPDATE'
  | 'SHELTER_STATUS_CHANGE'
  | 'LOGISTICS_UPDATE'
  | 'USER_ACTION'
  | 'SYSTEM_STATUS';

export interface Event {
  id: string;
  type: EventType;
  timestamp: Date;
  userId?: string;
  data: Record<string, any>;
  severity?: SeverityLevel;
}

// Dashboard and analytics
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

export interface OperationStatus {
  id: string;
  sector: string;
  threatLevel: SeverityLevel;
  riskScore: number;
  status: string;
  lastUpdate: Date;
  trend: 'INCREASING' | 'STABLE' | 'DECREASING';
}

// Offline-first queue
export interface QueuedAction {
  id: string;
  type: string;
  payload: Record<string, any>;
  createdAt: Date;
  status: 'PENDING' | 'SYNCED' | 'FAILED';
  retryCount: number;
}

// GIS layers and map data
export interface GISLayer {
  id: string;
  name: string;
  type: 'INCIDENTS' | 'UNITS' | 'SHELTERS' | 'WEATHER' | 'EVACUATION' | 'THERMAL' | 'TERRAIN';
  visible: boolean;
  opacity: number;
  style?: Record<string, any>;
}

export interface MapFeature {
  id: string;
  type: 'Point' | 'LineString' | 'Polygon';
  coordinates: [number, number] | [number, number][] | [number, number][][];
  properties: Record<string, any>;
  style?: Record<string, any>;
}

// SMS fallback system
export interface SMSMessage {
  id: string;
  phoneNumber: string;
  message: string;
  type: 'ALERT' | 'NOTIFICATION' | 'INSTRUCTION' | 'CONFIRMATION';
  status: 'PENDING' | 'SENT' | 'DELIVERED' | 'FAILED';
  timestamp: Date;
  retryCount: number;
}

// Offline cache state
export interface CacheState {
  incidents: Incident[];
  alerts: Alert[];
  units: Unit[];
  shelters: Shelter[];
  userData: User;
  lastSync: Date;
  isStale: boolean;
}
