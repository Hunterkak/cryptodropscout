"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { db } from "../lib/firebase";

import {
  collection,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

export default function Home() {

  const [projects, setProjects] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [tag, setTag] = useState("");

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

  const addProject = async () => {

    if (!title || !description) return;

    await addDoc(collection(db, "projects"), {
      title,
      description,
      badge: "New",
      tags: [tag || "Web3"],
      link,
      image,
      color: "from-cyan-400 to-blue-500",
    });

    setTitle("");
    setDescription("");
    setLink("");
    setImage("");
    setTag("");
  };

  return (
    <main className="min-h-screen bg-[#020817] text-white px-6 py-10">

      {/* Navbar */}
      <nav className="flex items-center justify-between mb-20">

        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          CryptoDropScout
        </h1>

        <div className="flex gap-6 text-gray-300">

          <a href="/">Home</a>
          <a href="/blog">Blog</a>
          <a href="/guides">Guides</a>

        </div>

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

      {/* Admin Form */}
      <section className="max-w-4xl mx-auto mt-20 bg-white/5 border border-white/10 rounded-3xl p-10">

        <h2 className="text-4xl font-bold mb-10">
          Add New Project
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <input
            type="text"
            placeholder="Project Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-5 py-4 rounded-2xl bg-black/20 border border-white/10"
          />

          <input
            type="text"
            placeholder="Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="px-5 py-4 rounded-2xl bg-black/20 border border-white/10"
          />

          <input
            type="text"
            placeholder="Referral Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="px-5 py-4 rounded-2xl bg-black/20 border border-white/10"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="px-5 py-4 rounded-2xl bg-black/20 border border-white/10"
          />

        </div>

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mt-6 px-5 py-4 rounded-2xl bg-black/20 border border-white/10 min-h-[140px]"
        />

        <button
          onClick={addProject}
          className="mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold"
        >
          Publish Project
        </button>

      </section>

      {/* Projects */}
      <section className="mt-24">

        <h2 className="text-5xl font-bold text-center mb-16">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {projects.map((project) => (

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

                  <h3
                    className={`text-4xl font-bold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}
                  >
                    {project.title}
                  </h3>

                  <span className="bg-white/10 px-4 py-2 rounded-full text-sm">
                    {project.badge}
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
                  className={`inline-block mt-8 px-6 py-3 rounded-2xl bg-gradient-to-r ${project.color} font-semibold`}
                >
                  View Project
                </Link>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* Footer */}
      <footer className="mt-32 border-t border-white/10 py-16 text-center bg-white/5 backdrop-blur-xl rounded-t-3xl">

        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          CryptoDropScout
        </h2>

        <p className="text-gray-400 mt-5 text-lg">
          Stay Informed • Stay Ahead • Stay Connected
        </p>

        <div className="flex justify-center gap-6 mt-10 flex-wrap">

          <a
            href="https://t.me/CryptoDropScoutt"
            target="_blank"
            className="px-6 py-3 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 transition border border-cyan-500/20"
          >
            Telegram
          </a>

          <a
            href="https://youtube.com/@cryptodrop_scout"
            target="_blank"
            className="px-6 py-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 transition border border-red-500/20"
          >
            YouTube
          </a>

          <a
            href="https://x.com/cryptodrpscout"
            target="_blank"
            className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition border border-white/10"
          >
            Twitter / X
          </a>

        </div>

        <p className="mt-10 text-gray-500 text-sm">
          © 2026 CryptoDropScout. All rights reserved.
        </p>

      </footer>

    </main>
  );
}