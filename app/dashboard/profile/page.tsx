'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  User,
  ArrowLeft,
  UserCog,
  CreditCard
} from 'lucide-react'
import { useCredits } from '@/app/_context/CreditContext'
import { useRouter } from 'next/navigation'
import ProfileHeader from './_components/ProfileHeader'
import OverviewTab from './_components/OverviewTab'
import AccountTab from './_components/AccountTab'
import SubscriptionTab from './_components/SubscriptionTab'

const ProfilePage = () => {
  const { user } = useUser()
  const { credits, isMember } = useCredits()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  const memberSince = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'Unknown'

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-6 max-w-6xl">
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

        <ProfileHeader user={user} isMember={isMember} />

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="account" className="flex items-center gap-2">
                <UserCog className="w-4 h-4" />
                Account Settings
              </TabsTrigger>
              <TabsTrigger value="subscription" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Subscription
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <OverviewTab
                user={user}
                credits={credits}
                isMember={isMember}
                memberSince={memberSince}
              />
            </TabsContent>

            {/* Account Settings Tab */}
            <TabsContent value="account" className="space-y-6">
              <AccountTab />
            </TabsContent>

            {/* Subscription Tab */}
            <TabsContent value="subscription" className="space-y-6">
              <SubscriptionTab credits={credits} isMember={isMember} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ProfilePage