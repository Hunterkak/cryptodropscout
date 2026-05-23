export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-white px-6 py-20">

      <h1 className="text-6xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
        Crypto Blog & Alpha
      </h1>

      <p className="text-center text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
        Latest airdrop updates, Web3 alpha, node guides and ecosystem news.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">

        <div className="bg-white/5 border border-cyan-500/20 rounded-3xl p-8">

          <span className="text-cyan-400 text-sm font-semibold">
            FEATURED
          </span>

          <h2 className="mt-4 text-3xl font-bold">
            DAC Chain Early Guide
          </h2>

          <p className="mt-5 text-gray-300">
            Full beginner guide to join DAC Chain ecosystem early and position for future rewards.
          </p>

          <a
            href="/guides/dac-chain"
            className="inline-block mt-8 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold"
          >
            Read More
          </a>

        </div>

        <div className="bg-white/5 border border-purple-500/20 rounded-3xl p-8">

          <span className="text-purple-400 text-sm font-semibold">
            TRENDING
          </span>

          <h2 className="mt-4 text-3xl font-bold">
            Quip Network Alpha
          </h2>

          <p className="mt-5 text-gray-300">
            Explore Quip Network quests, rewards and ecosystem opportunities before mass adoption.
          </p>

          <a
            href="https://quest.quip.network/airdrop?referral_code=B82YWXDM"
            target="_blank"
            className="inline-block mt-8 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold"
          >
            Explore
          </a>

        </div>

        <div className="bg-white/5 border border-blue-500/20 rounded-3xl p-8">

          <span className="text-blue-400 text-sm font-semibold">
            HOT
          </span>

          <h2 className="mt-4 text-3xl font-bold">
            Linera Ecosystem
          </h2>

          <p className="mt-5 text-gray-300">
            One of the most hyped modular blockchain ecosystems with growing community interest.
          </p>

          <a
            href="https://portal.linera.net?referralCode=brilliant-fox-5461"
            target="_blank"
            className="inline-block mt-8 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 font-semibold"
          >
            Join Now
          </a>

        </div>

      </div>

    </main>
  );
}