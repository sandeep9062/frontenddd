"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, User } from "lucide-react";

import { useGetBlogsQuery } from "../../services/blogsApi";
import Newsletter from "../components/NewsLetter";
import { Spin } from "antd"; // ✅ Import Spin for loading

// ✅ Define the Blog interface
interface Comment {
  name: string;
  email: string;
  comment: string;
  createdAt: string;
}

interface Blog {
  _id: string;
  title: string;
  slug: string; // ✅ Ensure slug is present
  desc: string;
  content: string;
  image?: string;
  category: string;
  tags: string[];
  author: string;
  authorImage?: string;
  date: string;
  readTime: number;
  views: number;
  likes: number;
  isFeatured: boolean;
  seoMetaTitle?: string;
  seoMetaDescription?: string;
  status: "draft" | "published" | "archived";
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

const categories = [
  "All",
  "Dental Implants",
  "Dental Tourism",
  "Success Stories",
  "Treatments",
  "Orthodontics",
  "Travel Guide",
];

const POSTS_PER_PAGE = 9;

export default function BlogPage() {
  const { data: blogs = [], isLoading, isError } = useGetBlogsQuery();

  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBlogs: Blog[] = useMemo(
    () =>
      activeCategory === "All"
        ? blogs
        : blogs.filter((b: Blog) => b.category === activeCategory),
    [activeCategory, blogs]
  );

  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1); // reset page on filter change
  };

  return (
    <>
      <main className="bg-white dark:bg-[#0D1321] text-black dark:text-white ">
        {/* Hero */}
        <section className="py-16 text-center bg-gray-50 dark:bg-[#0D1321]/50">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-4xl font-extrabold md:text-5xl text-navy dark:text-white"
            style={{
              background:
                "linear-gradient(135deg, #FF9933 0%, #00529B 50%, #138808 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.2))",
            }}
          >
           Your Smile, Our Expertise – Welcome to India’s Leading Dental Clinics
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-3xl mx-auto text-gray-600 dark:text-gray-400"
          >
            Your go-to resource for trusted guides, clinic insights, cost
            comparisons, and real stories from patients who traveled to India
            for world-class dental care.
          </motion.p>
        </section>

        {/* Filter */}
        <div className="flex flex-wrap items-center justify-center gap-4 px-4 mt-12">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] ${
                activeCategory === cat
                  ? "bg-[#D4AF37] text-black shadow-lg"
                  : "bg-white dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] border border-gray-200 dark:border-gray-700"
              }`}
              aria-pressed={activeCategory === cat}
              aria-label={`Filter by ${cat}`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Blog Grid */}
        <section className="px-4 py-20 mx-auto max-w-7xl">
          <Spin spinning={isLoading} size="large" tip="Loading blogs...">
            {isError && (
              <p className="text-center text-red-500">Failed to load blogs.</p>
            )}

            {!isError && (
              <>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {paginatedBlogs.map((blog: Blog, i: number) => (
                    <motion.div
                      key={blog._id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-sm group dark:bg-[#1a1a1a] dark:border-gray-700 hover:shadow-xl hover:-translate-y-1"
                    >
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="flex flex-col h-full"
                      >
                        <div className="relative w-full h-56 overflow-hidden">
                          {blog.image && (
                            <Image
                              src={blog.image}
                              alt={blog.title}
                              fill
                              priority={i < 3}
                              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                            />
                          )}
                          <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
                          <span className="absolute top-4 right-4 bg-[#D4AF37] text-black px-3 py-1 rounded-full text-xs font-semibold">
                            {blog.category}
                          </span>
                        </div>

                        <div className="flex flex-col justify-between flex-1 p-5">
                          <div>
                            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#D4AF37] transition-colors">
                              {blog.title}
                            </h3>
                            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                              {blog.desc}
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                              {blog.authorImage ? (
                                <Image
                                  src={blog.authorImage}
                                  alt={blog.author}
                                  width={40}
                                  height={40}
                                  className="rounded-full"
                                />
                              ) : (
                                <div className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-full">
                                  <User size={20} />
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                  {blog.author}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {new Date(blog.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {filteredBlogs.length === 0 && !isLoading && (
                  <p className="mt-10 text-center text-gray-400">
                    No posts found for “{activeCategory}”
                  </p>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 mt-16">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-medium transition-colors bg-white border border-gray-300 rounded-lg dark:bg-[#1a1a1a] dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>

                    <div className="items-center hidden gap-2 md:flex">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                            currentPage === i + 1
                              ? "bg-[#D4AF37] text-black"
                              : "bg-white dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
                          }`}
                          aria-current={
                            currentPage === i + 1 ? "page" : undefined
                          }
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <span className="text-sm text-gray-600 md:hidden dark:text-gray-400">
                      Page {currentPage} of {totalPages}
                    </span>

                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-sm font-medium transition-colors bg-white border border-gray-300 rounded-lg dark:bg-[#1a1a1a] dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </Spin>
        </section>
      </main>
      <Newsletter />
    </>
  );
}
