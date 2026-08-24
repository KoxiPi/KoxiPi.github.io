import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://koxipi.github.io'),
  title: 'Shenglong Chen — Software Engineer',
  description: 'Software engineer building reliable backend systems, cloud infrastructure, and intelligent applications.',
  keywords: ['Shenglong Chen', 'software engineer', 'backend development', 'cloud computing', 'distributed systems', 'machine learning', 'Vancouver'],
  authors: [{ name: 'Shenglong Chen' }],
  openGraph: {
    type: 'website',
    title: 'Shenglong Chen — Software Engineer',
    description: 'Building reliable backend systems, cloud infrastructure, and intelligent applications.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Shenglong Chen — Software Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shenglong Chen — Software Engineer',
    description: 'Building reliable backend systems, cloud infrastructure, and intelligent applications.',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
