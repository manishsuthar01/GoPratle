'use client';

import React from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-[#FBFBFC] text-[#1D1D24] p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#E8E8ED] shadow-xl p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#FDF2F3] text-[#C93B49] flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
            !
          </div>
          <h1 className="text-2xl font-extrabold mb-2 tracking-tight">Critical Error</h1>
          <p className="text-sm text-[#585866] mb-8 leading-relaxed">
            The application encountered a critical runtime error.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => reset()}
              className="px-5 py-2.5 rounded-full bg-[#C93B49] text-white text-xs font-semibold hover:bg-[#B42E3C] transition-colors"
            >
              Reload Application
            </button>
            <Link
              href="/"
              className="px-5 py-2.5 rounded-full border border-[#E8E8ED] bg-white text-xs font-semibold hover:bg-[#F6F6F8] transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}

