import Link from "next/link";
import { featuredProjects, airdrops } from "./data/projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020817] text-white overflow-hidden">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10 backdrop-blur-xl sticky top-0 z-50 bg-[#020817]/80">

        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          CryptoDropScout
        </h1>

        <div className="flex gap-8 text-gray-300 font-medium">

          <a href="/" className="hover:text-cyan-400 transition">
            Home
          </a>

          <a href="/airdrops" className="hover:text-cyan-400 transition">
            Airdrops
          </a>

          <a href="/guides" className="hover:text-cyan-400 transition">
            Guides
          </a>

        </div>

      </nav>

      {/* Hero */}
      <section className="relative text-center py-32 px-6">

        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent blur-3xl"></div>

        <h1 className="relative text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          CryptoDropScout
        </h1>

        <p className="relative mt-8 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Discover Early Web3 Opportunities, Nodes, Testnets & Airdrops Before Everyone Else.
        </p>

        <div className="relative flex justify-center gap-6 mt-12 flex-wrap">

          <a
            href="https://t.me/CryptoDropScoutt"
            target="_blank"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-lg hover:scale-105 transition"
          >
            Join Telegram
          </a>

          <a
            href="https://youtube.com/@cryptodrop_scout"
            target="_blank"
            className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 font-semibold text-lg hover:bg-white/10 transition"
          >
            YouTube Channel
          </a>

        </div>

      </section>

      {/* Stats */}
      <section className="grid md:grid-cols-4 gap-8 px-8 pb-28">

        {[
          ["150+", "Active Airdrops"],
          ["80+", "Testnets"],
          ["40+", "Node Projects"],
          ["24/7", "Daily Updates"],
        ].map(([number, label]) => (

          <div
            key={label}
            className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center backdrop-blur-xl hover:scale-105 transition"
          >

            <h2 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {number}
            </h2>

            <p className="mt-4 text-gray-300 text-lg">
              {label}
            </p>

          </div>

        ))}

      </section>

      {/* Featured Projects */}
      <section className="px-8 pb-28">

        <h2 className="text-5xl font-bold text-center mb-16">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {featuredProjects.map((project) => (

            <div
              key={project.title}
              className="bg-white/5 border border-purple-500/20 rounded-3xl overflow-hidden backdrop-blur-xl hover:scale-[1.02] transition"
            >

              <img
                src={project.image}
                alt={project.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-8">

                <div className="flex justify-between items-center mb-6">

                  <h3
                    className={`text-4xl font-bold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}
                  >
                    {project.title}
                  </h3>

                  <span className="bg-white/10 px-4 py-2 rounded-full text-sm text-gray-300">
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
                      className="px-4 py-2 rounded-xl bg-white/10 text-sm"
                    >
                      {tag}
                    </span>

                  ))}

                </div>

                <Link
                  href={project.link}
                  className={`inline-block mt-8 px-6 py-3 rounded-2xl bg-gradient-to-r ${project.color} font-semibold hover:opacity-90 transition`}
                >
                  View Project
                </Link>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* Active Airdrops */}
      <section className="px-8 pb-28">

        <h2 className="text-5xl font-bold text-center mb-16">
          Active Airdrops
        </h2>

        <div className="grid md:grid-cols-2 gap-10">

          {airdrops.map((airdrop) => (

            <div
              key={airdrop.title}
              className="bg-white/5 border border-cyan-500/20 rounded-3xl p-8 backdrop-blur-xl hover:scale-[1.02] transition"
            >

              <h3
                className={`text-4xl font-bold bg-gradient-to-r ${airdrop.color} bg-clip-text text-transparent`}
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
                    className="px-4 py-2 rounded-xl bg-white/10 text-sm"
                  >
                    {tag}
                  </span>

                ))}

              </div>

              <a
                href={airdrop.link}
                target="_blank"
                className={`inline-block mt-8 px-6 py-3 rounded-2xl bg-gradient-to-r ${airdrop.color} font-semibold hover:opacity-90 transition`}
              >
                {airdrop.button}
              </a>

            </div>

          ))}

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-16 text-center bg-white/5 backdrop-blur-xl">

        <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          CryptoDropScout
        </h2>

        <p className="text-gray-400 mt-5 text-lg">
          Stay Informed • Stay Ahead • Stay Connected
        </p>

        <div className="flex justify-center gap-8 mt-10 flex-wrap">

          <a
            href="https://t.me/CryptoDropScoutt"
            target="_blank"
            className="px-6 py-3 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 transition"
          >
            Telegram
          </a>

          <a
            href="https://youtube.com/@cryptodrop_scout"
            target="_blank"
            className="px-6 py-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 transition"
          >
            YouTube
          </a>

          <a
            href="https://x.com/cryptodrpscout"
            target="_blank"
            className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition"
          >
            Twitter / X
          </a>

        </div>

        <p className="mt-10 text-gray-500 text-sm">
          © 2026 CryptoDropScout. All rights reserved.
        </p>

      </footer>

    </main>
  );
}