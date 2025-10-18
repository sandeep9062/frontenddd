"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

interface Specialist {
  name: string;
  img: string;
  desc: string;
  points: string[];
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
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  const [specialistsPerSlide, setSpecialistsPerSlide] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSpecialistsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setSpecialistsPerSlide(2);
      } else {
        setSpecialistsPerSlide(4);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const specialistMaxIndex = Math.ceil(specialists.length / specialistsPerSlide) - 1;

  const handleNext = () => {
    setSpecialistIndex((prev) => Math.min(prev + 1, specialistMaxIndex));
  };

  const handlePrev = () => {
    setSpecialistIndex((prev) => Math.max(prev - 1, 0));
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
              transform: `translateX(-${specialistIndex * 100 / specialistsPerSlide}%)`,
              width: `${(specialists.length / specialistsPerSlide) * 100}%`,
            }}
          >
            {specialists.map((spec, idx) => (
              <div key={idx} className="w-full px-4" style={{ flex: `0 0 ${100 / specialists.length}%` }}>
                <div className="flex flex-col items-center h-full p-6 text-center transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105">
                  <div className="flex-shrink-0">
                    <Image src={spec.img} alt={spec.name} width={80} height={80} className="object-cover w-20 h-20 mx-auto rounded-full" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-900">{spec.name}</h3>
                    <p className="mt-2 text-sm text-gray-600">{spec.desc}</p>
                  </div>
                  <button
                    onClick={() => setSelectedSpecialist(spec)}
                    className="w-full px-4 py-2 mt-6 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
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

      {selectedSpecialist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-11/12 max-w-lg p-8 bg-white rounded-lg shadow-xl">
            <button
              onClick={() => setSelectedSpecialist(null)}
              className="absolute text-gray-500 top-4 right-4 hover:text-gray-800"
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900">{selectedSpecialist.name}</h3>
            </div>
            <ul className="mt-6 space-y-2 text-gray-700 list-disc list-inside">
              {selectedSpecialist.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <button className="w-full px-6 py-3 mt-8 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Book Now
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default BookAnAppointment;
