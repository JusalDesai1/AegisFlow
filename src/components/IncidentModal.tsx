'use client';

import React, { useEffect, useState } from 'react';
import { useOperationsStore } from '@/stores/operationsStore';
import { Incident } from '@/types';
import Modal from '@/components/ui/Modal';
import Card from '@/components/ui/Card';
import Text from '@/components/ui/Text';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Flex from '@/components/ui/Flex';
import { formatDate, formatCoordinates, getSeverityColor } from '@/utils/formatters';

interface IncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  incidentId?: string;
}

const IncidentModal = ({ isOpen, onClose, incidentId }: IncidentModalProps) => {
  const { incidents } = useOperationsStore();
  const [incident, setIncident] = useState<Incident | null>(null);

  useEffect(() => {
    if (incidentId) {
      const found = incidents.find((i) => i.id === incidentId);
      setIncident(found || null);
    }
  }, [incidentId, incidents]);

  if (!incident) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Incident Details" size="lg">
      <div className="space-y-6">
        {/* Header */}
        <Flex justify="between" align="start">
          <div>
            <Text as="h3" variant="h3" className="mb-2">
              {incident.title}
            </Text>
            <Text color="secondary" className="mb-3">
              {incident.description}
            </Text>
            <Flex gap="sm" align="center">
              <Badge variant="severity" severity={incident.severity} />
              <Badge>{incident.type}</Badge>
              <Badge>{incident.status}</Badge>
            </Flex>
          </div>
        </Flex>

        {/* Location */}
        <Card padding="md" className="bg-aegis-darker">
          <Text variant="body-sm" weight="semibold" className="mb-2">
            📍 Location
          </Text>
          <Text variant="body" className="mb-2">
            {incident.affectedArea}
          </Text>
          <Text variant="caption" color="tertiary" className="font-mono">
            {formatCoordinates(incident.location.latitude, incident.location.longitude)}
          </Text>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <Card padding="md" className="bg-aegis-darker">
            <Text variant="caption" color="secondary" className="mb-2">
              Affected Population
            </Text>
            <Text variant="h4" className="text-aegis-success">
              {incident.affectedPopulation.toLocaleString()}
            </Text>
          </Card>
          <Card padding="md" className="bg-aegis-darker">
            <Text variant="caption" color="secondary" className="mb-2">
              Estimated Impact
            </Text>
            <Text variant="h4" className="text-aegis-accent">
              {incident.estimatedImpact}%
            </Text>
          </Card>
        </div>

        {/* Timeline */}
        <Card padding="md" className="bg-aegis-darker">
          <Text variant="body-sm" weight="semibold" className="mb-3">
            🕐 Timeline
          </Text>
          <Flex direction="col" gap="sm">
            <Flex justify="between">
              <Text variant="caption" color="secondary">
                Reported
              </Text>
              <Text variant="caption">{formatDate(incident.reportedAt)}</Text>
            </Flex>
            <Flex justify="between">
              <Text variant="caption" color="secondary">
                Last Update
              </Text>
              <Text variant="caption">{formatDate(incident.updatedAt)}</Text>
            </Flex>
          </Flex>
        </Card>

        {/* Tags */}
        {incident.tags.length > 0 && (
          <div>
            <Text variant="body-sm" weight="semibold" className="mb-2">
              Tags
            </Text>
            <Flex gap="sm" wrap>
              {incident.tags.map((tag) => (
                <Badge key={tag} variant="info">
                  {tag}
                </Badge>
              ))}
            </Flex>
          </div>
        )}

        {/* Actions */}
        <Flex gap="md">
          <Button variant="primary" className="flex-1">
            Dispatch Units
          </Button>
          <Button variant="secondary" className="flex-1">
            View Map
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </Flex>
      </div>
    </Modal>
  );
};

export default IncidentModal;
