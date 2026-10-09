import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '🌸 Neo-Edo: Tokyo • Interactive Travel Platform | Andy Briceño',
  description:
    'My Town, the Best Town: Tokyo, Japan. An interactive travel guide with a subway simulation, a sumo ring, a sakura tree and live text editing.',
  icons: {
    icon: '/sakura.svg',
    shortcut: '/sakura.svg',
    apple: '/sakura.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/sakura.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#090b10] text-[#e2e8f0] antialiased selection:bg-pink-500/30 selection:text-pink-200`}
      >
        {children}
      </body>
    </html>
  );
}
