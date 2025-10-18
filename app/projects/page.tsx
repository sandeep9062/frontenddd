"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { useGetProjectsQuery } from "../../services/projectsApi";

// ✅ Corrected category names to match database format
const categories = [
  "All",
  "WEB",
  "SAAS",
  "DIGITAL MARKETING",
  "MOBILE",
  "AI",
  "OTHER",
];
const PROJECTS_PER_PAGE = 9;

const PortfolioPage = () => {
  const { data: projects = [], isLoading, isError } = useGetProjectsQuery();

  const [active, setActive] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // A helper to normalize category names for comparison
  const normalizeCat = (cat: string) => cat.replace(/\s+/g, "");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => normalizeCat(p.type) === normalizeCat(active));

  const totalPages = Math.ceil(filtered.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const paginatedProjects = filtered.slice(
    startIndex,
    startIndex + PROJECTS_PER_PAGE
  );

  if (isLoading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-red-500">
        Error fetching projects.
      </div>
    );
  }

  const handleCategoryChange = (cat: string) => {
    setActive(cat);
    setCurrentPage(1);
  };

  return (
    <section className="min-h-screen px-6 py-20 bg-white dark:bg-darkbg1 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-4xl font-bold text-center text-navy dark:text-white"
        >
          Featured Projects
        </motion.h2>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full border font-medium transition duration-200 ${
                active === cat
                  ? "bg-[#D4AF37] text-black border-transparent"
                  : "text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-[#D4AF37]/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedProjects.map((project, index) => {
            const coverImage =
              project.image && project.image.length > 0
                ? project.image[0]
                : "/placeholder.png"; // ✅ fallback if no image

            return (
              <motion.div
                key={project._id}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative hover:border-gold bg-white dark:bg-[#1A1A1A] rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                {/* Image */}
                <Link href={`/projects/${project.slug}`}>
                  <Image
                    src={coverImage}
                    alt={project.title || "Project image"}
                    width={600}
                    height={400}
                    className="object-cover w-full h-52"
                  />
                </Link>

                {/* Details */}

                <Link href={`/projects/${project.slug}`}>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-navy dark:text-white">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                      {project.description}
                    </p>

                    {/* External Link */}
                    <div className="flex gap-4 mt-4">
                      <Link
                        href={`/projects/${project.slug}`}
                        aria-label={`View details for ${project.title}`}
                        className="text-gray-700 dark:text-gray-300 hover:text-[#D4AF37]"
                      >
                        <ExternalLink size={20} />
                      </Link>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* No Projects Found */}
        {filtered.length === 0 && (
          <p className="mt-10 text-center text-gray-500 dark:text-gray-400">
            No projects found for “{active}”
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition duration-200 ${
                  currentPage === i + 1
                    ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                    : "bg-gray-100 dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-[#D4AF37]/20"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioPage;
