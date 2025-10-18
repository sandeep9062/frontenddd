"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { UserCheck2 } from "lucide-react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// Use your local testimonials array
const testimonials = [
  {
    text: "I found the best dentist in my city through this platform. The reviews were very helpful!",
    name: "Priya Sharma",
    type: "National",
    img: "/Priya Sharma.png",
    rating: 5,
  },
  {
    text: "Very easy to use and the clinic staff were very professional. Will use again!",
    name: "Amit Patel",
    type: "National",
    img: "/Amit Patel.png",
    rating: 4.5,
  },
  {
    text: "Excellent service and support. I felt confident booking my appointment from abroad.",
    name: "Maria Garcia",
    type: "International",
    img: "/Maria Garcia.png",
    rating: 5,
  },
  {
    text: "I was able to compare clinics and book an appointment in minutes. The process was smooth and transparent.",
    name: "Sophie Dubois",
    type: "International",
    img: "/Sophie Dubois.png",
    rating: 4.5,
  },
  {
    text: "Great platform for finding trusted dentists. The user interface is very friendly.",
    name: "Rahul Verma",
    type: "National",
    img: "/Rahul Verma.png",
    rating: 4,
  },
  {
    text: "I appreciate the detailed reviews and easy booking system. Made my dental trip to India stress-free!",
    name: "Elena Rossi",
    type: "International",
    img: "/Elena Rossi.png",
    rating: 5,
  },
  {
    text: "Booking a dental appointment for my parents was never this easy. Thank you!",
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
    stars.push(<FaStar key={`full-${i}`} className="w-5 h-5 text-yellow-400" />);
  }
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="w-5 h-5 text-yellow-400" />);
  }
  for (let i = 0; i < 5 - fullStars - (hasHalfStar ? 1 : 0); i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
  }

  return <div className="flex gap-1">{stars}</div>;
};

const Testimonials = () => {
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
          What Clients Say
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
                        <h4 className="font-semibold text-gray-900 dark:text-white">{t.name}</h4>
                        <UserCheck2 className="w-4 h-4 text-[#D4AF37]" />
                      </div>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex justify-start mb-4">{renderStars(t.rating)}</div>

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
