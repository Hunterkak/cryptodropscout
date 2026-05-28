'use client';

import Link from 'next/link';

import {
  useEffect,
  useState,
} from 'react';

import Navbar from './components/Navbar';

import {
  getAllProjects,
  getAllBlogs,
} from '@/lib/projects';

export default function HomePage() {

  const [projects, setProjects] =
    useState<any[]>([]);

  const [blogs, setBlogs] =
    useState<any[]>([]);

  const [activeFilter, setActiveFilter] =
    useState('Active');

  useEffect(() => {

    async function load() {

      try {

        const projectData =
          await getAllProjects();

        const blogData =
          await getAllBlogs();

        setProjects(
          projectData
        );

        setBlogs(
          blogData
        );

      } catch (error) {

        console.error(error);

      }

    }

    load();

  }, []);

  const filteredProjects =
    projects.filter((project) => {

      const status =
        project.status?.toLowerCase();

      if (
        activeFilter === 'Active'
      ) {

        return (
          status !== 'ended'
        );

      }

      if (
        activeFilter === 'Alpha'
      ) {

        return (
          status === 'alpha'
        );

      }

      if (
        activeFilter === 'Ended'
      ) {

        return (
          status === 'ended'
        );

      }

      return true;

    });

  const featuredProjects =
    projects.filter(
      (project) =>
        project.featured ===
          true &&
        project.status
          ?.toLowerCase() !==
          'ended'
    );

  return (

    <main className="min-h-screen bg-[#050816] text-white overflow-x-hidden">

      <Navbar />

      {/* HERO */}

      <section className="relative overflow-hidden">

        <div className="absolute top-[-150px] left-[-150px] w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-cyan-500/20 blur-[140px] rounded-full animate-pulse" />

        <div className="absolute bottom-[-200px] right-[-150px] w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-purple-500/20 blur-[140px] rounded-full animate-pulse" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-20 sm:pb-32 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

          {/* LEFT */}

          <div className="relative z-20 text-center lg:text-left">

            <div className="inline-flex items-center gap-3 px-4 sm:px-5 py-3 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 mb-8 text-sm sm:text-base">

              🚀 Web3 Alpha Platform

            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight break-words">

              <span className="bg-gradient-to-r from-white via-cyan-300 to-purple-400 text-transparent bg-clip-text">

                CryptoDropScout

              </span>

            </h1>

            <p className="text-gray-400 text-lg sm:text-xl lg:text-2xl mt-8 sm:mt-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">

              Discover the best crypto
              airdrops, testnets and
              Web3 opportunities before
              everyone else.

            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-10 sm:mt-12">

              <Link
                href="/airdrops"
                className="w-full sm:w-auto text-center px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-black text-base sm:text-lg hover:scale-105 transition duration-300 shadow-xl"
              >
                Explore Airdrops
              </Link>

              <Link
                href="/testnets"
                className="w-full sm:w-auto text-center px-8 sm:px-10 py-4 sm:py-5 rounded-2xl border border-white/10 bg-white/5 font-black text-base sm:text-lg hover:bg-white/10 transition duration-300"
              >
                View Testnets
              </Link>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative flex justify-center lg:justify-end">

            <div className="absolute w-[260px] sm:w-[420px] h-[260px] sm:h-[420px] bg-cyan-500/20 blur-[120px] rounded-full" />

            <div className="relative animate-float mt-10 lg:mt-0 w-full max-w-[520px]">

              <img
                src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop"
                alt="Crypto"
                className="w-full rounded-[24px] sm:rounded-[40px] border border-white/10 shadow-2xl object-cover"
              />

              <div className="absolute bottom-4 sm:bottom-6 left-2 sm:-left-6 bg-[#0b1020]/90 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl">

                <p className="text-gray-400 text-xs sm:text-sm">
                  Live Opportunities
                </p>

                <h3 className="text-2xl sm:text-4xl font-black mt-2">
                  250+
                </h3>

              </div>

              <div className="absolute top-4 sm:top-6 right-2 sm:right-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl sm:rounded-3xl px-4 sm:px-6 py-3 sm:py-4 font-bold shadow-2xl text-xs sm:text-base">

                🔥 Trending Alpha

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURED PROJECTS */}

      {featuredProjects.length > 0 && (

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

          <div className="flex items-center justify-between mb-10 sm:mb-12">

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black">

              ⭐ Featured Projects

            </h2>

          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {featuredProjects.map(
              (project) => (

                <div
                  key={project.id}
                  className="relative overflow-hidden rounded-[24px] sm:rounded-[30px] border border-yellow-500/20 bg-gradient-to-b from-[#151b2f] to-[#0b1020] shadow-[0_0_40px_rgba(255,215,0,0.08)]"
                >

                  <div className="absolute top-4 right-4 z-20 px-4 py-2 rounded-full bg-yellow-500 text-black text-xs font-black">

                    FEATURED

                  </div>

                  <img
                    src={
                      project.image ||
                      'https://picsum.photos/600/400'
                    }
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-5">

                    <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">

                      <span className="px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 text-xs">

                        {project.status}

                      </span>

                      <span className="text-green-400 font-bold text-base sm:text-lg">

                        {project.reward}

                      </span>

                    </div>

                    <h3 className="text-2xl sm:text-[28px] font-black break-words">

                      {project.title}

                    </h3>

                    <p className="text-gray-400 mt-4 text-sm sm:text-base">

                      Difficulty: {project.difficulty}

                    </p>

                    <Link
                      href={`/project/${project.slug}`}
                      className="mt-5 block w-full text-center py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black hover:scale-[1.02] transition"
                    >
                      Explore →
                    </Link>

                  </div>

                </div>

              )
            )}

          </div>

        </section>

      )}

      {/* LIVE PROJECTS */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-12">

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black flex items-center gap-4 sm:gap-5">
            🔥 Live Projects
          </h2>

          <div className="flex items-center gap-3 flex-wrap">

            <button
              onClick={() =>
                setActiveFilter(
                  'Active'
                )
              }
              className={`px-5 py-3 rounded-2xl font-semibold transition ${
                activeFilter ===
                'Active'
                  ? 'bg-green-500 text-white'
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              Active
            </button>

            <button
              onClick={() =>
                setActiveFilter(
                  'Alpha'
                )
              }
              className={`px-5 py-3 rounded-2xl font-semibold transition ${
                activeFilter ===
                'Alpha'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              Alpha
            </button>

            <button
              onClick={() =>
                setActiveFilter(
                  'Ended'
                )
              }
              className={`px-5 py-3 rounded-2xl font-semibold transition ${
                activeFilter ===
                'Ended'
                  ? 'bg-red-500 text-white'
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              Ended
            </button>

          </div>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredProjects.map(
            (project) => (

              <div
                key={project.id}
                className="rounded-[24px] sm:rounded-[30px] overflow-hidden border border-white/10 bg-gradient-to-b from-[#111827] to-[#0b1020] hover:scale-[1.02] transition duration-300 shadow-2xl"
              >

                <img
                  src={
                    project.image ||
                    'https://picsum.photos/600/400'
                  }
                  alt={project.title}
                  className="w-full h-52 object-cover"
                />

                <div className="p-5">

                  <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">

                    <span className="px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 text-xs">

                      {project.status}

                    </span>

                    <span className="text-green-400 font-bold text-base sm:text-lg">

                      {project.reward}

                    </span>

                  </div>

                  <h3 className="text-2xl sm:text-[28px] font-black break-words">

                    {project.title}

                  </h3>

                  <p className="text-gray-400 mt-4 text-sm sm:text-base">

                    Difficulty: {project.difficulty}

                  </p>

                  <Link
                    href={`/project/${project.slug}`}
                    className="mt-5 block w-full text-center py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-black hover:scale-[1.02] transition"
                  >
                    Open Guide →
                  </Link>

                </div>

              </div>

            )
          )}

        </div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-white/10 mt-24 sm:mt-32 bg-[#070b18]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

            <div className="text-center lg:text-left">

              <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text">

                CryptoDropScout

              </h2>

              <p className="text-gray-400 mt-4 max-w-xl text-sm sm:text-base">

                Discover premium crypto
                airdrops, testnets and
                Web3 alpha opportunities
                before everyone else.

              </p>

            </div>

            <div className="flex items-center justify-center gap-4 flex-wrap">

              <a
                href="https://youtube.com/@cryptodrop_scout"
                target="_blank"
                className="px-5 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition"
              >
                ▶ YouTube
              </a>

              <a
                href="https://x.com/cryptodrpscout"
                target="_blank"
                className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                𝕏 Twitter
              </a>

              <a
                href="https://t.me/CryptoDropScoutt"
                target="_blank"
                className="px-5 py-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition"
              >
                ✈ Telegram
              </a>

              <a
                href="https://github.com/Hunterkak/cryptodropscout"
                target="_blank"
                className="px-5 py-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition"
              >
                GitHub
              </a>

            </div>

          </div>

          <div className="border-t border-white/10 mt-10 pt-8 text-center text-gray-500 text-sm sm:text-base">

            © 2026 CryptoDropScout.
            All Rights Reserved.

          </div>

        </div>

      </footer>

    </main>

  );

}