'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6 tech-grid-canvas">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#E8E8ED] shadow-card p-8 sm:p-10 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 stroke-[2.2]" />
        </div>

        <h1 className="text-2xl font-extrabold text-[#1D1D24] mb-2 tracking-tight">
          Something went wrong
        </h1>

        <p className="text-sm text-[#585866] leading-relaxed mb-8">
          An unexpected error occurred while rendering this page. You can try refreshing the component or return to the home page.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Button
            onClick={() => reset()}
            variant="primary"
            className="rounded-full px-5 py-2.5 font-semibold text-xs"
          >
            <RotateCcw className="w-4 h-4 mr-1.5" />
            Try Again
          </Button>
          <Link href="/">
            <Button
              variant="outline"
              className="rounded-full px-5 py-2.5 font-semibold text-xs"
            >
              <Home className="w-4 h-4 mr-1.5" />
              Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
