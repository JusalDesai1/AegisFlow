'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import Text from '@/components/ui/Text';
import Flex from '@/components/ui/Flex';

const CivilianDashboard = () => {
  return (
    <div className="space-y-6 p-6">
      <Text as="h2" variant="h2">Emergency Resources Portal</Text>
      <Card padding="lg" variant="elevated">
        <Flex direction="col" gap="md">
          <Text variant="body">Find Shelters & Safety Information</Text>
          <div className="h-96 bg-gradient-to-b from-aegis-darker to-slate-900 rounded border border-aegis-border flex items-center justify-center">
            <Text color="tertiary">Public Resources - Coming Soon</Text>
          </div>
        </Flex>
      </Card>
    </div>
  );
};

export default CivilianDashboard;
