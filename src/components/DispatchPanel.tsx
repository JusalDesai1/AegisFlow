'use client';

import React, { useState } from 'react';
import { useOperationsStore } from '@/stores/operationsStore';
import Card from '@/components/ui/Card';
import Text from '@/components/ui/Text';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Flex from '@/components/ui/Flex';
import Select from '@/components/ui/Select';
import { Unit } from '@/types';
import { formatDistance, formatTimeAgo } from '@/utils/formatters';

interface DispatchPanelProps {
  incidentId: string;
  onDispatch?: (unitId: string) => void;
}

const DispatchPanel = ({ incidentId, onDispatch }: DispatchPanelProps) => {
  const { units } = useOperationsStore();
  const [selectedUnitId, setSelectedUnitId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const availableUnits = units.filter((u) => u.status === 'AVAILABLE');

  const handleDispatch = async () => {
    if (!selectedUnitId) return;
    setIsLoading(true);
    try {
      onDispatch?.(selectedUnitId);
      setSelectedUnitId('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card padding="lg" variant="elevated">
      <Flex direction="col" gap="lg">
        <div>
          <Text as="h3" variant="h3" className="mb-2">
            🚗 Dispatch Units
          </Text>
          <Text color="secondary">
            {availableUnits.length} available units
          </Text>
        </div>

        {/* Unit List */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {availableUnits.map((unit) => (
            <Card
              key={unit.id}
              padding="md"
              interactive
              onClick={() => setSelectedUnitId(unit.id)}
              className={selectedUnitId === unit.id ? 'border-aegis-accent' : ''}
            >
              <Flex justify="between" align="center">
                <div>
                  <Text variant="body" weight="semibold">
                    {unit.callSign}
                  </Text>
                  <Text variant="caption" color="secondary" className="mt-1">
                    {unit.type} • {unit.agency}
                  </Text>
                </div>
                <Flex direction="col" align="end" gap="xs">
                  <Badge variant="status" size="sm">
                    {unit.status}
                  </Badge>
                  <Text variant="caption" color="tertiary">
                    {unit.location.latitude.toFixed(4)}°
                  </Text>
                </Flex>
              </Flex>
            </Card>
          ))}
        </div>

        {/* Dispatch Button */}
        <Button
          onClick={handleDispatch}
          disabled={!selectedUnitId || isLoading}
          loading={isLoading}
          className="w-full"
        >
          Confirm Dispatch
        </Button>
      </Flex>
    </Card>
  );
};

export default DispatchPanel;
