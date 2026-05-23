export default function Home() {
  return (
    <main className="min-h-screen bg-[#070B14] text-white overflow-hidden">

      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full"></div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-6 border-b border-white/10 bg-[#070B14]/80 backdrop-blur-md">

        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          CryptoDropScout
        </h1>

        <div className="flex gap-8 text-gray-300 font-medium">
          <button className="hover:text-cyan-400 transition">
            Home
          </button>

          <button className="hover:text-cyan-400 transition">
            Airdrops
          </button>

          <button className="hover:text-cyan-400 transition">
            Guides
          </button>

          <button className="hover:text-cyan-400 transition">
            Contact
          </button>
        </div>

      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32">

        <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent leading-tight">
          CryptoDropScout
        </h1>

        <p className="mt-8 text-xl text-gray-300 max-w-3xl leading-relaxed">
          Discover Early Web3 Opportunities, Nodes, Testnets & Airdrops Before Everyone Else.
        </p>

        <div className="flex gap-6 mt-12 flex-wrap justify-center">

          <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-all duration-300 text-lg font-semibold shadow-2xl shadow-cyan-500/30">
            Start Exploring
          </button>

          <button className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 text-lg font-semibold">
            Join Telegram
          </button>

        </div>

      </section>

      {/* Stats Section */}
      <section className="px-8 pb-28">

        <div className="grid md:grid-cols-4 gap-8">

          <div className="bg-white/5 border border-cyan-500/20 rounded-3xl p-8 text-center backdrop-blur-md">
            <h2 className="text-5xl font-extrabold text-cyan-400">
              150+
            </h2>

            <p className="mt-4 text-gray-300">
              Active Airdrops
            </p>
          </div>

          <div className="bg-white/5 border border-blue-500/20 rounded-3xl p-8 text-center backdrop-blur-md">
            <h2 className="text-5xl font-extrabold text-blue-400">
              80+
            </h2>

            <p className="mt-4 text-gray-300">
              Testnets
            </p>
          </div>

          <div className="bg-white/5 border border-purple-500/20 rounded-3xl p-8 text-center backdrop-blur-md">
            <h2 className="text-5xl font-extrabold text-purple-400">
              40+
            </h2>

            <p className="mt-4 text-gray-300">
              Node Projects
            </p>
          </div>

          <div className="bg-white/5 border border-pink-500/20 rounded-3xl p-8 text-center backdrop-blur-md">
            <h2 className="text-5xl font-extrabold text-pink-400">
              24/7
            </h2>

            <p className="mt-4 text-gray-300">
              Updates
            </p>
          </div>

        </div>

      </section>

      {/* Featured Projects */}
      <section className="px-8 pb-28">

        <h2 className="text-5xl font-bold text-center mb-16">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {/* Card 1 */}
          <div className="bg-white/5 border border-cyan-500/20 rounded-3xl p-8 hover:scale-105 transition-all duration-300 shadow-2xl shadow-cyan-500/10 backdrop-blur-md">

            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-cyan-400">
                DAC Chain
              </h3>

              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">
                Active
              </span>
            </div>

            <p className="mt-6 text-gray-300 leading-relaxed">
              Early node opportunity with strong community growth potential and possible future rewards.
            </p>

            <div className="mt-6 flex gap-3 flex-wrap">

              <span className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm">
                Node
              </span>

              <span className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm">
                Testnet
              </span>

              <span className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm">
                Early
              </span>

            </div>

            <button className="mt-8 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition font-semibold">
              View Guide
            </button>

          </div>

          {/* Card 2 */}
          <div className="bg-white/5 border border-blue-500/20 rounded-3xl p-8 hover:scale-105 transition-all duration-300 shadow-2xl shadow-blue-500/10 backdrop-blur-md">

            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-blue-400">
                Quip Network
              </h3>

              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm">
                Trending
              </span>
            </div>

            <p className="mt-6 text-gray-300 leading-relaxed">
              AI-powered decentralized ecosystem with active quests and strong community engagement.
            </p>

            <div className="mt-6 flex gap-3 flex-wrap">

              <span className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm">
                AI
              </span>

              <span className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm">
                Quest
              </span>

              <span className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm">
                Rewards
              </span>

            </div>

            <button className="mt-8 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 transition font-semibold">
              View Guide
            </button>

          </div>

          {/* Card 3 */}
          <div className="bg-white/5 border border-purple-500/20 rounded-3xl p-8 hover:scale-105 transition-all duration-300 shadow-2xl shadow-purple-500/10 backdrop-blur-md">

            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-purple-400">
                Linera
              </h3>

              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">
                Hot
              </span>
            </div>

            <p className="mt-6 text-gray-300 leading-relaxed">
              One of the hottest modular blockchain ecosystems in Web3 with massive hype.
            </p>

            <div className="mt-6 flex gap-3 flex-wrap">

              <span className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm">
                Modular
              </span>

              <span className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm">
                Web3
              </span>

              <span className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm">
                Alpha
              </span>

            </div>

            <button className="mt-8 px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 transition font-semibold">
              View Guide
            </button>

          </div>

        </div>

      </section>

      {/* Active Airdrops */}
      <section className="px-8 pb-28">

        <h2 className="text-5xl font-bold text-center mb-16">
          Active Airdrops
        </h2>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Airdrop 1 */}
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-8">

            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold">
                Monad Testnet
              </h3>

              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm">
                Live
              </span>
            </div>

            <p className="mt-5 text-gray-300">
              Complete social tasks and testnet activities for potential future rewards.
            </p>

            <div className="mt-6 flex gap-4 flex-wrap">

              <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10">
                Reward: Unknown
              </div>

              <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10">
                Difficulty: Easy
              </div>

            </div>

            <button className="mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition">
              Join Now
            </button>

          </div>

          {/* Airdrop 2 */}
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-3xl p-8">

            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold">
                LayerEdge
              </h3>

              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm">
                Live
              </span>
            </div>

            <p className="mt-5 text-gray-300">
              Participate in node activities and ecosystem campaigns for possible token allocation.
            </p>

            <div className="mt-6 flex gap-4 flex-wrap">

              <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10">
                Reward: Potential
              </div>

              <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10">
                Difficulty: Medium
              </div>

            </div>

            <button className="mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition">
              Join Now
            </button>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 text-center text-gray-400">

        <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          CryptoDropScout
        </h3>

        <p className="mt-5">
          Stay Informed • Stay Ahead • Stay Connected
        </p>

        <div className="flex justify-center gap-8 mt-8 flex-wrap">

          <button className="hover:text-cyan-400 transition">
            Telegram
          </button>

          <button className="hover:text-cyan-400 transition">
            YouTube
          </button>

          <button className="hover:text-cyan-400 transition">
            Twitter/X
          </button>

        </div>

      </footer>

    </main>
  );
}