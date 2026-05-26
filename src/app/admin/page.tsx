'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import {
  addProject,
  deleteProject,
  getAllProjects,
  updateProject,
  addBlog,
  getAllBlogs,
  deleteBlog,
  updateBlog,
} from '@/lib/projects';

const ADMIN_PASSWORD = 'cryptoscout2025';

export default function AdminPage() {

  const [auth, setAuth] =
    useState(false);

  const [pass, setPass] =
    useState('');

  const [authError, setAuthError] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [projects, setProjects] =
    useState<any[]>([]);

  const [blogs, setBlogs] =
    useState<any[]>([]);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [editingBlogId, setEditingBlogId] =
    useState<string | null>(null);

  const [preview, setPreview] =
    useState('');

  const [activeTab, setActiveTab] =
    useState('projects');

  const [blogLoading, setBlogLoading] =
    useState(false);

  const [blogForm, setBlogForm] =
    useState({

      title: '',
      author: '',
      category: 'Guide',
      image: '',
      description: '',
      content: '',
      featured: false,

    });

  const [form, setForm] =
    useState({

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
      featured: false,

    });

  async function loadProjects() {

    const data =
      await getAllProjects();

    setProjects(data);

  }

  async function loadBlogs() {

    const data =
      await getAllBlogs();

    setBlogs(data);

  }

  useEffect(() => {

    loadProjects();

    loadBlogs();

  }, []);

  function handleImageUpload(
    e: any
  ) {

    const file =
      e.target.files[0];

    if (!file) return;

    const imageUrl =
      URL.createObjectURL(file);

    setPreview(imageUrl);

  }

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      const slug =
        form.title
          .toLowerCase()
          .replace(/\s+/g, '-');

      const projectData = {

        title: form.title,

        slug,

        category:
          form.category,

        status:
          form.status,

        difficulty:
          form.difficulty,

        reward:
          form.reward,

        image:
          form.image,

        description:
          form.description,

        link:
          form.link,

        airdrop:
          form.airdrop,

        twitter:
          form.twitter,

        youtube:
          form.youtube,

        createdAt:
          Date.now(),

        guide:
          form.guide
            .split('\n')
            .filter(Boolean),

        featured:
          form.featured,

      };

      if (editingId) {

        await updateProject(
          editingId,
          projectData
        );

        alert(
          'Project Updated Successfully'
        );

      } else {

        await addProject(
          projectData
        );

        alert(
          'Project Added Successfully'
        );

      }

      resetForm();

      await loadProjects();

    } catch (error) {

      console.error(error);

      alert(
        'Something went wrong'
      );

    } finally {

      setLoading(false);

    }

  }

  async function handleBlogSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setBlogLoading(true);

      const slug =
        blogForm.title
          .toLowerCase()
          .replace(
            /[^a-z0-9\s-]/g,
            ''
          )
          .replace(
            /\s+/g,
            '-'
          );

      const blogData = {

        title:
          blogForm.title,

        slug,

        author:
          blogForm.author,

        category:
          blogForm.category,

        image:
          blogForm.image,

        description:
          blogForm.description,

        content:
          blogForm.content,

        featured:
          blogForm.featured,

        createdAt:
          Date.now(),

        date:
          new Date().toLocaleDateString(),

      };

      if (editingBlogId) {

        await updateBlog(
          editingBlogId,
          blogData
        );

        alert(
          'Blog Updated Successfully'
        );

      } else {

        await addBlog(
          blogData
        );

        alert(
          'Blog Published Successfully'
        );

      }

      setEditingBlogId(
        null
      );

      setBlogForm({

        title: '',
        author: '',
        category: 'Guide',
        image: '',
        description: '',
        content: '',
        featured: false,

      });

      await loadBlogs();

    } catch (error) {

      console.error(error);

      alert(
        'Failed To Publish Blog'
      );

    } finally {

      setBlogLoading(false);

    }

  }

  async function handleBlogDelete(
    id: string
  ) {

    const confirmDelete =
      confirm(
        'Delete this blog?'
      );

    if (!confirmDelete)
      return;

    try {

      await deleteBlog(id);

      await loadBlogs();

    } catch (error) {

      console.error(error);

      alert(
        'Blog delete failed'
      );

    }

  }

  function handleBlogEdit(
    blog: any
  ) {

    setEditingBlogId(
      blog.id
    );

    setBlogForm({

      title:
        blog.title || '',

      author:
        blog.author || '',

      category:
        blog.category ||
        'Guide',

      image:
        blog.image || '',

      description:
        blog.description ||
        '',

      content:
        blog.content ||
        '',

      featured:
        blog.featured ||
        false,

    });

    setActiveTab(
      'blogs'
    );

    window.scrollTo({

      top: 0,

      behavior: 'smooth',

    });

  }

  function handleEdit(
    project: any
  ) {

    setEditingId(project.id);

    setPreview(
      project.image || ''
    );

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
        project.airdrop || '',

      twitter:
        project.twitter || '',

      youtube:
        project.youtube || '',

      guide:
        Array.isArray(
          project.guide
        )
          ? project.guide.join(
              '\n'
            )
          : '',

      featured:
        project.featured ||
        false,

    });

    window.scrollTo({

      top: 0,

      behavior: 'smooth',

    });

  }

  function resetForm() {

    setEditingId(null);

    setPreview('');

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
      featured: false,

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

      await loadProjects();

    } catch (error) {

      console.error(error);

      alert(
        'Delete failed'
      );

    }

  }

  // PASSWORD SCREEN

  if (!auth) {

    return (

      <div className="min-h-screen bg-[#050816] flex items-center justify-center">

        <div className="bg-white/5 border border-white/10 rounded-[32px] p-10 w-full max-w-sm">

          <h2 className="text-3xl font-black mb-2 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">

            🔐 Admin Access

          </h2>

          <p className="text-gray-500 text-sm text-center mb-8">

            CryptoDropScout

          </p>

          <input
            type="password"
            placeholder="Enter password..."
            value={pass}
            onChange={(e) => {

              setPass(
                e.target.value
              );

              setAuthError(false);

            }}
            onKeyDown={(e) => {

              if (e.key === 'Enter') {

                if (
                  pass ===
                  ADMIN_PASSWORD
                ) {

                  setAuth(true);

                } else {

                  setAuthError(true);

                }

              }

            }}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white mb-3 focus:outline-none focus:border-purple-500"
          />

          {authError && (

            <p className="text-red-400 text-xs mb-3">

              ❌ Wrong password!

            </p>

          )}

          <button
            onClick={() => {

              if (
                pass ===
                ADMIN_PASSWORD
              ) {

                setAuth(true);

              } else {

                setAuthError(true);

              }

            }}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-black text-lg hover:opacity-90 transition"
          >

            Enter →

          </button>

        </div>

      </div>

    );

  }

  return (

    <main className="min-h-screen bg-[#050816] text-white px-6 py-16">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-6xl font-black mb-8 text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">

          Ultimate Admin Panel

        </h1>

        {/* TABS */}

        <div className="flex items-center justify-center gap-4 mb-12">

          <button
            type="button"
            onClick={() =>
              setActiveTab(
                'projects'
              )
            }
            className={`px-8 py-4 rounded-2xl font-black transition ${
              activeTab ===
              'projects'
                ? 'bg-cyan-500 text-white'
                : 'bg-white/5 border border-white/10'
            }`}
          >

            Projects

          </button>

          <button
            type="button"
            onClick={() =>
              setActiveTab(
                'blogs'
              )
            }
            className={`px-8 py-4 rounded-2xl font-black transition ${
              activeTab ===
              'blogs'
                ? 'bg-purple-500 text-white'
                : 'bg-white/5 border border-white/10'
            }`}
          >

            Blogs

          </button>

        </div>

        {/* PROJECTS TAB */}

        {activeTab ===
          'projects' && (

          <>

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
                  className="p-4 rounded-2xl bg-[#0d1326] border border-white/10 outline-none"
                  required
                />

                <input
                  type="text"
                  placeholder="Image URL"
                  value={form.image}
                  onChange={(e) => {

                    setForm({
                      ...form,
                      image:
                        e.target.value,
                    });

                    setPreview(
                      e.target.value
                    );

                  }}
                  className="p-4 rounded-2xl bg-[#0d1326] border border-white/10 outline-none"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handleImageUpload
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

              {preview && (

                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-w-md rounded-3xl border border-white/10"
                />

              )}

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
                placeholder="Guide Steps"
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

              <div className="flex items-center gap-4 bg-[#0d1326] border border-white/10 rounded-2xl p-5">

                <input
                  type="checkbox"
                  checked={
                    form.featured
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      featured:
                        e.target.checked,
                    })
                  }
                  className="w-5 h-5"
                />

                <p className="font-bold text-lg">

                  Featured Project

                </p>

              </div>

              <div className="grid md:grid-cols-4 gap-6">

                <select
                  value={
                    form.category
                  }
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
                  className="flex-1 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-black text-xl"
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
                    className="relative rounded-[32px] overflow-hidden border border-white/10 bg-gradient-to-b from-[#111827] to-[#0b1020] shadow-2xl"
                  >

                    {project.featured && (

                      <div className="absolute top-4 right-4 z-20 px-4 py-2 rounded-full bg-yellow-500 text-black text-xs font-black">

                        FEATURED

                      </div>

                    )}

                    <img
                      src={
                        project.image ||
                        'https://picsum.photos/600/400'
                      }
                      alt={
                        project.title
                      }
                      className="w-full h-64 object-cover"
                    />

                    <div className="p-6">

                      <div className="flex items-center justify-between mb-5">

                        <span className="px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 text-sm">

                          {
                            project.status
                          }

                        </span>

                        <span className="text-green-400 font-bold text-xl">

                          {
                            project.reward
                          }

                        </span>

                      </div>

                      <h3 className="text-3xl font-black">

                        {
                          project.title
                        }

                      </h3>

                      <p className="text-gray-400 mt-4 line-clamp-3">

                        {
                          project.description
                        }

                      </p>

                      <div className="flex gap-4 mt-8">

                        <button
                          onClick={() =>
                            handleEdit(
                              project
                            )
                          }
                          className="flex-1 py-4 rounded-2xl bg-blue-600 font-bold"
                        >

                          Edit

                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              project.id
                            )
                          }
                          className="flex-1 py-4 rounded-2xl bg-red-500 font-bold"
                        >

                          Delete

                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </>

        )}

        {/* BLOGS TAB */}

        {activeTab ===
          'blogs' && (

          <div className="space-y-12">

            <form
              onSubmit={
                handleBlogSubmit
              }
              className="bg-white/5 border border-white/10 rounded-[40px] p-10 backdrop-blur-xl"
            >

              <h2 className="text-5xl font-black mb-10">

                Publish Blog

              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                <input
                  type="text"
                  placeholder="Blog Title"
                  value={
                    blogForm.title
                  }
                  onChange={(e) =>
                    setBlogForm({
                      ...blogForm,
                      title:
                        e.target.value,
                    })
                  }
                  className="p-4 rounded-2xl bg-[#0d1326] border border-white/10 outline-none"
                  required
                />

                <input
                  type="text"
                  placeholder="Author Name"
                  value={
                    blogForm.author
                  }
                  onChange={(e) =>
                    setBlogForm({
                      ...blogForm,
                      author:
                        e.target.value,
                    })
                  }
                  className="p-4 rounded-2xl bg-[#0d1326] border border-white/10 outline-none"
                />

                <input
                  type="text"
                  placeholder="Thumbnail URL"
                  value={
                    blogForm.image
                  }
                  onChange={(e) =>
                    setBlogForm({
                      ...blogForm,
                      image:
                        e.target.value,
                    })
                  }
                  className="p-4 rounded-2xl bg-[#0d1326] border border-white/10 outline-none"
                />

                <select
                  value={
                    blogForm.category
                  }
                  onChange={(e) =>
                    setBlogForm({
                      ...blogForm,
                      category:
                        e.target.value,
                    })
                  }
                  className="p-4 rounded-2xl bg-[#0d1326] border border-white/10 outline-none"
                >

                  <option>

                    Guide

                  </option>

                  <option>

                    Airdrop

                  </option>

                  <option>

                    Testnet

                  </option>

                  <option>

                    Research

                  </option>

                  <option>

                    News

                  </option>

                </select>

              </div>

              <textarea
                placeholder="Short Description"
                value={
                  blogForm.description
                }
                onChange={(e) =>
                  setBlogForm({
                    ...blogForm,
                    description:
                      e.target.value,
                  })
                }
                className="w-full h-40 p-4 rounded-2xl bg-[#0d1326] border border-white/10 outline-none mt-6"
              />

              <textarea
                placeholder="Full Blog Content"
                value={
                  blogForm.content
                }
                onChange={(e) =>
                  setBlogForm({
                    ...blogForm,
                    content:
                      e.target.value,
                  })
                }
                className="w-full h-[400px] p-4 rounded-2xl bg-[#0d1326] border border-white/10 outline-none mt-6"
              />

              <div className="flex items-center gap-4 bg-[#0d1326] border border-white/10 rounded-2xl p-5 mt-6">

                <input
                  type="checkbox"
                  checked={
                    blogForm.featured
                  }
                  onChange={(e) =>
                    setBlogForm({
                      ...blogForm,
                      featured:
                        e.target.checked,
                    })
                  }
                  className="w-5 h-5"
                />

                <p className="font-bold text-lg">

                  Featured Article

                </p>

              </div>

              {/* UPDATE BLOG SUBMIT BUTTON */}

              <button
                type="submit"
                disabled={
                  blogLoading
                }
                className="w-full mt-8 py-5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 font-black text-xl"
              >

                {blogLoading
                  ? 'PROCESSING...'
                  : editingBlogId
                  ? 'UPDATE BLOG'
                  : 'PUBLISH BLOG'}

              </button>

            </form>

            {/* BLOG LIST */}

            <div>

              <h2 className="text-5xl font-black mb-10">

                Published Blogs

              </h2>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                {blogs.map(
                  (blog: any) => (

                    <div
                      key={blog.id}
                      className="rounded-[32px] overflow-hidden border border-white/10 bg-gradient-to-b from-[#111827] to-[#0b1020]"
                    >

                      <img
                        src={
                          blog.image ||
                          'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop'
                        }
                        className="w-full h-60 object-cover"
                      />

                      <div className="p-6">

                        <div className="flex items-center justify-between mb-5">

                          <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm">

                            {
                              blog.category
                            }

                          </span>

                          {blog.featured && (

                            <span className="px-4 py-2 rounded-full bg-yellow-500 text-black text-xs font-black">

                              FEATURED

                            </span>

                          )}

                        </div>

                        <h3 className="text-3xl font-black">

                          {blog.title}

                        </h3>

                        <p className="text-gray-400 mt-4 line-clamp-3">

                          {
                            blog.description
                          }

                        </p>

                        {/* BLOG ACTION BUTTONS */}

                        <div className="flex gap-3 mt-8">

                          <Link
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            className="flex-1 py-4 rounded-2xl bg-cyan-600 font-bold text-center"
                          >

                            Open

                          </Link>

                          <button
                            onClick={() =>
                              handleBlogEdit(
                                blog
                              )
                            }
                            className="flex-1 py-4 rounded-2xl bg-blue-600 font-bold"
                          >

                            Edit

                          </button>

                          <button
                            onClick={() =>
                              handleBlogDelete(
                                blog.id
                              )
                            }
                            className="flex-1 py-4 rounded-2xl bg-red-500 font-bold"
                          >

                            Delete

                          </button>

                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>

        )}

      </div>

    </main>

  );

}