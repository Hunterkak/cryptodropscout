'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProjectsByCategory } from '@/lib/projects';

export default function AirdropsPage() {

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    getProjectsByCategory('airdrop').then((data) => {
      setProjects(data);
      setLoading(false);
    });

  }, []);

  const diffColors: Record<string, string> = {
    Easy: 'text-green-400 border-green-400',
    Medium: 'text-yellow-400 border-yellow-400',
    Hard: 'text-red-400 border-red-400',
  };

  const statusColors: Record<string, string> = {
    hot: 'bg-red-500',
    active: 'bg-green-500',
    potential: 'bg-yellow-500',
    ended: 'bg-gray-500',
  };

  return (

    <div className="min-h-screen bg-[#0a0a0f] text-white">

      <div className="max-w-7xl mx-auto px-4 py-12">

        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-purple-400 mb-6 block"
        >
          ← Home
        </Link>

        <h1 className="text-4xl font-extrabold mb-2">
          🪂 All Airdrops
        </h1>

        <p className="text-gray-500 mb-10">
          Verified airdrop opportunities — updated regularly
        </p>

        {loading ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {[...Array(6)].map((_, i) => (

              <div
                key={i}
                className="h-52 rounded-2xl bg-white/5 animate-pulse"
              />

            ))}

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {projects.map((p: any) => (

              <div
                key={p.id}
                className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all"
              >

                <div className="h-40 overflow-hidden">

                  <img
                    src={
                      p.bannerImage ||
                      'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=600'
                    }
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                </div>

                <span
                  className={`absolute top-3 left-3 px-2 py-0.5 text-xs font-bold rounded-full text-white ${statusColors[p.status]}`}
                >
                  {p.status}
                </span>

                <span className="absolute top-3 right-3 px-2 py-0.5 text-xs font-bold rounded-full bg-black/60 text-yellow-400 border border-yellow-400/30">
                  {p.reward}
                </span>

                <div className="p-4">

                  <h3 className="font-bold text-lg mb-2 group-hover:text-purple-400 transition">
                    {p.name}
                  </h3>

                  <div className="flex items-center justify-between">

                    <span
                      className={`text-xs px-2 py-0.5 rounded border ${diffColors[p.difficulty]}`}
                    >
                      {p.difficulty}
                    </span>

                    <Link
                      href={`/project/${p.id}`}
                      className="text-xs text-purple-400 font-semibold"
                    >
                      Open Guide →
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

        {!loading && projects.length === 0 && (

          <p className="text-center text-gray-500 py-20">
            No airdrops yet. Admin panel theke add koro!
          </p>

        )}

      </div>

    </div>

  );

}