"use client";

import Link from "next/link";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../../../lib/firebase";

import {
  useEffect,
  useState,
} from "react";

export default function ProjectPage({
  params,
}: any) {

  const [project, setProject] =
    useState<any>(null);

  useEffect(() => {

    async function fetchProject() {

      const docRef = doc(
        db,
        "projects",
        params.id
      );

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

        setProject({
          id: docSnap.id,
          ...docSnap.data(),
        });

      }

    }

    fetchProject();

  }, [params.id]);

  if (!project) {

    return (

      <main className="min-h-screen bg-[#020817] flex items-center justify-center text-white text-3xl">
        Loading Project...
      </main>

    );

  }

  return (

    <main className="min-h-screen bg-[#020817] text-white overflow-hidden">

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full"></div>

      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-20">

        <Link
          href="/"
          className="inline-flex px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
        >
          ← Back
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-center mt-16">

          <div>

            <div className="flex flex-wrap gap-4 mb-8">

              <span className="px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                {project.status}
              </span>

              <span className="px-5 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300">
                {project.reward}
              </span>

              <span className="px-5 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300">
                {project.difficulty}
              </span>

            </div>

            <h1 className="text-6xl md:text-7xl font-black leading-tight">
              {project.title}
            </h1>

            <p className="mt-10 text-xl text-gray-400 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-5 mt-12">

              {project.link && (

                <a
                  href={project.link}
                  target="_blank"
                  className="px-8 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold hover:scale-105 transition"
                >
                  Open Website →
                </a>

              )}

              {project.airdrop && (

                <a
                  href={project.airdrop}
                  target="_blank"
                  className="px-8 py-5 rounded-2xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition"
                >
                  Airdrop →
                </a>

              )}

              {project.twitter && (

                <a
                  href={project.twitter}
                  target="_blank"
                  className="px-8 py-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                >
                  Twitter/X →
                </a>

              )}

              {project.youtube && (

                <a
                  href={project.youtube}
                  target="_blank"
                  className="px-8 py-5 rounded-2xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition"
                >
                  Watch Guide →
                </a>

              )}

            </div>

          </div>

          <div>

            <img
              src={project.image}
              alt={project.title}
              className="w-full rounded-[36px] object-cover"
            />

          </div>

        </div>

      </section>

      {/* GUIDE */}

      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 pb-24">

        <div className="bg-white/5 border border-white/10 rounded-[36px] p-10">

          <h2 className="text-5xl font-black mb-10">
            Step-by-Step Guide
          </h2>

          <div className="space-y-8">

            {(project.guide || []).map(
              (step: string, index: number) => (

                <div
                  key={index}
                  className="flex gap-6 items-start"
                >

                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center font-black text-xl shrink-0">
                    {index + 1}
                  </div>

                  <div className="text-xl text-gray-300 leading-relaxed pt-3">
                    {step}
                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </section>

    </main>

  );

}