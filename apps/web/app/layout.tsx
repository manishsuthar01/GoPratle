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
      <body className="flex flex-col min-h-screen bg-[var(--color-background)] text-[var(--color-text-main)] antialiased selection:bg-[var(--color-primary-light)] selection:text-[var(--color-primary)]">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
