import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FBFBFC]/85 backdrop-blur-md transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-1 group">
          <span className="font-extrabold text-2xl tracking-tight text-[#1D1D24]">
            GoPratle<span className="text-[var(--color-primary)]">.</span>
          </span>
        </Link>

        {/* Center Navigation Pill (Matching Dira Reference) */}
        <nav className="hidden md:flex items-center gap-1 bg-white/90 border border-[#E8E8ED] rounded-full px-2 py-1 shadow-xs">
          <Link
            href="/"
            className="text-xs font-semibold text-[#585866] hover:text-[#1D1D24] px-4 py-2 rounded-full hover:bg-[#F6F6F8] transition-colors"
          >
            Overview
          </Link>
          <a
            href="/#categories"
            className="text-xs font-semibold text-[#585866] hover:text-[#1D1D24] px-4 py-2 rounded-full hover:bg-[#F6F6F8] transition-colors"
          >
            Categories
          </a>
          <a
            href="/#how-it-works"
            className="text-xs font-semibold text-[#585866] hover:text-[#1D1D24] px-4 py-2 rounded-full hover:bg-[#F6F6F8] transition-colors"
          >
            How it works
          </a>
        </nav>

        {/* Right CTA Button */}
        <div className="flex items-center gap-3">
          <Link href="/requirements/new">
            <Button size="sm" variant="primary" className="rounded-full px-5 py-2 font-semibold text-xs shadow-xs">
              Post Requirement
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
