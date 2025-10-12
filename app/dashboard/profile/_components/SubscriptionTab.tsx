'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Crown, Zap } from 'lucide-react';
import Link from 'next/link';

interface SubscriptionTabProps {
  credits: number;
  isMember: boolean;
}

const SubscriptionTab: React.FC<SubscriptionTabProps> = ({
  credits,
  isMember,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-orange-500" />
            Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div>
              <div className="text-2xl font-bold">
                {isMember ? 'Pro Plan' : 'Basic Plan'}
              </div>
              <div className="text-lg text-muted-foreground">
                {isMember ? '₹199/month' : 'Free forever'}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Credits per month</span>
                <span className="font-medium">{isMember ? '50' : '5'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Study materials</span>
                <span className="font-medium">{isMember ? 'All types' : 'Basic'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Support</span>
                <span className="font-medium">{isMember ? 'Priority' : 'Email'}</span>
              </div>
            </div>

            {!isMember ? (
              <Link href="/dashboard/upgrade">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Pro
                </Button>
              </Link>
            ) : (
              <Link href="/dashboard/upgrade">
                <Button variant="outline" className="w-full">
                  Manage Subscription
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-500" />
            Usage This Month
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Credits Used</span>
              <span className="font-medium">{(isMember ? 50 : 5) - credits} / {isMember ? 50 : 5}</span>
            </div>

            <Progress
              value={((isMember ? 50 : 5) - credits) / (isMember ? 50 : 5) * 100}
              className="bg-orange-100 dark:bg-orange-900/30 [&>div]:bg-orange-500"
            />

            <div className="text-xs text-muted-foreground">
              {credits} credits remaining
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="text-sm font-medium mb-2">Next Billing</div>
            <div className="text-sm text-muted-foreground">
              {isMember ? 'Your credits will refresh on your next billing date' : 'No billing - you\'re on the free plan'}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionTab;