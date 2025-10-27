"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import axios from "axios";

interface Specialist {
  name: string;
  img: string;
  desc: string;
  points: string[];
}

interface Dentist {
  _id: string;
  user: { name: string };
  image: string;
  specialization: string[];
  problems: string[];
  clinicName?: string;
  clinicAddress?: string;
  states?: string[];
  experienceYears?: number;
}

const specialists: Specialist[] = [
  {
    name: "General Dentist",
    img: "/General Dentist.png",
    desc: "Comprehensive oral care, restorative procedures, and patient education.",
    points: [
      "Tooth cavities",
      "White spots on teeth",
      "Tooth wear",
      "Dental jewellery",
      "Regular dental check-ups",
      "Clean teeth & removes plaque",
      "Fills cavities",
    ],
  },
  {
    name: "Periodontist",
    img: "/Periodontist.png",
    desc: "Treats gum disease, improving gum & bone health with implants & surgery.",
    points: [
      "Gum surgery",
      "Teeth cleaning & polishing",
      "Teeth whitening",
      "Severe gum infection",
      "Mouth care after cancer",
      "Gum treatment",
      "Bad breath",
      "Gum pocket",
      "Receding gums",
    ],
  },
  {
    name: "Prosthodontist",
    img: "/Prosthodontist.png",
    desc: "Fixes broken/missing teeth with natural-looking caps and dentures.",
    points: [
      "Wearing down of teeth",
      "Teeth protector for night",
      "Dental implants",
      "Tooth replacement",
      "Thin shells for teeth",
      "Tooth crown",
      "Smile makeover",
      "Partial tooth cap",
      "Tooth bridge",
    ],
  },
  {
    name: "Orthodontist",
    img: "/Orthodontist.png",
    desc: "Straightens crooked teeth with braces & aligners to correct bites.",
    points: [
      "Invisible braces",
      "Dental braces",
      "Crooked tooth",
      "Braces adjustment",
      "Tooth gap closure",
      "Tooth alignment",
      "Tooth spacing",
      "Tooth crowding",
      "Tooth protrusion",
    ],
  },
  {
    name: "Endodontist",
    img: "/Endodontist.png",
    desc: "Specializes in saving teeth through root canal treatments.",
    points: [
      "Root canal treatment",
      "Tooth pain relief",
      "Pulp therapy",
      "Retreatment of failed root canals",
      "Complex dental pain management",
      "Tooth rescue treatment",
      "Re-root canal treatment",
    ],
  },
  {
    name: "Cosmetic Dentist",
    img: "/Cosmetic Dentist.png",
    desc: "Enhances smiles by fixing chips, cracks, and other imperfections.",
    points: [
      "Tooth crown",
      "Smile makeover",
      "Partial tooth cap",
      "Missing front tooth",
      "Front tooth gap",
      "Dental jewellery",
      "Tooth wear",
      "Teeth whitening",
      "Gummy smile",
    ],
  },
  {
    name: "Pediatric Dentist",
    img: "/Children’s Dentistry.png",
    desc: "Cares for children’s teeth from infancy through adolescence.",
    points: [
      "Teeth present at birth",
      "Tight tongue skin",
      "Thumb sucking",
      "Tooth cavities",
      "Tooth filling",
      "Children's dentistry",
      "Bad breath",
      "Tooth sensitivity",
      "Mouth breathing in kids",
    ],
  },
  {
    name: "Oral Surgeon",
    img: "/oral surgeon.png",
    desc: "Performs wisdom tooth removal, jaw surgery, and dental implants.",
    points: [
      "Adding bone to the socket",
      "Dental implants",
      "Fractured tooth",
      "Facial twitch",
      "Facial muscle twitching",
      "Hole in the roof of the mouth",
    ],
  },
];

