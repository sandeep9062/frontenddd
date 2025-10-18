"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Slider data for problems (62 real problems)
const sliderProblems = [
  { name: "Audible Breathing" },
  { name: "Adding Bone to the Socket" },
  { name: "Bad Breath" },
  { name: "Burning Mouth" },
  { name: "Braces Adjustment" },
  { name: "Bleeding Gums" },
  { name: "Biting Down Hard" },
  { name: "Complete Denture" },
  { name: "Crooked Tooth" },
  { name: "Children’s Dentistry" },
  { name: "Dental Implants" },
  { name: "Dental Implant Pain" },
  { name: "Dental Braces" },
  { name: "Dry Mouth" },
  { name: "Dental Jewellery" },
  { name: "Discoloured Teeth" },
  { name: "Fractured Tooth" },
  { name: "Facial Twitch" },
  { name: "Front Tooth Gap" },
  { name: "Facial Asymmetry" },
  { name: "Gum Treatment" },
  { name: "Diabetic Mouth Changes" },
  { name: "Lump on the Facial Nerve" },
  { name: "Loud Sleeping" },
  { name: "Loose Teeth" },
  { name: "Mouth Breathing in Kids" },
  { name: "Mouth Guard for Sports" },
  { name: "Missing Front Tooth" },
  { name: "Mouth Ulcer" },
  { name: "Mouth Red Patch" },
  { name: "Mouth Infection" },
  { name: "Mouth Cancer" },
  { name: "Mouth Care After Cancer" },
  { name: "One Sided Facial Weakness" },
  { name: "Partial Tooth Cap" },
  { name: "Producing Too Much Saliva" },
  { name: "Pain in the Jaw Joint" },
  { name: "Ringing Sound in Ears" },
  { name: "Root Canal Treatment" },
  { name: "Re-Root Canal Treatment" },
  { name: "Removable Teeth" },
  { name: "Split Lip" },
  { name: "Smoking Habit" },
  { name: "Stone in the Saliva Gland" },
  { name: "Smile Makeover" },
  { name: "Severe Gum Infection" },
  { name: "Tight Tongue Skin" },
  { name: "Teeth Present at Birth" },
  { name: "Tongue Pushing" },
  { name: "Trapped Back Tooth" },
  { name: "Tooth Crown" },
  { name: "Tooth Wear" },
  { name: "Tooth Rescue Treatment" },
  { name: "Tooth Removal" },
  { name: "Teeth Whitening" },
  { name: "Thin Shells for Teeth" },
  { name: "Teeth Cleaning & Polishing" },
  { name: "Tooth Replacement" },
  { name: "Tooth is Stuck" },
  { name: "Thumb Sucking" },
  { name: "Teeth Protector for Night" },
  { name: "Tooth Cavities" },
  { name: "White Spots on Teeth" },
  { name: "Invisible Braces" },
  { name: "Dry Peeling Lips" },
  { name: "Wearing Down of Teeth" },
  { name: "Gum Pocket" },
  { name: "Sensitive Teeth" },
  { name: "Swollen Gums" },
  { name: "Tooth Filling" },
  { name: "Wisdom Tooth Swelling" },
  // New problems added below
  { name: "Swelling Inside Mouth" },
  { name: "Eruption Issues in Kids" },
  { name: "Grinding Teeth at Night" },
  { name: "Uncomfortable Denture" },
  { name: "Oral Cancer Screening" },
  { name: "Delayed Eruption of Teeth" },
  { name: "Hole in the Roof of the Mouth" },
  { name: "Nutrition Deficiency Symptoms" },
  { name: "Difficulty in Chewing & Kids Speaking" },
  { name: "Facial Muscle Twitching on One Side" },
].map((problem) => {
  let points: string | string[] =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  switch (problem.name) {
    case "Adding Bone to the Socket":
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
// --- Specialist Component ---
interface SpecialistProps {
  sectionSpacing?: string;
}

const problemsPerSlide = 4; // Number of items visible per slide

const Specialist: React.FC<SpecialistProps> = ({ sectionSpacing = "" }) => {
  const [problemSliderIndex, setProblemSliderIndex] = useState(0);
  const [problemMaxIndex, setProblemMaxIndex] = useState(0);

  useEffect(() => {
    setProblemMaxIndex(Math.ceil(sliderProblems.length / problemsPerSlide) - 1);
  }, []);

  return (
    <section
      className={`w-full max-w-full mx-0 sm:max-w-7xl sm:mx-auto pb-10 px-2 sm:px-4 mt-4 mb-4 ${sectionSpacing}`}
    >
      <div className="flex flex-col items-center w-full">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C73D2] mb-2 font-[Poppins] text-center">
          Consult Dentist Online
        </h2>
        <p className="text-gray-700 text-base sm:text-lg md:text-lg font-[Poppins] mb-8 text-center">
          Private online consultations with verified dentists in all
          specialists.
        </p>

        {/* Slider */}
        <div className="flex items-center justify-center w-full">
          {/* Previous Button */}
          <button
            onClick={() =>
              setProblemSliderIndex((prev) => Math.max(prev - 1, 0))
            }
            className="p-2 mr-2 transition bg-white rounded-full shadow-md hover:bg-gray-100 sm:mr-4 disabled:opacity-50"
            disabled={problemSliderIndex === 0}
            aria-label="Previous"
          >
            <FaChevronLeft className="text-[#2C73D2]" />
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
                  <div className="flex flex-col bg-white rounded-2xl shadow-lg p-6 border-t-4 border-[#F4A300] w-full h-full justify-between">
                    <div className="flex items-center justify-center w-full mb-4">
                      <Image
                        src={problem.image}
                        alt={problem.name}
                        width={96}
                        height={96}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-[#2C73D2] text-center w-full leading-tight mb-3">
                      {problem.name}
                    </h3>
                    <ul className="w-full px-4 mb-4 text-base text-left text-gray-700 list-disc">
                      {Array.isArray(problem.points) ? (
                        problem.points.slice(0, 4).map((point, i) => (
                          <li key={i} className="mb-1">
                            {point}
                          </li>
                        ))
                      ) : (
                        <li className="mb-1">{problem.points}</li>
                      )}
                    </ul>
                    <Link
                      href="/consult"
                      className="mt-auto mx-auto px-8 py-3 rounded-lg bg-gradient-to-r from-[#2C73D2] to-[#0052D4] text-white font-semibold shadow-lg hover:from-[#0052D4] hover:to-[#2C73D2] transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                    >
                      <span className="whitespace-nowrap">Consult Now</span>
                    </Link>
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
            className="p-2 ml-2 transition bg-white rounded-full shadow-md hover:bg-gray-100 sm:ml-4 disabled:opacity-50"
            disabled={problemSliderIndex >= problemMaxIndex}
            aria-label="Next"
          >
            <FaChevronRight className="text-[#2C73D2]" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: problemMaxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setProblemSliderIndex(idx)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                problemSliderIndex === idx
                  ? "bg-[#2C73D2]"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialist;
