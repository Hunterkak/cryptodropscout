"use client";

import { useEffect, useState } from "react";

import { db } from "../../lib/firebase";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

export default function AdminPage() {

  const [projects, setProjects] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [link, setLink] = useState("");
  const [airdrop, setAirdrop] = useState("");
  const [twitter, setTwitter] = useState("");
  const [youtube, setYoutube] = useState("");

  const [status, setStatus] =
    useState("Active");

  const [difficulty, setDifficulty] =
    useState("Easy");

  const [reward, setReward] =
    useState("Potential");

  const [featured, setFeatured] =
    useState(false);

  const [tags, setTags] = useState("");

  const [guide, setGuide] =
    useState("");

  const [editingId, setEditingId] =
    useState("");

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

  const resetForm = () => {

    setTitle("");
    setDescription("");
    setImage("");

    setLink("");
    setAirdrop("");
    setTwitter("");
    setYoutube("");

    setStatus("Active");
    setDifficulty("Easy");
    setReward("Potential");

    setFeatured(false);

    setTags("");
    setGuide("");

    setEditingId("");

  };

  const handleSubmit = async () => {

    const projectData = {

      title,
      description,
      image,

      link,
      airdrop,
      twitter,
      youtube,

      status,
      difficulty,
      reward,

      featured,

      tags: tags
        .split(",")
        .map((tag) => tag.trim()),

      guide: guide
        .split("\n")
        .filter((line) => line.trim() !== ""),

      createdAt: Date.now(),

    };

    if (editingId) {

      await updateDoc(
        doc(db, "projects", editingId),
        projectData
      );

    } else {

      await addDoc(
        collection(db, "projects"),
        projectData
      );

    }

    resetForm();

  };

  const handleDelete = async (
    id: string
  ) => {

    await deleteDoc(
      doc(db, "projects", id)
    );

  };

  const handleEdit = (project: any) => {

    setEditingId(project.id);

    setTitle(project.title || "");
    setDescription(
      project.description || ""
    );

    setImage(project.image || "");

    setLink(project.link || "");
    setAirdrop(
      project.airdrop || ""
    );

    setTwitter(
      project.twitter || ""
    );

    setYoutube(
      project.youtube || ""
    );

    setStatus(project.status || "Active");

    setDifficulty(
      project.difficulty || "Easy"
    );

    setReward(
      project.reward || "Potential"
    );

    setFeatured(
      project.featured || false
    );

    setTags(
      project.tags?.join(", ") || ""
    );

    setGuide(
      project.guide?.join("\n") || ""
    );

  };

  return (

    <main className="min-h-screen bg-[#020817] text-white px-6 py-20">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-6xl font-black mb-14">
          Ultimate Admin Panel
        </h1>

        {/* FORM */}

        <div className="bg-white/5 border border-white/10 rounded-[36px] p-10 mb-16">

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Project Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="px-6 py-4 rounded-2xl bg-[#0f172a] border border-white/10 outline-none"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) =>
                setImage(e.target.value)
              }
              className="px-6 py-4 rounded-2xl bg-[#0f172a] border border-white/10 outline-none"
            />

            <input
              type="text"
              placeholder="Website Link"
              value={link}
              onChange={(e) =>
                setLink(e.target.value)
              }
              className="px-6 py-4 rounded-2xl bg-[#0f172a] border border-white/10 outline-none"
            />

            <input
              type="text"
              placeholder="Airdrop Link"
              value={airdrop}
              onChange={(e) =>
                setAirdrop(e.target.value)
              }
              className="px-6 py-4 rounded-2xl bg-[#0f172a] border border-white/10 outline-none"
            />

            <input
              type="text"
              placeholder="Twitter/X Link"
              value={twitter}
              onChange={(e) =>
                setTwitter(e.target.value)
              }
              className="px-6 py-4 rounded-2xl bg-[#0f172a] border border-white/10 outline-none"
            />

            <input
              type="text"
              placeholder="YouTube Guide Link"
              value={youtube}
              onChange={(e) =>
                setYoutube(e.target.value)
              }
              className="px-6 py-4 rounded-2xl bg-[#0f172a] border border-white/10 outline-none"
            />

          </div>

          <textarea
            placeholder="Short Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full mt-6 px-6 py-5 rounded-2xl bg-[#0f172a] border border-white/10 outline-none min-h-[120px]"
          />

          <textarea
            placeholder="Guide Steps (one line = one step)"
            value={guide}
            onChange={(e) =>
              setGuide(e.target.value)
            }
            className="w-full mt-6 px-6 py-5 rounded-2xl bg-[#0f172a] border border-white/10 outline-none min-h-[220px]"
          />

          <div className="grid md:grid-cols-3 gap-6 mt-6">

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="px-6 py-4 rounded-2xl bg-[#0f172a] border border-white/10 outline-none text-white"
            >
              <option>Active</option>
              <option>Hot</option>
              <option>Potential</option>
              <option>Confirmed</option>
              <option>Ended</option>
            </select>

            <select
              value={difficulty}
              onChange={(e) =>
                setDifficulty(e.target.value)
              }
              className="px-6 py-4 rounded-2xl bg-[#0f172a] border border-white/10 outline-none text-white"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <select
              value={reward}
              onChange={(e) =>
                setReward(e.target.value)
              }
              className="px-6 py-4 rounded-2xl bg-[#0f172a] border border-white/10 outline-none text-white"
            >
              <option>Potential</option>
              <option>High Potential</option>
              <option>Confirmed Reward</option>
            </select>

          </div>

          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) =>
              setTags(e.target.value)
            }
            className="w-full mt-6 px-6 py-4 rounded-2xl bg-[#0f172a] border border-white/10 outline-none"
          />

          <div className="flex items-center gap-4 mt-8">

            <input
              type="checkbox"
              checked={featured}
              onChange={(e) =>
                setFeatured(
                  e.target.checked
                )
              }
              className="w-6 h-6"
            />

            <span className="text-lg">
              Featured Project
            </span>

          </div>

          <button
            onClick={handleSubmit}
            className="mt-10 px-8 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-lg hover:scale-105 transition"
          >
            {editingId
              ? "Update Project"
              : "Add Project"}
          </button>

        </div>

      </div>

    </main>

  );

}