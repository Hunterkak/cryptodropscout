import Link from "next/link";
import { featuredProjects, airdrops } from "./data/projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020817] text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
          CryptoDropScout
        </h1>

        <div className="flex gap-8 text-white">
          <a href="/">Home</a>
          <a href="/airdrops">Airdrops</a>
          <a href="/guides">Guides</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center py-24 px-6">
        <h1 className="text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text">
          CryptoDropScout
        </h1>

        <p className="text-gray-300 text-xl mt-6 max-w-3xl mx-auto">
          Discover Early Web3 Opportunities, Nodes, Testnets & Airdrops Before Everyone Else.
        </p>

        <div className="flex justify-center gap-6 mt-10">
          <a
            href="https://t.me/CryptoDropScoutt"
            target="_blank"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold"
          >
            Join Telegram
          </a>

          <a
            href="https://youtube.com/@cryptodrop_scout"
            target="_blank"
            className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 font-semibold"
          >
            YouTube
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="grid md:grid-cols-4 gap-8 px-8 pb-24">
        {[
          ["150+", "Active Airdrops"],
          ["80+", "Testnets"],
          ["40+", "Node Projects"],
          ["24/7", "Updates"],
        ].map(([number, label]) => (
          <div
            key={label}
            className="bg-[#111827] border border-white/10 rounded-3xl p-10 text-center"
          >
            <h2 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 text-transparent bg-clip-text">
              {number}
            </h2>

            <p className="text-gray-300 mt-4 text-lg">{label}</p>
          </div>
        ))}
      </section>

      {/* Featured Projects */}
      <section className="px-8 pb-24">
        <h2 className="text-5xl font-bold text-center mb-16">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {featuredProjects.map((project) => (
            <div
              key={project.title}
              className="bg-[#111827] border border-purple-500/20 rounded-3xl p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3
                  className={`text-4xl font-bold bg-gradient-to-r ${project.color} text-transparent bg-clip-text`}
                >
                  {project.title}
                </h3>

                <span className="bg-white/10 px-4 py-2 rounded-full text-sm">
                  {project.badge}
                </span>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">
                {project.description}
              </p>

              <div className="flex gap-3 flex-wrap mt-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/10 px-4 py-2 rounded-xl text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={project.link}
                className={`inline-block mt-8 px-6 py-3 rounded-2xl font-semibold bg-gradient-to-r ${project.color}`}
              >
                View Guide
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Airdrops */}
      <section className="px-8 pb-24">
        <h2 className="text-5xl font-bold text-center mb-16">
          Active Airdrops
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {airdrops.map((airdrop) => (
            <div
              key={airdrop.title}
              className="bg-[#111827] border border-cyan-500/20 rounded-3xl p-8"
            >
              <h3
                className={`text-4xl font-bold bg-gradient-to-r ${airdrop.color} text-transparent bg-clip-text`}
              >
                {airdrop.title}
              </h3>

              <p className="text-gray-300 text-lg mt-6 leading-relaxed">
                {airdrop.description}
              </p>

              <div className="flex gap-3 flex-wrap mt-6">
                {airdrop.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/10 px-4 py-2 rounded-xl text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={airdrop.link}
                className={`inline-block mt-8 px-6 py-3 rounded-2xl font-semibold bg-gradient-to-r ${airdrop.color}`}
              >
                {airdrop.button}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-16 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
          CryptoDropScout
        </h2>

        <p className="text-gray-400 mt-4">
          Stay Informed • Stay Ahead • Stay Connected
        </p>

        <div className="flex justify-center gap-8 mt-8 text-gray-300">
          <a href="https://t.me/CryptoDropScoutt" target="_blank">
            Telegram
          </a>

          <a href="https://youtube.com/@cryptodrop_scout" target="_blank">
            YouTube
          </a>

          <a href="https://x.com/cryptodrpscout" target="_blank">
            Twitter/X
          </a>
        </div>
      </footer>

    </main>
  );
}