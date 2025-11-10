"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Slider data for problems (62 real problems)
const sliderProblems = [
  { name: "Audible Breathing" },
  { name: "Bad Breath" },
  { name: "Biting Down Hard" },
  { name: "Bleeding Gums" },
  { name: "Bone up your smile" },//Adding Bone to the Socket
  { name: "Braces Adjustment" },
  { name: "Burning Mouth" },
  { name: "Children’s Dentistry" },
  { name: "Complete Denture" },
  { name: "Crooked Tooth" },
  { name: "Delayed Eruption of Teeth" },
  { name: "Dental Braces" },
  { name: "Dental Implant Pain" },
  { name: "Dental Implants" },
  { name: "Dental Jewellery" },
  { name: "Diabetic Mouth Changes" },
  { name: "Difficulty in Chewing & Kids Speaking" },
  { name: "Discoloured Teeth" },
  { name: "Dry Mouth" },
  { name: "Dry Peeling Lips" },
  { name: "Eruption Issues in Kids" },
  { name: "Facial Asymmetry" },
  { name: "Facial Muscle Twitching on One Side" },
  { name: "Facial Twitch" },
  { name: "Fractured Tooth" },
  { name: "Front Tooth Gap" },
  { name: "Grinding Teeth at Night" },
  { name: "Gum Pocket" },
  { name: "Gum Treatment" },
  { name: "Hole in the Roof of the Mouth" },
  { name: "Invisible Braces" },
  { name: "Loud Sleeping" },
  { name: "Loose Teeth" },
  { name: "Lump on the Facial Nerve" },
  { name: "Missing Front Tooth" },
  { name: "Mouth Breathing in Kids" },
  { name: "Mouth Cancer" },
  { name: "Mouth Care After Cancer" },
  { name: "Mouth Guard for Sports" },
  { name: "Mouth Infection" },
  { name: "Mouth Red Patch" },
  { name: "Mouth Ulcer" },
  { name: "Nutrition Deficiency Symptoms" },
  { name: "One Sided Facial Weakness" },
  { name: "Oral Cancer Screening" },
  { name: "Pain in the Jaw Joint" },
  { name: "Partial Tooth Cap" },
  { name: "Producing Too Much Saliva" },
  { name: "Re-Root Canal Treatment" },
  { name: "Removable Teeth" },
  { name: "Ringing Sound in Ears" },
  { name: "Root Canal Treatment" },
  { name: "Sensitive Teeth" },
  { name: "Severe Gum Infection" },
  { name: "Smile Makeover" },
  { name: "Smoking Habit" },
  { name: "Split Lip" },
  { name: "Stone in the Saliva Gland" },
  { name: "Swelling Inside Mouth" },
  { name: "Swollen Gums" },
  { name: "Teeth Cleaning & Polishing" },
  { name: "Teeth Present at Birth" },
  { name: "Teeth Protector for Night" },
  { name: "Teeth Whitening" },
  { name: "Thin Shells for Teeth" },
  { name: "Thumb Sucking" },
  { name: "Tight Tongue Skin" },
  { name: "Tongue Pushing" },
  { name: "Tooth Cavities" },
  { name: "Tooth Crown" },
  { name: "Tooth Filling" },
  { name: "Tooth is Stuck" },
  { name: "Tooth Removal" },
  { name: "Tooth Replacement" },
  { name: "Tooth Rescue Treatment" },
  { name: "Tooth Wear" },
  { name: "Trapped Back Tooth" },
  { name: "Uncomfortable Denture" },
  { name: "Wearing Down of Teeth" },
  { name: "White Spots on Teeth" },
  { name: "Wisdom Tooth Swelling" },
].map((problem) => {
  let points: string | string[] =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  switch (problem.name) {
    case "Bone up your smile":
      points = [
        "Tooth loss.",
        "Loose tooth.",
        "Failed previous implants.",
        "Shrinking gums.",
      ];
      break;
    case "Bad Breath":
      points = [
        "Unpleasant smell from mouth.",
        "Dry mouth.",
        "Sour taste.",
        "White or coated tongue.",
      ];
      break;
    case "Burning Mouth":
      points = [
        "Dry mouth.",
        "Burning feeling after food.",
        "Numbness in mouth.",
        "Altered taste.",
      ];
      break;
    case "Biting Down Hard":
      points = [
        "Jaw pain or tightness.",
        "Headaches.",
        "Tooth sensitivity.",
        "Ear pain.",
      ];
      break;
    case "Complete Denture":
      points = [
        "Total tooth loss.",
        "No tooth in mouth.",
        "Inability to support teeth.",
        "Less bone support.",
      ];
      break;
    case "Children’s Dentistry":
      points = [
        "Tooth cavities.",
        "Thumb sucking.",
        "Monitoring tooth eruption.",
        "Nursing bottle caries.",
      ];
      break;
    case "Dental Implants":
      points = [
        "Missing damaged teeth.",
        "Poorly fitting dentures.",
        "Desire for permanent teeth.",
        "Loss of tooth.",
      ];
      break;
    case "Dental Braces":
      points = [
        "Crooked teeth.",
        "Overbite or crossbite.",
        "Crowded teeth.",
        "Gaps or spacing.",
      ];
      break;
    case "Dry Mouth":
      points = [
        "Cracked lips.",
        "Increased thirst.",
        "Loss of taste sensation.",
        "Dry, rough tongue.",
      ];
      break;
    case "Dental Jewellery":
      points = [
        "Cosmetic improvement.",
        "Tooth surface preservation.",
        "Decorative accessory.",
        "Minimal tooth alteration.",
      ];
      break;
    case "Fractured Tooth":
      points = [
        "Visible crack or fracture.",
        "Pain or sensitivity in any tooth.",
        "Tooth mobility.",
        "Pain in tooth while chewing.",
      ];
      break;
    case "Facial Twitch":
      points = [
        "Gradual facial weakness.",
        "Hearing loss.",
        "Ringing in ear.",
        "Facial numbness or tingling.",
      ];
      break;
    case "Facial Muscle Twitching on One Side":
      points = [
        "Sudden, sharp pain.",
        "Electric shock like pain",
        "Pain triggered by touching.",
        "Affects cheeks, jaw & lips.",
      ];
      break;
    case "Front Tooth Gap":
      points = [
        "Asymmetry in smile.",
        "Cosmetic concerns.",
        "Teeth too small or large.",
        "Space between front teeth.",
      ];
      break;
    case "Gum Treatment":
      points = [
        "Bad deposits in mouth.",
        "Gum enlargement.",
        "Tooth root exposure.",
        "Many teeth mobile.",
      ];
      break;
    case "Hole in the Roof of the Mouth":
      points = [
        "Opening in the roof of mouth.",
        "Passage b/n oral & nasal.",
        "Nasal regurgitation of milk.",
        "Difficulty in swallowing.",
      ];
      break;
    case "Lump on the Facial Nerve":
      points = [
        "Involuntary twitching.",
        "Starts near eye. ",
        " Spread to cheek & mouth.",
        "Get worse with stress.",
      ];
      break;
    case "Loud Sleeping":
      points = [
        "Breathing noise during sleep.",
        "Snoring after alcohol.",
        "Interrupted sleep.",
        " Snoring noted by bed partner.",
      ];
      break;
    case "Mouth Guard for Sports":
      points = [
        "Protect your teeth.",
        "Shields your lips and gums.",
        "Prevents jaw injuries.",
        "Reduce mouth injuries.",
      ];
      break;
    case "Missing Front Tooth":
      points = [
        "Aesthetic concern.",
        "Speech problems.",
        "Tooth shifting.",
        "Bite imbalance.",
      ];
      break;
    case "Mouth Ulcer":
      points = [
        "Painful ulcers.",
        "Burning or tingling sensation.",
        "Frequent ulcers.",
        "Non healing ulcers.",
      ];
      break;
    case "Mouth Red Patch":
      points = [
        "Infection.",
        "Trauma or irritation.",
        "Allergic reactions.",
        "Red patches.",
      ];
      break;
    case "Mouth Infection":
      points = [
        "Swelling or redness.",
        "Pain or soreness.",
        "Unpleasant taste.",
        "Fever or general discomfort.",
      ];
      break;
    case "Mouth Cancer":
      points = [
        "Non healing ulcers.",
        "Red or white patches.",
        "Lumps.",
        "Difficulty in chewing.",
      ];
      break;
    case "Mouth Care After Cancer":
      points = [
        "Dry mouth.",
        "Mouth sores.",
        "Increased risk of infections.",
        "Changes in taste.",
      ];
      break;
    case "One Sided Facial Weakness":
      points = [
        "Loss of taste.",
        "One side of face looks uneven.",
        "Difficulty in closing of eye.",
        "Drooling from one side of face.",
      ];
      break;
    case "Partial Tooth Cap":
      points = [
        "Moderate to severe decay.",
        "Wish to save the natural tooth.",
        "High chewing pressure areas.",
        "Caries tooth.",
      ];
      break;
    case "Producing Too Much Saliva":
      points = [
        "Neurological disorders.",
        "Oral infections or irritations.",
        "Side effects of medications.",
        "Gastroesophageal conditions.",
      ];
      break;
    case "Pain in the Jaw Joint":
      points = [
        "Jaw pain.",
        "Clicking or popping sounds.",
        "Deviated jaw.",
        "Limited jaw movement.",
      ];
      break;
    case "Ringing Sound in Ears":
      points = [
        "Ringing.",
        "Roaring or buzzing.",
        "Whistling or clicking noises.",
        "Sounds in the ear.",
      ];
      break;
    case "Root Canal Treatment":
      points = [
        "Tooth decay.",
        "Fractured tooth.",
        "Cavity near to the pulp.",
        "Pain in tooth.",
      ];
      break;
    case "Re-Root Canal Treatment":
      points = [
        "Persistent toothache.",
        "Prolonged sensitivity.",
        "Swelling.",
        "Failed root canal treatment.",
      ];
      break;
    case "Removable Teeth":
      points = [
        "Partial missing tooth.",
        "Financial constraints.",
        "Restoring missing teeth.",
        "Unable to chew.",
      ];
      break;
    case "Split Lip":
      points = [
        "Gap in the upper lip.",
        "Asymmetrical nose.",
        "Wide nasal base.",
        "Difficulty in eating.",
      ];
      break;
    case "Smoking Habit":
      points = [
        "Tooth discoloration.",
        "Gingivitis & periodontitis.",
        "Delayed wound healing.",
        "Quit the smoking habit.",
      ];
      break;
    case "Stone in the Saliva Gland":
      points = [
        "Painless swelling or lump.",
        "Numbness or facial weakness.",
        "Dry mouth.",
        "Difficulty swallowing.",
      ];
      break;
    case "Smile Makeover":
      points = [
        "Discoloured or stained teeth.",
        "Chipped & cracked teeth.",
        "Gapped & crooked teeth.",
        "Improved smile aesthetics.",
      ];
      break;
    case "Severe Gum Infection":
      points = [
        "Bleeding gums.",
        "Swollen & red gums.",
        "Gums going down.",
        "Loose teeth.",
      ];
      break;
    case "Tight Tongue Skin":
      points = [
        "Difficulty latching.",
        "Clicking sounds while feeding.",
        "Increased feeding time.",
        "Maternal nipple pain.",
      ];
      break;
    case "Teeth Present at Birth":
      points = [
        "Happens naturally sometimes.",
        "Runs in the family.",
        "Mild health conditions.",
        "Not boils.",
      ];
      break;
    case "Tongue Pushing":
      points = [
        "Lisping.",
        "Mouth breathing.",
        "Upper teeth moving forward.",
        "Tongue thrusting.",
      ];
      break;
    case "Trapped Back Tooth":
      points = [
        "Pain & discomfort.",
        "Swelling or infection.",
        "Tooth fixed in bone.",
        "Side tooth damage.",
      ];
      break;
    case "Tooth Crown":
      points = [
        "Severely damaged teeth.",
        "Root canal treated teeth.",
        "Discoloured teeth.",
        "Fractured tooth.",
      ];
      break;
    case "Tooth Wear":
      points = [
        "Notches near gum line.",
        "Tooth sensitivity.",
        "Worn or flattened tooth.",
        "Teeth sensitive to hot or cold.",
      ];
      break;
    case "Tooth Rescue Treatment":
      points = [
        "Tooth displacement.",
        "Severe tooth fractures.",
        "Gum or bone damage.",
        "Root or pulp injury.",
      ];
      break;
    case "Tooth Removal":
      points = [
        "Severe tooth decay.",
        "Tooth stuck in bone.",
        "Crowded teeth.",
        "Loose tooth.",
      ];
      break;
    case "Teeth Whitening":
      points = [
        "Stained or discoloured teeth.",
        "Yellowing of teeth.",
        "Stained tooth.",
        "Desire for a brighter smile.",
      ];
      break;
    case "Thin Shells for Teeth":
      points = [
        "Discoloured teeth.",
        "Front gap closure.",
        "Misshaped front side tooth.",
        "Improvement of smile.",
      ];
      break;
    case "Teeth Cleaning & Polishing":
      points = [
        "Plaque & tartar build up.",
        "Gum inflammation or bleeding.",
        "Bad breath.",
        "Stained teeth.",
      ];
      break;
    case "Tooth Replacement":
      points = [
        "Missing tooth or teeth.",
        "Difficulty chewing or speaking.",
        "Shifting of teeth.",
        "Look concerns.",
      ];
      break;
    case "Tooth is Stuck":
      points = [
        "Missing tooth or teeth.",
        "Difficulty chewing or speaking.",
        "Shifting of teeth.",
        "Look concerns.",
      ];
      break;
    case "Thumb Sucking":
      points = [
        "Jaw growth.",
        "Want to stop the habit.",
        "Speech issues.",
        "Altered swallowing pattern.",
      ];
      break;
    case "Teeth Protector for Night":
      points = [
        "Clenching of teeth.",
        "Jaw joint problems.",
        "Clenching due to stress.",
        "Teeth grinding.",
      ];
      break;
    case "Tooth Cavities":
      points = [
        "Visible holes in teeth.",
        "Toothache.",
        "Cracked or broken teeth.",
        "Pain when biting or chewing.",
      ];
      break;
    case "White Spots on Teeth":
      points = [
        "White spots or streaks.",
        "Brown stains.",
        "Mottled enamel.",
        "Pitted or rough enamel.",
      ];
      break;
    case "Invisible Braces":
      points = [
        "Malocclusion.",
        "Spacing between teeth.",
        "Wish for celebrity smile.",
        "Don’t wish to go for braces.",
      ];
      break;
    case "Dry Peeling Lips":
      points = [
        "Redness or inflammation.",
        "Peeling or crust formation.",
        "Swelling on lips.",
        "Dryness or flaking of lip.",
      ];
      break;
    case "Wearing Down of Teeth":
      points = [
        "Flattened or worn down biting.",
        "Increased tooth sensitivity.",
        "Changes in tooth alignment.",
        "Wear on biting surfaces.",
      ];
      break;
    case "Gum Pocket":
      points = [
        "Swollen, painful or red gums.",
        "Bad breath.",
        "Bleeding gums.",
        "Loose or shifting of teeth.",
      ];
      break;
    case "Sensitive Teeth":
      points = [
        "Sensitivity when brushing.",
        "Tingling or shooting pain.",
        "Sharp pain when eating.",
        "Sensitivity to hot or cold.",
      ];
      break;
    case "Tooth Filling":
      points = [
        "Tooth caries.",
        "To replace damaged fillings.",
        "To close small gaps.",
        "Worn down teeth.",
      ];
      break;
    case "Crooked Tooth":
      points = [
        "Malaligned teeth.",
        "Speech problems.",
        "Difficulty in biting.",
        "Frequent biting on cheeks.",
      ];
      break;
    case "Bleeding Gums":
      points = [
        "Swollen, painful or red gums.",
        "Bad breath.",
        "Bleeding gums.",
        "Loose or shifting of teeth.",
      ];
      break;
    case "Swollen Gums":
      points = [
        "Swollen, painful or red gums.",
        "Bad breath.",
        "Bleeding gums.",
        "Loose or shifting of teeth.",
      ];
      break;
    case "Loose Teeth":
      points = [
        "Teeth that are moving.",
        "Gum disease.",
        "Injury or trauma.",
        "Bone loss.",
      ];
      break;
    case "Discoloured Teeth":
      points = [
        "Yellow or brown stains.",
        "Uneven coloration.",
        "Staining from food or drink.",
        "Poor oral hygiene.",
      ];
      break;
    case "Swelling Inside Mouth":
      points = [
        "Redness or inflammation.",
        "Swelling of cheeks/gums.",
        "Pain or discomfort.",
        "Difficulty swallowing.",
      ];
      break;
    case "Eruption Issues in Kids":
      points = [
        "Delayed eruption of teeth.",
        "Crowded teeth.",
        "Pain or discomfort.",
        "Difficulty in chewing.",
      ];
      break;
    case "Mouth Breathing":
      points = [
        "Mouth breathing during sleep.",
        "Dry mouth upon waking.",
        "Bad breath.",
        "Difficulty in swallowing.",
      ];
      break;
    case "Grinding Teeth at Night":
      points = [
        "Teeth grinding during sleep.",
        "Jaw pain or soreness.",
        "Headaches.",
        "Worn down teeth.",
      ];
      break;
    case "Audible Breathing":
      points = [
        "Noisy breathing during sleep.",
        "Mouth breathing.",
        "Snoring.",
        "Difficulty in breathing.",
      ];
      break;
    case "Uncomfortable Denture":
      points = [
        "Discomfort in the gums.",
        "Difficulty chewing.",
        "Movement of the denture.",
        "Irritation or soreness.",
      ];
      break;
    case "Facial Aesthetics":
      points = [
        "Loss of facial volume.",
        "Wrinkles and fine lines.",
        "Gummy smile.",
        "Asymmetry.",
      ];
      break;
    case "Oral Cancer Screening":
      points = [
        "Visual examination of mouth.",
        "Screening abnormalities.",
        "Assessment of risk factors.",
        "Referral for biopsy if needed.",
      ];
      break;
    case "Nutrition Deficiency Symptoms":
      points = [
        "Unexplained fatigue.",
        "Frequent infections.",
        "Slow wound healing.",
        "Hair loss.",
      ];
      break;
    case "Diabetic Mouth Changes":
      points = [
        "Dry mouth.",
        "Gum disease.",
        "Slow healing of oral wounds.",
        "Changes in taste.",
      ];
      break;
    case "Delayed Eruption of Teeth":
      points = [
        "Delayed eruption of teeth.",
        "Not erupted permanent tooth.",
        "Crowding of teeth.",
        "Impacted teeth.",
      ];
      break;
    case "Difficulty in Chewing & Kids Speaking":
      points = [
        "Difficulty in chewing food.",
        "Pain while chewing.",
        "Speech difficulties.",
        "Misaligned teeth.",
      ];
      break;
    case "Mouth Breathing in Kids":
      points = [
        "Mouth breathing during sleep.",
        "Dry mouth upon waking.",
        "Bad breath.",
        "Difficulty in swallowing.",
      ];
      break;
    case "Facial Asymmetry":
      points = [
        "Loss of facial volume.",
        "Wrinkles and fine lines.",
        "Gummy smile.",
        "Asymmetry.",
      ];
      break;
    case "Braces Adjustment":
      points = [
        "Discomfort or pressure pain.",
        "Tooth movement has stalled.",
        "Loose or broken brackets.",
        "Bite feels misaligned.",
      ];
      break;
    case "Toothache":
      points = [
        "Sharp or throbbing pain.",
        "Sensitivity to hot or cold.",
        "Pain when chewing.",
        "Swelling around the tooth.",
      ];
      break;
    case "Dental Implant Pain":
      points = [
        "Discomfort at the implant site.",
        "Pain during chewing.",
        "Swelling or inflammation.",
        "Loose implant.",
      ];
      break;
    case "Wisdom Tooth Swelling":
      points = [
        "Swelling around wisdom tooth.",
        "Pain or discomfort in the jaw.",
        "Difficulty opening the mouth.",
        "Pain behind ear.",
      ];
      break;
    default:
      points = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  }
  const imageName = `/${problem.name}.png`;
  return {
    image: imageName,
    name: problem.name,
    points,
  };
});

