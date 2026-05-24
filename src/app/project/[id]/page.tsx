'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useParams } from 'next/navigation';

import { getAllProjects } from '@/lib/projects';

export default function ProjectPage() {

  const params = useParams();

  const id = params?.id as string;

  const [project, setProject] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function fetchProject() {

      try {

        const allProjects =
          await getAllProjects();

        const found =
          allProjects.find(
            (p: any) =>
              p.id === id ||
              p.slug === id
          );

        setProject(
          found || null
        );

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

      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white text-3xl font-black">

        Loading...

      </div>

    );

  }

  if (!project) {

    return (

      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white text-3xl font-black">

        Project Not Found

      </div>

    );

  }

  return (

    <main className="min-h-screen bg-[#050816] text-white overflow-hidden relative">

      {/* GLOW */}

      <div className="fixed top-[-150px] left-[-150px] w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

      <div className="fixed bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-purple-500/10 blur-[140px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14">

        {/* BACK */}

        <Link
          href="/"
          className="inline-flex items-center gap-3 text-cyan-400 hover:text-cyan-300 transition mb-10 text-lg"
        >
          ← Back To Homepage
        </Link>

        {/* HERO */}

        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

          <img
            src={
              project.image ||
              'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200'
            }
            alt={project.title}
            className="w-full h-[500px] object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/20 to-transparent"></div>

          {/* CONTENT OVERLAY */}

          <div className="absolute bottom-0 left-0 w-full p-10">

            <div className="flex flex-wrap items-center gap-4 mb-6">

              <span className="px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm backdrop-blur-xl">

                {project.status}

              </span>

              <span className="px-5 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm backdrop-blur-xl">

                {project.difficulty}

              </span>

              <span className="px-5 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-sm backdrop-blur-xl">

                {project.reward}

              </span>

              {project.featured && (

                <span className="px-5 py-2 rounded-full bg-yellow-500 text-black text-sm font-black">

                  FEATURED

                </span>

              )}

            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-tight max-w-5xl">

              {project.title}

            </h1>

          </div>

        </div>

        {/* MAIN GRID */}

        <div className="grid lg:grid-cols-[1fr_340px] gap-10 mt-14">

          {/* LEFT */}

          <div>

            {/* DESCRIPTION */}

            <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8">

              <h2 className="text-3xl font-black mb-6">

                📖 Overview

              </h2>

              <p className="text-xl text-gray-300 leading-10">

                {project.description}

              </p>

            </div>

            {/* GUIDE */}

            <div className="mt-14">

              <h2 className="text-5xl font-black mb-10">

                🚀 Step-by-Step Guide

              </h2>

              <div className="grid gap-8">

                {project.guide?.map(
                  (
                    step: string,
                    index: number
                  ) => (

                    <div
                      key={index}
                      className="relative rounded-[32px] bg-white/5 border border-white/10 p-8 backdrop-blur-xl overflow-hidden"
                    >

                      <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-cyan-500/5 blur-[70px] rounded-full"></div>

                      <div className="relative z-10">

                        <div className="inline-flex px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm mb-6 font-bold">

                          STEP {index + 1}

                        </div>

                        <p className="text-lg text-gray-300 leading-10">

                          {step}

                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>

          {/* RIGHT SIDEBAR */}

          <div className="lg:sticky lg:top-28 h-fit">

            <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

              <h2 className="text-3xl font-black mb-8">

                🔗 Quick Access

              </h2>

              <div className="space-y-5">

                {project.link && (

                  <a
                    href={project.link}
                    target="_blank"
                    className="block w-full text-center py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-black hover:scale-[1.02] transition"
                  >

                    Visit Website

                  </a>

                )}

                {project.airdrop && (

                  <a
                    href={project.airdrop}
                    target="_blank"
                    className="block w-full text-center py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 font-black hover:scale-[1.02] transition"
                  >

                    Join Airdrop

                  </a>

                )}

                {project.twitter && (

                  <a
                    href={project.twitter}
                    target="_blank"
                    className="block w-full text-center py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition font-bold"
                  >

                    Twitter / X

                  </a>

                )}

                {project.youtube && (

                  <a
                    href={project.youtube}
                    target="_blank"
                    className="block w-full text-center py-4 rounded-2xl bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition font-bold"
                  >

                    YouTube Guide

                  </a>

                )}

              </div>

              {/* INFO */}

              <div className="mt-10 pt-8 border-t border-white/10 space-y-5">

                <div className="flex items-center justify-between">

                  <span className="text-gray-400">

                    Status

                  </span>

                  <span className="text-cyan-300 font-bold">

                    {project.status}

                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-gray-400">

                    Difficulty

                  </span>

                  <span className="text-purple-300 font-bold">

                    {project.difficulty}

                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-gray-400">

                    Reward

                  </span>

                  <span className="text-green-300 font-bold">

                    {project.reward}

                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}