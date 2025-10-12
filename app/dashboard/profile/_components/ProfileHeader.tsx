'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown } from 'lucide-react';
import { User } from '@clerk/nextjs/server';

interface ProfileHeaderProps {
  user: any; // Clerk user type
  isMember: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, isMember }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="mb-8"
    >
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-24"></div>
        <CardContent className="relative pt-0 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12">
            <div className="relative">
              <img
                src={user.imageUrl}
                alt={user.fullName || 'Profile'}
                className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
              />
              {isMember && (
                <div className="absolute -bottom-1 -right-1 bg-orange-500 rounded-full p-1">
                  <Crown className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 sm:ml-4 mt-4 sm:mt-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    {user.fullName || 'User'}
                    {isMember && (
                      <Badge className="bg-orange-500 hover:bg-orange-600 text-white">
                        <Crown className="w-3 h-3 mr-1" />
                        Pro
                      </Badge>
                    )}
                  </h1>
                  <p className="text-muted-foreground">{user.primaryEmailAddress?.emailAddress}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileHeader;