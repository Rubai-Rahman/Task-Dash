'use client';

import type React from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/store/authStore';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: ('admin' | 'user')[];
  fallback?: React.ReactNode;
}

export function RoleGuard({
  children,
  allowedRoles,
  fallback,
}: RoleGuardProps) {
  const { user } = useAuth();

  if (!user) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Authentication required to access this content.
        </AlertDescription>
      </Alert>
    );
  }

  if (!allowedRoles.includes(user.role)) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <Alert variant="destructive">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          You don&apos;t have permission to access this content. Required role:{' '}
          {allowedRoles.join(' or ')}.
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
}
