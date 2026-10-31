import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-[#E8E8ED] bg-white py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7E7E8C]">
          <div className="flex items-center gap-1.5 font-bold text-sm text-[#1D1D24]">
            GoPratle<span className="text-[var(--color-primary)]">.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-[#1D1D24] transition-colors">
              Home
            </Link>
            <Link href="/requirements/new" className="hover:text-[#1D1D24] transition-colors">
              New Requirement
            </Link>
            <span>&copy; {new Date().getFullYear()} GoPratle</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
