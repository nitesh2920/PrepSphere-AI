'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface PricingCardProps {
  plan: {
    name: string;
    price: string;
    period: string;
    credits: number;
    features: string[];
    current: boolean;
    popular: boolean;
    icon: React.ReactNode;
    color: string;
  };
  index: number;
  isMember: boolean;
  loading: boolean;
  onCheckout: () => void;
  onManagePayment: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  index,
  isMember,
  loading,
  onCheckout,
  onManagePayment,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="relative"
    >
      <Card className={`h-full transition-all duration-300 hover:shadow-xl ${
        plan.popular 
          ? 'border-orange-500 ring-2 ring-orange-100 dark:ring-orange-900/50 scale-105' 
          : 'border-border hover:border-orange-300'
      }`}>
        {/* Popular Badge */}
        {plan.popular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1">
              Most Popular
            </Badge>
          </div>
        )}

        <CardContent className="p-8">
          {/* Plan Header */}
          <div className="text-center mb-8">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
              plan.color === 'orange' 
                ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}>
              {plan.icon}
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {plan.name}
            </h3>
            
            <div className="mb-4">
              <span className="text-4xl font-bold text-foreground">
                {plan.price}
              </span>
              <span className="text-muted-foreground ml-1">
                {plan.period}
              </span>
            </div>

            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
              plan.color === 'orange'
                ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
            }`}>
              <Zap className="w-3 h-3" />
              {plan.credits} Credits
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4 mb-8">
            {plan.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-muted-foreground">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="mt-auto">
            {plan.name === 'Pro' ? (
              isMember ? (
                <div className="space-y-3">
                  <Button
                    onClick={onManagePayment}
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    {loading ? 'Loading...' : 'Manage Subscription'}
                  </Button>
                  <div className="text-center">
                    <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                      Current Plan
                    </Badge>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={onCheckout}
                  disabled={loading}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold"
                >
                  {loading ? 'Loading...' : 'Upgrade to Pro'}
                </Button>
              )
            ) : (
              <Button
                variant="outline"
                disabled={plan.current}
                className="w-full"
              >
                {plan.current ? 'Current Plan' : 'Select Plan'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PricingCard;