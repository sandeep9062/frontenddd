"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface Clinic {
  _id?: string;
  id?: string;
  Name?: string;
  name?: string;
  Image?: string;
  image?: string;
  City?: string;
  city?: string;
  State?: string;
  state?: string;
  Address?: string;
  address?: string;
  Rating?: number | string;
  rating?: number | string;
  Fee?: number | string;
  Description?: string;
  doctorProfile?: string;
  DoctorImage?: string;
  Services?: string;
  Specialty?: string;
}

// Default time slots
const defaultSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
  "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM"
];

// Generate next 5 years of days
interface Day {
  label: string;
  value: string;
  slots: number;
  dateObj: Date;
}

function getDaysForFiveYears(): Day[] {
  const days: Day[] = [];
  const today = new Date();
  for (let i = 0; i < 5 * 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      label: d.toLocaleDateString("en-US", { weekday: "short", day: "2-digit", month: "short", year: "numeric" }),
      value: d.toISOString().slice(0, 10), // YYYY-MM-DD
      slots: defaultSlots.length,
      dateObj: d
    });
  }
  return days;
}

const allDays = getDaysForFiveYears();

interface BookAppointmentProps {
  clinic?: Clinic;
}

const BookAppointment: React.FC<BookAppointmentProps> = ({ clinic: clinicProp }) => {
  const router = useRouter();
  const [clinic] = useState<Clinic>(clinicProp || ({} as Clinic));

  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(allDays[0].value);
  const [patientName, setPatientName] = useState<string>("");
  const [patientPhone, setPatientPhone] = useState<string>("");

  const handleBooking = async () => {
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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/appointments`,
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

      if (response.data.success) {
        toast.success("Appointment booked successfully!");
        router.push(`/appointment-details?appointmentId=${response.data.appointment._id}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      console.error("Error booking appointment:", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA] w-full flex flex-col items-center py-8 px-2">
      <div className="flex flex-col w-full max-w-5xl gap-8 md:flex-row">
        {/* Left: Clinic Info */}
        <div className="flex flex-col items-center flex-1 p-8 bg-white shadow-xl rounded-2xl">
          {clinic.Image && (
            <Image
              src={clinic.Image || clinic.image || "/default-clinic.png"}
              alt={clinic.Name || clinic.name || "Clinic"}
              width={128}
              height={128}
              className="object-cover rounded-full border-4 border-[#2C73D2] shadow-lg mb-4"
            />
          )}
          <div className="font-bold text-2xl mb-1 text-[#2056AE]">{clinic.Name || clinic.name}</div>
          <div className="mb-1 text-base text-gray-600">{clinic.City || clinic.city}, {clinic.State || clinic.state}</div>
          <div className="text-[#2056AE] font-bold mb-2">{clinic.Address || clinic.address}</div>
          <div className="flex gap-2 mb-2">
            <span className="text-[#F4A300] font-bold text-lg">{clinic.Rating || "4.5"}</span>
            <span className="flex items-center gap-1 text-sm text-gray-500">as per Google reviews</span>
          </div>
        </div>

        {/* Right: Appointment Booking */}
        <div className="bg-white rounded-2xl shadow-xl p-8 flex-1 min-w-[340px]">
          <div className="font-bold text-xl mb-2 text-[#2056AE]">Pick a time slot</div>

          {/* Day Selector */}
          <div className="flex items-center gap-2 mb-4">
            <button
              className="px-2 text-xl text-gray-400"
              onClick={() => {
                const idx = allDays.findIndex(d => d.value === selectedDate);
                if (idx > 0) setSelectedDate(allDays[idx - 1].value);
              }}
              disabled={selectedDate === allDays[0].value}
            >
              &#8592;
            </button>
            {allDays.slice(
              Math.max(0, allDays.findIndex(d => d.value === selectedDate)),
              Math.max(3, allDays.findIndex(d => d.value === selectedDate) + 3)
            ).map(d => (
              <div
                key={d.value}
                className="flex flex-col items-center px-2 cursor-pointer"
                onClick={() => { setSelectedDate(d.value); setSelectedSlot(""); }}
              >
                <span className={`font-semibold text-base ${selectedDate === d.value ? 'text-[#2056AE]' : 'text-gray-700'}`}>{d.label}</span>
                <span className="text-[#1BC47D] text-sm">{d.slots} Slots Available</span>
              </div>
            ))}
            <button
              className="px-2 text-xl text-gray-400"
              onClick={() => {
                const idx = allDays.findIndex(d => d.value === selectedDate);
                if (idx < allDays.length - 1) setSelectedDate(allDays[idx + 1].value);
              }}
              disabled={selectedDate === allDays[allDays.length - 1].value}
            >
              &#8594;
            </button>
          </div>

          {/* Time Slots */}
          {["Morning", "Afternoon", "Evening"].map((period, idx) => {
            const start = idx === 0 ? 0 : idx === 1 ? 6 : 14;
            const end = idx === 0 ? 6 : idx === 1 ? 14 : defaultSlots.length;
            return (
              <div key={period} className="mb-4">
                <div className="mb-2 font-semibold text-[#2056AE]">{period}</div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {defaultSlots.slice(start, end).map(slot => (
                    <button
                      key={slot}
                      className={`border-2 rounded-lg px-2 py-1 font-semibold transition text-xs w-full ${selectedSlot === slot ? 'border-[#1890FF] bg-[#E6F7FF] text-[#1890FF]' : 'border-[#2C73D2] text-[#2056AE] hover:bg-[#F4F8FF]'}`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Patient Info */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Patient Name"
              value={patientName}
              onChange={e => setPatientName(e.target.value)}
              className="w-full px-3 py-2 mb-2 text-sm border-2 rounded-lg sm:text-base"
            />
            <input
              type="text"
              placeholder="Patient Phone"
              value={patientPhone}
              onChange={e => setPatientPhone(e.target.value)}
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
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
