'use client';

import { AlertTriangle } from 'lucide-react';

export default function ErrorState({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-destructive">
        <AlertTriangle className="h-6 w-6" />
        <p className="text-sm font-medium">
          {message || 'Something went wrong. Please try again.'}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-1 rounded-md px-3 py-1.5 text-xs bg-destructive text-destructive-foreground hover:opacity-90"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}


