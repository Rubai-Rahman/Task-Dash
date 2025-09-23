'use client';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ProfileForm } from '@/components/profile/profile-form';
import { AccountSettings } from '@/components/profile/account-settings';
import { ActivityFeed } from '@/components/profile/activity-feed';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Settings, Activity } from 'lucide-react';

export default function ProfilePageContent() {
  return (
    <DashboardLayout
      title="Profile"
      description="Manage your account settings and preferences."
    >
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Activity</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <ProfileForm />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <AccountSettings />
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <ActivityFeed />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
