import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {

  title: "CryptoDropScout",
  
  description:
    "Discover early Web3 opportunities, airdrops, testnets and nodes before everyone else.",

  keywords: [
    "airdrop",
    "crypto",
    "testnet",
    "web3",
    "nodes",
    "crypto alpha",
  ],

  openGraph: {

    title: "CryptoDropScout",

    description:
      "Discover early Web3 opportunities before everyone else.",

    url: "https://cryptodropscout.vercel.app",

    siteName: "CryptoDropScout",

    images: [
      {
        url: "/projects/dac.png",
        width: 1200,
        height: 630,
      },
    ],

    locale: "en_US",

    type: "website",

  },

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html lang="en">

      <body>
        {children}
      </body>

    </html>

  );

}