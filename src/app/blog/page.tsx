'use client';

import Link from 'next/link';

import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  getAllBlogs,
} from '@/lib/projects';

export default function BlogPage() {

  const [search, setSearch] =
    useState('');

  const [category, setCategory] =
    useState('All');

  const [posts, setPosts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function load() {

      try {

        const data =
          await getAllBlogs();

        setPosts(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    load();

  }, []);

  const filteredPosts =
    useMemo(() => {

      return posts.filter(
        (post) => {

          const matchesSearch =
            post.title
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesCategory =
            category ===
              'All' ||
            post.category ===
              category;

          return (
            matchesSearch &&
            matchesCategory
          );

        }
      );

    }, [
      posts,
      search,
      category,
    ]);

  const featuredPost =
    posts.find(
      (p) => p.featured
    );

  return (

    <main className="min-h-screen bg-[#050816] text-white overflow-hidden relative">

      {/* GLOW */}

      <div className="fixed top-[-150px] left-[-150px] w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

      <div className="fixed bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-purple-500/10 blur-[140px] rounded-full"></div>

      {/* HERO */}

      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20">

        <div className="text-center">

          <div className="inline-flex px-5 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 mb-8">

            📰 Web3 News & Alpha

          </div>

          <h1 className="text-6xl md:text-8xl font-black leading-tight">

            Crypto Insights

            <span className="block bg-gradient-to-r from-cyan-300 via-white to-purple-400 text-transparent bg-clip-text">

              & Articles

            </span>

          </h1>

          <p className="mt-10 text-xl text-gray-400 leading-10 max-w-3xl mx-auto">

            Explore premium crypto
            guides, airdrop research,
            testnet opportunities and
            Web3 alpha updates.

          </p>

          <div className="flex items-center justify-center mt-10">

            <Link
              href="/"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white hover:scale-105 transition"
            >

              🏠 Homepage

            </Link>

          </div>

        </div>

      </section>

      {/* FEATURED */}

      {featuredPost && (

        <section className="relative z-10 max-w-7xl mx-auto px-6 pb-20">

          <div className="relative overflow-hidden rounded-[40px] border border-yellow-500/20 bg-gradient-to-b from-[#151b2f] to-[#0b1020]">

            <img
              src={
                featuredPost.image
              }
              alt={
                featuredPost.title
              }
              className="w-full h-[500px] object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/20 to-transparent"></div>

            <div className="absolute bottom-0 left-0 w-full p-10">

              <div className="inline-flex px-5 py-2 rounded-full bg-yellow-500 text-black text-sm font-black mb-6">

                FEATURED ARTICLE

              </div>

              <h2 className="text-5xl lg:text-7xl font-black leading-tight max-w-5xl">

                {
                  featuredPost.title
                }

              </h2>

              <p className="text-gray-300 text-xl mt-8 max-w-3xl leading-10">

                {
                  featuredPost.description
                }

              </p>

              <Link
                href={`/blog/${featuredPost.slug}`}
                className="inline-block mt-10 px-10 py-5 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black hover:scale-[1.03] transition"
              >

                Read Featured →

              </Link>

            </div>

          </div>

        </section>

      )}

      {/* SEARCH */}

      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-14">

        <div className="grid lg:grid-cols-2 gap-6">

          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="px-6 py-5 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-500/40"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="px-6 py-5 rounded-2xl bg-[#111827] border border-white/10 text-white outline-none"
          >

            <option value="All">
              All Categories
            </option>

            <option value="Airdrop">
              Airdrop
            </option>

            <option value="Testnet">
              Testnet
            </option>

            <option value="Guide">
              Guide
            </option>

            <option value="Research">
              Research
            </option>

            <option value="Wallet">
              Wallet
            </option>

            <option value="News">
              News
            </option>

          </select>

        </div>

      </section>

      {/* LOADING */}

      {loading && (

        <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">

            {[...Array(6)].map(
              (_, i) => (

                <div
                  key={i}
                  className="h-[420px] rounded-[32px] bg-white/5 animate-pulse border border-white/10"
                />

              )
            )}

          </div>

        </section>

      )}

      {/* ARTICLES */}

      {!loading && (

        <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">

          {filteredPosts.length ===
            0 && (

            <div className="text-center py-24">

              <h2 className="text-5xl font-black mb-6">

                No Articles Yet

              </h2>

              <p className="text-gray-400 text-xl">

                Publish blogs from
                admin panel 😄

              </p>

            </div>

          )}

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">

            {filteredPosts.map(
              (
                post,
                index
              ) => (

                <div
                  key={index}
                  className="group rounded-[32px] overflow-hidden bg-gradient-to-b from-[#111827] to-[#0b1020] border border-white/10 hover:border-cyan-500/30 hover:scale-[1.02] transition-all duration-300 shadow-2xl"
                >

                  <div className="overflow-hidden">

                    <img
                      src={
                        post.image ||
                        'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop'
                      }
                      alt={
                        post.title
                      }
                      className="w-full h-[240px] object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                  </div>

                  <div className="p-6">

                    <div className="flex items-center justify-between mb-5">

                      <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm">

                        {
                          post.category ||
                          'Blog'
                        }

                      </span>

                      <span className="text-gray-400 text-sm">

                        {
                          post.date ||
                          'May 2026'
                        }

                      </span>

                    </div>

                    <h3 className="text-3xl font-black leading-tight">

                      {
                        post.title
                      }

                    </h3>

                    <p className="mt-5 text-gray-400 leading-8 line-clamp-3">

                      {
                        post.description
                      }

                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="block mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-black hover:scale-[1.02] transition text-center"
                    >

                      Read Article →

                    </Link>

                  </div>

                </div>

              )
            )}

          </div>

        </section>

      )}

      {/* FOOTER */}

      <footer className="border-t border-white/10 bg-[#070b18]">

        <div className="max-w-7xl mx-auto px-6 py-10 text-center text-gray-500">

          © 2026 CryptoDropScout.
          All Rights Reserved.

        </div>

      </footer>

    </main>

  );

}