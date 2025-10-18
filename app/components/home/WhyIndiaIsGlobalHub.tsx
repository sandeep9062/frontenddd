"use client";

import React, { useState } from "react";
import Image from "next/image";

// Define the Specialist interface
interface Specialist {
  name: string;
  img: string;
  desc: string;
  points: string[];
}

// Define the Problem interface
interface Problem {
  name: string;
}

// Specialists data (with descriptions)
const specialists: Specialist[] = [
  {
    name: "General Dentist",
    img: "/General Dentist.png",
    desc: "Comprehensive oral care. Restorative & cosmetic procedures. Patient education & prevention.",
    points: [
      "Tooth cavities.",
      "White spot on teeth.",
      "Tooth wear.",
      "Dental jewellery.",
      "Performs regular dental check-ups.",
      "Clean teeth & removes plaque.",
      "Fills cavities.",
    ],
  },
  {
    name: "Periodontist",
    img: "/Periodontist.png",
    desc: "Treats gum disease. Saves teeth by improving gum & bone health. Performs dental implants & surgery.",
    points: [
      "Gum surgery.",
      "Teeth cleaning & polishing.",
      "Teeth whitening.",
      "Severe gum infection.",
      "Mouth care after cancer.",
      "Gum treatment.",
      "Bad breath.",
      "Gum pocket.",
      "Receding gums.",
    ],
  },
  {
    name: "Prosthodontist",
    img: "/Prosthodontist.png",
    desc: "Fix broken/missing teeth with natural-looking caps. Dental implant caps specialists. Denture specialists. Smile makeover experts.",
    points: [
      "Wearing down of teeth.",
      "Teeth protector for night.",
      "Dental implants.",
      "Tooth replacement.",
      "Thin shells for teeth.",
      "Tooth crown.",
      "Smile makeover.",
      "Partial tooth cap.",
      "Tooth bridge.",
    ],
  },
  {
    name: "Orthodontist",
    img: "/Orthodontist.png",
    desc: "Straightens crooked teeth. Uses braces & aligners to correct teeth. Corrects problems like overbites. Underbites & crossbites for better function.",
    points: [
      "Invisible braces.",
      "Dental braces.",
      "Crooked tooth.",
      "Braces adjustment.",
      "Tooth gap closure.",
      "Tooth alignment.",
      "Tooth spacing.",
      "Tooth crowding.",
      "Tooth protrusion.",
    ],
  },
  {
    name: "Endodontist",
    img: "/Endodontist.png",
    desc: "Specializes in saving teeth. Performs root canal treatments. Handles complex dental pain.",
    points: [
      "Root canal treatment.",
      "Tooth pain relief.",
      "Pulp therapy.",
      "Retreatment of failed root canals.",
      "Complex dental pain management.",
      "Tooth rescue treatment.",
      "Re-root canal treatment.",
    ],
  },
  {
    name: "Cosmetic Dentist",
    img: "/Cosmetic Dentist.png",
    desc: "Enhances smile. Fixes chips, cracks, & other imperfections for a flawless look. Customizes smile makeovers.",
    points: [
      "Tooth crown.",
      "Smile makeover.",
      "Partial tooth cap.",
      "Missing front tooth.",
      "Front tooth gap.",
      "Dental jewellery.",
      "Tooth wear.",
      "Teeth whitening.",
      "Gummy smile.",
    ],
  },
  {
    name: "Pediatric Dentist",
    img: "/Children’s Dentistry.png",
    desc: "Cares for children’s teeth. Specializes in the dental needs of kids from babies to teens. Helps children develop healthy brushing & flossing routines.",
    points: [
      "Teeth present at birth.",
      "Tight tongue skin.",
      "Thumb sucking.",
      "Tooth cavities.",
      "Tooth filling.",
      "Children's dentistry.",
      "Bad breath.",
      "Tooth sensitivity.",
      "Mouth breathing in kids.",
    ],
  },
  {
    name: "Oral and Maxillofacial Surgeon",
    img: "/Expert Dentist.png", // Fallback image
    desc: "Wisdom tooth removal. Fixes jaw issues & facial injuries through advanced surgery. Places dental implants.",
    points: [
      "Adding bone to the socket.",
      "Dental implants.",
      "Fractured tooth.",
      "Facial twitch.",
      "Facial muscle twitching on one side.",
      "Hole in the roof of the mouth.",
    ],
  },
  {
    name: "Holistic Dentist",
    img: "/Holistic Dentist.png",
    desc: "Natural dental care. Uses biocompatible materials & treatments that support overall health. Focuses on whole-body wellness.",
    points: [
      "Tooth cavities.",
      "Tooth filling.",
      "Tooth rescue treatment.",
      "Partial tooth cap.",
      "Saves tooth from root canal treatment.",
      "Treats according to whole body wellness.",
      "Avoids harmful chemicals.",
    ],
  },
  {
    name: "TMJ Wellness Expert",
    img: "/TMJ Wellness Expert.png",
    desc: "Treats jaw pain & discomfort. Specializes in diagnosing & treating TMJ disorders. Helps alleviate headaches & muscle tension related to jaw issues.",
    points: [
      "Pain in the jaw joint.",
      "Ringing sound in ears.",
      "Jaw problems.​",
      "Jaw lock.",
      "Night guard.",
      "Headaches of one side.​",
      "Audible breathing.",
      "Jaw clenching.",
      "Teeth grinding.",
    ],
  },
  {
    name: "Oral Medicine Specialist",
    img: "/Oral Medicine Specialist.png",
    desc: "Diagnoses oral health disorders. Specializes in identifying conditions that affect the mouth, jaw & related areas. Manages chronic oral conditions.",
    points: [
      "Diagnosis & treating mouth problems that aren't caused by teeth.",
      "Mouth sores.",
      "Dry mouth.",
      "Burning sensation.",
      "Oral lesions.",
      "Tooth sensitivity.",
      "Mouth breathing.",
    ],
  },
  {
    name: "Dental Implant Specialist",
    img: "/Dental Implant Specialist.png",
    desc: "Specializes in placing dental implants. Restores function & aesthetics. Improves both the look & function of smile with implants.",
    points: [
      "Adding bone to the socket.",
      "Dental implants.",
      "Replacing missing teeth.",
      "Implant dentures.",
      "Smile makeover.",
      "Bone grafting.",
      "Implant-supported bridges.",
      "Immediate implant placement.",
    ],
  },
  {
    name: "Oral Radiologist",
    img: "/Oral Radiologist.png",
    desc: "Dental imaging expert. Helps with accurate diagnosis. Guides safe treatment planning.",
    points: [
      "CBCT expert.",
      "X-ray ",
      "MRI.",
      "Find dental health  problems.",
      "Indentify jaw joint issues.",
      "Detects hidden dental issues.",
      "Guides treatment planning.",
    ],
  },
  {
    name: "Biomimetic Dentist",
    img: "/Biomimetic Dentist.png",
    desc: "Mimics natural tooth function. Uses advanced materials. Techniques to restore teeth that look & function like natural ones.",
    points: [
      "Deep tooth cavities.",
      "Tooth rescue treatment.",
      "Sensitive teeth.",
      "Tooth fillings. ",
      "Uses natural looking materials.",
      "Preserves as much natural tooth as possible.",
    ],
  },
];


