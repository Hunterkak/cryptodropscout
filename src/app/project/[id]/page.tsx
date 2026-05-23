"use client";

import Link from "next/link";
import { use } from "react";

import { db } from "../../../lib/firebase";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  useEffect,
  useState,
} from "react";

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

    <main className="min-h-screen bg-[#020817] text-white px-6 py-20">

      <div className="max-w-6xl mx-auto">

        <Link
          href="/"
          className="inline-flex px-5 py-3 rounded-2xl bg-white/5 border border-white/10 mb-12"
        >
          ← Back
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <span className="inline-flex px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 mb-8">
              {project.status}
            </span>

            <h1 className="text-6xl font-black">
              {project.title}
            </h1>

            <p className="mt-8 text-xl text-gray-400 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              {project.tags?.map((tag: string) => (

                <span
                  key={tag}
                  className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10"
                >
                  {tag}
                </span>

              ))}

            </div>

            <a
              href={project.link}
              target="_blank"
              className="inline-flex items-center gap-3 mt-10 px-8 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-lg font-bold"
            >
              Open Project →
            </a>

          </div>

          <div>

            <img
              src={project.image}
              alt={project.title}
              className="w-full rounded-[32px]"
            />

          </div>

        </div>

      </div>

    </main>

  );

}