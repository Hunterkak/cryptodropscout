"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../lib/firebase";

export default function Home() {

  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {

    const unsubscribe = onSnapshot(
      collection(db, "projects"),
      (snapshot) => {

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProjects(data);

      }
    );

    return () => unsubscribe();

  }, []);

  const featuredProjects = projects.filter(
    (project) => project.featured
  );

  return (

    <main className="min-h-screen bg-[#020817] text-white overflow-hidden">

      {/* Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full"></div>

      {/* Navbar */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-10 flex items-center justify-between">

        <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          CryptoDropScout
        </h1>

        <Link
          href="/admin"
          className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
        >
          Admin
        </Link>

      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 pt-16 pb-24 text-center">

        <div className="inline-flex px-6 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 mb-10">
          Web3 • Nodes • Testnets • Airdrops
        </div>

        <h2 className="text-6xl md:text-8xl font-black leading-tight">
          Discover Early
          <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Crypto Opportunities
          </span>
        </h2>

        <p className="mt-10 text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
          Find promising airdrops, testnets and Web3 opportunities before everyone else.
        </p>

      </section>

      {/* Featured */}
      {featuredProjects.length > 0 && (

        <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 pb-24">

          <div className="flex items-center gap-4 mb-12">

            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-2xl">
              🔥
            </div>

            <h2 className="text-5xl font-black">
              Featured Projects
            </h2>

          </div>

          <div className="grid lg:grid-cols-2 gap-10">

            {featuredProjects.map((project) => (

              <Link
                href={`/project/${project.id}`}
                key={project.id}
                className="group bg-white/5 border border-white/10 rounded-[36px] overflow-hidden hover:scale-[1.02] transition"
              >

                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[320px] object-cover"
                />

                <div className="p-8">

                  <div className="flex flex-wrap gap-3 mb-6">

                    <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm">
                      {project.status}
                    </span>

                    <span className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm">
                      {project.reward}
                    </span>

                    <span className="px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-sm">
                      {project.difficulty}
                    </span>

                  </div>

                  <h3 className="text-4xl font-black group-hover:text-cyan-300 transition">
                    {project.title}
                  </h3>

                  <p className="mt-6 text-gray-400 text-lg leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-8 inline-flex items-center gap-3 text-cyan-300 font-bold text-lg">
                    View Guide →
                  </div>

                </div>

              </Link>

            ))}

          </div>

        </section>

      )}

      {/* All Projects */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 pb-24">

        <div className="flex items-center gap-4 mb-12">

          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-2xl">
            🚀
          </div>

          <h2 className="text-5xl font-black">
            All Projects
          </h2>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {projects.map((project) => (

            <Link
              href={`/project/${project.id}`}
              key={project.id}
              className="group bg-white/5 border border-white/10 rounded-[32px] overflow-hidden hover:scale-[1.02] transition"
            >

              <img
                src={project.image}
                alt={project.title}
                className="w-full h-60 object-cover"
              />

              <div className="p-6">

                <div className="flex flex-wrap gap-3 mb-5">

                  <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm">
                    {project.status}
                  </span>

                  <span className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm">
                    {project.reward}
                  </span>

                </div>

                <h3 className="text-3xl font-black group-hover:text-cyan-300 transition">
                  {project.title}
                </h3>

                <p className="mt-4 text-gray-400 leading-relaxed">
                  {project.description}
                </p>

                <div className="mt-8 inline-flex items-center gap-3 text-cyan-300 font-bold">
                  Open Guide →
                </div>

              </div>

            </Link>

          ))}

        </div>

      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 md:px-16 py-14 flex flex-col md:flex-row items-center justify-between gap-8">

          <div>

            <h2 className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              CryptoDropScout
            </h2>

            <p className="text-gray-400 mt-4">
              Stay Informed • Stay Ahead • Stay Connected
            </p>

          </div>

          <div className="flex gap-4">

            <a
              href="https://x.com/cryptodrpscout"
              target="_blank"
              className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              Twitter
            </a>

            <a
              href="https://t.me/CryptoDropScoutt"
              target="_blank"
              className="px-6 py-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition"
            >
              Telegram
            </a>

          </div>

        </div>

      </footer>

    </main>

  );

}