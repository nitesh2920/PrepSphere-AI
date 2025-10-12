'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  User,
  Mail,
  Calendar,
  Zap,
  Shield,
  Award
} from 'lucide-react';

interface OverviewTabProps {
  user: any; // Clerk user type
  credits: number;
  isMember: boolean;
  memberSince: string;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  user,
  credits,
  isMember,
  memberSince,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Account Information */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>{user.fullName || 'Not provided'}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{user.primaryEmailAddress?.emailAddress}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{memberSince}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Account Status</label>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <span>{user.emailAddresses[0]?.verification?.status === 'verified' ? 'Verified' : 'Unverified'}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Credits & Quick Stats */}
      <div className="space-y-6">
        {/* Credits Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500" />
              Credits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {credits}
              </div>
              <div className="text-sm text-muted-foreground">
                out of {isMember ? 50 : 5} credits
              </div>
            </div>

            <Progress
              value={isMember ? (credits / 50) * 100 : (credits / 5) * 100}
              className="mb-4 bg-orange-100 dark:bg-orange-900/30 [&>div]:bg-orange-500"
            />

            <div className="text-xs text-muted-foreground text-center">
              {isMember ? 'Credits refresh monthly' : 'Upgrade for more credits'}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-500" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Credits Used</span>
              <span className="font-medium">{(isMember ? 50 : 5) - credits}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Plan Type</span>
              <Badge variant={isMember ? "default" : "secondary"}>
                {isMember ? 'Pro' : 'Basic'}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Account Type</span>
              <span className="font-medium">Personal</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;