"use client";

import Link from "next/link";

export default function Home() {

  const projects = [

    {
      id: "monad-testnet",
      name: "Monad",
      status: "Potential",
      difficulty: "Easy",
      reward: "$500+",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: "layerzero",
      name: "LayerZero",
      status: "Hot",
      difficulty: "Medium",
      reward: "$1200+",
      image:
        "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: "scroll",
      name: "Scroll",
      status: "Active",
      difficulty: "Easy",
      reward: "$300+",
      image:
        "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: "base",
      name: "Base",
      status: "Live",
      difficulty: "Easy",
      reward: "$700+",
      image:
        "https://images.unsplash.com/photo-1621504450181-5d356f61d307?q=80&w=1200&auto=format&fit=crop",
    },

  ];

  return (

    <main className="min-h-screen bg-[#050816] text-white overflow-hidden">

      {/* Glow */}

      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[140px] rounded-full"></div>

      {/* Navbar */}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center font-black">
              C
            </div>

            <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              CryptoDropScout
            </h1>

          </Link>

          {/* Menu */}

          <nav className="hidden lg:flex items-center gap-5">

            <Link
              href="/"
              className="px-5 py-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition"
            >
              Home
            </Link>

            <Link
              href="/airdrops"
              className="px-5 py-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition"
            >
              Airdrops
            </Link>

            <Link
              href="/testnets"
              className="px-5 py-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition"
            >
              Testnets
            </Link>

            <Link
              href="/guides"
              className="px-5 py-3 rounded-2xl bg-pink-500/10 border border-pink-500/20 hover:bg-pink-500/20 transition"
            >
              Guides
            </Link>

            <Link
              href="/blog"
              className="px-5 py-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/20 transition"
            >
              Blog
            </Link>

            <Link
              href="/tools"
              className="px-5 py-3 rounded-2xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition"
            >
              Tools
            </Link>

          </nav>

          {/* Right */}

          <div className="hidden lg:flex items-center gap-4">

            <input
              type="text"
              placeholder="Search airdrops..."
              className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 outline-none"
            />

            <select className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10">

              <option>🇺🇸 EN</option>
              <option>🇧🇩 BN</option>
              <option>🇮🇳 HI</option>

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

            Your Ultimate Guide To

            <span className="block bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">

              Airdrops & Testnets

            </span>

          </h2>

          <p className="mt-8 text-xl text-gray-400 leading-relaxed max-w-2xl">
            Discover verified airdrops, crypto testnets, retroactive rewards and Web3 opportunities before everyone else.
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

          {projects.map((project, index) => (

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

                  <Link
                    href={`/project/${project.id}`}
                    className="block w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:scale-105 transition text-center"
                  >
                    Open Guide →
                  </Link>

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