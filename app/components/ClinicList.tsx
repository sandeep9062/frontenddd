"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import allStatesAndUTs from "../data/allStatesAndUTs";

import ClinicCard from "./home/ClinicCard";
import ClinicDropdown from "./ClinicDropdown";
import { useGetClinicsQuery } from "@/services/clinicApi";
import { Clinic } from "@/types/clinic";

interface ClinicListProps {
  type?: "clinic" | "cbct" | "bloodtest";
}
const problemOptions = [
  "Adding Bone to the Socket",
  "Bad Breath",
  "Burning Mouth",
  "Complete Denture",
  "Biting Down Hard",
  "Dental Implants",
  "Dental Braces",
  "Dry Mouth",
  "Dental Jewellery",
  "Fractured Tooth",
  "Facial Twitch",
  "Mouth Breathing in Kids",
  "Front Tooth Gap",
  "Gum Treatment",
  "Diabetic Mouth Changes",
  "Lump on the Facial Nerve",
  "Loud Sleeping",
  "Mouth Guard for Sports",
  "Missing Front Tooth",
  "Mouth Ulcer",
  "Mouth Red Patch",
  "Mouth Infection",
  "Mouth Cancer",
  "Mouth Care After Cancer",
  "One Sided Facial Weakness",
  "Partial Tooth Cap",
  "Producing Too Much Saliva",
  "Pain in the Jaw Joint",
  "Root Canal Treatment",
  "Ringing Sound in Ears",
  "Re-Root Canal Treatment",
  "Removable Teeth",
  "Split Lip",
  "Smoking Habit",
  "Stone in the Saliva Gland",
  "Smile Makeover",
  "Severe Gum Infection",
  "Tight Tongue Skin",
  "Teeth Present at Birth",
  "Tongue Pushing",
  "Trapped Back Tooth",
  "Tooth Crown",
  "Tooth Wear",
  "Tooth Rescue Treatment",
  "Tooth Removal",
  "Teeth Whitening",
  "Thin Shells for Teeth",
  "Teeth Cleaning & Polishing",
  "Tooth Replacement",
  "Tooth is Stuck",
  "Thumb Sucking",
  "Teeth Protector for Night",
  "Tooth Cavities",
  "White Spots on Teeth",
  "Invisible Braces",
  "Dry Peeling Lips",
  "Wearing Down of Teeth",
  "Gum Pocket",
  "Sensitive Teeth",
  "Tooth Filling",
  "Crooked Tooth",
  "Bleeding Gums",
  "Swollen Gums",
  "Loose Teeth",
  "Discoloured Teeth",
  "Swelling Inside Mouth",
  "Eruption Issues in Kids",
  "Grinding Teeth at Night",
  "Audible Breathing",
  "Uncomfortable Denture",
  "Facial Asymmetry",
  "Oral Cancer Screening",
  "Delayed Eruption of Teeth",
  "Hole in the Roof of the Mouth",
  "Nutrition Deficiency Symptoms",
  "Difficulty in Chewing & Kids Speaking",
  "Facial Muscle Twitching on One Side",
  "Braces Adjustment",
  "Toothache",
  "Dental Implant Pain",
  "Wisdom Tooth Swelling",
];
const ClinicList: React.FC<ClinicListProps> = ({ type = "clinic" }) => {
  const { data: clinics, isLoading } = useGetClinicsQuery();
  const [search, setSearch] = useState("");
  const [selectedProblem, setSelectedProblem] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [showProblemDropdown, setShowProblemDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);

  const filteredClinics = useMemo(() => {
    if (!clinics) return [];
    return clinics.filter((item: Clinic) => {
      const name = item.name || "";
      const location = item.location || "";

      const problems = item.problems || [];
      const itemState = item.state || "";

      const matchesSearch =
        search === "" ||
        name.toLowerCase().includes(search.toLowerCase()) ||
        location.toLowerCase().includes(search.toLowerCase());

      const matchesProblem =
        selectedProblem === "" ||
        problems.some((p) =>
          p.toLowerCase().includes(selectedProblem.toLowerCase())
        );

      const matchesState =
        selectedState === "" ||
        itemState.toLowerCase().includes(selectedState.toLowerCase());

      return matchesSearch && matchesProblem && matchesState;
    });
  }, [clinics, search, selectedProblem, selectedState]);

  if (isLoading) return;

  const uniqueProblems = problemOptions
    .map((p: string) => (p === "Facial Asymmetry" ? "Facial Asymmetry" : p))
    .sort((a: string, b: string) => a.localeCompare(b));

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="px-4 py-12 text-white bg-gradient-to-r from-blue-500 to-teal-400 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl">
            {type === "cbct"
              ? "Find Top CBCT/OPG Labs"
              : type === "bloodtest"
              ? "Locate Blood Test Labs"
              : "Discover Premier Dental Care"}
          </h1>
          <p className="text-lg text-blue-100 sm:text-xl">
            Your smile deserves the best. Find the perfect clinic for your
            needs.
          </p>
        </div>
      </div>

      <div className="max-w-6xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
        {/* Search & Filters */}
        <div className="p-6 mb-10 bg-white shadow-md rounded-xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <input
              type="text"
              placeholder="Search by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 transition-shadow border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="relative" style={{ zIndex: 20 }}>
              <ClinicDropdown
                options={uniqueProblems}
                selected={selectedProblem}
                placeholder="Filter by Problem"
                showDropdown={showProblemDropdown}
                setShowDropdown={setShowProblemDropdown}
                onSelect={(val) => setSelectedProblem(val)}
              />
            </div>
            <div className="relative" style={{ zIndex: 19 }}>
              <ClinicDropdown
                options={allStatesAndUTs}
                selected={selectedState}
                placeholder="Filter by State/UT"
                search={stateSearch}
                setSearch={setStateSearch}
                showDropdown={showStateDropdown}
                setShowDropdown={setShowStateDropdown}
                onSelect={(val) => setSelectedState(val)}
              />
            </div>
          </div>
        </div>

        {/* Clinics Grid */}
        <h2 className="mb-8 text-3xl font-bold text-gray-800">
          Available Clinics
        </h2>
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredClinics && filteredClinics.length === 0 ? (
            <li className="py-16 text-lg text-center text-gray-500 col-span-full">
              <p className="mb-2 text-xl font-semibold">No clinics found.</p>
              <p>Try adjusting your search filters or check back later.</p>
            </li>
          ) : (
            filteredClinics?.map((clinic: Clinic, idx: number) => (
              <ClinicCard key={clinic._id || idx} clinic={clinic} />
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default ClinicList;
