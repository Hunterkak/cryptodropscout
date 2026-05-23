"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { db } from "../../../lib/firebase";

import {
  doc,
  getDoc,
} from "firebase/firestore";

export default function ProjectPage({ params }: any) {

  const [project, setProject] = useState<any>(null);

  useEffect(() => {

    const fetchProject = async () => {

      const docRef = doc(db, "projects", params.id);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

        setProject({
          id: docSnap.id,
          ...docSnap.data(),
        });

      }

    };

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

    <main className="min-h-screen bg-[#020817] text-white">

      {/* Hero */}
      <section className="relative overflow-hidden">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-16 py-24 relative z-10">

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition mb-12"
          >
            ← Back
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-center">

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

              <a
                href={project.link}
                target="_blank"
                className="inline-flex items-center gap-3 mt-10 px-8 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-lg font-bold hover:scale-105 transition"
              >
                Open Project →
              </a>

            </div>

            <div>

              <img
                src={project.image}
                alt={project.title}
                className="w-full rounded-[32px] border border-white/10 shadow-2xl"
              />

            </div>

          </div>

        </div>

      </section>

      {/* Guide */}
      <section className="max-w-5xl mx-auto px-6 md:px-16 py-20">

        <div className="bg-white/5 border border-white/10 rounded-[32px] p-10">

          <h2 className="text-4xl font-black mb-10">
            Participation Guide
          </h2>

          <div className="space-y-8 text-gray-300 text-lg leading-relaxed">

            <div className="flex gap-5">

              <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-300 font-bold">
                1
              </div>

              <div>
                Join the official platform and create your account.
              </div>

            </div>

            <div className="flex gap-5">

              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold">
                2
              </div>

              <div>
                Complete social tasks, wallet connection & platform missions.
              </div>

            </div>

            <div className="flex gap-5">

              <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-300 font-bold">
                3
              </div>

              <div>
                Stay active consistently to maximize airdrop eligibility.
              </div>

            </div>

          </div>

        </div>

      </section>

    </main>

  );

}