// Dentist interface
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

// --- ConsultDentistOnline Component ---
interface ConsultDentistOnlineProps {
  sectionSpacing?: string;
}

const ConsultDentistOnline: React.FC<ConsultDentistOnlineProps> = ({ sectionSpacing = "" }) => {
  const { t, i18n } = useTranslation();
  const [problemsPerSlide, setProblemsPerSlide] = useState(4);
  const [problemSliderIndex, setProblemSliderIndex] = useState(0);
  const [problemMaxIndex, setProblemMaxIndex] = useState(0);

  // New state for dentist functionality
  const [selectedProblem, setSelectedProblem] = useState<string>("");
  const [filteredDentists, setFilteredDentists] = useState<Dentist[]>([]);
  const [showDentistModal, setShowDentistModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setProblemsPerSlide(1);
      } else if (window.innerWidth < 768) {
        setProblemsPerSlide(2);
      } else if (window.innerWidth < 1024) {
        setProblemsPerSlide(3);
      } else {
        setProblemsPerSlide(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setProblemMaxIndex(sliderProblems.length - problemsPerSlide);
  }, [problemsPerSlide]);

  // Function to fetch dentists by problem
  const fetchDentistsByProblem = async (problem: string) => {
    setLoading(true);
    setError("");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.error("NEXT_PUBLIC_API_URL is not set.");
      setError("Application is not configured correctly.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/dentists/problem`, {
        params: { problem: problem },
      });
      setFilteredDentists(data);
      setShowDentistModal(true);
    } catch (error) {
      console.error("Error fetching dentists by problem:", error);
      setError("Could not fetch dentist data.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle consult now button click
  const handleConsultNowClick = (problemName: string) => {
    setSelectedProblem(problemName);
    fetchDentistsByProblem(problemName);
  };

  // Function to close dentist modal
  const closeDentistModal = () => {
    setShowDentistModal(false);
    setSelectedProblem("");
    setFilteredDentists([]);
    setError("");
  };

  return (
    <section
      className={`w-full bg-gray-50 py-12 sm:py-16 ${sectionSpacing}`}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
            Consult a Dentist <span className="text-blue-600">Online</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Get private and secure online consultations with our team of verified and experienced dental specialists.
          </p>
        </div>

        {/* Slider */}
        <div className="relative flex items-center justify-center w-full">
          {/* Previous Button */}
          <button
            onClick={() =>
              setProblemSliderIndex((prev) => Math.max(prev - 1, 0))
            }
            className="absolute z-10 p-3 transition-transform transform bg-white rounded-full shadow-lg -left-4 hover:bg-gray-100 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={problemSliderIndex === 0}
            aria-label="Previous"
          >
            <FaChevronLeft className="w-6 h-6 text-blue-600" />
          </button>

          {/* Slider Container */}
          <div className="w-full overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  problemSliderIndex * (100 / problemsPerSlide)
                }%)`,
              }}
            >
              {sliderProblems.map((problem, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-full p-2"
                  style={{ width: `${100 / problemsPerSlide}%` }}
                >
                  <div className="flex flex-col w-full h-full overflow-hidden transition-shadow duration-300 bg-white border-t-4 border-blue-500 shadow-md group rounded-2xl hover:shadow-xl">
                    <div className="flex flex-col items-center flex-shrink-0 p-6 text-center">
                      <Image
                        src={problem.image}
                        alt={problem.name}
                        width={80}
                        height={80}
                        className="object-contain w-20 h-20 mb-4 transition-colors duration-300 border-4 border-gray-100 rounded-full sm:w-24 sm:h-24 group-hover:border-blue-200"
                      />
                      <h3 className="text-lg font-bold leading-tight text-gray-800 sm:text-xl">
                        {problem.name}
                      </h3>
                    </div>
                    <div className="flex-grow px-6 pt-2 pb-4">
                      <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                        {Array.isArray(problem.points) ? (
                          problem.points.slice(0, 3).map((point, i) => (
                            <li key={i}>{point}</li>
                          ))
                        ) : (
                          <li>{problem.points}</li>
                        )}
                      </ul>
                    </div>
                    <div className="p-5 bg-gray-50">
                      <button
                        onClick={() => handleConsultNowClick(problem.name)}
                        className="flex items-center justify-center w-full px-6 py-3 text-sm font-semibold text-white transition-all duration-300 transform bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 sm:text-base"
                      >
                        Consult Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={() =>
              setProblemSliderIndex((prev) =>
                Math.min(prev + 1, problemMaxIndex)
              )
            }
            className="absolute z-10 p-3 transition-transform transform bg-white rounded-full shadow-lg -right-4 hover:bg-gray-100 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={problemSliderIndex >= problemMaxIndex}
            aria-label="Next"
          >
            <FaChevronRight className="w-6 h-6 text-blue-600" />
          </button>
        </div>
      </div>

      {/* Dentist Modal */}
      {showDentistModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl max-h-[90vh] mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800">
                Available Dentists for "{selectedProblem}"
              </h3>
              <button
                onClick={closeDentistModal}
                className="p-2 text-gray-500 transition-colors duration-200 rounded-full hover:bg-gray-100"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-grow p-6 overflow-y-auto">
              {loading ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="p-5 bg-white border border-gray-200 rounded-xl animate-pulse">
                      <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full"></div>
                      <div className="w-3/4 h-6 mx-auto mb-3 bg-gray-200 rounded"></div>
                      <div className="w-1/2 h-4 mx-auto mb-4 bg-gray-200 rounded"></div>
                      <div className="w-full h-10 bg-gray-200 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="px-4 py-3 text-center text-red-700 bg-red-100 rounded-lg">
                  {error}
                </div>
              ) : filteredDentists.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredDentists.map((dentist) => (
                    <div
                      key={dentist._id}
                      className="flex flex-col text-center transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-lg hover:scale-105"
                    >
                      <div className="flex-grow p-6">
                        <Image
                          src={dentist.image}
                          alt={dentist.user?.name || "Dentist"}
                          width={100}
                          height={100}
                          className="object-cover mx-auto mb-4 border-4 border-blue-100 rounded-full shadow-sm"
                        />
                        <h4 className="mb-1 text-xl font-bold text-gray-900">
                          {dentist.user?.name}
                        </h4>
                        <p className="mb-3 text-sm font-medium text-blue-600">
                          {dentist.specialization?.join(", ")}
                        </p>
                        <p className="text-xs text-gray-500">
                          {dentist.experienceYears ? `${dentist.experienceYears} years experience` : ''}
                        </p>
                      </div>
                      <div className="px-6 pb-6">
                        <Link
                          href={`/consult/${dentist._id}`}
                          className="block w-full px-4 py-3 text-sm font-bold text-white transition-all duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                          Consult Now
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full py-12 text-lg text-center text-gray-500">
                  <p className="mb-2 text-2xl">😔</p>
                  No dentists found for "{selectedProblem}".
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ConsultDentistOnline;