const BookAnAppointment: React.FC = () => {
  const [specialistIndex, setSpecialistIndex] = useState(0);
  const [selectedSpecialist, setSelectedSpecialist] =
    useState<Specialist | null>(null);
  const [specialistsPerSlide, setSpecialistsPerSlide] = useState(3);
  const [filteredDentists, setFilteredDentists] = useState<Dentist[]>([]);
  const [loadingDentists, setLoadingDentists] = useState(false);
  const [showDentistModal, setShowDentistModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSpecialistsPerSlide(1);
      } else if (window.innerWidth < 768) {
        setSpecialistsPerSlide(2);
      } else if (window.innerWidth < 1024) {
        setSpecialistsPerSlide(3);
      } else {
        setSpecialistsPerSlide(4);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const specialistMaxIndex =
    Math.ceil(specialists.length / specialistsPerSlide) - 1;

  const handleNext = () => {
    setSpecialistIndex((prev) => Math.min(prev + 1, specialistMaxIndex));
  };

  const handlePrev = () => {
    setSpecialistIndex((prev) => Math.max(prev - 1, 0));
  };

  const fetchDentistsBySpecialty = async (specialtyName: string) => {
    setLoadingDentists(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        console.error("NEXT_PUBLIC_API_URL is not set.");
        return;
      }

      // Try to fetch dentists by specialization
      const { data } = await axios.get(`${apiUrl}/api/v1/dentists`, {
        params: { specialization: specialtyName },
      });

      setFilteredDentists(data || []);
      setShowDentistModal(true);
    } catch (error) {
      console.error("Error fetching dentists by specialty:", error);
      setFilteredDentists([]);
      setShowDentistModal(true);
    } finally {
      setLoadingDentists(false);
    }
  };

  const handleBookNow = (specialist: Specialist) => {
    setSelectedSpecialist(specialist);
    fetchDentistsBySpecialty(specialist.name);
  };

  return (
    <section className="w-full max-w-full px-4 py-16 mx-auto sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Find the Right Dental Specialist
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Book an in-clinic consultation with an experienced dentist.
        </p>
      </div>

      <div className="relative mt-12">
        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${specialistIndex * 100}%)`,
            }}
          >
            {Array.from({ length: specialistMaxIndex + 1 }).map(
              (_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="flex-shrink-0 w-full"
                  style={{ flexBasis: "100%" }}
                >
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {specialists
                      .slice(
                        slideIndex * specialistsPerSlide,
                        (slideIndex + 1) * specialistsPerSlide
                      )
                      .map((spec, idx) => (
                        <div key={idx} className="w-full">
                          <div className="flex flex-col items-center h-full p-6 text-center transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105">
                            <div className="flex-shrink-0">
                              <Image
                                src={spec.img}
                                alt={spec.name}
                                width={80}
                                height={80}
                                className="object-cover w-20 h-20 mx-auto rounded-full"
                              />
                            </div>
                            <div className="mt-4">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {spec.name}
                              </h3>
                              <p className="mt-2 text-sm text-gray-600">
                                {spec.desc}
                              </p>
                            </div>
                            <button
                              onClick={() => setSelectedSpecialist(spec)}
                              className="w-full px-4 py-2 mt-4 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => handleBookNow(spec)}
                              className="w-full px-4 py-2 mt-2 text-sm font-semibold text-white bg-gradient-to-r from-[#2C73D2] to-[#0052D4] rounded-lg shadow-md hover:from-[#0052D4] hover:to-[#2C73D2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-0 z-10 p-3 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg top-1/2 disabled:opacity-50"
          disabled={specialistIndex === 0}
          aria-label="Previous"
        >
          <FaChevronLeft className="w-6 h-6 text-gray-800" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 z-10 p-3 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg top-1/2 disabled:opacity-50"
          disabled={specialistIndex >= specialistMaxIndex}
          aria-label="Next"
        >
          <FaChevronRight className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      {selectedSpecialist && !showDentistModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-11/12 max-w-lg p-8 bg-white rounded-lg shadow-xl">
            <button
              onClick={() => setSelectedSpecialist(null)}
              className="absolute text-gray-500 top-4 right-4 hover:text-gray-800"
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900">
                {selectedSpecialist.name}
              </h3>
            </div>
            <ul className="mt-6 space-y-2 text-gray-700 list-disc list-inside">
              {selectedSpecialist.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <button
              onClick={() => handleBookNow(selectedSpecialist)}
              className="w-full px-6 py-3 mt-8 text-lg font-semibold text-white bg-gradient-to-r from-[#2C73D2] to-[#0052D4] rounded-lg shadow-md hover:from-[#0052D4] hover:to-[#2C73D2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
            >
              Book Now
            </button>
          </div>
        </div>
      )}

      {/* Dentist Modal */}
      {showDentistModal && selectedSpecialist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-6xl max-h-[90vh] mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-[#2C73D2] to-[#0052D4] text-white">
              <h3 className="text-2xl font-bold">
                Dentists for "{selectedSpecialist.name}"
              </h3>
              <button
                onClick={() => {
                  setShowDentistModal(false);
                  setSelectedSpecialist(null);
                  setFilteredDentists([]);
                }}
                className="p-2 text-white transition-colors duration-200 hover:bg-white hover:bg-opacity-20 rounded-full"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {loadingDentists ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-lg font-semibold text-gray-700">
                    Loading dentists...
                  </div>
                </div>
              ) : filteredDentists.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredDentists.map((dentist) => (
                    <div
                      key={dentist._id}
                      className="flex flex-col items-center px-6 py-5 font-semibold text-center transition-all duration-300 bg-white border border-gray-200 shadow-lg rounded-xl hover:shadow-2xl hover:scale-105"
                    >
                      <Image
                        src={dentist.image}
                        alt={dentist.user?.name || "Dentist"}
                        width={90}
                        height={90}
                        className="object-cover mb-4 border-4 border-blue-200 rounded-full shadow-md"
                      />
                      <div className="mb-2 text-xl font-bold text-gray-800">
                        {dentist.user?.name}
                      </div>
                      <div className="mb-3 text-sm text-center text-gray-600">
                        {dentist.specialization?.join(", ")}
                      </div>
                      <div className="px-2 py-1 mb-3 text-xs text-center text-gray-500 bg-gray-100 rounded-full">
                        {dentist.clinicName || "Online Consultation"}
                      </div>
                      {dentist.experienceYears && (
                        <div className="mb-3 text-xs text-gray-500">
                          {dentist.experienceYears} years experience
                        </div>
                      )}
                      <Link
                        href={`/consult/${dentist._id}`}
                        className="w-full px-4 py-2 mt-4 text-sm font-bold text-white transition-all duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
                      >
                        Consult Now
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full py-12 text-lg text-center text-gray-600">
                  No dentists found for "{selectedSpecialist.name}".
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BookAnAppointment;
