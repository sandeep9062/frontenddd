"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import ClinicInfo from "./ClinicInfo";
import SlotPicker from "./SlotPicker";
import StoryModal from "./StoryModal";
import { allDays } from "./utils";
import type { Clinic, Story } from "./types";

const BookAppointment: React.FC<{ initialClinic?: Clinic }> = ({
  initialClinic,
}) => {
  const router = useRouter();
  const params = useSearchParams();
  // If you pass clinic via search params as JSON (not recommended), parse it; else use initialClinic or a placeholder
  const clinicFromParams = null;

  const clinic: Clinic = initialClinic ||
    clinicFromParams || {
      Name: "All Care Dental Centre",
      City: "Bangalore",
      State: "Karnataka",
      Address: "MG Road, Basavanagudi",
      Rating: 4.5,
      Fee: 300,
      Description: "Experienced dental clinic.",
    };

  const [activeTab, setActiveTab] = React.useState<string>("info");
  const [showStoryModal, setShowStoryModal] = React.useState(false);
  const [stories, setStories] = React.useState<Story[]>([]);

  const [selectedSlot, setSelectedSlot] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(allDays[0].value);
  const [patientName, setPatientName] = React.useState("");
  const [patientPhone, setPatientPhone] = React.useState("");

  async function handleBooking() {
    if (!selectedSlot) {
      toast.error("Please select a time slot.");
      return;
    }
    if (!patientName || !patientPhone) {
      toast.error("Please enter your name and phone number.");
      return;
    }
    if (!/^\d{10}$/.test(patientPhone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      const resp = await axios.post(
        `${
          process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_VERCEL_URL
        }/api/v1/appointments`,
        {
          clinicId: clinic._id || clinic.id,
          clinicName: clinic.Name || clinic.name,
          patientName,
          patientPhone,
          appointmentDate: selectedDate,
          appointmentSlot: selectedSlot,
          clinicAddress: clinic.Address || clinic.address,
          clinicCity: clinic.City || clinic.city,
        }
      );

      if (resp.data?.success) {
        toast.success("Appointment booked successfully!");
        // navigate to appointment details - using router.push and pass state via query if needed
        router.push("/appointment-details");
      } else {
        toast.error(resp.data?.message || "Failed to book appointment");
      }
    } catch (err) {
      console.error("Error booking appointment", err);
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Something went wrong.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  }

  function handleStorySubmit(story: Story) {
    setStories((prev) => [story, ...prev]);
    setShowStoryModal(false);
    toast.success(
      "Thanks for sharing your story. It will be reviewed before publishing."
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6FA] w-full flex flex-col items-center py-8 px-2">
      <div className="flex flex-col w-full max-w-5xl gap-8 md:flex-row">
        <ClinicInfo clinic={clinic} />
        <div className="bg-white rounded-2xl shadow-xl p-8 flex-1 min-w-[340px]">
          <div className="font-bold text-xl mb-2 text-[#2056AE]">
            Pick a time slot
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="bg-[#F4F8FF] px-3 py-1 rounded text-[#2056AE] font-semibold">
              Clinic Appointment
            </span>
            <span className="text-[#2056AE] font-bold">
              ₹ {clinic.Fee || clinic.fee} fee{" "}
              <span className="text-sm font-normal text-gray-500">
                (approx)
              </span>
            </span>
          </div>
          <div className="mb-2 font-medium text-gray-700">
            {clinic.Name || clinic.name} - since 1969
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#F4A300] font-bold">
              {clinic.Rating || "4.5"}
            </span>
            <span className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(Number(clinic.Rating || 4.5))
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" />
                </svg>
              ))}
            </span>
            <span className="text-sm text-gray-500">Verified details</span>
          </div>

          <SlotPicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
          />

          <div className="mt-4">
            <input
              type="text"
              placeholder="Patient Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full px-3 py-2 mb-2 text-sm border-2 rounded-lg sm:text-base"
            />
            <input
              type="text"
              placeholder="Patient Phone"
              value={patientPhone}
              onChange={(e) => setPatientPhone(e.target.value)}
              className="w-full px-3 py-2 mb-2 text-sm border-2 rounded-lg sm:text-base"
            />
          </div>
          <button
            className="bg-[#2056AE] text-white px-6 py-3 rounded-xl shadow font-bold w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedSlot || !patientName || !patientPhone}
            onClick={handleBooking}
          >
            Book Appointment
          </button>
          <div className="flex justify-end w-full mt-2">
            <button
              className="text-[#2056AE] underline font-semibold hover:text-[#1890FF] mt-2"
              onClick={() => router.push("/contact-form")}
            >
              Contact Form
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl p-6 mt-8 bg-white shadow rounded-2xl">
        <div className="flex justify-end mb-2">
          <button
            className="text-[#2056AE] underline font-semibold hover:text-[#1890FF]"
            onClick={() => setShowStoryModal(true)}
          >
            Share your story
          </button>
        </div>

        <div className="flex gap-8 pb-2 mb-4 border-b">
          <button
            className={`text-[#2056AE] font-semibold hover:underline border-b-2 pb-1 ${
              activeTab === "profile"
                ? "border-[#1890FF] text-[#1890FF]"
                : "border-transparent"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Dentist Profile
          </button>
          <button
            className={`text-[#2056AE] font-semibold hover:underline border-b-2 pb-1 ${
              activeTab === "services"
                ? "border-[#1890FF] text-[#1890FF]"
                : "border-transparent"
            }`}
            onClick={() => setActiveTab("services")}
          >
            Services
          </button>
          <button
            className={`text-[#2056AE] font-semibold hover:underline border-b-2 pb-1 ${
              activeTab === "consult"
                ? "border-[#1890FF] text-[#1890FF]"
                : "border-transparent"
            }`}
            onClick={() => setActiveTab("consult")}
          >
            Consult Q&A
          </button>
          <button
            className={`text-[#2056AE] font-semibold hover:underline border-b-2 pb-1 ${
              activeTab === "healthfeed"
                ? "border-[#1890FF] text-[#1890FF]"
                : "border-transparent"
            }`}
            onClick={() => setActiveTab("healthfeed")}
          >
            Healthfeed
          </button>
        </div>

        {activeTab === "profile" && (
          <div className="bg-[#f7f7f7] rounded-xl p-6 shadow-md mt-4">
            <h3 className="text-xl font-bold text-[#2056AE] mb-4">
              Dentist Profile
            </h3>
            <div className="flex items-center gap-6">
              <img
                src={clinic.DoctorImage || "/doctor1.png"}
                alt="Dentist"
                className="h-20 w-20 object-cover rounded-full border-2 border-[#2C73D2] shadow"
              />
              <div>
                <span className="font-bold text-[#2056AE] text-lg">
                  Dentist
                </span>
                <div className="mt-1 text-base font-semibold text-gray-700">
                  {clinic.doctorProfile ||
                    clinic.Description ||
                    "Dr. Venkatesh.MJ is a Dentist in Basavanagudi, Bangalore."}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "services" && (
          <div className="bg-[#f7f7f7] rounded-xl p-6 shadow-md mt-4">
            <h3 className="text-xl font-bold text-[#2056AE] mb-4">Services</h3>
            <span className="font-bold text-[#2056AE] text-base">
              Services:
            </span>
            <span className="ml-2 text-base text-gray-700">
              {clinic.Services ||
                clinic.services ||
                clinic.Specialty ||
                "General Dentistry, Cosmetic Dentistry, Implants, Braces, Root Canal, Cleaning"}
            </span>
          </div>
        )}

        {activeTab === "consult" && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-4">{/* icon */}</div>
            <div className="mb-4 text-center text-gray-700">
              No query answered by this doctor. Get answers to your health
              queries now
            </div>
            <button
              className="bg-[#1BC47D] text-white px-6 py-2 rounded font-bold text-base shadow hover:bg-[#159C5B] transition"
              onClick={() => router.push("/consult")}
            >
              Ask Free Question
            </button>
          </div>
        )}

        {activeTab === "healthfeed" && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-4">{/* icon */}</div>
            <div className="mb-4 text-center text-gray-700">
              No articles written by this doctor.
            </div>
            <button
              className="bg-[#1BC47D] text-white px-6 py-2 rounded font-bold text-base shadow hover:bg-[#159C5B] transition"
              onClick={() => router.push("/articles")}
            >
              Read all articles
            </button>
          </div>
        )}

        <StoryModal
          clinicName={clinic.Name || clinic.name}
          open={showStoryModal}
          onClose={() => setShowStoryModal(false)}
          onSubmit={handleStorySubmit}
        />

        {stories.length > 0 && (
          <div className="mt-8">
            <div className="font-bold text-lg mb-4 text-[#2056AE]">
              Patient Stories
            </div>
            <div className="flex flex-col gap-4">
              {stories.map((s, idx) => (
                <div key={idx} className="bg-[#F4F6FA] rounded-xl p-4 shadow">
                  <div className="font-semibold text-[#2056AE] mb-1">
                    {s.anonymous ? "Anonymous" : s.name}
                  </div>
                  <div className="mb-1 text-gray-700">{s.experience}</div>
                  <div className="text-xs text-gray-500">
                    {s.problem} | {s.waitTime} | {s.improvements.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
