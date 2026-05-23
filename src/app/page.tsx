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
    <main className="min-h-screen bg-[#020817] text-white px-6 py-10">

      {/* Navbar */}
      <nav className="flex items-center justify-between mb-20">

        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          CryptoDropScout
        </h1>

        <Link
          href="/admin"
          className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition"
        >
          Admin
        </Link>

      </nav>

      {/* Hero */}
      <section className="text-center">

        <h1 className="text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          CryptoDropScout
        </h1>

        <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
          Discover Early Web3 Opportunities, Nodes, Testnets & Airdrops Before Everyone Else.
        </p>

      </section>

      {/* Search */}
      <section className="max-w-5xl mx-auto mt-20 grid md:grid-cols-2 gap-6">

        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10"
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
      <section className="mt-24">

        <h2 className="text-5xl font-bold text-center mb-16">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {filteredProjects.map((project) => (

            <div
              key={project.id}
              className="bg-white/5 border border-purple-500/20 rounded-3xl overflow-hidden"
            >

              <img
                src={project.image}
                alt={project.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-8">

                <div className="flex justify-between items-center mb-6">

                  <h3 className="text-4xl font-bold">
                    {project.title}
                  </h3>

                  <span className="bg-cyan-500/20 px-4 py-2 rounded-full text-sm">
                    {project.status}
                  </span>

                </div>

                <p className="text-gray-300 text-lg leading-relaxed">
                  {project.description}
                </p>

                <div className="flex gap-3 flex-wrap mt-6">

                  {project.tags?.map((tag: string) => (

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
                  className="inline-block mt-8 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold"
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