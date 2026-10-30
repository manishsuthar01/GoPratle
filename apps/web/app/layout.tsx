import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'GoPratle — Event Requirement Studio',
  description:
    'A streamlined platform that helps event organizers describe exactly what they need and connect their requirements with the right professionals.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen bg-[#FAF9F6] text-slate-900 antialiased selection:bg-indigo-100 selection:text-indigo-900">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

