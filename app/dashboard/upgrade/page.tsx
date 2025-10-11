'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs/db';
import { USER_TABLE } from '@/configs/schema';
import { eq } from 'drizzle-orm';

const UpgradePage = () => {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<any>(null);

  useEffect(() => {
    if (user) GetUserDetail();
  }, [user]);

  const GetUserDetail = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      console.error('User email not available');
      return;
    }

    const result = await db
      .select()
      .from(USER_TABLE)
      .where(eq(USER_TABLE.email, user.primaryEmailAddress.emailAddress));

    if (result.length > 0) setUserDetail(result[0]);
  };

  const OnCheckout = async () => {
    try {
      const result = await axios.post('/api/payment/checkout', {
        priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
      });

      if (result.data?.session?.url) {
        window.open(result.data.session.url, '_blank');
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  const OnManagePayment =async () => {
    console.log("onmagnae ka nandar",userDetail)

    const result = await axios.post('/api/payment/manage-payment', {
      customerId: userDetail?.customerId,
    })
    console.log("datdfdfa",result.data.url)
    window.open(result.data?.url)

 
    
  }

  // ✅ Dynamically set plan states
  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: '/month',
      features: [
        '5 Course Generate',
        'Limited Support',
        'Email Support',
        'Help Center Access',
      ],
      current: !userDetail?.isMember,
      buttonText: !userDetail?.isMember ? 'Current Plan' : 'Select',
      buttonVariant: !userDetail?.isMember ? 'outline' : 'default' as const,
    },
    {
      name: 'Monthly',
      price: '₹199',
      period: '/month',
      features: [
        'Unlimited Course Generate',
        'Unlimited Flashcard & Quiz',
        'Priority Email Support',
        'Help Center Access',
      ],
      current: !!userDetail?.isMember,
      buttonText: userDetail?.isMember ? 'Manage Payment' : 'Get Started',
      buttonVariant: 'default' as const,
    },
  ];

  return (
 
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
           {/* {console.log(userDetail.isMember)} */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Plans
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Upgrade your plan to generate unlimited courses for your exams
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-8 lg:gap-16 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative w-full max-w-sm lg:max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl ${
                plan.name === 'Monthly'
                  ? 'border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/50 transform lg:scale-105'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {/* Popular Badge */}
              {plan.name === 'Monthly' && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8 lg:p-10">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {plan.name}
                  </h3>
                  <div className="mb-6">
                    <span className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-lg text-gray-500 dark:text-gray-400 ml-1">
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-5 mb-10">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Check className="w-6 h-6 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300 text-lg">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Button logic */}
                {plan.name === 'Monthly' ? (
                  userDetail?.isMember ? (
                    <>
                      {/* Show both buttons when member */}
                      <Button
                        onClick={OnManagePayment}
                        className="w-full py-4 text-lg font-semibold rounded-xl bg-green-600 hover:bg-green-700 text-white shadow-lg"
                      >
                        Manage Payment
                      </Button>
                      <div className="text-center mt-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          Your current plan
                        </span>
                      </div>
                    </>
                  ) : (
                    <Button
                      onClick={OnCheckout}
                      className="w-full py-4 text-lg font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      Get Started
                    </Button>
                  )
                ) : (
                  <Button
                    variant={plan.buttonVariant}
                    className="w-full py-4 text-lg font-semibold rounded-xl border-2"
                    disabled={plan.current}
                  >
                    {plan.buttonText}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            All plans include our core features and 24/7 customer support
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
