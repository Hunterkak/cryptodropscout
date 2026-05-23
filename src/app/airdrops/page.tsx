export default function AirdropsPage() {
  return (
    <main className="min-h-screen bg-[#070B14] text-white px-6 py-20">

      <h1 className="text-5xl md:text-7xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
        Active Airdrops
      </h1>

      <p className="text-center text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
        Discover early crypto airdrops, testnets, nodes and farming opportunities before everyone else.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

        <div className="bg-white/5 border border-cyan-500/20 rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-cyan-400">
            Monad Testnet
          </h2>

          <p className="text-gray-300 mt-5">
            Complete social tasks and testnet activities for possible future rewards.
          </p>

          <div className="flex gap-3 mt-5">
            <span className="bg-white/10 px-4 py-2 rounded-xl text-sm">
              Testnet
            </span>

            <span className="bg-white/10 px-4 py-2 rounded-xl text-sm">
              Free
            </span>
          </div>

          <a
            href="https://monad.xyz"
            target="_blank"
            className="inline-block mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 font-semibold"
          >
            Join Now
          </a>
        </div>

        <div className="bg-white/5 border border-purple-500/20 rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-purple-400">
            LayerEdge
          </h2>

          <p className="text-gray-300 mt-5">
            Participate in node activities and ecosystem campaigns.
          </p>

          <div className="flex gap-3 mt-5">
            <span className="bg-white/10 px-4 py-2 rounded-xl text-sm">
              Node
            </span>

            <span className="bg-white/10 px-4 py-2 rounded-xl text-sm">
              Potential
            </span>
          </div>

          <a
            href="https://layeredge.io"
            target="_blank"
            className="inline-block mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold"
          >
            Join Now
          </a>
        </div>

        <div className="bg-white/5 border border-blue-500/20 rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-blue-400">
            Base Ecosystem
          </h2>

          <p className="text-gray-300 mt-5">
            Explore early Base ecosystem projects and farm future rewards.
          </p>

          <div className="flex gap-3 mt-5">
            <span className="bg-white/10 px-4 py-2 rounded-xl text-sm">
              Farming
            </span>

            <span className="bg-white/10 px-4 py-2 rounded-xl text-sm">
              Ecosystem
            </span>
          </div>

          <a
            href="https://base.org"
            target="_blank"
            className="inline-block mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 font-semibold"
          >
            Explore
          </a>
        </div>

      </div>

    </main>
  );
}