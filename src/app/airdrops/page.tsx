'use client';

import {
  useEffect,
  useState,
} from 'react';

import Link from 'next/link';

import {
  getProjectsByCategory,
} from '@/lib/projects';

export default function AirdropsPage() {

  const [projects, setProjects] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function load() {

      try {

        const data =
          await getProjectsByCategory(
            'airdrop'
          );

        setProjects(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    load();

  }, []);

  const diffColors:
    Record<string, string> = {

    Easy:
      'text-green-300 border-green-400/30 bg-green-500/10',

    Medium:
      'text-yellow-300 border-yellow-400/30 bg-yellow-500/10',

    Hard:
      'text-red-300 border-red-400/30 bg-red-500/10',

  };

  const statusColors:
    Record<string, string> = {

    active:
      'bg-green-500',

    alpha:
      'bg-purple-500',

    hot:
      'bg-red-500',

    ended:
      'bg-gray-500',

  };

  return (

    <main className="min-h-screen bg-[#050816] text-white overflow-hidden relative">

      {/* GLOW */}

      <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

      <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-purple-500/10 blur-[140px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-14">

        {/* TOP */}

        <Link
          href="/"
          className="inline-flex items-center gap-3 text-cyan-400 hover:text-cyan-300 transition mb-8"
        >
          ← Back To Homepage
        </Link>

        <div className="mb-14">

          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 mb-6">

            🪂 Live Airdrops

          </div>

          <h1 className="text-5xl lg:text-7xl font-black leading-tight">

            Discover Premium
            <span className="block bg-gradient-to-r from-cyan-300 via-white to-purple-400 text-transparent bg-clip-text">

              Crypto Airdrops

            </span>

          </h1>

          <p className="text-gray-400 text-xl mt-8 max-w-3xl leading-9">

            Explore curated airdrop
            opportunities, Web3
            campaigns and early alpha
            rewards before everyone
            else.

          </p>

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">

            {[...Array(6)].map(
              (_, i) => (

                <div
                  key={i}
                  className="h-[380px] rounded-[32px] bg-white/5 animate-pulse border border-white/10"
                />

              )
            )}

          </div>

        ) : (

          <>

            {/* EMPTY */}

            {projects.length ===
              0 && (

              <div className="text-center py-28 rounded-[32px] border border-white/10 bg-white/5">

                <h2 className="text-4xl font-black mb-6">

                  No Airdrops Yet

                </h2>

                <p className="text-gray-400 text-lg">

                  Add projects from the
                  admin panel 😄

                </p>

              </div>

            )}

            {/* GRID */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">

              {projects.map(
                (p: any) => (

                  <div
                    key={p.id}
                    className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-[#111827] to-[#0b1020] hover:border-cyan-400/30 transition-all duration-300 hover:scale-[1.02] shadow-2xl"
                  >

                    {/* FEATURED */}

                    {p.featured && (

                      <div className="absolute top-4 right-4 z-20 px-4 py-2 rounded-full bg-yellow-500 text-black text-xs font-black">

                        FEATURED

                      </div>

                    )}

                    {/* IMAGE */}

                    <div className="relative overflow-hidden h-52">

                      <img
                        src={
                          p.image ||
                          'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=600'
                        }
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent"></div>

                    </div>

                    {/* CONTENT */}

                    <div className="p-6">

                      <div className="flex items-center justify-between mb-5">

                        <span
                          className={`px-4 py-2 rounded-full text-xs font-bold text-white ${
                            statusColors[
                              p.status?.toLowerCase()
                            ] ||
                            'bg-cyan-500'
                          }`}
                        >
                          {p.status}
                        </span>

                        <span className="text-green-400 font-black text-lg">

                          {p.reward}

                        </span>

                      </div>

                      <h2 className="text-3xl font-black leading-tight mb-4 group-hover:text-cyan-300 transition">

                        {p.title}

                      </h2>

                      <p className="text-gray-400 leading-8 line-clamp-3 mb-6">

                        {p.description}

                      </p>

                      <div className="flex items-center justify-between gap-4">

                        <span
                          className={`px-4 py-2 rounded-full text-xs font-bold border ${
                            diffColors[
                              p.difficulty
                            ] ||
                            diffColors.Easy
                          }`}
                        >
                          {p.difficulty}
                        </span>

                        <Link
                          href={`/project/${p.id}`}
                          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold hover:scale-[1.03] transition"
                        >
                          Open Guide →
                        </Link>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          </>

        )}

      </div>

    </main>

  );

}