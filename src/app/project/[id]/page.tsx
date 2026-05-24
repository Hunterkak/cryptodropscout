'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

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
      <div className="min-h-screen flex items-center justify-center bg-[#050816] text-white">
        Loading Guide...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050816] text-white">
        <h1 className="text-4xl font-bold mb-4">
          Project Not Found
        </h1>

        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-cyan-500"
        >
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">

        <Link
          href="/"
          className="text-cyan-400 mb-6 inline-block"
        >
          ← Back Home
        </Link>

        <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5">

          <img
            src={project.bannerImage}
            alt={project.name}
            className="w-full h-[300px] object-cover"
          />

          <div className="p-6">

            <div className="flex flex-wrap items-center gap-3 mb-4">

              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">
                {project.status}
              </span>

              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm">
                {project.reward}
              </span>

              <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-sm">
                {project.difficulty}
              </span>

            </div>

            <h1 className="text-4xl font-extrabold mb-4">
              {project.name}
            </h1>

            <p className="text-gray-400 text-lg mb-8">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-10">

              {project.websiteUrl && (
                <a
                  href={project.websiteUrl}
                  target="_blank"
                  className="px-6 py-3 rounded-2xl bg-cyan-500"
                >
                  Website
                </a>
              )}

              {project.twitterUrl && (
                <a
                  href={project.twitterUrl}
                  target="_blank"
                  className="px-6 py-3 rounded-2xl bg-purple-500"
                >
                  Twitter / X
                </a>
              )}

              {project.youtubeUrl && (
                <a
                  href={project.youtubeUrl}
                  target="_blank"
                  className="px-6 py-3 rounded-2xl bg-red-500"
                >
                  YouTube Guide
                </a>
              )}

            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">
                Step-by-Step Guide
              </h2>

              <div className="space-y-5">

                {project.steps?.map((step: any, index: number) => (
                  <div
                    key={step.id}
                    className="border border-white/10 rounded-2xl p-5 bg-white/5"
                  >

                    <div className="flex items-center gap-3 mb-3">

                      <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center font-bold">
                        {index + 1}
                      </div>

                      <h3 className="text-xl font-semibold">
                        {step.title}
                      </h3>

                    </div>

                    <p className="text-gray-400 leading-7">
                      {step.description}
                    </p>

                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}