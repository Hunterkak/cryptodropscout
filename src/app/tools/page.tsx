"use client";

import Link from "next/link";
import { useState } from "react";

export default function ToolsPage() {

  const [walletOpen, setWalletOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("all");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  const tools = [
    {
      title: "CDS Nexus",
      description: "Premium multi-chain swap & bridge aggregator powered by 0x, LI.FI and Socket.",
      icon: "🌉",
      href: "/tools/dex-bridge",
      modal: false,
    },
    {
      title: "Airdrop Reward Calculator",
      description: "Estimate your potential crypto airdrop earnings instantly.",
      icon: "💰",
      href: "/tools/airdrop-calculator",
      modal: false,
    },
    {
      title: "Gas Fee Tracker",
      description: "Track Ethereum and Layer2 gas fees in real time.",
      icon: "⛽",
      href: "/tools/gas-tracker",
      modal: false,
    },
    {
      title: "Crypto Converter",
      description: "Convert crypto prices and token values quickly.",
      icon: "📈",
      href: "/tools/crypto-converter",
      modal: false,
    },
    {
      title: "Node Profit Estimator",
      description: "Calculate validator and node running profitability.",
      icon: "🖥️",
      href: "/tools/node-profit-estimator",
      modal: false,
    },
    {
      title: "Wallet Intelligence",
      description: "Analyze wallet balances, pending airdrops, claimed rewards, and cross chain activity instantly.",
      icon: "📊",
      href: "/tools/wallet-checker",
      modal: false,
    },
  ];

  async function checkWallet() {
    if (!walletAddress.trim()) {
      setError("Please enter a wallet address.");
      return;
    }
    setLoading(true);
    setError("");
    setData(null);
    try {
      const res = await fetch(
        "/api/wallet?address=" + walletAddress + "&network=" + selectedNetwork
      );
      if (!res.ok) throw new Error("Failed to fetch wallet data.");
      const result = await res.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function closeModal() {
    setWalletOpen(false);
    setWalletAddress("");
    setData(null);
    setError("");
    setSelectedNetwork("all");
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white overflow-hidden">

      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[140px] rounded-full"></div>

      <header className="relative z-20 border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center font-black">
              C
            </div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              CryptoDropScout
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/airdrops" className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
              Airdrops
            </Link>
            <Link href="/guides" className="px-5 py-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition">
              Guides
            </Link>
          </div>
        </div>
      </header>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <div className="inline-flex px-5 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 mb-8">
            🛠️ Essential Crypto Utilities
          </div>
          <h2 className="text-6xl md:text-7xl font-black leading-tight">
            Web3 Tools For
            <span className="block bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Smarter Farming
            </span>
          </h2>
          <p className="mt-8 text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Powerful utilities and calculators for crypto airdrop hunters, farmers and Web3 explorers.
          </p>
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="p-8 rounded-[32px] bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:scale-[1.02] transition"
            >
              <div className="text-5xl mb-6">{tool.icon}</div>
              <h3 className="text-2xl font-bold">{tool.title}</h3>
              <p className="mt-4 text-gray-400 leading-relaxed">{tool.description}</p>
              {tool.modal ? (
                <button
                  onClick={() => setWalletOpen(true)}
                  className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:scale-105 transition"
                >
                  Open Tool →
                </button>
              ) : (
                <Link href={tool.href}>
                  <button className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:scale-105 transition">
                    Open Tool →
                  </button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {walletOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center px-4 py-10 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0b1020] border border-white/10 rounded-[40px] p-8 shadow-2xl relative">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition text-lg"
            >
              ✕
            </button>
            <h2 className="text-3xl font-black mb-1">📊 Wallet Intelligence</h2>
            <p className="text-gray-400 mb-6 text-sm">
              Analyze wallet balances, airdrops and cross-chain activity.
            </p>
          </div>
        </div>
      )}

    </main>
  );
}