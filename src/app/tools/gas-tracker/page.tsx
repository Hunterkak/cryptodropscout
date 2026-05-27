"use client";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

interface Chain { id: string; name: string; symbol: string; color: string; bg: string; type: "L1" | "L2"; }
interface GasEntry { slow: number; standard: number; fast: number; slowUsd: number; standardUsd: number; fastUsd: number; }
interface SwapFee { protocol: string; fee: number; note: string; }
interface BridgeFee { bridge: string; estUsd: number; time: string; }
interface StatusStyle { label: string; color: string; bg: string; border: string; }

const CHAINS: Chain[] = [
  { id: "ethereum",  name: "Ethereum",  symbol: "ETH",  color: "#4fa3e0", bg: "#0d1b2a", type: "L1" },
  { id: "arbitrum",  name: "Arbitrum",  symbol: "ARB",  color: "#7b9fdb", bg: "#0d1520", type: "L2" },
  { id: "optimism",  name: "Optimism",  symbol: "OP",   color: "#ff6b6b", bg: "#1a0d0d", type: "L2" },
  { id: "base",      name: "Base",      symbol: "BASE", color: "#00e5a0", bg: "#0d1a14", type: "L2" },
  { id: "bsc",       name: "BNB Chain", symbol: "BNB",  color: "#f0c040", bg: "#1a1600", type: "L1" },
  { id: "avalanche", name: "Avalanche", symbol: "AVAX", color: "#ff5a5a", bg: "#1a0d0d", type: "L1" },
  { id: "fantom",    name: "Fantom",    symbol: "FTM",  color: "#00b4d8", bg: "#0d1520", type: "L1" },
  { id: "zksync",    name: "zkSync",    symbol: "ZK",   color: "#c084fc", bg: "#140d1a", type: "L2" },
  { id: "linea",     name: "Linea",     symbol: "ETH",  color: "#6ee7b7", bg: "#0d1a14", type: "L2" },
];

const SWAP_FEES: Record<string, SwapFee> = {
  ethereum:  { protocol: "Uniswap V3",  fee: 0.05, note: "0.05% pool" },
  arbitrum:  { protocol: "Uniswap V3",  fee: 0.05, note: "0.05% pool" },
  optimism:  { protocol: "Uniswap V3",  fee: 0.05, note: "0.05% pool" },
  base:      { protocol: "Aerodrome",   fee: 0.02, note: "0.02% stable" },
  bsc:       { protocol: "PancakeSwap", fee: 0.25, note: "0.25% pool" },
  avalanche: { protocol: "Trader Joe",  fee: 0.3,  note: "0.3% pool" },
  fantom:    { protocol: "SpookySwap",  fee: 0.2,  note: "0.2% pool" },
  zksync:    { protocol: "SyncSwap",    fee: 0.1,  note: "0.1% pool" },
  linea:     { protocol: "Lynex",       fee: 0.2,  note: "0.2% pool" },
};

const BRIDGE_FEES: Record<string, BridgeFee> = {
  ethereum:  { bridge: "Stargate",        estUsd: 2.50, time: "~5 min" },
  arbitrum:  { bridge: "Arbitrum Bridge", estUsd: 0.50, time: "~1 min" },
  optimism:  { bridge: "Optimism Bridge", estUsd: 0.30, time: "~1 min" },
  base:      { bridge: "Base Bridge",     estUsd: 0.20, time: "~1 min" },
  bsc:       { bridge: "Stargate",        estUsd: 0.80, time: "~3 min" },
  avalanche: { bridge: "Stargate",        estUsd: 1.00, time: "~3 min" },
  fantom:    { bridge: "Stargate",        estUsd: 0.50, time: "~3 min" },
  zksync:    { bridge: "zkSync Bridge",   estUsd: 0.40, time: "~2 min" },
  linea:     { bridge: "Linea Bridge",    estUsd: 0.30, time: "~2 min" },
};

// Owlracle API — free, CORS-friendly, works in browser
const OWLRACLE_IDS: Record<string, string> = {
  ethereum:  "eth",
  arbitrum:  "arb",
  optimism:  "op",
  base:      "base",
  bsc:       "bsc",
  avalanche: "avax",
  fantom:    "ftm",
  zksync:    "zksync",
  linea:     "linea",
};

