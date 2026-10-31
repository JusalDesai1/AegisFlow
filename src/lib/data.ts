import { mockAlerts, mockDispatches, mockIncidents, mockMetrics, mockMapFeatures, mockShelters, mockUnits } from '@/lib/mockData';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function getDashboardSnapshotFromDb() {
  if (!isSupabaseConfigured || !supabase) {
    return {
      metrics: mockMetrics,
      incidents: mockIncidents,
      alerts: mockAlerts,
      units: mockUnits,
      shelters: mockShelters,
      dispatches: mockDispatches,
      features: mockMapFeatures,
    };
  }

  const [incidentsResult, alertsResult, unitsResult, sheltersResult, dispatchesResult] = await Promise.all([
    supabase.from('incidents').select('*').order('reported_at', { ascending: false }),
    supabase.from('alerts').select('*').order('created_at', { ascending: false }),
    supabase.from('units').select('*').order('name', { ascending: true }),
    supabase.from('shelters').select('*').order('name', { ascending: true }),
    supabase.from('dispatches').select('*').order('assigned_at', { ascending: false }),
  ]);

  const incidents = incidentsResult.data ?? [];
  const alerts = alertsResult.data ?? [];
  const units = unitsResult.data ?? [];
  const shelters = sheltersResult.data ?? [];
  const dispatches = dispatchesResult.data ?? [];

  return {
    metrics: mockMetrics,
    incidents,
    alerts,
    units,
    shelters,
    dispatches,
    features: mockMapFeatures,
  };
}
