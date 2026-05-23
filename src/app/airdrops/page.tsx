"use client";

import Link from "next/link";

export default function AirdropsPage() {

  const projects = [

    {
      name: "Monad Testnet",
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
      reward: "$1200+",
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
      reward: "$900+",
      image:
        "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop",
    },

    {
      name: "Base",
      status: "Active",
      difficulty: "Easy",
      reward: "$700+",
      image:
        "https://images.unsplash.com/photo-1621504450181-5d356f61d307?q=80&w=1200&auto=format&fit=crop",
    },

    {
      name: "Linea",
      status: "Potential",
      difficulty: "Medium",
      reward: "$600+",
      image:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
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
              href="/guides"
              className="px-5 py-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition"
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
            🚀 Latest Crypto Opportunities
          </div>

          <h2 className="text-6xl md:text-7xl font-black leading-tight">

            Discover The Best

            <span className="block bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">

              Airdrops

            </span>

          </h2>

          <p className="mt-8 text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Explore high-potential testnets, retroactive rewards and early Web3 opportunities before everyone else.
          </p>

        </div>

      </section>

      {/* Filters */}

      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-16">

        <div className="grid lg:grid-cols-3 gap-6">

          <input
            type="text"
            placeholder="Search airdrops..."
            className="px-6 py-5 rounded-2xl bg-white/5 border border-white/10 outline-none"
          />

          <select className="px-6 py-5 rounded-2xl bg-white/5 border border-white/10">

            <option>
              All Status
            </option>

            <option>
              Active
            </option>

            <option>
              Potential
            </option>

            <option>
              Ended
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

          {projects.map((project, index) => (

            <div
              key={index}
              className="rounded-[32px] overflow-hidden bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:scale-[1.02] transition"
            >

              <img
                src={project.image}
                alt={project.name}
                className="w-full h-[240px] object-cover"
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

    </main>

  );

}