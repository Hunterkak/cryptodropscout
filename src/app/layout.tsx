import './globals.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {

  metadataBase: new URL(
    'https://cryptodropscout.vercel.app'
  ),

  title: {

    default:
      'CryptoDropScout',

    template:
      '%s | CryptoDropScout',

  },

  description:
    'Discover premium crypto airdrops, testnets and Web3 alpha opportunities before everyone else.',

  keywords: [

    'crypto airdrop',
    'testnet',
    'web3',
    'crypto alpha',
    'airdrops',
    'crypto rewards',
    'blockchain',
    'retroactive',
    'airdrop farming',
    'crypto testnet',
    'CryptoDropScout',

  ],

  authors: [

    {
      name:
        'CryptoDropScout',
    },

  ],

  creator:
    'CryptoDropScout',

  publisher:
    'CryptoDropScout',

  openGraph: {

    title:
      'CryptoDropScout',

    description:
      'Discover premium crypto airdrops and Web3 opportunities before everyone else.',

    url:
      'https://cryptodropscout.vercel.app',

    siteName:
      'CryptoDropScout',

    images: [

      {

        url:
          'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200',

        width: 1200,

        height: 630,

        alt:
          'CryptoDropScout',

      },

    ],

    locale: 'en_US',

    type: 'website',

  },

  twitter: {

    card:
      'summary_large_image',

    title:
      'CryptoDropScout',

    description:
      'Discover premium crypto airdrops and testnets.',

    creator:
      '@cryptodrpscout',

    images: [
      'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200',
    ],

  },

  icons: {

    icon: '/favicon.ico',

    shortcut:
      '/favicon.ico',

    apple:
      '/favicon.ico',

  },

  robots: {

    index: true,

    follow: true,

    googleBot: {

      index: true,

      follow: true,

      'max-video-preview':
        -1,

      'max-image-preview':
        'large',

      'max-snippet':
        -1,

    },

  },

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html lang="en">

      <body className="bg-[#050816] text-white overflow-x-hidden antialiased">

        {children}

      </body>

    </html>

  );

}