'use client';

import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ label }: { label?: string }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex items-center gap-3 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="text-sm font-medium">{label ?? 'Loading...'}</span>
      </div>
    </div>
  );
}


