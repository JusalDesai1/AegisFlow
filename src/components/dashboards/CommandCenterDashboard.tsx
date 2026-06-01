'use client';

import React from 'react';
import { useOperationsStore } from '@/stores/operationsStore';
import Card from '@/components/ui/Card';
import Text from '@/components/ui/Text';
import Badge from '@/components/ui/Badge';
import Flex from '@/components/ui/Flex';
import Grid from '@/components/ui/Grid';
import { formatNumber, formatPercentage } from '@/utils/formatters';

const CommandCenterDashboard = () => {
  const { metrics, incidents, alerts, units } = useOperationsStore();

  const kpiCards = [
    {
      icon: '🚨',
      title: 'Active Incidents',
      value: metrics.activeIncidents,
      change: '+3 this hour',
      trend: 'up',
    },
    {
      icon: '👥',
      title: 'Affected Population',
      value: formatNumber(metrics.affectedPopulation),
      change: '+12,500 since morning',
      trend: 'up',
    },
    {
      icon: '🚁',
      title: 'Deployed Units',
      value: metrics.deployedUnits,
      change: '8 en route',
      trend: 'stable',
    },
    {
      icon: '🏢',
      title: 'Shelters Open',
      value: metrics.sheltersOpen,
      change: '45,000 capacity',
      trend: 'stable',
    },
    {
      icon: '🤖',
      title: 'AI Accuracy',
      value: `${formatPercentage(metrics.aiAccuracy)}%`,
      change: '↑ 2.3% this week',
      trend: 'up',
    },
    {
      icon: '✅',
      title: 'System Uptime',
      value: `${formatPercentage(metrics.systemUptime)}%`,
      change: '0 incidents this month',
      trend: 'stable',
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* KPI Grid */}
      <div>
        <Text as="h2" variant="h2" className="mb-4">Command Center Overview</Text>
        <Grid cols={3} gap="md">
          {kpiCards.map((card, idx) => (
            <Card key={idx} variant="default" padding="lg" interactive>
              <Flex direction="col" gap="md">
                <div className="text-4xl">{card.icon}</div>
                <div>
                  <Text variant="body-sm" color="secondary" className="mb-1">
                    {card.title}
                  </Text>
                  <Text variant="h3" className="mb-2">{card.value}</Text>
                  <Flex justify="between" align="center">
                    <Text variant="caption" color="tertiary">{card.change}</Text>
                    <Badge
                      variant="info"
                      size="sm"
                      className={card.trend === 'up' ? 'text-aegis-critical' : ''}
                    >
                      {card.trend === 'up' ? '↑' : '→'}
                    </Badge>
                  </Flex>
                </div>
              </Flex>
            </Card>
          ))}
        </Grid>
      </div>

      {/* Active Incidents */}
      <div>
        <Text as="h2" variant="h2" className="mb-4">Active Incidents</Text>
        <div className="space-y-2">
          {incidents.length > 0 ? (
            incidents.slice(0, 5).map((incident) => (
              <Card key={incident.id} padding="md" variant="elevated">
                <Flex justify="between" align="center">
                  <div>
                    <Text variant="body" weight="semibold" className="mb-1">
                      {incident.title}
                    </Text>
                    <Text variant="caption" color="secondary">
                      📍 {incident.affectedArea} • {incident.type}
                    </Text>
                  </div>
                  <Badge variant="severity" severity={incident.severity} />
                </Flex>
              </Card>
            ))
          ) : (
            <Card padding="md" className="text-center">
              <Text color="tertiary">No active incidents</Text>
            </Card>
          )}
        </div>
      </div>

      {/* Recent Alerts */}
      <div>
        <Text as="h2" variant="h2" className="mb-4">Alert Feed</Text>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {alerts.length > 0 ? (
            alerts.slice(0, 10).map((alert) => (
              <Card
                key={alert.id}
                padding="sm"
                variant={alert.acknowledged ? 'default' : 'elevated'}
              >
                <Flex justify="between" align="start" gap="sm">
                  <div className="flex-1">
                    <Text variant="body-sm" weight="semibold">
                      {alert.title}
                    </Text>
                    <Text variant="caption" color="secondary" className="mt-1">
                      {alert.type}
                    </Text>
                  </div>
                  {!alert.acknowledged && (
                    <Badge variant="severity" severity={alert.severity} size="sm" />
                  )}
                </Flex>
              </Card>
            ))
          ) : (
            <Card padding="md" className="text-center">
              <Text color="tertiary">No new alerts</Text>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandCenterDashboard;
