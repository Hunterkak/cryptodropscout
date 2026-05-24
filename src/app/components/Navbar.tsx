'use client';

import Link from 'next/link';

import {
  useState,
  useEffect,
} from 'react';

import {
  getAllProjects,
} from '@/lib/projects';

export default function Navbar() {

  const [search, setSearch] =
    useState('');

  const [projects, setProjects] =
    useState<any[]>([]);

  const [filtered, setFiltered] =
    useState<any[]>([]);

  const [language, setLanguage] =
    useState('EN');

  const translations: any = {

    EN: {
      search: 'Search projects...',
      home: 'Home',
      airdrops: 'Airdrops',
      testnets: 'Testnets',
      blog: 'Blog',
      tools: 'Tools',
    },

    BN: {
      search: 'প্রজেক্ট খুঁজুন...',
      home: 'হোম',
      airdrops: 'এয়ারড্রপ',
      testnets: 'টেস্টনেট',
      blog: 'ব্লগ',
      tools: 'টুলস',
    },

    IN: {
      search: 'प्रोजेक्ट खोजें...',
      home: 'होम',
      airdrops: 'एयरड्रॉप',
      testnets: 'टेस्टनेट',
      blog: 'ब्लॉग',
      tools: 'टूल्स',
    },

  };

  const t = translations[language];

  useEffect(() => {

    async function load() {

      const data =
        await getAllProjects();

      setProjects(data);

    }

    load();

  }, []);

  useEffect(() => {

    if (!search.trim()) {

      setFiltered([]);

      return;

    }

    const results =
      projects.filter((p: any) =>
        p.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );

    setFiltered(results);

  }, [search, projects]);

  return (

    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">

        {/* LOGO */}

        <Link
          href="/"
          className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text whitespace-nowrap hover:scale-105 transition"
        >
          CryptoDropScout
        </Link>

        {/* SEARCH */}

        <div className="hidden lg:block relative flex-1 max-w-xl">

          <input
            type="text"
            placeholder={t.search}
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full h-14 px-6 rounded-2xl bg-white/5 border border-cyan-500/10 outline-none focus:border-cyan-400 transition"
          />

          {/* SEARCH RESULTS */}

          {filtered.length > 0 && (

            <div className="absolute top-16 left-0 w-full bg-[#0b1020] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50">

              {filtered.map((project: any) => (

                <Link
                  key={project.id}
                  href={`/project/${project.slug}`}
                  onClick={() =>
                    setSearch('')
                  }
                  className="block px-5 py-4 hover:bg-cyan-500/10 transition border-b border-white/5"
                >
                  {project.title}
                </Link>

              ))}

            </div>

          )}

        </div>

        {/* MENU */}

        <div className="flex items-center gap-3">

          <Link
            href="/"
            className="px-5 py-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/20 transition font-semibold"
          >
            {t.home}
          </Link>

          <Link
            href="/airdrops"
            className="px-5 py-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-purple-500/20 transition font-semibold"
          >
            {t.airdrops}
          </Link>

          <Link
            href="/testnets"
            className="px-5 py-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-300 hover:bg-blue-500/20 transition font-semibold"
          >
            {t.testnets}
          </Link>

          <Link
            href="/blog"
            className="px-5 py-3 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-300 hover:bg-pink-500/20 transition font-semibold"
          >
            {t.blog}
          </Link>

          <Link
            href="/tools"
            className="px-5 py-3 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-300 hover:bg-green-500/20 transition font-semibold"
          >
            {t.tools}
          </Link>

          {/* LANGUAGE */}

          <select
            value={language}
            onChange={(e) =>
              setLanguage(
                e.target.value
              )
            }
            className="px-4 py-3 rounded-2xl bg-[#111827] border border-white/10 text-white outline-none font-semibold"
          >

            <option value="EN">
              🇺🇸 EN
            </option>

            <option value="BN">
              🇧🇩 BN
            </option>

            <option value="IN">
              🇮🇳 IN
            </option>

          </select>

        </div>

      </div>

    </header>

  );

}