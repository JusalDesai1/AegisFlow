'use client';

import { useEffect } from 'react';
import useDisasterStore from '@/store/disasterStore';
import type { Disaster } from '@/types';

const mockDisasters: Disaster[] = [
  {
    id: 'disaster-1',
    type: 'flood',
    severity: 'high',
    latitude: 28.7041,
    longitude: 77.1025,
    radius: 15,
    detectedAt: new Date(),
    affectedPopulation: 50000,
    estimatedDamage: 5000000,
    status: 'active',
    description: 'Severe flooding in Delhi area',
    resources: [],
  },
  {
    id: 'disaster-2',
    type: 'earthquake',
    severity: 'critical',
    latitude: 15.8497,
    longitude: 78.0188,
    radius: 25,
    detectedAt: new Date(Date.now() - 3600000),
    affectedPopulation: 150000,
    estimatedDamage: 50000000,
    status: 'active',
    description: 'Earthquake detected in Hyderabad region',
    resources: [],
  },
];

export function useDisasterDetection() {
  const addDisaster = useDisasterStore((state) => state.addDisaster);
  const addAlert = useDisasterStore((state) => state.addAlert);

  useEffect(() => {
    // Initialize with mock data
    mockDisasters.forEach((disaster) => {
      addDisaster(disaster);
      addAlert({
        id: `alert-${disaster.id}`,
        disasterId: disaster.id,
        level: disaster.severity === 'critical' ? 'critical' : 'warning',
        message: `${disaster.type.toUpperCase()} detected: ${disaster.description}`,
        timestamp: disaster.detectedAt,
        recipients: [],
        acknowledged: false,
      });
    });

    // Simulate real-time detection
    const interval = setInterval(() => {
      // Random chance of new disaster (10% every 30s)
      if (Math.random() < 0.1) {
        const types = ['earthquake', 'flood', 'wildfire', 'hurricane'] as const;
        const newDisaster: Disaster = {
          id: `disaster-${Date.now()}`,
          type: types[Math.floor(Math.random() * types.length)],
          severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
          latitude: 8 + Math.random() * 30,
          longitude: 68 + Math.random() * 30,
          radius: 10 + Math.random() * 20,
          detectedAt: new Date(),
          affectedPopulation: Math.floor(Math.random() * 200000),
          estimatedDamage: Math.floor(Math.random() * 100000000),
          status: 'active',
          description: `Automatic detection triggered`,
          resources: [],
        };
        addDisaster(newDisaster);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [addDisaster, addAlert]);
}
