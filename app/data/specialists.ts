export interface Specialist {
  name: string;
  img: string;
  desc: string;
  points: string[];
}

export const specialists: Specialist[] = [
  {
    name: "General Dentist",
    img: "/General Dentist.png",
    desc: "Comprehensive oral care, restorative & cosmetic procedures, patient education & prevention.",
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
    desc: "Treats gum disease, saves teeth by improving gum & bone health, dental implants & surgery.",
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
    desc: "Fix broken/missing teeth with natural-looking caps, dental implant caps specialists, denture specialists.",
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
    desc: "Aligns crooked teeth & jaws for a perfect smile, experts in braces & clear aligners.",
    points: [
      "Crooked teeth.",
      "Gaps between teeth.",
      "Overbite & underbite.",
      "Crossbite.",
      "Open bite.",
      "Crowded teeth.",
      "Jaw pain.",
    ],
  },
  {
    name: "Endodontist",
    img: "/Endodontist.png",
    desc: "Saves infected teeth with root canal treatment, experts in treating tooth pain.",
    points: [
      "Tooth pain.",
      "Abscessed tooth.",
      "Cracked tooth.",
      "Dislodged tooth.",
      "Root canal treatment.",
      "Internal bleaching.",
    ],
  },
  {
    name: "Oral & Maxillofacial Surgeon",
    img: "/Oral Surgeon.png",
    desc: "Performs complex dental surgeries, wisdom tooth removal & dental implants.",
    points: [
      "Wisdom tooth removal.",
      "Dental implants.",
      "Jaw surgery.",
      "Facial trauma.",
      "TMJ disorders.",
      "Sleep apnea.",
    ],
  },
  {
    name: "Pediatric Dentist",
    img: "/Pediatric Dentist.png",
    desc: "Specializes in dental care for children, from infants to adolescents.",
    points: [
      "First dental visit.",
      "Cavity prevention.",
      "Fluoride treatment.",
      "Sealants.",
      "Habit counseling.",
      "Early orthodontics.",
    ],
  },
];
