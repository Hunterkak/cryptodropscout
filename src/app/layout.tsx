import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CryptoDropScout | Early Airdrops & Node Guides",
  description:
    "Discover early crypto airdrops, node projects, testnets and Web3 alpha before everyone else.",

  keywords: [
    "crypto airdrop",
    "testnet",
    "node guide",
    "web3",
    "crypto farming",
    "dac chain",
    "quip network",
    "linera",
    "crypto alpha",
  ],

  authors: [{ name: "CryptoDropScout" }],

  openGraph: {
    title: "CryptoDropScout",
    description:
      "Early Web3 opportunities, node projects, testnets and alpha guides.",
    url: "https://cryptodropscout.vercel.app",
    siteName: "CryptoDropScout",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}