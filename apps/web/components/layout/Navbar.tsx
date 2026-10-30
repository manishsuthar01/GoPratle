import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/70 bg-[#FAF9F6]/90 backdrop-blur-md transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-indigo-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-slate-900 leading-tight">
              GoPratle
            </span>
            <span className="text-[11px] font-medium tracking-wide text-slate-500 uppercase">
              Requirement Studio
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors hidden sm:inline-block"
          >
            How it works
          </Link>
          <Link href="/requirements/new">
            <Button size="sm" variant="primary">
              Post Requirement
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}

