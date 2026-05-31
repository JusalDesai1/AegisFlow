export const INCIDENT_TYPES = [
  { id: 'FLOOD', label: 'Flash Flood', icon: '💧' },
  { id: 'WILDFIRE', label: 'Wildfire', icon: '🔥' },
  { id: 'EARTHQUAKE', label: 'Earthquake', icon: '⚡' },
  { id: 'STORM', label: 'Storm', icon: '⛈️' },
  { id: 'LANDSLIDE', label: 'Landslide', icon: '🏔️' },
];

export const SEVERITY_LEVELS = [
  { id: 'CRITICAL', label: 'Critical', color: '#ff3333' },
  { id: 'HIGH', label: 'High', color: '#ff6b4a' },
  { id: 'MODERATE', label: 'Moderate', color: '#ffa500' },
  { id: 'LOW', label: 'Low', color: '#00b8e6' },
  { id: 'INFO', label: 'Info', color: '#a0aec0' },
];

export const UNIT_TYPES = [
  { id: 'RESCUE', label: 'Rescue Team' },
  { id: 'MEDICAL', label: 'Medical Unit' },
  { id: 'LOGISTICS', label: 'Logistics' },
  { id: 'DRONE', label: 'Drone' },
  { id: 'ROBOT', label: 'Robot' },
];

export const USER_ROLES = [
  { id: 'NDRF', label: 'NDRF Commander' },
  { id: 'GOVERNMENT', label: 'Government Official' },
  { id: 'MEDICAL', label: 'Medical Coordinator' },
  { id: 'NGO', label: 'NGO Liaison' },
  { id: 'ANALYST', label: 'Data Analyst' },
  { id: 'CIVILIAN', label: 'Civilian' },
];

export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
  verySlow: 1000,
};

export const MAP_BOUNDS = {
  minZoom: 4,
  maxZoom: 20,
  defaultZoom: 12,
  defaultCenter: [34.0522, -118.2437] as [number, number],
};
