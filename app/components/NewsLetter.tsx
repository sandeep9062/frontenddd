"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import toast from "react-hot-toast";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 15,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:9000/api/v1/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success(data.message);
      setEmail(""); // Reset after successful submission
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      className="w-full transition-colors duration-300"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="w-full max-w-full px-2 pb-10 mx-0 mt-4 sm:max-w-5xl sm:mx-auto sm:px-4">
        <motion.div
          className="w-full bg-[#2C73D2] rounded-2xl shadow-lg py-8 sm:py-12 px-2 sm:px-4 md:px-10 mb-12 flex flex-col items-center"
          variants={itemVariants}
        >
          <motion.h2
            className="mb-4 text-xl font-extrabold text-center text-white sm:text-2xl md:text-4xl sm:mb-6"
            variants={itemVariants}
          >
            Join Our Mailing List
          </motion.h2>
          <motion.p
            className="mb-4 text-base text-center text-white sm:text-lg sm:mb-8"
            variants={itemVariants}
          >
            Subscribe to get the latest updates on dental care tips, clinic
            openings, and special offers.
          </motion.p>

          <motion.form
            onSubmit={handleSubscribe}
            className="flex flex-col items-center w-full max-w-2xl gap-3 md:flex-row sm:gap-4"
            variants={itemVariants}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 min-w-[220px] px-6 py-3 rounded-lg border-2 border-white text-white text-base focus:outline-none focus:border-[#F4A300] bg-[#2C73D2] placeholder-gray-200"
              required
              disabled={loading}
            />
            <button
              type="submit"
              className="flex-1 min-w-[120px] px-6 py-3 rounded-lg bg-gradient-to-r from-[#F4A300] to-[#2C73D2] text-white font-semibold text-lg shadow drop-shadow-md hover:from-[#2C73D2] hover:to-[#F4A300] transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </motion.form>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Newsletter;