function getStatus(gwei: number): StatusStyle {
  if (gwei <= 5)  return { label: "Low",    color: "#00c07a", bg: "rgba(0,192,122,0.1)",  border: "rgba(0,192,122,0.25)" };
  if (gwei <= 20) return { label: "Medium", color: "#f5a623", bg: "rgba(245,166,35,0.1)", border: "rgba(245,166,35,0.25)" };
  return                 { label: "High",   color: "#ff6b6b", bg: "rgba(255,107,107,0.1)", border: "rgba(255,107,107,0.25)" };
}
function fmtGwei(g: number | null | undefined): string {
  if (!g || g === 0) return "—";
  return g < 1 ? g.toFixed(3) : g < 10 ? g.toFixed(2) : g.toFixed(1);
}
function fmtUsd(usd: number | null | undefined): string {
  if (!usd) return "—";
  return usd < 0.01 ? "<$0.01" : `$${usd.toFixed(3)}`;
}

async function fetchAllGas(): Promise<Record<string, GasEntry>> {
  const results: Record<string, GasEntry> = {};
  
  // Fetch ETH price first
  let ethPrice = 0;
  try {
    const r = await fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD");
    const d = await r.json();
    ethPrice = d.USD || 0;
  } catch {}

  // Native token prices for USD calculation
  const tokenPrices: Record<string, number> = {
    ethereum: ethPrice, arbitrum: ethPrice, optimism: ethPrice,
    base: ethPrice, linea: ethPrice, zksync: ethPrice,
  };
  
  try {
    const bnbR = await fetch("https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD");
    const bnbD = await bnbR.json();
    tokenPrices.bsc = bnbD.USD || 0;
  } catch {}
  try {
    const avaxR = await fetch("https://min-api.cryptocompare.com/data/price?fsym=AVAX&tsyms=USD");
    const avaxD = await avaxR.json();
    tokenPrices.avalanche = avaxD.USD || 0;
  } catch {}
  try {
    const ftmR = await fetch("https://min-api.cryptocompare.com/data/price?fsym=FTM&tsyms=USD");
    const ftmD = await ftmR.json();
    tokenPrices.fantom = ftmD.USD || 0;
  } catch {}

  await Promise.allSettled(
    CHAINS.map(async (chain) => {
      const netId = OWLRACLE_IDS[chain.id];
      if (!netId) return;
      try {
        const res = await fetch(
          `https://owlracle.info/eth/gas?apikey=&network=${netId}`,
          { signal: AbortSignal.timeout(8000) }
        );
        const data = await res.json();
        if (!data.speeds) return;
        const slow     = data.speeds[0]?.gasPrice ?? 0;
        const standard = data.speeds[1]?.gasPrice ?? 0;
        const fast     = data.speeds[2]?.gasPrice ?? 0;
        if (!standard || standard <= 0) return;
        const price = tokenPrices[chain.id] || 0;
        const toUsd = (g: number) => price > 0 ? +(g * 21000 * 1e-9 * price).toFixed(4) : 0;
        results[chain.id] = {
          slow, standard, fast,
          slowUsd: toUsd(slow), standardUsd: toUsd(standard), fastUsd: toUsd(fast),
        };
      } catch {}
    })
  );

  // Fallback: direct RPC for chains that failed
  const rpcFallbacks: Record<string, string[]> = {
    ethereum:  ["https://rpc.payload.de", "https://eth.drpc.org"],
    arbitrum:  ["https://arb1.arbitrum.io/rpc", "https://arbitrum.drpc.org"],
    optimism:  ["https://mainnet.optimism.io", "https://optimism.drpc.org"],
    base:      ["https://mainnet.base.org", "https://base.drpc.org"],
    bsc:       ["https://bsc-dataseed1.binance.org", "https://bsc-dataseed2.binance.org"],
    avalanche: ["https://api.avax.network/ext/bc/C/rpc"],
    fantom:    ["https://rpc.ftm.tools", "https://rpc.ankr.com/fantom"],
    zksync:    ["https://mainnet.era.zksync.io"],
    linea:     ["https://rpc.linea.build"],
  };

  await Promise.allSettled(
    CHAINS.map(async (chain) => {
      if (results[chain.id]) return; // already have data
      const rpcs = rpcFallbacks[chain.id] || [];
      for (const rpc of rpcs) {
        try {
          const res = await fetch(rpc, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ jsonrpc: "2.0", method: "eth_gasPrice", params: [], id: 1 }),
            signal: AbortSignal.timeout(6000),
          });
          const data = await res.json();
          if (!data.result) continue;
          const gwei = parseInt(data.result, 16) / 1e9;
          if (!gwei || gwei <= 0) continue;
          const price = tokenPrices[chain.id] || 0;
          const toUsd = (g: number) => price > 0 ? +(g * 21000 * 1e-9 * price).toFixed(4) : 0;
          results[chain.id] = {
            slow: +(gwei * 0.8).toFixed(3), standard: +gwei.toFixed(3), fast: +(gwei * 1.3).toFixed(3),
            slowUsd: toUsd(gwei * 0.8), standardUsd: toUsd(gwei), fastUsd: toUsd(gwei * 1.3),
          };
          break;
        } catch {}
      }
    })
  );

  return results;
}

function TelegramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 14.136l-2.95-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.826.45z"/>
    </svg>
  );
}

export default function GasFeeTracker() {
  const [gasData, setGasData]       = useState<Record<string, GasEntry>>({});
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState("");
  const [filter, setFilter]         = useState("All");
  const [ethPrice, setEthPrice]     = useState<number | null>(null);
  const [countdown, setCountdown]   = useState(30);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [view, setView]             = useState<"cards" | "table">("cards");
  const [tab, setTab]               = useState<"gas" | "swap" | "bridge">("gas");

  const fetchAll = useCallback(async () => {
    if (!lastUpdate) setLoading(true);
    try {
      const r = await fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD");
      const d = await r.json();
      if (d.USD) setEthPrice(Math.round(d.USD));
    } catch {}
    const results = await fetchAllGas();
    setGasData(results);
    setLastUpdate(new Date());
    setCountdown(30);
    setLoading(false);
  }, [lastUpdate]);

  useEffect(() => { fetchAll(); }, []);
  useEffect(() => { const i = setInterval(fetchAll, 30000); return () => clearInterval(i); }, [fetchAll]);
  useEffect(() => { const t = setInterval(() => setCountdown(c => c > 0 ? c - 1 : 0), 1000); return () => clearInterval(t); }, [lastUpdate]);

  const FILTERS = ["All", "L1", "L2", "Cheap", "High Gas"];
  const filteredChains = CHAINS.filter((chain) => {
    const matchSearch = chain.name.toLowerCase().includes(search.toLowerCase()) || chain.symbol.toLowerCase().includes(search.toLowerCase());
    const gwei = gasData[chain.id]?.standard ?? null;
    const matchFilter =
      filter === "All"      ? true :
      filter === "L1"       ? chain.type === "L1" :
      filter === "L2"       ? chain.type === "L2" :
      filter === "Cheap"    ? gwei !== null && gwei <= 5 :
      filter === "High Gas" ? gwei !== null && gwei > 20 : true;
    return matchSearch && matchFilter;
  });

  const tabBtn = (active: boolean) => ({
    padding: "8px 22px", borderRadius: "8px", border: "none", fontSize: "13px", fontWeight: "700" as const, cursor: "pointer",
    background: active ? "linear-gradient(90deg,#00e5a0,#00b4d8)" : "rgba(255,255,255,0.06)",
    color: active ? "#000" : "#888", transition: "all 0.2s",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #07080f; }
        .gft-bg {
          min-height: 100vh;
          background: radial-gradient(ellipse at 0% 0%, #0e1a2e 0%, #07080f 40%),
                      radial-gradient(ellipse at 100% 100%, #0e1a1a 0%, transparent 60%);
          font-family: 'Space Grotesk', sans-serif;
          color: #fff;
        }
        .gft-bg::before {
          content: '';
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background:
            radial-gradient(ellipse 600px 400px at 10% 20%, rgba(0,229,160,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 500px 400px at 90% 80%, rgba(79,163,224,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 400px 300px at 50% 50%, rgba(192,132,252,0.04) 0%, transparent 70%);
        }
        .gft-card {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 1.2rem;
          transition: transform 0.2s, border-color 0.2s;
        }
        .gft-card:hover { transform: translateY(-2px); border-color: rgba(255,255,255,0.12); }
        .gft-input:focus { border-color: #00e5a0 !important; outline: none; }
        .gft-badge { display: inline-block; border-radius: 6px; padding: 2px 10px; font-size: 11px; font-weight: 600; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
      `}</style>

      <div className="gft-bg">
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1000px", margin: "0 auto", padding: "2rem 1rem" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "2rem" }}>
            <div>
              <div style={{ fontSize: "26px", fontWeight: "800", letterSpacing: "-0.5px", background: "linear-gradient(90deg, #fff 0%, #a0c4ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                ⛽ Gas Fee Tracker
              </div>
              <div style={{ fontSize: "13px", color: "#556", marginTop: "4px" }}>Real-time gas, swap & bridge fees across major blockchains</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/" style={{ background: "linear-gradient(90deg,#00e5a0,#00b4d8)", color: "#000", borderRadius: "8px", padding: "8px 20px", fontSize: "13px", fontWeight: "700", textDecoration: "none", display: "inline-block" }}>
                🏠 Homepage
              </Link>
              <div style={{ background: "rgba(0,229,160,0.1)", border: "1px solid rgba(0,229,160,0.2)", borderRadius: "8px", padding: "7px 14px", fontSize: "13px", color: "#00e5a0", fontWeight: "600" }}>
                ETH {ethPrice ? `$${ethPrice.toLocaleString()}` : "..."} • {countdown}s
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "1.25rem", background: "rgba(255,255,255,0.03)", borderRadius: "12px", padding: "5px", border: "1px solid rgba(255,255,255,0.06)", width: "fit-content" }}>
            <button style={tabBtn(tab === "gas")}    onClick={() => setTab("gas")}>⛽ Gas Fees</button>
            <button style={tabBtn(tab === "swap")}   onClick={() => setTab("swap")}>🔄 Swap Fees</button>
            <button style={tabBtn(tab === "bridge")} onClick={() => setTab("bridge")}>🌉 Bridge Fees</button>
          </div>

          {/* Controls */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", padding: "1rem 1.25rem", marginBottom: "1.25rem", display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
            <input
              type="text" placeholder="🔍 Search blockchain..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="gft-input"
              style={{ flex: "1", minWidth: "180px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "9px 14px", color: "#fff", fontSize: "14px" }}
            />
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {FILTERS.map(f => (
                <button key={f}
                  style={{ background: filter === f ? "#00e5a0" : "rgba(0,0,0,0.3)", color: filter === f ? "#000" : "#888", border: `1px solid ${filter === f ? "#00e5a0" : "rgba(255,255,255,0.1)"}`, borderRadius: "8px", padding: "7px 14px", fontSize: "13px", fontWeight: filter === f ? "700" : "500", cursor: "pointer" }}
                  onClick={() => setFilter(f)}>{f}
                </button>
              ))}
            </div>
            {tab === "gas" && (
              <div style={{ marginLeft: "auto", background: "rgba(0,0,0,0.3)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", padding: "2px" }}>
                {(["cards","table"] as const).map(v => (
                  <button key={v} onClick={() => setView(v)}
                    style={{ background: view === v ? "rgba(255,255,255,0.1)" : "transparent", color: view === v ? "#fff" : "#666", border: "none", borderRadius: "6px", padding: "6px 14px", fontSize: "13px", cursor: "pointer", fontWeight: view === v ? "600" : "400" }}>
                    {v === "cards" ? "⊞ Cards" : "☰ Table"}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", marginBottom: "1.25rem" }}>
            <span style={{ fontSize: "12px", color: "#445" }}>
              {filteredChains.length} blockchains{lastUpdate && ` • Updated ${lastUpdate.toLocaleTimeString()}`}
            </span>
            {tab === "gas" && (
              <div style={{ display: "flex", gap: "16px", fontSize: "12px" }}>
                <span style={{ color: "#00c07a" }}>● Low ≤5 Gwei</span>
                <span style={{ color: "#f5a623" }}>● Medium ≤20</span>
                <span style={{ color: "#ff6b6b" }}>● High &gt;20</span>
              </div>
            )}
          </div>

          {filteredChains.length === 0 && (
            <div style={{ textAlign: "center", padding: "3rem", color: "#445", fontSize: "14px" }}>No matching blockchain found.</div>
          )}

          {/* GAS CARDS */}
          {tab === "gas" && view === "cards" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
              {filteredChains.map(chain => {
                const d = gasData[chain.id];
                const st = getStatus(d?.standard ?? 0);
                return (
                  <div key={chain.id} className="gft-card" style={{ borderLeft: `3px solid ${chain.color}` }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <div>
                        <div style={{ fontSize: "15px", fontWeight: "700" }}>{chain.name}</div>
                        <div style={{ fontSize: "11px", color: "#556", marginTop: "2px" }}>{chain.symbol} • {chain.type}</div>
                      </div>
                      <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: chain.bg, border: `1px solid ${chain.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", color: chain.color }}>
                        {chain.symbol.slice(0, 3)}
                      </div>
                    </div>
                    {d ? (
                      <>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px" }}>
                          {[{label:"Slow",gwei:d.slow,usd:d.slowUsd},{label:"Standard",gwei:d.standard,usd:d.standardUsd},{label:"Fast",gwei:d.fast,usd:d.fastUsd}].map(tier => {
                            const ts = getStatus(tier.gwei);
                            return (
                              <div key={tier.label} style={{ background: ts.bg, border: `1px solid ${ts.border}`, borderRadius: "8px", padding: "8px 6px", textAlign: "center" }}>
                                <div style={{ fontSize: "10px", color: "#667", marginBottom: "3px" }}>{tier.label}</div>
                                <div style={{ fontSize: "15px", fontWeight: "700", color: ts.color }}>{fmtGwei(tier.gwei)}</div>
                                <div style={{ fontSize: "10px", color: "#556" }}>Gwei</div>
                                <div style={{ fontSize: "11px", color: "#667", marginTop: "3px" }}>{fmtUsd(tier.usd)}</div>
                              </div>
                            );
                          })}
                        </div>
                        <div style={{ marginTop: "10px" }}>
                          <span className="gft-badge" style={{ background: st.bg, color: st.color, border: `1px solid ${st.border}` }}>{st.label}</span>
                        </div>
                      </>
                    ) : (
                      <div style={{ color: "#445", fontSize: "13px", padding: "1rem 0", textAlign: "center" }}>
                        {loading ? "⏳ Loading..." : "— No data —"}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* GAS TABLE */}
          {tab === "gas" && view === "table" && (
            <div style={{ overflowX: "auto", background: "rgba(255,255,255,0.02)", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.06)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>{["Chain","Type","Slow","Standard","Fast","Tx Cost","Status"].map(h => (
                    <th key={h} style={{ background: "rgba(0,0,0,0.3)", color: "#556", fontSize: "11px", padding: "12px 16px", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.05)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {filteredChains.map(chain => {
                    const d = gasData[chain.id];
                    const st = getStatus(d?.standard ?? 0);
                    return (
                      <tr key={chain.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td style={{ padding: "13px 16px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: chain.color }} />
                            <span style={{ fontWeight: "600", fontSize: "14px" }}>{chain.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: "13px 16px" }}>
                          <span className="gft-badge" style={{ background: chain.type === "L2" ? "rgba(0,229,160,0.1)" : "rgba(79,163,224,0.1)", color: chain.type === "L2" ? "#00e5a0" : "#4fa3e0", border: `1px solid ${chain.type === "L2" ? "rgba(0,229,160,0.2)" : "rgba(79,163,224,0.2)"}` }}>{chain.type}</span>
                        </td>
                        <td style={{ padding: "13px 16px", color: "#00c07a", fontSize: "13px" }}>{d ? fmtGwei(d.slow) : "—"}</td>
                        <td style={{ padding: "13px 16px", color: "#f5a623", fontSize: "14px", fontWeight: "700" }}>{d ? fmtGwei(d.standard) : "—"}</td>
                        <td style={{ padding: "13px 16px", color: "#ff6b6b", fontSize: "13px" }}>{d ? fmtGwei(d.fast) : "—"}</td>
                        <td style={{ padding: "13px 16px", color: "#aaa", fontSize: "13px" }}>{d ? fmtUsd(d.standardUsd) : "—"}</td>
                        <td style={{ padding: "13px 16px" }}>
                          <span className="gft-badge" style={{ background: st.bg, color: st.color, border: `1px solid ${st.border}` }}>{st.label}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* SWAP */}
          {tab === "swap" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
              {filteredChains.map(chain => {
                const sw = SWAP_FEES[chain.id];
                const d = gasData[chain.id];
                return (
                  <div key={chain.id} className="gft-card" style={{ borderLeft: `3px solid ${chain.color}` }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.8rem" }}>
                      <div>
                        <div style={{ fontSize: "15px", fontWeight: "700" }}>{chain.name}</div>
                        <div style={{ fontSize: "11px", color: "#556", marginTop: "2px" }}>{chain.symbol} • {chain.type}</div>
                      </div>
                      <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: chain.bg, border: `1px solid ${chain.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", color: chain.color }}>
                        {chain.symbol.slice(0, 3)}
                      </div>
                    </div>
                    {sw ? (
                      <>
                        <div style={{ fontSize: "11px", color: "#667", marginBottom: "5px" }}>Best DEX</div>
                        <div style={{ fontSize: "15px", fontWeight: "700", color: chain.color, marginBottom: "12px" }}>{sw.protocol}</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                          <div style={{ background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.15)", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                            <div style={{ fontSize: "10px", color: "#667", marginBottom: "4px" }}>Pool Fee</div>
                            <div style={{ fontSize: "18px", fontWeight: "800", color: "#00e5a0" }}>{sw.fee}%</div>
                          </div>
                          <div style={{ background: "rgba(79,163,224,0.08)", border: "1px solid rgba(79,163,224,0.15)", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                            <div style={{ fontSize: "10px", color: "#667", marginBottom: "4px" }}>Gas Cost</div>
                            <div style={{ fontSize: "15px", fontWeight: "700", color: "#4fa3e0" }}>{d ? fmtUsd(d.standardUsd) : "—"}</div>
                          </div>
                        </div>
                        <div style={{ marginTop: "8px", fontSize: "11px", color: "#556", background: "rgba(255,255,255,0.03)", borderRadius: "6px", padding: "5px 8px" }}>{sw.note}</div>
                      </>
                    ) : <div style={{ color: "#445", fontSize: "13px", padding: "1rem 0", textAlign: "center" }}>No swap data</div>}
                  </div>
                );
              })}
            </div>
          )}

          {/* BRIDGE */}
          {tab === "bridge" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
              {filteredChains.map(chain => {
                const br = BRIDGE_FEES[chain.id];
                return (
                  <div key={chain.id} className="gft-card" style={{ borderLeft: `3px solid ${chain.color}` }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.8rem" }}>
                      <div>
                        <div style={{ fontSize: "15px", fontWeight: "700" }}>{chain.name}</div>
                        <div style={{ fontSize: "11px", color: "#556", marginTop: "2px" }}>{chain.symbol} • {chain.type}</div>
                      </div>
                      <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: chain.bg, border: `1px solid ${chain.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", color: chain.color }}>
                        {chain.symbol.slice(0, 3)}
                      </div>
                    </div>
                    {br ? (
                      <>
                        <div style={{ fontSize: "11px", color: "#667", marginBottom: "5px" }}>Popular Bridge</div>
                        <div style={{ fontSize: "15px", fontWeight: "700", color: chain.color, marginBottom: "12px" }}>{br.bridge}</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                          <div style={{ background: "rgba(245,166,35,0.08)", border: "1px solid rgba(245,166,35,0.2)", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                            <div style={{ fontSize: "10px", color: "#667", marginBottom: "4px" }}>Est. Fee</div>
                            <div style={{ fontSize: "18px", fontWeight: "800", color: "#f5a623" }}>${br.estUsd.toFixed(2)}</div>
                          </div>
                          <div style={{ background: "rgba(192,132,252,0.08)", border: "1px solid rgba(192,132,252,0.2)", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                            <div style={{ fontSize: "10px", color: "#667", marginBottom: "4px" }}>Time</div>
                            <div style={{ fontSize: "15px", fontWeight: "700", color: "#c084fc" }}>{br.time}</div>
                          </div>
                        </div>
                        <div style={{ marginTop: "8px", fontSize: "11px", color: "#556", background: "rgba(255,255,255,0.03)", borderRadius: "6px", padding: "5px 8px" }}>Based on $1,000 transfer estimate</div>
                      </>
                    ) : <div style={{ color: "#445", fontSize: "13px", padding: "1rem 0", textAlign: "center" }}>No bridge data</div>}
                  </div>
                );
              })}
            </div>
          )}

          {/* Telegram */}
          <div style={{ textAlign: "center", marginTop: "4rem", paddingBottom: "2rem" }}>
            <a href="https://t.me/CryptoDropScout" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "linear-gradient(90deg,#229ED9,#1a7abf)", color: "#fff", borderRadius: "12px", padding: "14px 32px", fontSize: "15px", fontWeight: "700", textDecoration: "none" }}>
              <TelegramIcon />
              Join Telegram — CryptoDropScout
            </a>
          </div>

        </div>
      </div>
    </>
  );
}