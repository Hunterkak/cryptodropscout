'use client';

import { useState } from 'react';

import { addProject } from '@/lib/projects';

export default function AdminPage() {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    title: '',
    category: 'airdrop',
    status: 'Potential',
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

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      const slug = form.title
        .toLowerCase()
        .replace(/\s+/g, '-');

      await addProject({

        ...form,

        slug,

        createdAt: Date.now(),

        guide: form.guide
          .split('\n')
          .filter(Boolean),

      });

      alert('Project Added Successfully');

      setForm({

        title: '',
        category: 'airdrop',
        status: 'Potential',
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

    } catch (error) {

      console.error(error);

      alert('Error adding project');

    } finally {

      setLoading(false);

    }

  }

  return (

    <main className="min-h-screen bg-[#050816] text-white px-6 py-16">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-6xl font-black mb-14 text-center">
          Ultimate Admin Panel
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white/5 border border-white/10 p-10 rounded-[40px]"
        >

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Project Title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              className="p-4 rounded-2xl bg-[#0d1326] border border-white/10 outline-none"
              required
            />

            <input
              type="text"
              placeholder="Image URL"
              value={form.image}
              onChange={(e) =>
                setForm({
                  ...form,
                  image: e.target.value,
                })
              }
              className="p-4 rounded-2xl bg-[#0d1326] border border-white/10 outline-none"
            />

            <input
              type="text"
              placeholder="Website Link"
              value={form.link}
              onChange={(e) =>
                setForm({
                  ...form,
                  link: e.target.value,
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
                  airdrop: e.target.value,
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
                  twitter: e.target.value,
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
                  youtube: e.target.value,
                })
              }
              className="p-4 rounded-2xl bg-[#0d1326] border border-white/10 outline-none"
            />

          </div>

          <textarea
            placeholder="Short Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
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
                guide: e.target.value,
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
                  category: e.target.value,
                })
              }
              className="p-4 rounded-2xl bg-[#0d1326] border border-white/10 outline-none"
            >
              <option value="airdrop">Airdrop</option>
              <option value="testnet">Testnet</option>
            </select>

            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value,
                })
              }
              className="p-4 rounded-2xl bg-[#0d1326] border border-white/10 outline-none"
            >
              <option>Potential</option>
              <option>Hot</option>
              <option>Active</option>
              <option>Live</option>
            </select>

            <select
              value={form.difficulty}
              onChange={(e) =>
                setForm({
                  ...form,
                  difficulty: e.target.value,
                })
              }
              className="p-4 rounded-2xl bg-[#0d1326] border border-white/10 outline-none"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <input
              type="text"
              placeholder="Reward"
              value={form.reward}
              onChange={(e) =>
                setForm({
                  ...form,
                  reward: e.target.value,
                })
              }
              className="p-4 rounded-2xl bg-[#0d1326] border border-white/10 outline-none"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-black text-xl hover:scale-[1.01] transition"
          >
            {loading
              ? 'ADDING PROJECT...'
              : 'ADD PROJECT'}
          </button>

        </form>

      </div>

    </main>

  );

}