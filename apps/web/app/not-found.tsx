import Link from 'next/link';
import { ArrowLeft, FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6 tech-grid-canvas">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#E8E8ED] shadow-card p-8 sm:p-10 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-8 h-8 stroke-[2.2]" />
        </div>

        <h1 className="text-2xl font-extrabold text-[#1D1D24] mb-2 tracking-tight">
          Page Not Found
        </h1>

        <p className="text-sm text-[#585866] leading-relaxed mb-8">
          The requirement or page you are looking for doesn't exist or has been moved.
        </p>

        <Link href="/">
          <Button variant="primary" className="rounded-full px-6 py-2.5 font-semibold text-xs">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Return to GoPratle
          </Button>
        </Link>
      </div>
    </div>
  );
}

