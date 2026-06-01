'use client';

import React, { useEffect } from 'react';
import { useOperationsStore } from '@/stores/operationsStore';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import Flex from '@/components/ui/Flex';
import Alert from '@/components/ui/Alert';
import { formatTimeAgo } from '@/utils/formatters';

const AlertStack = () => {
  const { alerts, acknowledgeAlert } = useOperationsStore();
  const unacknowledged = alerts.filter((a) => !a.acknowledged);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 max-w-md">
      <AnimatePresence mode="popLayout">
        {unacknowledged.slice(0, 3).map((alert, idx) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 20, x: 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 100 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card
              padding="md"
              variant={alert.severity === 'CRITICAL' ? 'danger' : 'default'}
              className={alert.severity === 'CRITICAL' ? 'animate-pulse-glow' : ''}
            >
              <Flex direction="col" gap="sm">
                <Flex justify="between" align="start">
                  <div className="flex-1">
                    <Text variant="body-sm" weight="semibold">
                      {alert.title}
                    </Text>
                    <Text variant="caption" color="secondary" className="mt-1">
                      {alert.message}
                    </Text>
                  </div>
                  <Badge variant="severity" severity={alert.severity} size="sm" />
                </Flex>

                <Flex gap="sm" justify="between">
                  <Text variant="caption" color="tertiary">
                    {formatTimeAgo(alert.createdAt)}
                  </Text>
                  {alert.actionable && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => acknowledgeAlert(alert.id, 'current-user')}
                    >
                      Action
                    </Button>
                  )}
                </Flex>
              </Flex>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {unacknowledged.length > 3 && (
        <Text variant="caption" color="tertiary" className="text-center">
          +{unacknowledged.length - 3} more alerts
        </Text>
      )}
    </div>
  );
};

export default AlertStack;