// Slider data for problems (62 real problems)
const sliderProblems: Problem[] = [
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
  const image = `/${problem.name.replace(/ /g, "%20")}.png`;
  let points: string | string[] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
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

  return {
    image,
    name: problem.name,
    points,
  };
});

const WhyIndiaIsGlobalHub: React.FC = () => {
  const [selectedProblem, setSelectedProblem] = useState<string>("");

  return (
    <div className="flex flex-col items-center w-full px-4 py-8">
      {/* Problem Slider */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {sliderProblems.map((problem, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedProblem(problem.name)}
            className={`px-4 py-2 rounded-full border ${
              selectedProblem === problem.name
                ? "bg-[#2C73D2] text-white border-[#2C73D2]"
                : "bg-white text-[#2C73D2] border-[#2C73D2]"
            } hover:bg-[#2C73D2] hover:text-white transition`}
          >
            {problem.name}
          </button>
        ))}
      </div>

      {/* Specialists Section */}
      {selectedProblem && (
        <div className="flex flex-col items-center w-full mt-8">
          <h3 className="text-xl font-bold text-[#2C73D2] mb-4">
            Specialist(s) for: {selectedProblem}
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {specialists
              .filter((spec) =>
                spec.points.some(
                  (point) =>
                    point.toLowerCase().includes(selectedProblem.toLowerCase()) ||
                    selectedProblem.toLowerCase().includes(point.toLowerCase())
                )
              )
              .map((spec) => (
                <div
                  key={spec.name}
                  className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 border border-[#2C73D2]/10 w-[260px] min-h-[320px]"
                >
                  <Image
                    src={spec.img}
                    alt={spec.name}
                    width={80}
                    height={80}
                    className="object-contain w-20 h-20 mb-4 rounded-full"
                  />
                  <div className="text-lg font-bold text-[#2C73D2] mb-2 text-center">
                    {spec.name}
                  </div>
                  <div className="mb-2 text-base text-center text-gray-700">
                    {spec.desc}
                  </div>
                  <ul
                    className="text-sm text-[#333333] text-left w-full mb-2 px-2"
                    style={{ fontSize: "15px", listStyleType: "disc", paddingLeft: "1.8em" }}
                  >
                    {spec.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}

            {/* No specialist found */}
            {specialists.filter((spec) =>
              spec.points.some(
                (point) =>
                  point.toLowerCase().includes(selectedProblem.toLowerCase()) ||
                  selectedProblem.toLowerCase().includes(point.toLowerCase())
              )
            ).length === 0 && (
              <div className="text-base text-gray-500">
                No matching specialist found for this problem.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WhyIndiaIsGlobalHub;
