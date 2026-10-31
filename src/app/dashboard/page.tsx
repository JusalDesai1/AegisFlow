import { create } from 'zustand';
import { defaultLayers, mockMapFeatures } from '@/lib/mockData';
import type { GISLayer, MapFeature } from '@/types';

interface GISStore {
  layers: GISLayer[];
  activeLayerIds: string[];
  features: MapFeature[];
  center: [number, number];
  zoom: number;
  bearing: number;
  pitch: number;
  selectedSector: string | null;
  severityFilter: string | null;
  unitTypeFilter: string | null;
  addLayer: (layer: GISLayer) => void;
  toggleLayer: (layerId: string) => void;
  updateLayerStyle: (layerId: string, style: Record<string, unknown>) => void;
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

export const useGISStore = create<GISStore>((set, get) => ({
  layers: defaultLayers,
  activeLayerIds: defaultLayers.filter((layer) => layer.visible).map((layer) => layer.id),
  features: mockMapFeatures,
  center: [19.076, 72.8777],
  zoom: 11,
  bearing: 0,
  pitch: 0,
  selectedSector: null,
  severityFilter: null,
  unitTypeFilter: null,

  addLayer: (layer: GISLayer) => set((state) => ({ layers: [...state.layers, layer] })),

  toggleLayer: (layerId: string) =>
    set((state) => ({
      layers: state.layers.map((layer) =>
        layer.id === layerId ? { ...layer, visible: !layer.visible } : layer,
      ),
      activeLayerIds: state.activeLayerIds.includes(layerId)
        ? state.activeLayerIds.filter((id) => id !== layerId)
        : [...state.activeLayerIds, layerId],
    })),

  updateLayerStyle: (layerId: string, style: Record<string, unknown>) =>
    set((state) => ({
      layers: state.layers.map((layer) =>
        layer.id === layerId ? { ...layer, style: { ...(layer.style ?? {}), ...style } } : layer,
      ),
    })),

  addFeature: (feature: MapFeature) =>
    set((state) => ({ features: [feature, ...state.features] })),

  updateFeature: (featureId: string, updates: Partial<MapFeature>) =>
    set((state) => ({
      features: state.features.map((feature) =>
        feature.id === featureId ? { ...feature, ...updates } : feature,
      ),
    })),

  removeFeature: (featureId: string) =>
    set((state) => ({ features: state.features.filter((feature) => feature.id !== featureId) })),

  setMapView: (center: [number, number], zoom: number, bearing = 0, pitch = 0) =>
    set({ center, zoom, bearing, pitch }),

  setSectorFilter: (sector: string | null) => set({ selectedSector: sector }),
  setSeverityFilter: (severity: string | null) => set({ severityFilter: severity }),
  setUnitTypeFilter: (unitType: string | null) => set({ unitTypeFilter: unitType }),

  resetFilters: () =>
    set({
      selectedSector: null,
      severityFilter: null,
      unitTypeFilter: null,
    }),

  getVisibleFeatures: () => {
    const state = get();
    return state.features.filter((feature) => state.activeLayerIds.includes(feature.layerId));
  },
}));
