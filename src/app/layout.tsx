import './globals.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {

  metadataBase: new URL(
    'https://cryptodropscout.vercel.app'
  ),

  title: 'CryptoDropScout',

  description:
    'Premium Crypto Airdrop & Testnet Discovery Platform',

  openGraph: {

    title: 'CryptoDropScout',

    description:
      'Discover premium crypto airdrops and testnets.',

    url: 'https://cryptodropscout.vercel.app',

    siteName: 'CryptoDropScout',

    images: [
      {
        url: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200',
        width: 1200,
        height: 630,
      },
    ],

    locale: 'en_US',

    type: 'website',

  },

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html lang="en">

      <body className="bg-[#050816] text-white overflow-x-hidden">

        {children}

      </body>

    </html>

  );

}