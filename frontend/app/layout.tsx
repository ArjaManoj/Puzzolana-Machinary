import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateOrganizationSchema } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL('https://puzzolana.com'),
  title: {
    default: 'Puzzolana Machinery | Official Enterprise Industrial Platform',
    template: '%s | Puzzolana Machinery OEM',
  },
  description:
    'Global leaders in crushing, screening, grinding, sand washing, track mobile plants, and road-building equipment. Explore verified machinery specifications, find your machine, and request B2B quotations.',
  keywords: [
    'Puzzolana',
    'crushers',
    'jaw crusher',
    'cone crusher',
    'vsi crusher',
    'vibrating screen',
    'aggregate plant',
    'mobile crusher',
    'track mounted crusher',
    'mining equipment',
    'm-sand washing',
    'road paver',
    'surface miner',
    'Hyderabad foundry',
  ],
  authors: [{ name: 'Puzzolana Engineering Bureau', url: 'https://puzzolana.com' }],
  creator: 'Puzzolana Machinery Fabricators',
  publisher: 'Puzzolana Machinery Fabricators (Hyderabad) Pvt. Ltd.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Puzzolana Machinery | Heavy Crushing & Mining Equipment OEM',
    description:
      'Heavy engineering excellence in crushing, screening, sand washing, and infrastructure equipment. 60+ years of manufacturing leadership from Hyderabad, India.',
    url: 'https://puzzolana.com',
    siteName: 'Puzzolana Machinery',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Puzzolana Heavy Industrial Machinery & Crushing Fleet',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Puzzolana Machinery | Heavy Crushing & Mining Equipment OEM',
    description:
      'Explore verified industrial crushing specifications, process flowsheets, and genuine OEM wear parts.',
    creator: '@PuzzolanaOEM',
    images: ['https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://puzzolana.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = generateOrganizationSchema();

  return (
    <html lang="en" className="dark">
      <head>
        <JsonLd data={orgSchema} />
      </head>
      <body className="min-h-screen flex flex-col bg-industrial-950 text-industrial-100 antialiased selection:bg-brand-yellow selection:text-industrial-950">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
