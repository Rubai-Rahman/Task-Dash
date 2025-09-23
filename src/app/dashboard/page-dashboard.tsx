'use client';

import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { TaskChart } from '@/components/dashboard/task-chart';
import { RecentTasks } from '@/components/dashboard/recent-task';
import { useDataStore } from '@/lib/data/data-store';

export default function DashboardPageContent() {
  const { stats, tasks, isLoading, fetchDashboardData } = useDataStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <DashboardLayout
      title="Dashboard"
      description="Welcome back! Here's what's happening with your projects."
    >
      <div className="space-y-6">
        <StatsCards stats={stats} isLoading={isLoading} />
        <TaskChart tasks={tasks} isLoading={isLoading} />
        <RecentTasks tasks={tasks} isLoading={isLoading} />
      </div>
    </DashboardLayout>
  );
}
