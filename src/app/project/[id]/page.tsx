"use client";

import Link from "next/link";
import { use } from "react";

import {
  useEffect,
  useState,
} from "react";

import { db } from "../../../lib/firebase";

import {
  doc,
  getDoc,
} from "firebase/firestore";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const resolvedParams = use(params);

  const [project, setProject] = useState<any>(null);

  useEffect(() => {

    const fetchProject = async () => {

      const docRef = doc(
        db,
        "projects",
        resolvedParams.id
      );

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

        setProject({
          id: docSnap.id,
          ...docSnap.data(),
        });

      }

    };

    fetchProject();

  }, [resolvedParams.id]);

  if (!project) {

    return (
      <main className="min-h-screen bg-[#020817] flex items-center justify-center text-white text-3xl">
        Loading Project...
      </main>
    );

  }

  return (

    <main className="min-h-screen bg-[#020817] text-white overflow-hidden">

      {/* Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full"></div>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-20">

        <Link
          href="/"
          className="inline-flex px-5 py-3 rounded-2xl bg-white/5 border border-white/10 mb-14 hover:bg-white/10 transition"
        >
          ← Back
        </Link>

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <div>

            <span className="inline-flex px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 mb-8">
              {project.status}
            </span>

            <h1 className="text-6xl md:text-7xl font-black leading-tight">
              {project.title}
            </h1>

            <p className="mt-8 text-xl text-gray-400 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              {project.tags?.map((tag: string) => (

                <span
                  key={tag}
                  className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-300"
                >
                  {tag}
                </span>

              ))}

            </div>

            <div className="flex flex-wrap gap-5 mt-10">

              <a
                href={project.link}
                target="_blank"
                className="px-8 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-lg hover:scale-105 transition"
              >
                Open Project →
              </a>

              <a
                href="https://x.com/cryptodrpscout"
                target="_blank"
                className="px-8 py-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                Twitter / X
              </a>

            </div>

          </div>

          <div>

            <img
              src={project.image}
              alt={project.title}
              className="w-full rounded-[36px] border border-white/10 shadow-2xl"
            />

          </div>

        </div>

      </section>

      {/* Guide */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 md:px-16 pb-24">

        <div className="bg-white/5 border border-white/10 rounded-[36px] p-10 md:p-14 backdrop-blur-xl">

          <div className="flex items-center gap-4 mb-10">

            <div className="w-14 h-14 rounded-full bg-cyan-500/20 flex items-center justify-center text-2xl">
              🚀
            </div>

            <div>

              <h2 className="text-4xl font-black">
                Participation Guide
              </h2>

              <p className="text-gray-400 mt-2">
                Follow all steps carefully to maximize rewards.
              </p>

            </div>

          </div>

          <div className="space-y-8">

            {project.guide
              ?.split("\n")
              .filter((line: string) => line.trim() !== "")
              .map((line: string, index: number) => (

                <div
                  key={index}
                  className="flex gap-5 items-start"
                >

                  <div className="min-w-[50px] h-[50px] rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center font-black text-lg">
                    {index + 1}
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-3xl px-6 py-5 text-lg text-gray-300 leading-relaxed w-full">
                    {line}
                  </div>

                </div>

              ))}

          </div>

        </div>

      </section>

    </main>

  );

}