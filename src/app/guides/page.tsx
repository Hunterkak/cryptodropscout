export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-[#070B14] text-white px-8 py-20">

      <h1 className="text-5xl font-extrabold text-center mb-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
        Crypto Guides
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="bg-white/5 border border-cyan-500/20 rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">
            DAC Node Guide
          </h2>

          <p className="text-gray-300 mb-6">
            Learn how to setup DAC node step by step and qualify for future rewards.
          </p>

          <a
            href="https://t.me/CryptoDropScoutt"
            target="_blank"
            className="px-6 py-3 rounded-2xl bg-cyan-500 text-white font-semibold inline-block"
          >
            Read Guide
          </a>
        </div>

        <div className="bg-white/5 border border-blue-500/20 rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-blue-400 mb-4">
            Linera Guide
          </h2>

          <p className="text-gray-300 mb-6">
            Complete Linera testnet tasks and stay eligible for possible airdrops.
          </p>

          <a
            href="https://youtube.com/@cryptodrop_scout"
            target="_blank"
            className="px-6 py-3 rounded-2xl bg-blue-500 text-white font-semibold inline-block"
          >
            Watch Video
          </a>
        </div>

        <div className="bg-white/5 border border-purple-500/20 rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-purple-400 mb-4">
            Quip Network
          </h2>

          <p className="text-gray-300 mb-6">
            Explore Quip AI ecosystem and complete quests for early access rewards.
          </p>

          <a
            href="https://x.com/cryptodrpscout"
            target="_blank"
            className="px-6 py-3 rounded-2xl bg-purple-500 text-white font-semibold inline-block"
          >
            Visit X
          </a>
        </div>

      </div>

      <footer className="mt-24 border-t border-white/10 pt-10 text-center">

        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          CryptoDropScout
        </h2>

        <p className="text-gray-400 mt-3">
          Stay Informed • Stay Ahead • Stay Connected
        </p>

        <div className="flex justify-center gap-8 mt-6 text-gray-300">

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