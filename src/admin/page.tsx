"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { db } from "../../lib/firebase";

import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function AdminPage() {

  const [projects, setProjects] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [tag, setTag] = useState("");
  const [status, setStatus] = useState("Active");

  const [editingId, setEditingId] = useState("");

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
      status,
      link,
      image,
      color: "from-cyan-400 to-blue-500",
    });

    resetForm();
  };

  const deleteProject = async (id: string) => {

    await deleteDoc(doc(db, "projects", id));

  };

  const editProject = (project: any) => {

    setEditingId(project.id);

    setTitle(project.title);
    setDescription(project.description);
    setLink(project.link);
    setImage(project.image);
    setTag(project.tags?.[0] || "");
    setStatus(project.status || "Active");

  };

  const updateProject = async () => {

    if (!editingId) return;

    await updateDoc(doc(db, "projects", editingId), {
      title,
      description,
      link,
      image,
      status,
      tags: [tag || "Web3"],
    });

    resetForm();
  };

  const resetForm = () => {

    setEditingId("");

    setTitle("");
    setDescription("");
    setLink("");
    setImage("");
    setTag("");
    setStatus("Active");

  };

  return (
    <main className="min-h-screen bg-[#020817] text-white px-6 py-10">

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-16">

          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>

          <Link
            href="/"
            className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition"
          >
            Back To Website
          </Link>

        </div>

        {/* Form */}
        <section className="bg-white/5 border border-white/10 rounded-3xl p-10">

          <h2 className="text-4xl font-bold mb-10">
            {editingId ? "Edit Project" : "Add Project"}
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

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-5 py-4 rounded-2xl bg-black/20 border border-white/10"
            >
              <option>Active</option>
              <option>Upcoming</option>
              <option>Hot</option>
              <option>Confirmed</option>
              <option>Potential</option>
              <option>Ended</option>
            </select>

          </div>

          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-6 px-5 py-4 rounded-2xl bg-black/20 border border-white/10 min-h-[140px]"
          />

          <div className="flex gap-4 mt-8 flex-wrap">

            {editingId ? (

              <button
                onClick={updateProject}
                className="px-8 py-4 rounded-2xl bg-yellow-500 hover:bg-yellow-600 transition font-semibold"
              >
                Update Project
              </button>

            ) : (

              <button
                onClick={addProject}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold"
              >
                Publish Project
              </button>

            )}

            <button
              onClick={resetForm}
              className="px-8 py-4 rounded-2xl bg-gray-700 hover:bg-gray-800 transition font-semibold"
            >
              Reset
            </button>

          </div>

        </section>

        {/* Manage Projects */}
        <section className="mt-24">

          <h2 className="text-4xl font-bold mb-12">
            Manage Projects
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            {projects.map((project) => (

              <div
                key={project.id}
                className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
              >

                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-8">

                  <div className="flex justify-between items-center mb-6">

                    <h3 className="text-3xl font-bold">
                      {project.title}
                    </h3>

                    <span className="bg-cyan-500/20 px-4 py-2 rounded-full text-sm">
                      {project.status}
                    </span>

                  </div>

                  <p className="text-gray-300">
                    {project.description}
                  </p>

                  <div className="flex gap-3 mt-8 flex-wrap">

                    <button
                      onClick={() => editProject(project)}
                      className="px-5 py-3 rounded-2xl bg-yellow-500 hover:bg-yellow-600 transition font-semibold"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProject(project.id)}
                      className="px-5 py-3 rounded-2xl bg-red-500 hover:bg-red-600 transition font-semibold"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>

      </div>

    </main>
  );
}