'use client';
import { SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex items-center gap-3 text-muted-foreground">
        <SearchX className="h-5 w-5" />
        <span className="text-sm font-medium">Page not found</span>
      </div>
    </div>
  );
}
