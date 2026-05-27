"use client";

import { useState } from "react";
import Link from "next/link";

export default function WalletCheckerPage() {
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("tokens");
  const [searched, setSearched] = useState(false);

  async function checkWallet() {
    if (!walletAddress.trim()) {
      setError("Please enter a wallet address.");
      return;
    }
    setLoading(true);
    setError("");
    setData(null);
    setSearched(true);
    try {
      const res = await fetch(`/api/wallet?address=${walletAddress}&network=all`);
      if (!res.ok) throw new Error("Failed to fetch wallet data.");
      const result = await res.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const tokens = data?.tokens ?? [];
  const airdrops = data?.airdrops ?? [];
  const pendingAirdrops = data?.pendingAirdrops ?? [];
  const allAirdrops = [...airdrops, ...pendingAirdrops];
  const chainsActive = data?.chainsActive ?? 0;
  const totalTokens = data?.totalTokens ?? 0;
  const ethBalance = data?.ethBalance ?? null;
  const ethUsdValue = data?.ethUsdValue ?? null;
  const totalUsd = data?.totalUsd ?? null;
  const claimedCount = data?.claimedCount ?? 0;
  const pendingCount = data?.pendingCount ?? 0;

  return (
    <main className="min-h-screen bg-[#f8f7f2] text-gray-900">

      {/* Header */}
      <div className="text-center pt-10 pb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-green-500 text-2xl">◈</span>
          <h1 className="text-3xl font-black text-gray-900">CryptoDrop Scout</h1>
        </div>
        <p className="text-gray-500 text-sm">Wallet Portfolio + Airdrop History Tracker</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-20">

        {/* Search Box */}
        <div className="bg-white rounded-2xl border border-gray-200 p-3 mb-6 shadow-sm">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter wallet address: 0x..."
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && checkWallet()}
                style={{ color: '#111827', backgroundColor: '#f9fafb' }}
                className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 outline-none text-sm placeholder-gray-400 focus:border-green-400"
              />
              {walletAddress && (
                <button
                  onClick={() => {
                    setWalletAddress("");
                    setData(null);
                    setSearched(false);
                    setError("");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg font-bold"
                >
                  ✕
                </button>
              )}
            </div>
            <button
              onClick={checkWallet}
              disabled={loading}
              className="px-5 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition flex items-center gap-2 disabled:opacity-50"
            >
              🔍 {loading ? "Checking..." : "Check"}
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">❌ {error}</p>}

        {/* Portfolio Total Banner */}
        {searched && !loading && totalUsd && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-4 mb-4 flex items-center justify-between">
            <div>
              <p className="text-white/70 text-xs mb-0.5">Total Portfolio Value</p>
              <p className="text-white text-3xl font-black">${parseFloat(totalUsd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="text-4xl">💼</div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-[#f0efe8] rounded-2xl p-4">
            <p className="text-xs text-gray-500 mb-1">ETH Balance</p>
            <p className="text-2xl font-black text-gray-900">{ethBalance ?? "—"}</p>
            <p className="text-xs text-green-600 mt-1">
              {ethUsdValue ? `$${parseFloat(ethUsdValue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ethBalance ? "ETH" : "Enter address"}
            </p>
          </div>
          <div className="bg-[#f0efe8] rounded-2xl p-4">
            <p className="text-xs text-gray-500 mb-1">Total Tokens</p>
            <p className="text-2xl font-black text-gray-900">{searched ? totalTokens : "—"}</p>
            <p className="text-xs text-gray-500 mt-1">{searched ? "found" : "Enter address"}</p>
          </div>
          <div className="bg-[#f0efe8] rounded-2xl p-4">
            <p className="text-xs text-gray-500 mb-1">Airdrops</p>
            <p className="text-2xl font-black text-gray-900">{searched ? claimedCount : "—"}</p>
            <p className="text-xs mt-1">
              <span className="text-green-600">{searched ? `${claimedCount} claimed` : "Enter address"}</span>
              {searched && pendingCount > 0 && (
                <span className="text-yellow-600 ml-1">· {pendingCount} pending</span>
              )}
            </p>
          </div>
          <div className="bg-[#f0efe8] rounded-2xl p-4">
            <p className="text-xs text-gray-500 mb-1">Chains Active</p>
            <p className="text-2xl font-black text-gray-900">{searched ? chainsActive : "—"}</p>
            <p className="text-xs text-gray-500 mt-1">{searched ? "chains" : "Enter address"}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 mb-4">
          <button
            onClick={() => setActiveTab("tokens")}
            className={`pb-3 text-sm font-semibold border-b-2 transition ${
              activeTab === "tokens"
                ? "border-green-500 text-green-600"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Token Holdings
          </button>
          <button
            onClick={() => setActiveTab("airdrops")}
            className={`pb-3 text-sm font-semibold border-b-2 transition ${
              activeTab === "airdrops"
                ? "border-green-500 text-green-600"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Airdrop History
          </button>
        </div>

        {/* Token Holdings Tab */}
        {activeTab === "tokens" && (
          <div className="space-y-2">
            {!searched && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-sm">Enter a wallet address above to see real token holdings</p>
              </div>
            )}
            {searched && loading && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-sm animate-pulse">Fetching tokens across all chains...</p>
              </div>
            )}
            {searched && !loading && tokens.length === 0 && !error && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-3">📭</p>
                <p className="text-sm">No ERC20 tokens found for this wallet.</p>
                {ethBalance && (
                  <p className="text-xs mt-2 text-green-600">ETH Balance: {ethBalance} ETH</p>
                )}
              </div>
            )}

            {/* ETH row at top */}
            {searched && !loading && ethBalance && (
              <div className="bg-white rounded-2xl border border-gray-100 px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xs font-black text-blue-600">
                    ETH
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">Ethereum</p>
                    <p className="text-xs text-gray-400">Ethereum Mainnet • ETH</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm text-gray-900">{ethBalance} ETH</p>
                  <p className="text-xs text-green-600">
                    {ethUsdValue ? `$${parseFloat(ethUsdValue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ""}
                  </p>
                </div>
              </div>
            )}

            {tokens.map((token: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-black text-gray-600">
                    {token.symbol?.slice(0, 3)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{token.name}</p>
                    <p className="text-xs text-gray-400">{token.network} • {token.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm text-gray-900">{token.balance} {token.symbol}</p>
                  <p className="text-xs text-green-600">
                    {token.usdValue ? `$${parseFloat(token.usdValue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Airdrop History Tab */}
        {activeTab === "airdrops" && (
          <div className="space-y-2">
            {!searched && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-3">🪂</p>
                <p className="text-sm">Enter a wallet address to see airdrop history</p>
              </div>
            )}
            {searched && loading && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-sm animate-pulse">Fetching airdrop history...</p>
              </div>
            )}
            {searched && !loading && allAirdrops.length === 0 && !error && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-3">📭</p>
                <p className="text-sm">No airdrops found for this wallet in the last 12 months.</p>
                <p className="text-xs mt-2 text-gray-400">Only known tokens (with CoinGecko price) are shown.</p>
              </div>
            )}
            {allAirdrops.map((airdrop: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-black text-gray-600">
                    {airdrop.symbol?.slice(0, 3)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{airdrop.name}</p>
                    <p className="text-xs text-gray-400">{airdrop.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm text-gray-900">{airdrop.amount} {airdrop.symbol}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    airdrop.status === 'Claimed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {airdrop.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link href="/tools" className="text-sm text-gray-400 hover:text-gray-600 transition">
            ← Back to Tools
          </Link>
        </div>

      </div>
    </main>
  );
}