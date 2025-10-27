"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

import ClinicInfo from "./ClinicInfo";
import SlotPicker from "./SlotPicker";
import StoryModal from "./StoryModal";
import { allDays } from "./utils";
import type { Clinic, Story } from "./types";

const BookAppointment: React.FC<{ initialClinic?: Clinic }> = ({
  initialClinic,
}) => {
  const router = useRouter();

  const clinic: Clinic = initialClinic || {
    Name: "All Care Dental Centre",
    City: "Bangalore",
    State: "Karnataka",
    Address: "MG Road, Basavanagudi",
    Rating: 4.5,
    Fee: 300,
    Description: "Experienced dental clinic.",
  };

  const [activeTab, setActiveTab] = useState("info");
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState(allDays[0].value);
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleBooking() {
    if (!selectedSlot) return toast.error("Please select a time slot.");
    if (!patientName || !patientPhone)
      return toast.error("Please enter your name and phone number.");
    if (!/^\d{10}$/.test(patientPhone))
      return toast.error("Please enter a valid 10-digit phone number.");

    try {
      setLoading(true);
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/api/v1/appointments`,
        {
          clinicId: clinic._id || clinic.id,
          clinicName: clinic.Name,
          patientName,
          patientPhone,
          appointmentDate: selectedDate,
          appointmentSlot: selectedSlot,
          clinicAddress: clinic.Address,
          clinicCity: clinic.City,
        }
      );

      if (resp.data?.success) {
        toast.success("Appointment booked successfully!");
        router.push("/appointment-details");
      } else toast.error(resp.data?.message || "Failed to book appointment");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const handleStorySubmit = (story: Story) => {
    setStories((prev) => [story, ...prev]);
    setShowStoryModal(false);
    toast.success("Thanks for sharing your story!");
  };

  return (
    <motion.div
      className="min-h-screen w-full bg-gradient-to-b from-[#E8F0FF] to-[#F7FAFF] flex flex-col items-center py-10 px-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col w-full max-w-6xl gap-8 lg:flex-row">
        <ClinicInfo clinic={clinic} />

        {/* Booking Card */}
        <motion.div
          className="flex-1 bg-white rounded-2xl shadow-2xl p-8 border border-[#E0E7FF] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-extrabold text-2xl text-[#2056AE] mb-4">
            Book Your Appointment
          </h2>

          <div className="flex items-center justify-between mb-3">
            <span className="bg-[#F4F8FF] text-[#2056AE] font-semibold px-3 py-1 rounded-lg">
              Clinic Visit
            </span>
            <span className="text-[#2056AE] font-bold">
              ₹ {clinic.Fee}{" "}
              <span className="text-sm font-medium text-gray-500">
                (approx)
              </span>
            </span>
          </div>

          <SlotPicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
          />

          <div className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-[#2056AE] focus:ring-2 focus:ring-[#2056AE]/30 transition text-sm"
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={patientPhone}
              onChange={(e) => setPatientPhone(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-[#2056AE] focus:ring-2 focus:ring-[#2056AE]/30 transition text-sm"
            />
          </div>

          <button
            onClick={handleBooking}
            disabled={loading || !selectedSlot || !patientName || !patientPhone}
            className="mt-5 w-full bg-[#2056AE] text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-[#184a9b] disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Booking..." : "Book Appointment"}
          </button>

          <div className="flex justify-end">
            <button
              onClick={() => router.push("/contact-form")}
              className="mt-3 text-[#2056AE] underline hover:text-[#1890FF] font-semibold transition"
            >
              Contact Form
            </button>
          </div>
        </motion.div>
      </div>

      {/* Tabs Section */}
      <div className="mt-10 w-full max-w-6xl bg-white rounded-2xl shadow-lg p-8 border border-[#E0E7FF]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-6">
            {["profile", "services", "consult", "healthfeed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-1 border-b-2 font-semibold capitalize transition ${
                  activeTab === tab
                    ? "border-[#2056AE] text-[#2056AE]"
                    : "border-transparent text-gray-500 hover:text-[#2056AE]"
                }`}
              >
                {tab === "healthfeed" ? "Health Feed" : tab}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowStoryModal(true)}
            className="text-[#2056AE] underline font-semibold hover:text-[#1890FF]"
          >
            Share your story
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "profile" && (
            <div className="bg-[#F8FAFF] rounded-xl p-6 shadow">
              <h3 className="text-lg font-bold text-[#2056AE] mb-3">
                Dentist Profile
              </h3>
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                <Image
                  src={clinic.DoctorImage || "/doctor1.png"}
                  alt="Doctor"
                  width={90}
                  height={90}
                  className="rounded-full border-2 border-[#2056AE]"
                />
                <div>
                  <p className="text-base text-gray-700">
                    {clinic.Description ||
                      "Dr. Venkatesh M.J is a senior dentist in Bangalore with over 15 years of experience."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "services" && (
            <div className="bg-[#F8FAFF] rounded-xl p-6 shadow">
              <h3 className="text-lg font-bold text-[#2056AE] mb-3">
                Services
              </h3>
              <p className="text-gray-700">
                {clinic.Services ||
                  "General Dentistry, Cosmetic Dentistry, Implants, Braces, Root Canal, Cleaning"}
              </p>
            </div>
          )}

          {activeTab === "consult" && (
            <div className="py-10 text-center">
              <p className="mb-4 text-gray-600">
                No queries answered yet. Ask your health questions now.
              </p>
              <button
                onClick={() => router.push("/consult")}
                className="bg-[#1BC47D] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#15A969] transition"
              >
                Ask Free Question
              </button>
            </div>
          )}

          {activeTab === "healthfeed" && (
            <div className="py-10 text-center">
              <p className="mb-4 text-gray-600">
                No articles available from this doctor.
              </p>
              <button
                onClick={() => router.push("/articles")}
                className="bg-[#1BC47D] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#15A969] transition"
              >
                View Articles
              </button>
            </div>
          )}
        </div>

        {/* Stories Section */}
        {stories.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-bold text-[#2056AE] mb-4">
              Patient Stories
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {stories.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-[#F4F6FA] rounded-xl p-4 shadow hover:shadow-md transition"
                >
                  <div className="font-semibold text-[#2056AE] mb-1">
                    {s.anonymous ? "Anonymous" : s.name}
                  </div>
                  <p className="mb-1 text-gray-700">{s.experience}</p>
                  <p className="text-xs text-gray-500">
                    {s.problem} | {s.waitTime} |{" "}
                    {s.improvements.join(", ") || "Good experience"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <StoryModal
        clinicName={clinic.Name}
        open={showStoryModal}
        onClose={() => setShowStoryModal(false)}
        onSubmit={handleStorySubmit}
      />
    </motion.div>
  );
};

export default BookAppointment;
