import { create } from 'zustand';
import { GISLayer, MapFeature } from '@/types';

interface GISStore {
  // Layer management
  layers: GISLayer[];
  activeLayerIds: string[];
  features: MapFeature[];
  
  // Map viewport
  center: [number, number];
  zoom: number;
  bearing: number;
  pitch: number;
  
  // Filtering
  selectedSector: string | null;
  severityFilter: string | null;
  unitTypeFilter: string | null;
  
  // Actions
  addLayer: (layer: GISLayer) => void;
  toggleLayer: (layerId: string) => void;
  updateLayerStyle: (layerId: string, style: Record<string, any>) => void;
  addFeature: (feature: MapFeature) => void;
  updateFeature: (featureId: string, updates: Partial<MapFeature>) => void;
  removeFeature: (featureId: string) => void;
  setMapView: (center: [number, number], zoom: number, bearing?: number, pitch?: number) => void;
  setSectorFilter: (sector: string | null) => void;
  setSeverityFilter: (severity: string | null) => void;
  setUnitTypeFilter: (unitType: string | null) => void;
  resetFilters: () => void;
  getVisibleFeatures: () => MapFeature[];
}

const defaultLayers: GISLayer[] = [
  {
    id: 'incidents',
    name: 'Incidents',
    type: 'INCIDENTS',
    visible: true,
    opacity: 1,
  },
  {
    id: 'units',
    name: 'Rescue Units',
    type: 'UNITS',
    visible: true,
    opacity: 1,
  },
  {
    id: 'shelters',
    name: 'Shelters & Supply',
    type: 'SHELTERS',
    visible: true,
    opacity: 1,
  },
  {
    id: 'weather',
    name: 'Weather Intelligence',
    type: 'WEATHER',
    visible: true,
    opacity: 0.8,
  },
  {
    id: 'evacuation',
    name: 'Evacuation Routes',
    type: 'EVACUATION',
    visible: false,
    opacity: 0.7,
  },
  {
    id: 'thermal',
    name: 'Thermal Drone Feed',
    type: 'THERMAL',
    visible: false,
    opacity: 0.9,
  },
];

export const useGISStore = create<GISStore>((set, get) => ({
  layers: defaultLayers,
  activeLayerIds: defaultLayers.filter((l) => l.visible).map((l) => l.id),
  features: [],
  center: [34.0522, -118.2437],
  zoom: 12,
  bearing: 0,
  pitch: 0,
  selectedSector: null,
  severityFilter: null,
  unitTypeFilter: null,

  addLayer: (layer: GISLayer) =>
    set((state) => ({
      layers: [...state.layers, layer],
    })),

  toggleLayer: (layerId: string) =>
    set((state) => ({
      layers: state.layers.map((layer) =>
        layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
      ),
      activeLayerIds: state.activeLayerIds.includes(layerId)
        ? state.activeLayerIds.filter((id) => id !== layerId)
        : [...state.activeLayerIds, layerId],
    })),

  updateLayerStyle: (layerId: string, style: Record<string, any>) =>
    set((state) => ({
      layers: state.layers.map((layer) =>
        layer.id === layerId
          ? { ...layer, style: { ...layer.style, ...style } }
          : layer
      ),
    })),

  addFeature: (feature: MapFeature) =>
    set((state) => ({
      features: [feature, ...state.features],
    })),

  updateFeature: (featureId: string, updates: Partial<MapFeature>) =>
    set((state) => ({
      features: state.features.map((feature) =>
        feature.id === featureId ? { ...feature, ...updates } : feature
      ),
    })),

  removeFeature: (featureId: string) =>
    set((state) => ({
      features: state.features.filter((f) => f.id !== featureId),
    })),

  setMapView: (center: [number, number], zoom: number, bearing = 0, pitch = 0) =>
    set({ center, zoom, bearing, pitch }),

  setSectorFilter: (sector: string | null) =>
    set({ selectedSector: sector }),

  setSeverityFilter: (severity: string | null) =>
    set({ severityFilter: severity }),

  setUnitTypeFilter: (unitType: string | null) =>
    set({ unitTypeFilter: unitType }),

  resetFilters: () =>
    set({
      selectedSector: null,
      severityFilter: null,
      unitTypeFilter: null,
    }),

  getVisibleFeatures: () => {
    const state = get();
    return state.features.filter((feature) => {
      const layerId = feature.properties?.layerId;
      return state.activeLayerIds.includes(layerId);
    });
  },
}));
