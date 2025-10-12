'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import CreditsDisplay from './CreditsDisplay';

interface UpgradeHeaderProps {
  credits: number;
  isMember: boolean;
  syncing: boolean;
  onSyncCredits: () => void;
}

const UpgradeHeader: React.FC<UpgradeHeaderProps> = ({
  credits,
  isMember,
  syncing,
  onSyncCredits,
}) => {
  const router = useRouter();

  return (
    <>
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mb-6"
      >
        <Button 
          variant="outline" 
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </motion.div>

      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Choose Your Plan
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upgrade to Pro for unlimited course generations and advanced features
        </p>
        
        {/* Current Credits Display */}
        <CreditsDisplay
          credits={credits}
          isMember={isMember}
          syncing={syncing}
          onSyncCredits={onSyncCredits}
        />
      </motion.div>
    </>
  );
};

export default UpgradeHeader;