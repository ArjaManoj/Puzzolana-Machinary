import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Puzzolana Machinery | Official Enterprise Industrial Platform',
  description: 'Pioneers in crushing, screening, grinding, and road-building equipment. Explore verified machinery specifications, find your machine, and request B2B quotations.',
  keywords: 'Puzzolana, crushers, jaw crusher, cone crusher, vibrating screen, aggregate plant, mobile crusher, mining equipment, road paver',
  authors: [{ name: 'Puzzolana Engineering' }],
  metadataBase: new URL('https://puzzolana.com'),
  openGraph: {
    title: 'Puzzolana Machinery | Official Corporate Portal',
    description: 'Heavy engineering excellence in crushing, screening, and material handling solutions.',
    url: 'https://puzzolana.com',
    siteName: 'Puzzolana Machinery',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-industrial-950 text-industrial-100 antialiased selection:bg-brand-yellow selection:text-industrial-950">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
