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

          <a href="#airdrops" className="hover:text-cyan-400 transition">
            Airdrops
          </a>

          <a href="#socials" className="hover:text-cyan-400 transition">
            Socials
          </a>

        </div>

      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">

        <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          CryptoDropScout
        </h1>

        <p className="mt-6 text-xl text-gray-300 max-w-2xl">
          Discover Early Web3 Opportunities Before Everyone Else.
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

      {/* Airdrops Section */}
      <section
        id="airdrops"
        className="px-8 pb-24"
      >

        <h2 className="text-5xl font-bold text-center mb-14">
          Active Airdrops
        </h2>

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-white/5 border border-cyan-500/20 rounded-3xl p-8">

            <h3 className="text-3xl font-bold text-cyan-400">
              Monad Testnet
            </h3>

            <p className="mt-5 text-gray-300">
              Complete social tasks and testnet activities for future rewards.
            </p>

            <button className="mt-8 px-6 py-3 rounded-xl bg-cyan-500 font-semibold">
              Join Now
            </button>

          </div>

          <div className="bg-white/5 border border-purple-500/20 rounded-3xl p-8">

            <h3 className="text-3xl font-bold text-purple-400">
              LayerEdge
            </h3>

            <p className="mt-5 text-gray-300">
              Participate in node activities and ecosystem campaigns.
            </p>

            <button className="mt-8 px-6 py-3 rounded-xl bg-purple-500 font-semibold">
              Join Now
            </button>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer
        id="socials"
        className="border-t border-white/10 py-12 text-center text-gray-400"
      >

        <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
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