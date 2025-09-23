'use client';

import type React from 'react';

import { useEffect } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { useAuth } from '@/store/authStore';
import { AppSidebar } from '../navigations/collapsablesidebar';
import { Header } from '../navigations/header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function DashboardLayout({
  children,
  title,
  description,
}: DashboardLayoutProps) {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        try {
          const response = await fetch('/api/auth/me');
          if (response.ok) {
            const { user } = await response.json();
            useAuth.setState({ user, isAuthenticated: true });
          }
        } catch (error) {
          console.error('Auth check failed:', error);
        }
      }
    };
    checkAuth();
  }, [isAuthenticated]);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex flex-col">
          <Header title={title} description={description} />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
