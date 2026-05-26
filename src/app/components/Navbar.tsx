'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { getAllProjects, getAllBlogs } from '@/lib/projects';

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [search, setSearch] = useState('');
  const [projects, setProjects] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const translations: any = {
    EN: { home: 'Home', airdrops: 'Airdrops', testnets: 'Testnets', blog: 'Blog', tools: 'Tools' },
    BN: { home: 'হোম', airdrops: 'এয়ারড্রপ', testnets: 'টেস্টনেট', blog: 'ব্লগ', tools: 'টুলস' },
    IN: { home: 'होम', airdrops: 'एयरड्रॉप', testnets: 'टेस्टनेट', blog: 'ब्लॉग', tools: 'टूल्स' },
  };

  const t = translations[language];

  useEffect(() => {
    async function load() {
      const projectData = await getAllProjects();
      const blogData = await getAllBlogs();
      setProjects(projectData);
      setBlogs(blogData);
    }
    load();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProjects = search
    ? projects.filter(p =>
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const filteredBlogs = search
    ? blogs.filter(b =>
        b.title?.toLowerCase().includes(search.toLowerCase()) ||
        b.description?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const hasResults = filteredProjects.length > 0 || filteredBlogs.length > 0;

  return (

    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#040816]/95 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.45)]">

      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-[72px] flex items-center justify-between gap-4">

        {/* LOGO */}
        <Link href="/" className="relative whitespace-nowrap group flex-shrink-0">
          <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight bg-gradient-to-r from-cyan-300 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(34,211,238,0.35)] transition duration-300 group-hover:scale-[1.03] inline-block">
            CryptoDropScout
          </span>
        </Link>

        {/* DESKTOP SEARCH */}
        <div ref={searchRef} className="hidden lg:block relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder={language === 'EN' ? 'Search projects & blogs...' : language === 'BN' ? 'প্রজেক্ট ও ব্লগ খুঁজুন...' : 'प्रोजेक्ट और ब्लॉग खोजें...'}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setShowResults(true); }}
            onFocus={() => setShowResults(true)}
            className="w-full h-10 px-4 rounded-xl bg-[#0b1020]/90 border border-cyan-500/20 outline-none focus:border-cyan-400/50 transition text-sm text-white"
          />

          {/* LIVE RESULTS DROPDOWN */}
          {showResults && search && (
            <div className="absolute top-12 left-0 w-full bg-[#0b1020] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 max-h-[60vh] overflow-y-auto">

              {filteredProjects.length > 0 && (
                <div>
                  <p className="px-4 pt-3 pb-1 text-xs text-cyan-400 font-bold uppercase tracking-wider">Projects</p>
                  {filteredProjects.map((project: any) => (
                    <Link
                      key={project.id}
                      href={`/project/${project.slug}`}
                      onClick={() => { setSearch(''); setShowResults(false); }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-cyan-500/10 transition border-b border-white/5 text-sm"
                    >
                      {project.image && <img src={project.image} alt="" className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />}
                      <span>{project.title}</span>
                    </Link>
                  ))}
                </div>
              )}

              {filteredBlogs.length > 0 && (
                <div>
                  <p className="px-4 pt-3 pb-1 text-xs text-purple-400 font-bold uppercase tracking-wider">Blogs</p>
                  {filteredBlogs.map((blog: any) => (
                    <Link
                      key={blog.id}
                      href={`/blog/${blog.slug}`}
                      onClick={() => { setSearch(''); setShowResults(false); }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-purple-500/10 transition border-b border-white/5 text-sm"
                    >
                      {blog.image && <img src={blog.image} alt="" className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />}
                      <span>{blog.title}</span>
                    </Link>
                  ))}
                </div>
              )}

              {!hasResults && (
                <div className="px-4 py-4 text-sm text-gray-400">No results found 😄</div>
              )}

            </div>
          )}
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0">

          <Link href="/" className="px-3.5 py-2 rounded-xl bg-gradient-to-b from-cyan-500/20 to-cyan-700/20 border border-cyan-400/20 text-white hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] transition duration-300 font-bold text-xs">
            {t.home}
          </Link>

          <Link href="/airdrops" className="px-3.5 py-2 rounded-xl bg-gradient-to-b from-purple-500/20 to-purple-800/20 border border-purple-400/20 text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] transition duration-300 font-bold text-xs">
            {t.airdrops}
          </Link>

          <Link href="/testnets" className="px-3.5 py-2 rounded-xl bg-gradient-to-b from-blue-500/20 to-blue-800/20 border border-blue-400/20 text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] transition duration-300 font-bold text-xs">
            {t.testnets}
          </Link>

          <Link href="/blog" className="px-3.5 py-2 rounded-xl bg-gradient-to-b from-pink-500/20 to-pink-800/20 border border-pink-400/20 text-white hover:shadow-[0_0_30px_rgba(236,72,153,0.25)] transition duration-300 font-bold text-xs">
            {t.blog}
          </Link>

          <Link href="/tools" className="px-3.5 py-2 rounded-xl bg-gradient-to-b from-green-500/20 to-green-800/20 border border-green-400/20 text-white hover:shadow-[0_0_30px_rgba(34,197,94,0.25)] transition duration-300 font-bold text-xs">
            {t.tools}
          </Link>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-[#111827]/90 border border-white/10 text-white outline-none font-bold hover:border-cyan-400/30 transition text-xs"
          >
            <option value="EN">🇺🇸 EN</option>
            <option value="BN">🇧🇩 BN</option>
            <option value="IN">🇮🇳 IN</option>
          </select>

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl"
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
              placeholder="Search projects & blogs..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setShowResults(true); }}
              className="w-full h-12 px-5 rounded-2xl bg-[#0b1020]/90 border border-cyan-500/20 outline-none text-white text-sm"
            />
            {showResults && search && (
              <div className="absolute top-14 left-0 w-full bg-[#0b1020] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 max-h-60 overflow-y-auto">
                {filteredProjects.map((project: any) => (
                  <Link key={project.id} href={`/project/${project.slug}`} onClick={() => { setSearch(''); setShowResults(false); setMenuOpen(false); }} className="block px-5 py-3 hover:bg-cyan-500/10 transition border-b border-white/5 text-sm">
                    {project.title}
                  </Link>
                ))}
                {filteredBlogs.map((blog: any) => (
                  <Link key={blog.id} href={`/blog/${blog.slug}`} onClick={() => { setSearch(''); setShowResults(false); setMenuOpen(false); }} className="block px-5 py-3 hover:bg-purple-500/10 transition border-b border-white/5 text-sm">
                    {blog.title}
                  </Link>
                ))}
                {!hasResults && <div className="px-5 py-3 text-sm text-gray-400">No results found 😄</div>}
              </div>
            )}
          </div>

          <div className="grid gap-4">
            <Link href="/" onClick={() => setMenuOpen(false)} className="w-full text-center py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold">{t.home}</Link>
            <Link href="/airdrops" onClick={() => setMenuOpen(false)} className="w-full text-center py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 font-bold">{t.airdrops}</Link>
            <Link href="/testnets" onClick={() => setMenuOpen(false)} className="w-full text-center py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-600 font-bold">{t.testnets}</Link>
            <Link href="/blog" onClick={() => setMenuOpen(false)} className="w-full text-center py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 font-bold">{t.blog}</Link>
            <Link href="/tools" onClick={() => setMenuOpen(false)} className="w-full text-center py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 font-bold">{t.tools}</Link>
          </div>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-4 rounded-2xl bg-[#111827]/90 border border-white/10 text-white outline-none font-bold"
          >
            <option value="EN">🇺🇸 EN</option>
            <option value="BN">🇧🇩 BN</option>
            <option value="IN">🇮🇳 IN</option>
          </select>

        </div>
      )}

    </header>

  );

}