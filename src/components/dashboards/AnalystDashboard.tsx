'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import Text from '@/components/ui/Text';
import Flex from '@/components/ui/Flex';

const AnalystDashboard = () => {
  return (
    <div className="space-y-6 p-6">
      <Text as="h2" variant="h2">Data Analytics Dashboard</Text>
      <Card padding="lg" variant="elevated">
        <Flex direction="col" gap="md">
          <Text variant="body">Intelligence & Predictive Models</Text>
          <div className="h-96 bg-gradient-to-b from-aegis-darker to-slate-900 rounded border border-aegis-border flex items-center justify-center">
            <Text color="tertiary">Analytics Interface - Coming Soon</Text>
          </div>
        </Flex>
      </Card>
    </div>
  );
};

export default AnalystDashboard;
