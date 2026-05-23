export default function Home() {
  return (
    <main className="min-h-screen bg-[#070B14] text-white overflow-hidden">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-white/10">

        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          CryptoDropScout
        </h1>

        <div className="flex gap-8 text-gray-300 font-medium">

          <a href="/" className="hover:text-cyan-400">
            Home
          </a>

          <a href="/guides" className="hover:text-cyan-400">
            Guides
          </a>

          <a
            href="https://t.me/CryptoDropScoutt"
            target="_blank"
            className="hover:text-cyan-400"
          >
            Telegram
          </a>

        </div>

      </nav>

      {/* Hero Section */}
      <section className="text-center py-32 px-6">

        <h1 className="text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          CryptoDropScout
        </h1>

        <p className="mt-8 text-2xl text-gray-300 max-w-4xl mx-auto">
          Discover Early Web3 Opportunities, Nodes, Testnets & Airdrops Before Everyone Else.
        </p>

        <div className="flex justify-center gap-6 mt-12">

          <a
            href="https://t.me/CryptoDropScoutt"
            target="_blank"
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-bold"
          >
            Join Telegram
          </a>

          <a
            href="https://youtube.com/@cryptodrop_scout"
            target="_blank"
            className="px-10 py-4 rounded-2xl border border-white/20 bg-white/5 text-white text-lg font-bold"
          >
            YouTube
          </a>

        </div>

      </section>

      {/* Stats */}
      <section className="grid md:grid-cols-4 gap-8 px-8">

        <div className="bg-white/5 border border-cyan-500/20 rounded-3xl p-10 text-center">
          <h2 className="text-6xl font-extrabold text-cyan-400">
            150+
          </h2>
          <p className="mt-4 text-2xl text-gray-300">
            Active Airdrops
          </p>
        </div>

        <div className="bg-white/5 border border-blue-500/20 rounded-3xl p-10 text-center">
          <h2 className="text-6xl font-extrabold text-blue-400">
            80+
          </h2>
          <p className="mt-4 text-2xl text-gray-300">
            Testnets
          </p>
        </div>

        <div className="bg-white/5 border border-purple-500/20 rounded-3xl p-10 text-center">
          <h2 className="text-6xl font-extrabold text-purple-400">
            40+
          </h2>
          <p className="mt-4 text-2xl text-gray-300">
            Node Projects
          </p>
        </div>

        <div className="bg-white/5 border border-pink-500/20 rounded-3xl p-10 text-center">
          <h2 className="text-6xl font-extrabold text-pink-400">
            24/7
          </h2>
          <p className="mt-4 text-2xl text-gray-300">
            Updates
          </p>
        </div>

      </section>

      {/* Featured Guides */}
      <section className="px-8 py-32">

        <h2 className="text-6xl font-extrabold text-center mb-20">
          Featured Guides
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white/5 border border-cyan-500/20 rounded-3xl p-8">

            <h3 className="text-4xl font-bold text-cyan-400 mb-6">
              DAC Chain
            </h3>

            <p className="text-gray-300 text-lg mb-8">
              Early node opportunity with strong community growth and future rewards.
            </p>

            <a
              href="/guides"
              className="px-8 py-4 rounded-2xl bg-cyan-500 text-white font-bold inline-block"
            >
              View Guide
            </a>

          </div>

          <div className="bg-white/5 border border-blue-500/20 rounded-3xl p-8">

            <h3 className="text-4xl font-bold text-blue-400 mb-6">
              Quip Network
            </h3>

            <p className="text-gray-300 text-lg mb-8">
              AI-powered decentralized ecosystem with active quests and rewards.
            </p>

            <a
              href="/guides"
              className="px-8 py-4 rounded-2xl bg-blue-500 text-white font-bold inline-block"
            >
              View Guide
            </a>

          </div>

          <div className="bg-white/5 border border-purple-500/20 rounded-3xl p-8">

            <h3 className="text-4xl font-bold text-purple-400 mb-6">
              Linera
            </h3>

            <p className="text-gray-300 text-lg mb-8">
              One of the hottest modular blockchain ecosystems in Web3.
            </p>

            <a
              href="/guides"
              className="px-8 py-4 rounded-2xl bg-purple-500 text-white font-bold inline-block"
            >
              View Guide
            </a>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-14 text-center">

        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          CryptoDropScout
        </h2>

        <p className="text-gray-400 mt-4 text-xl">
          Stay Informed • Stay Ahead • Stay Connected
        </p>

        <div className="flex justify-center gap-8 mt-8 text-lg text-gray-300">

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