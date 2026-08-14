"use client";

import { useEffect, useMemo, useState } from "react";

type Blog = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  keywords?: string[] | string | null;
  status?: string | null;
  published_at?: string | null;
  created_at?: string | null;
};

export default function AdminPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  async function loadBlogs() {
    try {
      setLoading(true);

      const response = await fetch("/api/admin/blogs", {
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Bloglar alınamadı.");
      }

      setBlogs(result.blogs || []);
    } catch (error: any) {
      setMessage(error?.message || "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBlogs();
  }, []);

  async function deleteBlog(id: number) {
    const confirmed = window.confirm(
      "Bu blogu silmek istediğine emin misin?"
    );

    if (!confirmed) return;

    try {
      setMessage("");

      const response = await fetch("/api/admin/blogs", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Blog silinemedi.");
      }

      setBlogs((current) =>
        current.filter((blog) => blog.id !== id)
      );

      setMessage("Blog başarıyla silindi.");
    } catch (error: any) {
      setMessage(error?.message || "Blog silinemedi.");
    }
  }

  async function toggleStatus(blog: Blog) {
    const newStatus =
      blog.status === "published" ? "draft" : "published";

    try {
      setMessage("");

      const response = await fetch("/api/admin/blogs", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: blog.id,
          status: newStatus,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Durum değiştirilemedi.");
      }

      setBlogs((current) =>
        current.map((item) =>
          item.id === blog.id
            ? {
                ...item,
                status: newStatus,
                published_at:
                  newStatus === "published"
                    ? new Date().toISOString()
                    : null,
              }
            : item
        )
      );

      setMessage(
        newStatus === "published"
          ? "Blog yayınlandı."
          : "Blog taslağa alındı."
      );
    } catch (error: any) {
      setMessage(error?.message || "Durum değiştirilemedi.");
    }
  }

  const filteredBlogs = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return blogs;

    return blogs.filter((blog) => {
      return (
        blog.title?.toLowerCase().includes(value) ||
        blog.slug?.toLowerCase().includes(value) ||
        String(blog.id).includes(value)
      );
    });
  }, [blogs, search]);

  const publishedCount = blogs.filter(
    (blog) => blog.status === "published"
  ).length;

  const draftCount = blogs.filter(
    (blog) => blog.status !== "published"
  ).length;

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
          <div>
            <p className="text-sm text-zinc-500 mb-2">
              BARBER PRO
            </p>

            <h1 className="text-3xl md:text-4xl font-bold">
              Blog Yönetim Paneli
            </h1>

            <p className="text-zinc-400 mt-2">
              Otomatik oluşturulan içerikleri buradan yönet.
            </p>
          </div>

          <button
            onClick={loadBlogs}
            className="px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition"
          >
            Yenile
          </button>
        </div>

        {/* MESSAGE */}
        {message && (
          <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-sm text-zinc-200">
            {message}
          </div>
        )}

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-zinc-500 text-sm">
              Toplam Blog
            </p>

            <p className="text-3xl font-bold mt-2">
              {blogs.length}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-zinc-500 text-sm">
              Yayında
            </p>

            <p className="text-3xl font-bold mt-2 text-green-400">
              {publishedCount}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-zinc-500 text-sm">
              Taslak
            </p>

            <p className="text-3xl font-bold mt-2 text-yellow-400">
              {draftCount}
            </p>
          </div>

        </div>

        {/* SEARCH */}
        <div className="mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Blog ara..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 outline-none focus:border-zinc-500"
          />
        </div>

        {/* BLOGS */}
        <div className="rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-900">

          <div className="px-6 py-5 border-b border-zinc-800">
            <h2 className="font-semibold text-lg">
              Bloglar
            </h2>
          </div>

          {loading ? (
            <div className="p-10 text-center text-zinc-500">
              Bloglar yükleniyor...
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="p-10 text-center text-zinc-500">
              Blog bulunamadı.
            </div>
          ) : (
            <div className="divide-y divide-zinc-800">

              {filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="p-6 hover:bg-zinc-800/40 transition"
                >

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                    <div className="min-w-0 flex-1">

                      <div className="flex items-center gap-3 mb-2">

                        <span className="text-xs text-zinc-500">
                          #{blog.id}
                        </span>

                        <span
                          className={`text-xs px-2.5 py-1 rounded-full ${
                            blog.status === "published"
                              ? "bg-green-500/10 text-green-400"
                              : "bg-yellow-500/10 text-yellow-400"
                          }`}
                        >
                          {blog.status === "published"
                            ? "YAYINDA"
                            : "TASLAK"}
                        </span>

                      </div>

                      <h3 className="font-semibold text-lg mb-2">
                        {blog.title}
                      </h3>

                      <p className="text-sm text-zinc-500 break-all">
                        /blog/{blog.slug}
                      </p>

                      {blog.created_at && (
                        <p className="text-xs text-zinc-600 mt-2">
                          Oluşturulma:{" "}
                          {new Date(
                            blog.created_at
                          ).toLocaleString("tr-TR")}
                        </p>
                      )}

                    </div>

                    <div className="flex flex-wrap gap-2">

                      <a
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm"
                      >
                        Görüntüle
                      </a>

                      <button
                        onClick={() => toggleStatus(blog)}
                        className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm"
                      >
                        {blog.status === "published"
                          ? "Taslağa Al"
                          : "Yayınla"}
                      </button>

                      <button
                        onClick={() => deleteBlog(blog.id)}
                        className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm"
                      >
                        Sil
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

        {/* AUTO BLOG INFO */}
        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 rounded-full bg-green-500" />

            <h2 className="font-semibold">
              Otomatik Blog Sistemi
            </h2>
          </div>

          <p className="text-sm text-zinc-400">
            Sistem günlük otomatik olarak yeni bir blog
            oluşturacak şekilde çalışıyor.
          </p>

        </div>

      </div>
    </main>
  );
}