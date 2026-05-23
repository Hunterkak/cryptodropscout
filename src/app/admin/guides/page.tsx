"use client";

import Link from "next/link";

export default function GuidesPage() {

  const guides = [

    {
      title: "Monad Testnet Guide",
      category: "Testnet",
      difficulty: "Easy",
      reward: "$500+",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop",
    },

    {
      title: "LayerZero Farming",
      category: "Airdrop",
      difficulty: "Medium",
      reward: "$1200+",
      image:
        "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=1200&auto=format&fit=crop",
    },

    {
      title: "Scroll Mainnet Strategy",
      category: "Guide",
      difficulty: "Easy",
      reward: "$300+",
      image:
        "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1200&auto=format&fit=crop",
    },

    {
      title: "Base Ecosystem Alpha",
      category: "Research",
      difficulty: "Easy",
      reward: "$700+",
      image:
        "https://images.unsplash.com/photo-1621504450181-5d356f61d307?q=80&w=1200&auto=format&fit=crop",
    },

    {
      title: "Linea Wallet Farming",
      category: "Airdrop",
      difficulty: "Medium",
      reward: "$600+",
      image:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    },

    {
      title: "ZetaChain Validator Setup",
      category: "Node",
      difficulty: "Hard",
      reward: "$900+",
      image:
        "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop",
    },

  ];

  return (

    <main className="min-h-screen bg-[#050816] text-white overflow-hidden">

      {/* Glow */}

      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[140px] rounded-full"></div>

      {/* Navbar */}

      <header className="relative z-20 border-b border-white/10 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center font-black">
              C
            </div>

            <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              CryptoDropScout
            </h1>

          </Link>

          <div className="flex items-center gap-4">

            <Link
              href="/airdrops"
              className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              Airdrops
            </Link>

            <Link
              href="/testnets"
              className="px-5 py-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition"
            >
              Testnets
            </Link>

          </div>

        </div>

      </header>

      {/* Hero */}

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">

        <div className="text-center">

          <div className="inline-flex px-5 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 mb-8">
            📚 Learn & Earn Faster
          </div>

          <h2 className="text-6xl md:text-7xl font-black leading-tight">

            Complete Web3

            <span className="block bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">

              Guides & Tutorials

            </span>

          </h2>

          <p className="mt-8 text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Step-by-step guides for airdrops, nodes, testnets and crypto opportunities.
          </p>

        </div>

      </section>

      {/* Search */}

      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-16">

        <div className="grid lg:grid-cols-3 gap-6">

          <input
            type="text"
            placeholder="Search guides..."
            className="px-6 py-5 rounded-2xl bg-white/5 border border-white/10 outline-none"
          />

          <select className="px-6 py-5 rounded-2xl bg-white/5 border border-white/10">

            <option>
              All Categories
            </option>

            <option>
              Airdrop
            </option>

            <option>
              Testnet
            </option>

            <option>
              Node
            </option>

          </select>

          <select className="px-6 py-5 rounded-2xl bg-white/5 border border-white/10">

            <option>
              All Difficulty
            </option>

            <option>
              Easy
            </option>

            <option>
              Medium
            </option>

            <option>
              Hard
            </option>

          </select>

        </div>

      </section>

      {/* Cards */}

      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {guides.map((guide, index) => (

            <div
              key={index}
              className="rounded-[32px] overflow-hidden bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:scale-[1.02] transition"
            >

              <img
                src={guide.image}
                alt={guide.title}
                className="w-full h-[240px] object-cover"
              />

              <div className="p-6">

                <div className="flex items-center justify-between mb-5">

                  <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm">
                    {guide.category}
                  </span>

                  <span className="text-green-400 font-semibold">
                    {guide.reward}
                  </span>

                </div>

                <h3 className="text-2xl font-bold">
                  {guide.title}
                </h3>

                <p className="text-gray-400 mt-4">
                  Difficulty: {guide.difficulty}
                </p>

                <div className="mt-6">

                  <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:scale-105 transition">

                    Read Guide →

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>

  );

}