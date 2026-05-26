'use client';

import Link from 'next/link';

import {
  useEffect,
  useState,
} from 'react';

import {
  useParams,
} from 'next/navigation';

import {
  getBlogBySlug,
} from '@/lib/projects';

export default function ArticlePage() {

  const params =
    useParams();

  const slug =
    params.slug as string;

  const [article, setArticle] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function load() {

      try {

        const data =
          await getBlogBySlug(
            slug
          );

        setArticle(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    if (slug) {

      load();

    }

  }, [slug]);

  if (loading) {

    return (

      <main className="min-h-screen bg-[#050816] flex items-center justify-center text-white">

        <div className="text-3xl font-black animate-pulse">

          Loading Article...

        </div>

      </main>

    );

  }

  if (!article) {

    return (

      <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center">

        <div className="text-center">

          <h1 className="text-6xl font-black mb-6">

            Article Not Found

          </h1>

          <div className="flex items-center justify-center gap-4">

            <Link
              href="/blog"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold"
            >

              Back To Blog

            </Link>

          </div>

        </div>

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-[#050816] text-white overflow-hidden relative">

      {/* GLOW */}

      <div className="fixed top-[-150px] left-[-150px] w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

      <div className="fixed bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-purple-500/10 blur-[140px] rounded-full"></div>

      {/* HERO */}

      <section className="relative z-10">

        <div className="relative h-[600px] overflow-hidden">

          <img
            src={
              article.image ||
              'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1400&auto=format&fit=crop'
            }
            alt={
              article.title
            }
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/30 to-transparent"></div>

          <div className="absolute bottom-0 left-0 w-full max-w-7xl mx-auto px-6 pb-16">

            <div className="flex items-center gap-4 mb-8">

              <Link
                href="/blog"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/20 transition"
              >

                ← Back To Blog

              </Link>

            </div>

            <div className="inline-flex px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 mb-6">

              {article.category ||
                'Blog'}

            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-tight max-w-5xl">

              {article.title}

            </h1>

            <div className="flex flex-wrap items-center gap-6 mt-8 text-gray-300">

              <span>

                👨‍💻{' '}
                {article.author ||
                  'CryptoDropScout'}

              </span>

              <span>

                📅{' '}
                {article.date ||
                  'May 2026'}

              </span>

            </div>

          </div>

        </div>

      </section>

      {/* CONTENT */}

      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">

        <article className="text-xl leading-[2.2] text-gray-300 whitespace-pre-line">

          {article.content}

        </article>

        {/* CTA */}

        <div className="mt-20 p-10 rounded-[32px] border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 to-blue-500/10 text-center">

          <h2 className="text-4xl font-black mb-6">

            Stay Ahead In Web3

          </h2>

          <p className="text-gray-300 text-lg leading-9 max-w-2xl mx-auto">

            Discover premium
            airdrops, testnets and
            early alpha opportunities
            before everyone else.

          </p>

          <Link
            href="/"
            className="inline-block mt-10 px-10 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-black hover:scale-[1.03] transition"
          >

            Explore Projects →

          </Link>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-white/10 bg-[#070b18]">

        <div className="max-w-7xl mx-auto px-6 py-10 text-center text-gray-500">

          © 2026
          CryptoDropScout.
          All Rights Reserved.

        </div>

      </footer>

    </main>

  );

}