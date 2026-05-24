'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useParams } from 'next/navigation';

import { getAllProjects } from '@/lib/projects';

export default function ProjectPage() {

  const params = useParams();

  const id = params?.id as string;

  const [project, setProject] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchProject() {

      try {

        const allProjects = await getAllProjects();

        const found = allProjects.find(
          (p: any) =>
            p.id === id ||
            p.slug === id
        );

        setProject(found || null);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    if (id) {
      fetchProject();
    }

  }, [id]);

  if (loading) {

    return (

      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white text-3xl">

        Loading...

      </div>

    );

  }

  if (!project) {

    return (

      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white text-3xl">

        Project Not Found

      </div>

    );

  }

  return (

    <main className="min-h-screen bg-[#050816] text-white overflow-hidden">

      {/* Glow */}

      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[140px] rounded-full"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">

        <Link
          href="/airdrops"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition mb-10"
        >
          ← Back
        </Link>

        {/* Hero */}

        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl">

          <img
            src={
              project.image ||
              'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200'
            }
            alt={project.title}
            className="w-full h-[420px] object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent"></div>

        </div>

        {/* Content */}

        <div className="mt-12">

          <div className="flex flex-wrap items-center gap-4 mb-8">

            <span className="px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm">
              {project.status}
            </span>

            <span className="px-5 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm">
              {project.difficulty}
            </span>

            <span className="px-5 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-sm">
              {project.reward}
            </span>

          </div>

          <h1 className="text-6xl font-black leading-tight mb-8">

            {project.title}

          </h1>

          <p className="text-xl text-gray-400 leading-relaxed max-w-4xl">

            {project.description}

          </p>

          {/* Buttons */}

          <div className="flex flex-wrap gap-5 mt-10">

            {project.link && (

              <a
                href={project.link}
                target="_blank"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold hover:scale-105 transition"
              >
                Visit Website
              </a>

            )}

            {project.airdrop && (

              <a
                href={project.airdrop}
                target="_blank"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 font-bold hover:scale-105 transition"
              >
                Airdrop Link
              </a>

            )}

            {project.twitter && (

              <a
                href={project.twitter}
                target="_blank"
                className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                Twitter/X
              </a>

            )}

            {project.youtube && (

              <a
                href={project.youtube}
                target="_blank"
                className="px-8 py-4 rounded-2xl bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition"
              >
                YouTube Guide
              </a>

            )}

          </div>

          {/* Steps */}

          <div className="mt-20">

            <h2 className="text-4xl font-black mb-10">
              🚀 Step-by-Step Guide
            </h2>

            <div className="grid gap-8">

              {project.guide?.map(
                (step: string, index: number) => (

                  <div
                    key={index}
                    className="rounded-[32px] bg-white/5 border border-white/10 p-8 backdrop-blur-xl"
                  >

                    <div className="inline-flex px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm mb-6">
                      STEP {index + 1}
                    </div>

                    <p className="text-lg text-gray-300 leading-9">

                      {step}

                    </p>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}