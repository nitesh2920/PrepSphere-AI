'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Zap, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface CreditsDisplayProps {
  credits: number;
  isMember: boolean;
  syncing: boolean;
  onSyncCredits: () => void;
}

const CreditsDisplay: React.FC<CreditsDisplayProps> = ({
  credits,
  isMember,
  syncing,
  onSyncCredits,
}) => {
  return (
    <motion.div 
      className="mt-6 flex flex-col items-center gap-3"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.4, duration: 0.3 }}
    >
      <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-4 py-2 rounded-full">
        <Zap className="w-4 h-4" />
        <span className="font-semibold">
          {credits} {credits === 1 ? 'Credit' : 'Credits'} Remaining
        </span>
      </div>
      
      {/* Sync Credits Button for Pro members with 0 credits (manual fix option) */}
      {isMember && credits <= 0 && (
        <Button
          onClick={onSyncCredits}
          disabled={syncing}
          variant="outline"
          size="sm"
          className="text-orange-600 border-orange-300 hover:bg-orange-50"
        >
          {syncing ? (
            <>
              <RefreshCw className="w-3 h-3 mr-2 animate-spin" />
              Syncing...
            </>
          ) : (
            <>
              <RefreshCw className="w-3 h-3 mr-2" />
              Restore Pro Credits
            </>
          )}
        </Button>
      )}
    </motion.div>
  );
};

export default CreditsDisplay;