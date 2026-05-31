'use client';

import { useEffect } from 'react';
import { useOperationsStore } from '@/stores/operationsStore';
import { useAuthStore } from '@/stores/authStore';
import CommandCenterDashboard from '@/components/dashboards/CommandCenterDashboard';
import NDRFDashboard from '@/components/dashboards/NDRFDashboard';
import MedicalDashboard from '@/components/dashboards/MedicalDashboard';
import AnalystDashboard from '@/components/dashboards/AnalystDashboard';
import CivilianDashboard from '@/components/dashboards/CivilianDashboard';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { updateMetrics } = useOperationsStore();

  // Initialize mock metrics
  useEffect(() => {
    updateMetrics({
      activeIncidents: 12,
      affectedPopulation: 45000,
      deployedUnits: 34,
      sheltersOpen: 18,
      aiAccuracy: 94.2,
      systemUptime: 99.8,
      responseTimeAverage: 8.5,
      evacuationProgress: 67,
    });
  }, [updateMetrics]);

  if (!user) return null;

  // Render role-specific dashboard
  const dashboardMap = {
    GOVERNMENT: CommandCenterDashboard,
    NDRF: NDRFDashboard,
    MEDICAL: MedicalDashboard,
    ANALYST: AnalystDashboard,
    CIVILIAN: CivilianDashboard,
    NGO: CommandCenterDashboard,
  };

  const DashboardComponent = dashboardMap[user.role] || CommandCenterDashboard;

  return <DashboardComponent />;
}
