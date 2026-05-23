"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../lib/firebase";

export default function Home() {

  const [projects, setProjects] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [language, setLanguage] =
    useState("EN");

  useEffect(() => {

    const unsubscribe = onSnapshot(
      collection(db, "projects"),
      (snapshot) => {

        const data = snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

        setProjects(data);

      }
    );

    return () => unsubscribe();

  }, []);

  const categories = useMemo(() => {

    const allTags = projects.flatMap(
      (project) => project.tags || []
    );

    return [
      "All",
      ...Array.from(new Set(allTags)),
    ];

  }, [projects]);

  const filteredProjects = projects.filter(
    (project) => {

      const matchesSearch =

        project.title
          ?.toLowerCase()
          ?.includes(search.toLowerCase()) ||

        project.description
          ?.toLowerCase()
          ?.includes(search.toLowerCase()) ||

        project.tags
          ?.join(" ")
          ?.toLowerCase()
          ?.includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All"
          ? true
          : project.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All"
          ? true
          : project.tags?.includes(
              categoryFilter
            );

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );

    }
  );

  const featuredProjects =
    filteredProjects.filter(
      (project) => project.featured
    );

  return (

    <main className="min-h-screen bg-[#020817] text-white overflow-hidden">

      {/* Glow */}

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full"></div>

      {/* Navbar */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 pt-10">

        <header className="w-full flex flex-col xl:flex-row items-center justify-between gap-8">

          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            CryptoDropScout
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4">

            {/* Language */}

            <select
              value={language}
              onChange={(e) =>
                setLanguage(e.target.value)
              }
              className="px-4 py-3 rounded-2xl bg-[#0f172a] border border-white/10 text-white"
            >
              <option value="EN">
                🇺🇸 English
              </option>

              <option value="BN">
                🇧🇩 বাংলা
              </option>

              <option value="HI">
                🇮🇳 हिन्दी
              </option>

            </select>

            {/* Buttons */}

            <a
              href="/"
              className="px-5 py-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition text-cyan-300"
            >
              Home
            </a>

            <a
              href="#latest"
              className="px-5 py-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition text-blue-300"
            >
              Latest
            </a>

            <a
              href="#featured"
              className="px-5 py-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition text-purple-300"
            >
              Featured
            </a>

            <a
              href="https://youtube.com/@cryptodrop_scout"
              target="_blank"
              className="px-5 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition text-red-300"
            >
              YouTube
            </a>

          </div>

        </header>

      </div>

      {/* Hero */}

      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 pt-20 pb-24 text-center">

        <div className="inline-flex px-6 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 mb-10">
          Latest Web3 Alpha 🚀
        </div>

        <h2 className="text-6xl md:text-8xl font-black leading-tight">

          {
            language === "EN"
              ? "Discover Early"
              : language === "BN"
              ? "নতুন এয়ারড্রপ খুঁজুন"
              : "नई एयरड्रॉप खोजें"
          }

          <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">

            {
              language === "EN"
                ? "Airdrop Opportunities"
                : language === "BN"
                ? "এয়ারড্রপ সুযোগ"
                : "एयरड्रॉप अवसर"
            }

          </span>

        </h2>

        <p className="mt-10 text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
          Find promising crypto testnets, nodes, AI projects and Web3 opportunities before everyone else.
        </p>

        <div className="mt-10">

          <a
            href="#latest"
            className="inline-flex px-8 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-lg hover:scale-105 transition"
          >
            Explore Airdrops →
          </a>

        </div>

      </section>

      {/* Filters */}

      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 pb-16">

        <div className="grid lg:grid-cols-3 gap-6">

          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="px-6 py-5 rounded-2xl bg-[#0f172a] border border-white/10 outline-none text-white"
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="px-6 py-5 rounded-2xl bg-[#0f172a] border border-white/10 outline-none text-white"
          >
            <option>All</option>
            <option>Active</option>
            <option>Hot</option>
            <option>Potential</option>
            <option>Confirmed</option>
            <option>Ended</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
            className="px-6 py-5 rounded-2xl bg-[#0f172a] border border-white/10 outline-none text-white"
          >

            {categories.map((category) => (

              <option key={category}>
                {category}
              </option>

            ))}

          </select>

        </div>

      </section>

      {/* Featured */}

      {featuredProjects.length > 0 && (

        <section
          id="featured"
          className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 pb-24"
        >

          <div className="flex items-center gap-4 mb-12">

            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-2xl">
              🔥
            </div>

            <h2 className="text-5xl font-black">
              Featured Airdrops
            </h2>

          </div>

          <div className="grid lg:grid-cols-2 gap-10">

            {featuredProjects.map((project) => (

              <Link
                href={`/project/${project.id}`}
                key={project.id}
                className="group bg-white/5 border border-white/10 rounded-[36px] overflow-hidden hover:scale-[1.02] hover:border-cyan-500/40 transition duration-300"
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

                  </div>

                  <h3 className="text-3xl font-bold">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 mt-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-6 inline-flex px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:scale-105 transition">
                    Open Guide →
                  </div>

                </div>

              </Link>

            ))}

          </div>

        </section>

      )}

      {/* Latest */}

      <section
        id="latest"
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 pb-24"
      >

        <div className="flex items-center justify-between gap-6 mb-12 flex-wrap">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-2xl">
              🚀
            </div>

            <h2 className="text-5xl font-black">
              Latest Airdrops
            </h2>

          </div>

          {/* Social */}

          <div className="flex flex-wrap gap-4">

            <a
              href="https://x.com/cryptodrpscout"
              target="_blank"
              className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              X / Twitter
            </a>

            <a
              href="https://github.com/Hunterkak"
              target="_blank"
              className="px-5 py-3 rounded-2xl bg-gray-500/10 border border-gray-500/20 hover:bg-gray-500/20 transition"
            >
              GitHub
            </a>

          </div>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {filteredProjects.map((project) => (

            <Link
              href={`/project/${project.id}`}
              key={project.id}
              className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden hover:scale-[1.03] hover:border-cyan-500/40 transition duration-300"
            >

              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[240px] object-cover"
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

                <h3 className="text-2xl font-bold">
                  {project.title}
                </h3>

                <p className="text-gray-400 mt-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="mt-6 inline-flex px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:scale-105 transition">
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