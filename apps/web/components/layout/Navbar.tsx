import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E8E8ED]/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-extrabold text-xl tracking-tight text-[#1D1D24]">
            GoPratle<span className="text-[var(--color-primary)]">.</span>
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs font-semibold text-[#585866] hover:text-[#1D1D24] transition-colors hidden sm:inline-block"
          >
            How it works
          </Link>
          <Link href="/requirements/new">
            <Button size="sm" variant="primary" className="rounded-full px-4 font-semibold">
              Post Requirement
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
