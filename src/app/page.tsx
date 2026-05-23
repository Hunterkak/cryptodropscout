export default function Home() {
  return (
    <main className="min-h-screen bg-[#070B14] text-white overflow-hidden">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10">

        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          CryptoDropScout
        </h1>

        <div className="flex gap-8 text-gray-300 font-medium">

          <a href="/" className="hover:text-cyan-400 transition">
            Home
          </a>

          <a href="#projects" className="hover:text-cyan-400 transition">
            Projects
          </a>

          <a href="#socials" className="hover:text-cyan-400 transition">
            Socials
          </a>

        </div>

      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-28">

        <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          CryptoDropScout
        </h1>

        <p className="mt-6 text-xl text-gray-300 max-w-3xl">
          Discover Early Web3 Opportunities, Nodes, Testnets & Airdrops Before Everyone Else.
        </p>

        <div className="flex gap-6 mt-10 flex-wrap justify-center">

          <a
            href="https://t.me/CryptoDropScoutt"
            target="_blank"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-lg font-semibold"
          >
            Join Telegram
          </a>

          <a
            href="https://youtube.com/@cryptodrop_scout"
            target="_blank"
            className="px-8 py-4 rounded-2xl border border-white/20 bg-white/5 text-lg font-semibold"
          >
            YouTube
          </a>

        </div>

      </section>

      {/* Stats */}
      <section className="grid md:grid-cols-4 gap-8 px-8 pb-24">

        <div className="bg-white/5 border border-cyan-500/20 rounded-3xl p-10 text-center">
          <h2 className="text-6xl font-bold text-cyan-400">150+</h2>
          <p className="mt-4 text-gray-300">Active Airdrops</p>
        </div>

        <div className="bg-white/5 border border-blue-500/20 rounded-3xl p-10 text-center">
          <h2 className="text-6xl font-bold text-blue-400">80+</h2>
          <p className="mt-4 text-gray-300">Testnets</p>
        </div>

        <div className="bg-white/5 border border-purple-500/20 rounded-3xl p-10 text-center">
          <h2 className="text-6xl font-bold text-purple-400">40+</h2>
          <p className="mt-4 text-gray-300">Node Projects</p>
        </div>

        <div className="bg-white/5 border border-pink-500/20 rounded-3xl p-10 text-center">
          <h2 className="text-6xl font-bold text-pink-400">24/7</h2>
          <p className="mt-4 text-gray-300">Updates</p>
        </div>

      </section>

      {/* Featured Projects */}
      <section
        id="projects"
        className="px-8 pb-24"
      >

        <h2 className="text-5xl font-bold text-center mb-16">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="bg-white/5 border border-cyan-500/20 rounded-3xl p-8">

            <div className="flex justify-between items-center">
              <h3 className="text-4xl font-bold text-cyan-400">
                DAC Chain
              </h3>

              <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">
                Active
              </span>
            </div>

            <p className="mt-6 text-gray-300">
              Early node opportunity with strong community growth and possible future rewards.
            </p>

            <div className="flex gap-3 mt-6 flex-wrap">
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                Node
              </span>

              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                Testnet
              </span>

              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                Early
              </span>
            </div>

            <button className="mt-8 px-6 py-3 rounded-xl bg-cyan-500 font-semibold">
              View Guide
            </button>

          </div>

          <div className="bg-white/5 border border-blue-500/20 rounded-3xl p-8">

            <div className="flex justify-between items-center">
              <h3 className="text-4xl font-bold text-blue-400">
                Quip Network
              </h3>

              <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm">
                Trending
              </span>
            </div>

            <p className="mt-6 text-gray-300">
              AI-powered decentralized ecosystem with active quests and strong community engagement.
            </p>

            <div className="flex gap-3 mt-6 flex-wrap">
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                AI
              </span>

              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                Quest
              </span>

              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                Rewards
              </span>
            </div>

            <button className="mt-8 px-6 py-3 rounded-xl bg-blue-500 font-semibold">
              View Guide
            </button>

          </div>

          <div className="bg-white/5 border border-purple-500/20 rounded-3xl p-8">

            <div className="flex justify-between items-center">
              <h3 className="text-4xl font-bold text-purple-400">
                Linera
              </h3>

              <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm">
                Hot
              </span>
            </div>

            <p className="mt-6 text-gray-300">
              One of the hottest modular blockchain ecosystems in Web3 with massive hype.
            </p>

            <div className="flex gap-3 mt-6 flex-wrap">
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                Modular
              </span>

              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                Web3
              </span>

              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                Alpha
              </span>
            </div>

            <button className="mt-8 px-6 py-3 rounded-xl bg-purple-500 font-semibold">
              View Guide
            </button>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer
        id="socials"
        className="border-t border-white/10 py-12 text-center text-gray-400"
      >

        <h3 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          CryptoDropScout
        </h3>

        <p className="mt-5">
          Stay Informed • Stay Ahead • Stay Connected
        </p>

        <div className="flex justify-center gap-8 mt-8 flex-wrap">

          <a
            href="https://t.me/CryptoDropScoutt"
            target="_blank"
            className="hover:text-cyan-400"
          >
            Telegram
          </a>

          <a
            href="https://youtube.com/@cryptodrop_scout"
            target="_blank"
            className="hover:text-cyan-400"
          >
            YouTube
          </a>

          <a
            href="https://x.com/cryptodrpscout"
            target="_blank"
            className="hover:text-cyan-400"
          >
            Twitter/X
          </a>

        </div>

      </footer>

    </main>
  );
}