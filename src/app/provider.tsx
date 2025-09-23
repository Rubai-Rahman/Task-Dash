'use client';

import { useEffect } from 'react';
import { useAuth } from '@/store/authStore';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function Provider({ children }: { children: React.ReactNode }) {
  const { checkAuth, isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    // Check authentication status on app load
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    // Handle redirect only from the login page after successful auth
    if (isAuthenticated && pathname === '/login') {
      const next = searchParams.get('next');
      if (next) {
        router.replace(next);
      } else {
        router.replace('/dashboard');
      }
    }
  }, [isAuthenticated, router, searchParams, pathname]);

  return <>{children}</>;
}
