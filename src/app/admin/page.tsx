'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useParams } from 'next/navigation';

import { getProjectBySlug } from '@/lib/projects';

export default function ProjectPage() {

  const params = useParams();

  const id = params?.id as string;

  const [project, setProject] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchProject() {

      try {

        const data = await getProjectBySlug(id);

        setProject(data);

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
      <div className="min-h-screen bg-[#020817] flex items-center justify-center text-white text-3xl">
        Loading...
      </div>
    );

  }

  if (!project) {

    return (
      <div className="min-h-screen bg-[#020817] flex items-center justify-center text-white text-3xl">
        Project Not Found
      </div>
    );

  }

  return (

    <main className="min-h-screen bg-[#020817] text-white px-6 py-16">

      <div className="max-w-6xl mx-auto">

        <Link
          href="/airdrops"
          className="text-purple-400 mb-10 inline-block"
        >
          ← Back
        </Link>

        <img
          src={project.image}
          alt={project.title}
          className="w-full h-[420px] object-cover rounded-[32px] border border-white/10"
        />

        <div className="mt-10">

          <div className="flex flex-wrap items-center gap-4 mb-6">

            <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {project.reward}
            </span>

            <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {project.difficulty}
            </span>

            <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
              {project.status}
            </span>

          </div>

          <h1 className="text-5xl font-black mb-6">
            {project.title}
          </h1>

          <p className="text-gray-400 text-lg leading-8 mb-10">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-4 mb-12">

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 transition"
              >
                Website
              </a>
            )}

            {project.airdrop && (
              <a
                href={project.airdrop}
                target="_blank"
                className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 transition"
              >
                Airdrop Link
              </a>
            )}

            {project.twitter && (
              <a
                href={project.twitter}
                target="_blank"
                className="px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-700 transition"
              >
                Twitter/X
              </a>
            )}

            {project.youtube && (
              <a
                href={project.youtube}
                target="_blank"
                className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 transition"
              >
                YouTube Guide
              </a>
            )}

          </div>

          <div className="grid gap-6">

            {project.guide?.map(
              (step: string, index: number) => (

                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-[28px] p-8"
                >

                  <div className="text-cyan-400 text-sm mb-3">
                    STEP {index + 1}
                  </div>

                  <p className="text-gray-300 text-lg leading-8">
                    {step}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </main>

  );

}