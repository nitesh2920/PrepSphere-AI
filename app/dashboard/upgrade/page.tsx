'use client';
import React, { useState } from 'react';
import { Crown, Sparkles } from 'lucide-react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { useCredits } from '@/app/_context/CreditContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import UpgradeHeader from './_components/UpgradeHeader';
import PricingCard from './_components/PricingCard';

const UpgradePage = () => {
  const { user } = useUser();
  const { credits, isMember, refreshCredits, syncMemberCredits } = useCredits();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const OnCheckout = async () => {
    setLoading(true);
    try {
      const result = await axios.post('/api/payment/checkout', {
        priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
      });

      if (result.data?.session?.url) {
        // Redirect in the same tab for better UX
        window.location.href = result.data.session.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const OnManagePayment = async () => {
    setLoading(true);
    try {
      // Get user details for customer ID
      const userResult = await axios.post('/api/user-credits', {
        action: 'get_user_details',
        userEmail: user?.primaryEmailAddress?.emailAddress
      });

      const result = await axios.post('/api/payment/manage-payment', {
        customerId: userResult.data?.customerId,
      });

      if (result.data?.url) {
        window.open(result.data.url, '_blank');
      }
    } catch (error) {
      console.error('Manage payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncCredits = async () => {
    setSyncing(true);
    try {
      await syncMemberCredits();
      toast.success("Credits synced successfully!");
      refreshCredits();
    } catch (error) {
      toast.error("Failed to sync credits. Please try again.");
    } finally {
      setSyncing(false);
    }
  };

  const plans = [
    {
      name: 'Basic',
      price: '₹0',
      period: '/month',
      credits: 5,
      features: [
        '5 Course Generations',
        'Basic Study Materials',
        'Email Support',
        'Community Access',
      ],
      current: !isMember,
      popular: false,
      icon: <Sparkles className="w-6 h-6" />,
      color: 'gray'
    },
    {
      name: 'Pro',
      price: '₹199',
      period: '/month',
      credits: 50,
      features: [
        '50 Course Generations',
        'All Study Materials',
        'Priority Support',
        'Advanced Features',
        'Export Options',
      ],
      current: isMember,
      popular: true,
      icon: <Crown className="w-6 h-6" />,
      color: 'orange'
    },
  ];

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <UpgradeHeader
          credits={credits}
          isMember={isMember}
          syncing={syncing}
          onSyncCredits={handleSyncCredits}
        />

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan}
              index={index}
              isMember={isMember}
              loading={loading}
              onCheckout={OnCheckout}
              onManagePayment={OnManagePayment}
            />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="text-muted-foreground">
            All plans include access to our AI-powered study materials.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UpgradePage;
