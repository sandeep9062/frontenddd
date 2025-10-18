"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react"; // Imported ArrowLeft
//import { useGetProjectByIdQuery } from "../../../../services/projectsApi";
import {useGetProjectBySlugQuery} from "../../../services/projectsApi";


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProjectDetailPage() {
  const {slug } = useParams();
  
  console.log(slug,"slugggg");
  // Use RTK Query instead of manual fetch
  const {
    data: project,
    isLoading,
    isError,
  } = useGetProjectBySlugQuery(slug as string, {
    skip: !slug,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-500 dark:text-gray-400">
        <svg
          className="w-5 h-5 mr-3 -ml-1 text-gray-400 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Loading project details...
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="flex items-center justify-center min-h-screen px-6 text-center">
        <p className="text-xl font-semibold text-red-500 dark:text-red-400">
          Error: Project could not be loaded or was not found.
        </p>
      </div>
    );
  }

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.4,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };
  // --------------------------

  // 🌟 The gold color is now defined as a Tailwind utility class for better consistency
  const accentColor = "bg-yellow-500 text-gray-900"; // A brighter, more modern gold/yellow

  return (
    <>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen px-4 py-16 mt-5 bg-white dark:bg-darkbg1 sm:py-24 md:px-8"
      >
        <div className="max-w-6xl mx-auto">
          {/* Back to Portfolio Button */}
          <motion.div variants={itemVariants} className="mb-8">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-gray-600 transition-colors dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Portfolio</span>
            </Link>
          </motion.div>

          {/* Title & Type */}
          <div className="flex flex-col items-start justify-between mb-8 sm:flex-row sm:items-center sm:mb-12">
            <motion.h1
              variants={itemVariants}
              className="mb-4 text-4xl font-extrabold text-gray-800 md:text-5xl dark:text-white sm:mb-0"
            >
              {project.title}
            </motion.h1>

            {/* Type Badge */}
            {project.type && (
              <motion.span
                variants={itemVariants}
                className={`px-4 py-1 text-sm rounded-full font-bold uppercase tracking-wider ${accentColor}`}
              >
                {project.type}
              </motion.span>
            )}
          </div>

          {/* Images Carousel - Improved Styling */}
          {project.image?.length > 0 && (
            <motion.div variants={itemVariants} className="mb-12">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop
                // Use a group class to enable group-hover effects for navigation
                className="overflow-hidden shadow-2xl rounded-xl swiper-container-custom group"
              >
                {project.image.map((img: string, i: number) => (
                  <SwiperSlide key={i}>
                    <div className="relative w-full h-[400px] md:h-[550px] lg:h-[650px]">
                      <Image
                        src={img}
                        alt={`${project.title} image ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                      {/* Add a subtle dark overlay to help navigation/pagination stand out */}
                      <div className="absolute inset-0 bg-black opacity-10"></div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          )}

          {/* Description */}
          {project.description && (
            <motion.p
              variants={itemVariants}
              className="py-2 pl-4 mb-12 text-xl italic leading-relaxed text-gray-600 border-l-4 dark:text-gray-300 border-gold"
            >
              {project.description}
            </motion.p>
          )}

          {/* Details & Info Section */}
          <motion.div variants={containerVariants} className="mb-12">
            <h2 className="pb-2 mb-4 text-2xl font-bold text-gray-800 border-b border-gray-200 dark:text-white dark:border-gray-700">
              Project Overview
            </h2>
            <motion.div
              variants={itemVariants}
              className="grid gap-6 text-gray-700 sm:grid-cols-2 lg:grid-cols-3 dark:text-gray-300"
            >
              {project.clientName && (
                <p>
                  <b>Client:</b> {project.clientName}
                </p>
              )}
              {project.place && (
                <p>
                  <b>Place:</b> {project.place}
                </p>
              )}
              {project.timeDuration && (
                <p>
                  <b>Duration:</b> {project.timeDuration}
                </p>
              )}
              {project.cost && (
                <p>
                  <b>Cost:</b> Rs. {project.cost}
                </p>
              )}
              {project.numberOfPages && (
                <p>
                  <b>Pages:</b> {project.numberOfPages}
                </p>
              )}
              {project.specialFeature && (
                <p>
                  <b>Special Feature:</b> {project.specialFeature}
                </p>
              )}
            </motion.div>
          </motion.div>

          {/* Technologies */}
          {project.technologiesUsed?.length > 0 && (
            <motion.div variants={containerVariants} className="mb-12">
              <h3 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
                Core Technologies
              </h3>
              <motion.ul variants={itemVariants} className="flex flex-wrap gap-3">
                {project.technologiesUsed.map((tech: string, i: number) => (
                  <li
                    key={i}
                    className="px-4 py-1 text-sm font-medium bg-gray-100 border border-gray-200 rounded-full shadow-sm dark:bg-gray-700 dark:border-gray-600"
                  >
                    {tech}
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          )}

          {/* Features */}
          {project.features?.length > 0 && (
            <motion.div variants={containerVariants} className="mb-12">
              <h3 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
                Key Features
              </h3>
              <motion.ul
                variants={itemVariants}
                className="pl-0 space-y-3 list-none"
              >
                {project.features.map((f: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start text-gray-700 dark:text-gray-300"
                  >
                    <span className="mt-1 mr-3 text-lg text-gold">
                      &bull;
                    </span>
                    {f}
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          )}

          {/* Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-700"
          >
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 font-medium text-white transition duration-300 bg-gray-800 rounded-lg shadow-md hover:bg-yellow-500 hover:text-gray-900"
              >
                <span className="truncate">View Code on GitHub</span>{" "}
                <ExternalLink size={18} />
              </Link>
            )}

            {project.live && (
              <Link
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 font-medium text-yellow-500 transition duration-300 border border-yellow-500 rounded-lg shadow-md hover:bg-yellow-500 hover:text-gray-900"
              >
                <span className="truncate">Live Demo</span>{" "}
                <ExternalLink size={18} />
              </Link>
            )}

            {project.deployment && (
              <Link
                href={project.deployment}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 font-medium text-gray-700 transition duration-300 border border-gray-300 rounded-lg shadow-sm dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="truncate">Deployment Details</span>{" "}
                <ExternalLink size={18} />
              </Link>
            )}
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
