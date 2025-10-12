'use client';
import React from 'react';
import { UserProfile } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCog } from 'lucide-react';

const AccountTab: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCog className="w-5 h-5" />
          Account Management
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Manage your account settings, profile information, and security preferences.
        </p>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <UserProfile
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-0",
                navbar: "hidden",
                pageScrollBox: "p-6",
                page: "",
                profileSectionPrimaryButton: "bg-orange-600 hover:bg-orange-700 text-white",
                formButtonPrimary: "bg-orange-600 hover:bg-orange-700 text-white",
                footerActionLink: "text-orange-600 hover:text-orange-700",
                formFieldLabel: "",
                formFieldInput: "",
                identityPreviewText: "",
                identityPreviewEditButton: "text-orange-600 hover:text-orange-700",
                profileSectionTitle: "",
                profileSectionContent: "",
                accordionTriggerButton: "hover:text-orange-600",
                formFieldSuccessText: "text-green-600",
                formFieldErrorText: "text-red-600"
              },
              variables: {
                colorPrimary: "#ea580c",
                colorBackground: theme === 'dark' ? "#111827" : "#ffffff",
                colorInputBackground: theme === 'dark' ? "#1f2937" : "#ffffff",
                colorText: theme === 'dark' ? "#f9fafb" : "#111827",
                colorTextSecondary: theme === 'dark' ? "#d1d5db" : "#6b7280",
                colorNeutral: theme === 'dark' ? "#374151" : "#f3f4f6",
                colorDanger: "#ef4444",
                colorSuccess: "#22c55e",
                colorWarning: "#f59e0b",
                borderRadius: "0.5rem"
              }
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountTab;