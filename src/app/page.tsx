"use client";

import Link from "next/link";

export default function Home() {

  const hotAirdrops = [
    {
      name: "Monad",
      status: "Potential",
      difficulty: "Easy",
      reward: "$500+",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop",
    },

    {
      name: "LayerZero",
      status: "Hot",
      difficulty: "Medium",
      reward: "$1000+",
      image:
        "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=1200&auto=format&fit=crop",
    },

    {
      name: "Scroll",
      status: "Active",
      difficulty: "Easy",
      reward: "$300+",
      image:
        "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1200&auto=format&fit=crop",
    },

    {
      name: "ZetaChain",
      status: "Ended",
      difficulty: "Hard",
      reward: "$800+",
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

          {/* Logo */}

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center font-black">
              C
            </div>

            <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              CryptoDropScout
            </h1>

          </div>

          {/* Menu */}

          <nav className="hidden lg:flex items-center gap-8 text-gray-300">

            <Link href="/">Home</Link>

            <Link href="/airdrops">
              Airdrops
            </Link>

            <Link href="/testnets">
              Testnets
            </Link>

            <Link href="/faucets">
              Faucets
            </Link>

            <Link href="/guides">
              Guides
            </Link>

            <Link href="/blog">
              Blog
            </Link>

            <Link href="/tools">
              Tools
            </Link>

          </nav>

          {/* Right */}

          <div className="flex items-center gap-4">

            <input
              type="text"
              placeholder="Search airdrops..."
              className="hidden md:flex px-5 py-3 rounded-2xl bg-white/5 border border-white/10 outline-none"
            />

            <select className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10">

              <option>
                🇺🇸 EN
              </option>

              <option>
                🇧🇩 BN
              </option>

              <option>
                🇮🇳 HI
              </option>

            </select>

          </div>

        </div>

      </header>

      {/* Hero */}

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left */}

        <div>

          <div className="inline-flex px-5 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 mb-8">
            🚀 Find Legit Airdrops & Earn Early
          </div>

          <h2 className="text-6xl md:text-7xl font-black leading-tight">

            Your Ultimate Guide to

            <span className="block bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">

              Airdrops & Testnets

            </span>

          </h2>

          <p className="mt-8 text-xl text-gray-400 leading-relaxed max-w-2xl">
            Discover verified airdrops, testnet opportunities, nodes and crypto tools — all in one place.
          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-wrap gap-5">

            <Link
              href="/airdrops"
              className="px-8 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold hover:scale-105 transition"
            >
              Explore Airdrops
            </Link>

            <Link
              href="/testnets"
              className="px-8 py-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              View Testnets
            </Link>

          </div>

        </div>

        {/* Right */}

        <div className="relative">

          <div className="absolute inset-0 bg-purple-500/20 blur-[120px] rounded-full"></div>

          <img
            src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop"
            alt="Crypto"
            className="relative z-10 rounded-[40px] border border-white/10 shadow-2xl"
          />

        </div>

      </section>

      {/* Stats */}

      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-20">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

          {[
            {
              number: "120+",
              label: "Active Airdrops",
            },

            {
              number: "80+",
              label: "Live Testnets",
            },

            {
              number: "50+",
              label: "Faucets",
            },

            {
              number: "10K+",
              label: "Happy Users",
            },

          ].map((item, index) => (

            <div
              key={index}
              className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl"
            >

              <h3 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {item.number}
              </h3>

              <p className="mt-3 text-gray-400">
                {item.label}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* Hot Airdrops */}

      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">

        <div className="flex items-center justify-between mb-10">

          <h2 className="text-5xl font-black">
            🔥 Hot Airdrops
          </h2>

          <Link
            href="/airdrops"
            className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >
            View All
          </Link>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {hotAirdrops.map((project, index) => (

            <div
              key={index}
              className="rounded-[32px] overflow-hidden bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:scale-[1.02] transition"
            >

              <img
                src={project.image}
                alt={project.name}
                className="w-full h-[220px] object-cover"
              />

              <div className="p-6">

                <div className="flex items-center justify-between mb-5">

                  <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm">
                    {project.status}
                  </span>

                  <span className="text-green-400 font-semibold">
                    {project.reward}
                  </span>

                </div>

                <h3 className="text-2xl font-bold">
                  {project.name}
                </h3>

                <p className="text-gray-400 mt-4">
                  Difficulty: {project.difficulty}
                </p>

                <div className="mt-6">

                  <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:scale-105 transition">

                    Open Guide →

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* Footer */}

      <footer className="relative z-10 border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-8">

          <div>

            <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              CryptoDropScout
            </h2>

            <p className="mt-4 text-gray-400">
              Stay Informed • Stay Ahead • Stay Connected
            </p>

          </div>

          <div className="flex flex-wrap gap-4">

            <a
              href="https://youtube.com/@cryptodrop_scout"
              target="_blank"
              className="px-6 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition"
            >
              YouTube
            </a>

            <a
              href="https://x.com/cryptodrpscout"
              target="_blank"
              className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              X / Twitter
            </a>

            <a
              href="https://github.com/Hunterkak"
              target="_blank"
              className="px-6 py-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition"
            >
              GitHub
            </a>

          </div>

        </div>

      </footer>

    </main>

  );

}