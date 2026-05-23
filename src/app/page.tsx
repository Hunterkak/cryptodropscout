"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { db } from "../lib/firebase";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

export default function Home() {

  const [projects, setProjects] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

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

  const filteredProjects = projects.filter((project) => {

    const matchesSearch =
      project.title?.toLowerCase().includes(search.toLowerCase()) ||
      project.description?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" ||
      project.status === filterStatus;

    return matchesSearch && matchesStatus;

  });

  return (
    <main className="min-h-screen bg-[#020817] text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full"></div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-16 py-8">

        <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          CryptoDropScout
        </h1>

        <div className="flex items-center gap-4">

          <a
            href="https://x.com/cryptodrpscout"
            target="_blank"
            className="hidden md:flex px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >
            Twitter
          </a>

          <a
            href="https://t.me/CryptoDropScoutt"
            target="_blank"
            className="hidden md:flex px-5 py-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition"
          >
            Telegram
          </a>

          <Link
            href="/admin"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold shadow-lg shadow-cyan-500/20 hover:scale-105 transition"
          >
            Admin
          </Link>

        </div>

      </nav>

      {/* Hero */}
      <section className="relative z-10 text-center px-6 pt-10 pb-24">

        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 mb-8">
          🚀 Track Early Airdrops & Web3 Opportunities
        </div>

        <h1 className="text-6xl md:text-8xl font-black leading-tight bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
          Discover The Next
          <br />
          Crypto Airdrop
        </h1>

        <p className="mt-8 text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Explore high-potential testnets, nodes, AI projects, exchanges & early Web3 ecosystems before the crowd.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-20">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h3 className="text-5xl font-black text-cyan-400">
              250+
            </h3>
            <p className="mt-3 text-gray-400">
              Active Airdrops
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h3 className="text-5xl font-black text-purple-400">
              80+
            </h3>
            <p className="mt-3 text-gray-400">
              Testnets
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h3 className="text-5xl font-black text-pink-400">
              120K+
            </h3>
            <p className="mt-3 text-gray-400">
              Community Reach
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h3 className="text-5xl font-black text-yellow-400">
              24/7
            </h3>
            <p className="mt-3 text-gray-400">
              Live Tracking
            </p>
          </div>

        </div>

      </section>

      {/* Search */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6">

        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-6 py-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl text-white outline-none"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-6 py-5 rounded-3xl bg-[#0f172a] border border-white/10 text-white outline-none"
        >
          <option>All</option>
          <option>Active</option>
          <option>Upcoming</option>
          <option>Hot</option>
          <option>Confirmed</option>
          <option>Potential</option>
          <option>Ended</option>
        </select>

      </section>

      {/* Projects */}
      <section className="relative z-10 px-6 md:px-16 py-28">

        <div className="flex items-center justify-between mb-16 flex-wrap gap-4">

          <div>

            <h2 className="text-5xl font-black">
              Featured Projects
            </h2>

            <p className="text-gray-400 mt-4 text-lg">
              Early opportunities curated by CryptoDropScout.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">

          {filteredProjects.map((project) => (

            <div
              key={project.id}
              className="group relative bg-white/5 border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-xl hover:-translate-y-2 transition duration-300"
            >

              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition"></div>

              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover"
              />

              <div className="p-8 relative z-10">

                <div className="flex items-center justify-between mb-5">

                  <h3 className="text-4xl font-black">
                    {project.title}
                  </h3>

                  <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm">
                    {project.status}
                  </span>

                </div>

                <p className="text-gray-400 leading-relaxed text-lg">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 mt-6">

                  {project.tags?.map((tag: string) => (

                    <span
                      key={tag}
                      className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-sm text-gray-300"
                    >
                      {tag}
                    </span>

                  ))}

                </div>

                <Link
                  href={project.link}
                  className="inline-flex items-center gap-3 mt-8 px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:scale-105 transition"
                >
                  View Project →
                </Link>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-20">

        <div className="max-w-7xl mx-auto px-6 md:px-16 py-16">

          <div className="flex flex-col md:flex-row items-center justify-between gap-10">

            <div>

              <h2 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                CryptoDropScout
              </h2>

              <p className="text-gray-400 mt-5 text-lg">
                Stay Informed • Stay Ahead • Stay Connected
              </p>

            </div>

            <div className="flex flex-wrap gap-4">

              <a
                href="https://t.me/CryptoDropScoutt"
                target="_blank"
                className="px-6 py-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition"
              >
                Telegram
              </a>

              <a
                href="https://youtube.com/@cryptodrop_scout"
                target="_blank"
                className="px-6 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition"
              >
                YouTube
              </a>

              <a
                href="https://x.com/cryptodrpscout"
                target="_blank"
                className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                Twitter / X
              </a>

            </div>

          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-500">
            © 2026 CryptoDropScout. All rights reserved.
          </div>

        </div>

      </footer>

    </main>
  );
}