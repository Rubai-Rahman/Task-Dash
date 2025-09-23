'use client';

import ErrorState from '@/components/main/error-state';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      message={error?.message || 'Unexpected error'}
      onRetry={reset}
    />
  );
}
