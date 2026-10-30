import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="font-bold text-base text-slate-900">GoPratle</div>
            <p className="text-xs text-slate-500 mt-1">
              Event Requirement Studio — Streamlining modern event coordination.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <Link href="/requirements/new" className="hover:text-slate-900 transition-colors">
              New Requirement
            </Link>
            <span>&copy; {new Date().getFullYear()} GoPratle Inc. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

