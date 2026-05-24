'use client';

import { useEffect, useState } from 'react';

import {
  addProject,
  deleteProject,
  getAllProjects,
  updateProject,
} from '@/lib/projects';

export default function AdminPage() {

  const [loading, setLoading] =
    useState(false);

  const [projects, setProjects] =
    useState<any[]>([]);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [form, setForm] = useState({

    title: '',
    category: 'airdrop',
    status: 'Active',
    difficulty: 'Easy',
    reward: '$500+',
    image: '',
    description: '',
    link: '',
    airdrop: '',
    twitter: '',
    youtube: '',
    guide: '',

  });

  async function loadProjects() {

    const data =
      await getAllProjects();

    setProjects(data);

  }

  useEffect(() => {

    loadProjects();

  }, []);

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      const cleanTitle =
        form.title
          .replace(
            'Project Name:',
            ''
          )
          .trim();

      const cleanDescription =
        form.description
          .replace(
            'Description:',
            ''
          )
          .trim();

      const cleanImage =
        form.image
          .replace(
            'Image URL:',
            ''
          )
          .trim();

      const slug =
        cleanTitle
          .toLowerCase()
          .replace(/\s+/g, '-');

      const projectData = {

        title: cleanTitle,
        slug,
        category: form.category,
        status: form.status,
        difficulty:
          form.difficulty,
        reward: form.reward,
        image: cleanImage,
        description:
          cleanDescription,
        link: form.link,
        airdrop:
          form.airdrop,
        twitter:
          form.twitter,
        youtube:
          form.youtube,
        createdAt: Date.now(),
        guide: form.guide
          .split('\n')
          .filter(Boolean),

      };

      if (editingId) {

        await updateProject(
          editingId,
          projectData
        );

        alert(
          'Project Updated'
        );

      } else {

        await addProject(
          projectData
        );

        alert(
          'Project Added'
        );

      }

      resetForm();

      loadProjects();

    } catch (error) {

      console.error(error);

      alert(
        'Something went wrong'
      );

    } finally {

      setLoading(false);

    }

  }

  function handleEdit(
    project: any
  ) {

    setEditingId(project.id);

    setForm({

      title:
        project.title || '',

      category:
        project.category ||
        'airdrop',

      status:
        project.status ||
        'Active',

      difficulty:
        project.difficulty ||
        'Easy',

      reward:
        project.reward ||
        '$500+',

      image:
        project.image || '',

      description:
        project.description ||
        '',

      link:
        project.link || '',

      airdrop:
        project.airdrop ||
        '',

      twitter:
        project.twitter ||
        '',

      youtube:
        project.youtube ||
        '',

      guide: Array.isArray(
        project.guide
      )
        ? project.guide.join(
            '\n'
          )
        : '',

    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  }

  function resetForm() {

    setEditingId(null);

    setForm({

      title: '',
      category: 'airdrop',
      status: 'Active',
      difficulty: 'Easy',
      reward: '$500+',
      image: '',
      description: '',
      link: '',
      airdrop: '',
      twitter: '',
      youtube: '',
      guide: '',

    });

  }

  async function handleDelete(
    id: string
  ) {

    const confirmDelete =
      confirm(
        'Delete this project?'
      );

    if (!confirmDelete)
      return;

    try {

      await deleteProject(id);

      loadProjects();

    } catch (error) {

      console.error(error);

      alert(
        'Delete failed'
      );

    }

  }

  return (

    <main className="min-h-screen bg-[#050816] text-white px-6 py-16">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-6xl font-black mb-14 text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">

          Ultimate Admin Panel

        </h1>

        {/* FORM */}

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-6 bg-white/5 border border-white/10 p-10 rounded-[40px] backdrop-blur-xl"
        >

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Project Title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title:
                    e.target.value,
                })
              }
              className="p-4 rounded-2xl bg-[#0d1326] border border-white/10 outline-none focus:border-cyan-400"
              required
            />

            <input
              type="text"
              placeholder="Image URL"
              value={form.image}
              onChange={(e) =>
                setForm({
                  ...form,
                  image:
                    e.target.value,
                })
              }
              className="p-4 rounded-2xl bg-[#0d1326] border border-white/10 outline-none focus:border-cyan-400"
            />

            <input
              type="text"
              placeholder="Website Link"
              value={form.link}
              onChange={(e) =>
                setForm({
                  ...form,
                  link:
                    e.target.value,
                })
              }
              className="p-4 rounded-2xl bg-[#0d1326] border border-white/10 outline-none"
            />

            <input
              type="text"
              placeholder="Airdrop Link"
              value={form.airdrop}
              onChange={(e) =>
                setForm({
                  ...form,
                  airdrop:
                    e.target.value,
                })
              }
              className="p-4 rounded-2xl bg-[#0d1326] border border-white/10 outline-none"
            />

            <input
              type="text"
              placeholder="Twitter/X Link"
              value={form.twitter}
              onChange={(e) =>
                setForm({
                  ...form,
                  twitter:
                    e.target.value,
                })
              }
              className="p-4 rounded-2xl bg-[#0d1326] border border-white/10 outline-none"
            />

            <input
              type="text"
              placeholder="YouTube Guide Link"
              value={form.youtube}
              onChange={(e) =>
                setForm({
                  ...form,
                  youtube:
                    e.target.value,
                })
              }
              className="p-4 rounded-2xl bg-[#0d1326] border border-white/10 outline-none"
            />

          </div>

          <textarea
            placeholder="Short Description"
            value={
              form.description
            }
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
            className="w-full h-40 p-4 rounded-2xl bg-[#0d1326] border border-white/10 outline-none"
          />

          <textarea
            placeholder="Guide Steps (one line = one step)"
            value={form.guide}
            onChange={(e) =>
              setForm({
                ...form,
                guide:
                  e.target.value,
              })
            }
            className="w-full h-56 p-4 rounded-2xl bg-[#0d1326] border border-white/10 outline-none"
          />

          <div className="grid md:grid-cols-4 gap-6">

            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category:
                    e.target.value,
                })
              }
              className="p-4 rounded-2xl bg-[#0d1326] border border-white/10"
            >

              <option value="airdrop">
                Airdrop
              </option>

              <option value="testnet">
                Testnet
              </option>

            </select>

            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status:
                    e.target.value,
                })
              }
              className="p-4 rounded-2xl bg-[#0d1326] border border-white/10"
            >

              <option>
                Active
              </option>

              <option>
                Alpha
              </option>

              <option>
                Ended
              </option>

            </select>

            <select
              value={
                form.difficulty
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  difficulty:
                    e.target.value,
                })
              }
              className="p-4 rounded-2xl bg-[#0d1326] border border-white/10"
            >

              <option>
                Easy
              </option>

              <option>
                Medium
              </option>

              <option>
                Hard
              </option>

            </select>

            <input
              type="text"
              placeholder="Reward"
              value={form.reward}
              onChange={(e) =>
                setForm({
                  ...form,
                  reward:
                    e.target.value,
                })
              }
              className="p-4 rounded-2xl bg-[#0d1326] border border-white/10"
            />

          </div>

          <div className="flex gap-4">

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-black text-xl hover:scale-[1.01] transition"
            >

              {loading
                ? 'PROCESSING...'
                : editingId
                ? 'UPDATE PROJECT'
                : 'ADD PROJECT'}

            </button>

            {editingId && (

              <button
                type="button"
                onClick={
                  resetForm
                }
                className="px-8 py-5 rounded-2xl bg-red-500 font-black"
              >

                Cancel

              </button>

            )}

          </div>

        </form>

        {/* PROJECT LIST */}

        <div className="mt-20">

          <h2 className="text-5xl font-black mb-10">
            Live Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {projects.map((project) => (

              <div
                key={project.id}
                className="rounded-[32px] overflow-hidden border border-white/10 bg-gradient-to-b from-[#111827] to-[#0b1020] shadow-2xl"
              >

                <img
                  src={
                    project.image ||
                    'https://picsum.photos/600/400'
                  }
                  alt={project.title}
                  className="w-full h-64 object-cover"
                />

                <div className="p-6">

                  <div className="flex items-center justify-between mb-5">

                    <span className="px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 text-sm">

                      {project.status}

                    </span>

                    <span className="text-green-400 font-bold text-xl">

                      {project.reward}

                    </span>

                  </div>

                  <h3 className="text-3xl font-black">

                    {project.title}

                  </h3>

                  <p className="text-gray-400 mt-4 line-clamp-3">

                    {project.description}
                  </p>

                  <div className="flex gap-4 mt-8">

                    <button
                      onClick={() =>
                        handleEdit(project)
                      }
                      className="flex-1 py-4 rounded-2xl bg-blue-600 font-bold hover:bg-blue-500 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          project.id
                        )
                      }
                      className="flex-1 py-4 rounded-2xl bg-red-500 font-bold hover:bg-red-400 transition"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </main>

  );

}