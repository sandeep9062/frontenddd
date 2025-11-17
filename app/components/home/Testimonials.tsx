"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { UserCheck2 } from "lucide-react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

// Use your local testimonials array
const testimonials = [
  {
    text: "I found the best dentist in my city through this platform.\nThe reviews were very helpful and the comparison feature made it easy to shortlist the right clinic for me. The entire booking process felt smooth and trustworthy!",
    name: "Priya Sharma",
    type: "National",
    img: "/Priya Sharma.png",
    rating: 5,
  },
  {
    text: "Very easy to use and the clinic staff were extremely professional.\nI liked how I could check availability instantly and confirm my appointment in seconds. Will definitely use this service again for future dental needs!",
    name: "Amit Patel",
    type: "National",
    img: "/Amit Patel.png",
    rating: 4.5,
  },
  {
    text: "Excellent service and support throughout.\nAs an international patient, I felt confident booking my appointment from abroad. The platform provided clear details about procedures, costs, and clinic ratings, which helped a lot.",
    name: "Maria Garcia",
    type: "International",
    img: "/Maria Garcia.png",
    rating: 5,
  },
  {
    text: "I was able to compare multiple clinics and book an appointment in minutes.\nThe process was smooth, transparent, and the clinic followed up quickly with all the details. Highly recommended for anyone seeking reliable dental care abroad.",
    name: "Sophie Dubois",
    type: "International",
    img: "/Sophie Dubois.png",
    rating: 4.5,
  },
  {
    text: "Great platform for finding trusted dentists.\nThe user interface is clean and friendly, and I appreciated the verified reviews which helped me choose a clinic confidently. My experience at the clinic was just as good as promised.",
    name: "Rahul Verma",
    type: "National",
    img: "/Rahul Verma.png",
    rating: 4,
  },
  {
    text: "I appreciate the detailed reviews and the easy booking system.\nIt made my dental trip to India stress-free! The platform also provided helpful information about procedures and estimated costs so there were no surprises.",
    name: "Elena Rossi",
    type: "International",
    img: "/Elena Rossi.png",
    rating: 5,
  },
  {
    text: "Booking a dental appointment for my parents was never this easy.\nThe reminders, clear instructions, and quick confirmation made the entire experience comfortable for them. Thank you for such a helpful service!",
    name: "Neha Gupta",
    type: "National",
    img: "/Neha Gupta.png",
    rating: 4,
  },
];


// Helper function to render star ratings
const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FaStar key={`full-${i}`} className="w-5 h-5 text-yellow-400" />
    );
  }
  if (hasHalfStar) {
    stars.push(
      <FaStarHalfAlt key="half" className="w-5 h-5 text-yellow-400" />
    );
  }
  for (let i = 0; i < 5 - fullStars - (hasHalfStar ? 1 : 0); i++) {
    stars.push(
      <FaRegStar key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
    );
  }

  return <div className="flex gap-1">{stars}</div>;
};

const Testimonials = () => {
  const { t } = useTranslation();

  return (
    <section className="py-8 bg-white dark:bg-darkbg1">
      <div className="max-w-6xl px-4 mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold md:text-4xl text-[#2C73D2]  dark:text-white"
        >
          {t("testimonials.title")}
        </motion.h2>

        {testimonials.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="mt-12"
          >
            {testimonials.map((t, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-[#1a1a1a] p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg max-w-xl mx-auto"
                >
                  {/* User Info */}
                  <div className="flex items-center gap-4 mb-4">
                    {t.img ? (
                      <Image
                        src={t.img}
                        alt={t.name}
                        width={48}
                        height={48}
                        className="object-cover w-12 h-12 rounded-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center object-cover w-12 h-12 text-sm text-gray-500 bg-gray-200 rounded-full">
                        {t.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="text-left">
                      <div className="flex items-center gap-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {t.name}
                        </h4>
                        <UserCheck2 className="w-4 h-4 text-[#D4AF37]" />
                      </div>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex justify-start mb-4">
                    {renderStars(t.rating)}
                  </div>

                  {/* Testimonial Message */}
                  <p className="text-sm leading-relaxed text-left text-gray-700 dark:text-gray-300">
                    {t.text}
                  </p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="mt-12 text-center text-gray-500 dark:text-gray-400">
            No testimonials to display yet.
          </div>
        )}

        {/* Client Logos */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">Trusted by leading companies</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-80">
            <Image width={40} height={40} src="/logos/vercel.svg" alt="Client 1" />
            <Image width={40} height={40} src="/logos/globe.svg" alt="Client 2" />
            <Image width={40} height={40} src="/logos/vercel.svg" alt="Client 3" />
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default Testimonials;
