"use client";

import Link from "next/link";
import { useState } from "react";
import { featuredProjects, airdrops } from "./data/projects";

export default function Home() {

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = featuredProjects.filter((project) => {

    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.tags.join(" ").toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === "All" ||
      project.tags.includes(activeFilter);

    return matchesSearch && matchesFilter;
  });

  const filters = [
    "All",
    "Node",
    "Testnet",
    "AI",
    "Rewards",
    "Web3",
  ];

  return (
    <main className="min-h-screen bg-[#020817] text-white overflow-hidden">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-8 py-6 border-b border-white/10 backdrop-blur-xl sticky top-0 z-50 bg-[#020817]/80">

        <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          CryptoDropScout
        </h1>

        <div className="hidden md:flex gap-8 text-gray-300 font-medium">

          <a href="/" className="hover:text-cyan-400 transition">
            Home
          </a>

          <a href="/airdrops" className="hover:text-cyan-400 transition">
            Airdrops
          </a>

          <a href="/guides" className="hover:text-cyan-400 transition">
            Guides
          </a>

          <a href="/blog" className="hover:text-cyan-400 transition">
            Blog
          </a>

        </div>

      </nav>

      {/* Hero */}
      <section className="relative text-center py-28 px-6">

        <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          CryptoDropScout
        </h1>

        <p className="mt-8 text-xl text-gray-300 max-w-3xl mx-auto">
          Discover Early Web3 Opportunities, Nodes, Testnets & Airdrops Before Everyone Else.
        </p>

      </section>

      {/* Search */}
      <section className="px-8 pb-10">

        <div className="max-w-2xl mx-auto">

          <input
            type="text"
            placeholder="Search projects, nodes, testnets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 outline-none text-white placeholder:text-gray-500 focus:border-cyan-400 transition"
          />

        </div>

      </section>

      {/* Filters */}
      <section className="px-8 pb-20">

        <div className="flex justify-center flex-wrap gap-4">

          {filters.map((filter) => (

            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-3 rounded-2xl transition font-medium ${
                activeFilter === filter
                  ? "bg-cyan-500 text-white"
                  : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
              }`}
            >
              {filter}
            </button>

          ))}

        </div>

      </section>

      {/* Featured Projects */}
      <section className="px-8 pb-28">

        <h2 className="text-5xl font-bold text-center mb-16">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {filteredProjects.map((project) => (

            <div
              key={project.title}
              className="bg-white/5 border border-purple-500/20 rounded-3xl overflow-hidden backdrop-blur-xl hover:scale-[1.02] transition"
            >

              <img
                src={project.image}
                alt={project.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-8">

                <div className="flex justify-between items-center mb-6">

                  <h3
                    className={`text-4xl font-bold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}
                  >
                    {project.title}
                  </h3>

                  <span className="bg-white/10 px-4 py-2 rounded-full text-sm text-gray-300">
                    {project.badge}
                  </span>

                </div>

                <p className="text-gray-300 text-lg leading-relaxed">
                  {project.description}
                </p>

                <div className="flex gap-3 flex-wrap mt-6">

                  {project.tags.map((tag) => (

                    <span
                      key={tag}
                      className="px-4 py-2 rounded-xl bg-white/10 text-sm"
                    >
                      {tag}
                    </span>

                  ))}

                </div>

                <Link
                  href={project.link}
                  className={`inline-block mt-8 px-6 py-3 rounded-2xl bg-gradient-to-r ${project.color} font-semibold hover:opacity-90 transition`}
                >
                  View Project
                </Link>

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>
  );
}