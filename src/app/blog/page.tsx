"use client";

import Link from "next/link";

export default function BlogPage() {

  const posts = [

    {
      title: "Top 10 Upcoming Crypto Airdrops",
      category: "Airdrop",
      date: "May 2026",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop",
    },

    {
      title: "Best Testnets To Farm Early",
      category: "Testnet",
      date: "May 2026",
      image:
        "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=1200&auto=format&fit=crop",
    },

    {
      title: "How To Find Legit Airdrops",
      category: "Guide",
      date: "May 2026",
      image:
        "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1200&auto=format&fit=crop",
    },

    {
      title: "Future Of Retroactive Rewards",
      category: "Research",
      date: "May 2026",
      image:
        "https://images.unsplash.com/photo-1621504450181-5d356f61d307?q=80&w=1200&auto=format&fit=crop",
    },

    {
      title: "Best Wallets For Airdrop Farming",
      category: "Wallet",
      date: "May 2026",
      image:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    },

    {
      title: "CryptoDropScout Weekly Alpha",
      category: "News",
      date: "May 2026",
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
              href="/"
              className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              Home
            </Link>

            <Link
              href="/airdrops"
              className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              Airdrops
            </Link>

            <Link
              href="/guides"
              className="px-5 py-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition"
            >
              Guides
            </Link>

          </div>

        </div>

      </header>

      {/* Hero */}

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">

        <div className="text-center">

          <div className="inline-flex px-5 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 mb-8">
            📰 Crypto Insights & Alpha
          </div>

          <h2 className="text-6xl md:text-7xl font-black leading-tight">

            Latest Web3

            <span className="block bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">

              News & Articles

            </span>

          </h2>

          <p className="mt-8 text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Stay updated with crypto trends, airdrop insights and early alpha opportunities.
          </p>

        </div>

      </section>

      {/* Search */}

      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-16">

        <div className="grid lg:grid-cols-2 gap-6">

          <input
            type="text"
            placeholder="Search articles..."
            className="px-6 py-5 rounded-2xl bg-white/5 border border-white/10 outline-none"
          />

          <select className="px-6 py-5 rounded-2xl bg-[#111827] border border-white/10 text-white outline-none">

            <option className="bg-[#111827] text-white">
              All Categories
            </option>

            <option className="bg-[#111827] text-white">
              Airdrop
            </option>

            <option className="bg-[#111827] text-white">
              Testnet
            </option>

            <option className="bg-[#111827] text-white">
              Research
            </option>

          </select>

        </div>

      </section>

      {/* Blog Cards */}

      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {posts.map((post, index) => (

            <div
              key={index}
              className="rounded-[32px] overflow-hidden bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:scale-[1.02] transition"
            >

              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[240px] object-cover"
              />

              <div className="p-6">

                <div className="flex items-center justify-between mb-5">

                  <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm">
                    {post.category}
                  </span>

                  <span className="text-gray-400 text-sm">
                    {post.date}
                  </span>

                </div>

                <h3 className="text-2xl font-bold">
                  {post.title}
                </h3>

                <div className="mt-6">

                  <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:scale-105 transition">

                    Read Article →

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