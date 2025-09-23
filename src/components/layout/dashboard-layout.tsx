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
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (!response.ok) {
          // If not authenticated, redirect to login
          window.location.href = `/login?next=${encodeURIComponent(
            window.location.pathname
          )}`;
          return;
        }
        const { user } = await response.json();
        useAuth.setState({ user, isAuthenticated: true });
      } catch (error) {
        console.error('Auth check failed:', error);
        window.location.href = `/login?next=${encodeURIComponent(
          window.location.pathname
        )}`;
      }
    };
    checkAuth();
  }, []);

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
