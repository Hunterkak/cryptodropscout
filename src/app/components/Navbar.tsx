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

  const [menuOpen, setMenuOpen] =
    useState(false);

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

    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#040816]/95 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.45)]">

      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-20 flex items-center justify-between gap-4">

        {/* LOGO */}

        <Link
          href="/"
          className="relative whitespace-nowrap group flex-shrink-0"
        >

          <span className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight bg-gradient-to-r from-cyan-300 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(34,211,238,0.35)] transition duration-300 group-hover:scale-[1.03] inline-block">

            CryptoDropScout

          </span>

        </Link>

        {/* DESKTOP SEARCH */}

        <div className="hidden lg:block relative flex-1 max-w-2xl">

          <input
            type="text"
            placeholder={t.search}
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full h-14 px-6 rounded-2xl bg-[#0b1020]/90 border border-cyan-500/20 outline-none focus:border-cyan-400/50 focus:shadow-[0_0_25px_rgba(34,211,238,0.18)] transition text-base text-white"
          />

          {filtered.length > 0 && (

            <div className="absolute top-16 left-0 w-full bg-[#0b1020] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50">

              {filtered.map((project: any) => (

                <Link
                  key={project.id}
                  href={`/project/${project.slug}`}
                  onClick={() =>
                    setSearch('')
                  }
                  className="block px-5 py-4 hover:bg-cyan-500/10 transition border-b border-white/5 text-base"
                >
                  {project.title}
                </Link>

              ))}

            </div>

          )}

        </div>

        {/* DESKTOP MENU */}

        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">

          <Link
            href="/"
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-b from-cyan-500/20 to-cyan-700/20 border border-cyan-400/20 text-white hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] transition duration-300 font-bold text-sm"
          >
            {t.home}
          </Link>

          <Link
            href="/airdrops"
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-b from-purple-500/20 to-purple-800/20 border border-purple-400/20 text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] transition duration-300 font-bold text-sm"
          >
            {t.airdrops}
          </Link>

          <Link
            href="/testnets"
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-b from-blue-500/20 to-blue-800/20 border border-blue-400/20 text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] transition duration-300 font-bold text-sm"
          >
            {t.testnets}
          </Link>

          <Link
            href="/blog"
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-b from-pink-500/20 to-pink-800/20 border border-pink-400/20 text-white hover:shadow-[0_0_30px_rgba(236,72,153,0.25)] transition duration-300 font-bold text-sm"
          >
            {t.blog}
          </Link>

          <Link
            href="/tools"
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-b from-green-500/20 to-green-800/20 border border-green-400/20 text-white hover:shadow-[0_0_30px_rgba(34,197,94,0.25)] transition duration-300 font-bold text-sm"
          >
            {t.tools}
          </Link>

          <select
            value={language}
            onChange={(e) =>
              setLanguage(
                e.target.value
              )
            }
            className="px-4 py-2.5 rounded-2xl bg-[#111827]/90 border border-white/10 text-white outline-none font-bold hover:border-cyan-400/30 transition text-sm"
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

        {/* MOBILE MENU BUTTON */}

        <button
          onClick={() =>
            setMenuOpen(
              !menuOpen
            )
          }
          className="lg:hidden w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl"
        >

          {menuOpen ? '✕' : '☰'}

        </button>

      </div>

      {/* MOBILE MENU */}

      {menuOpen && (

        <div className="lg:hidden border-t border-white/10 bg-[#050816]/98 backdrop-blur-2xl px-4 py-6 space-y-5">

          {/* MOBILE SEARCH */}

          <div className="relative">

            <input
              type="text"
              placeholder={t.search}
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full h-14 px-5 rounded-2xl bg-[#0b1020]/90 border border-cyan-500/20 outline-none text-white"
            />

            {filtered.length >
              0 && (

              <div className="absolute top-16 left-0 w-full bg-[#0b1020] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50">

                {filtered.map(
                  (
                    project: any
                  ) => (

                    <Link
                      key={
                        project.id
                      }
                      href={`/project/${project.slug}`}
                      onClick={() => {

                        setSearch(
                          ''
                        );

                        setMenuOpen(
                          false
                        );

                      }}
                      className="block px-5 py-4 hover:bg-cyan-500/10 transition border-b border-white/5"
                    >
                      {
                        project.title
                      }
                    </Link>

                  )
                )}

              </div>

            )}

          </div>

          {/* MOBILE LINKS */}

          <div className="grid gap-4">

            <Link
              href="/"
              onClick={() =>
                setMenuOpen(
                  false
                )
              }
              className="w-full text-center py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold"
            >
              {t.home}
            </Link>

            <Link
              href="/airdrops"
              onClick={() =>
                setMenuOpen(
                  false
                )
              }
              className="w-full text-center py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 font-bold"
            >
              {t.airdrops}
            </Link>

            <Link
              href="/testnets"
              onClick={() =>
                setMenuOpen(
                  false
                )
              }
              className="w-full text-center py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-600 font-bold"
            >
              {t.testnets}
            </Link>

            <Link
              href="/blog"
              onClick={() =>
                setMenuOpen(false)
              }
              className="w-full text-center py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 font-bold"
            >
              {t.blog}
            </Link>

            <Link
              href="/tools"
              onClick={() =>
                setMenuOpen(false)
              }
              className="w-full text-center py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 font-bold"
            >
              {t.tools}
            </Link>

          </div>

          {/* MOBILE LANGUAGE */}

          <select
            value={language}
            onChange={(e) =>
              setLanguage(
                e.target.value
              )
            }
            className="w-full px-4 py-4 rounded-2xl bg-[#111827]/90 border border-white/10 text-white outline-none font-bold"
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

      )}

    </header>

  );

}