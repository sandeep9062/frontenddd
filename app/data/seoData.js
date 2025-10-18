import React from 'react';

// Predefined SEO content templates for dental tourism
export const seoTemplates = {
  // Treatment-specific templates
  dentalImplants: {
    title: "Dental Implants in India | Best Quality at Affordable Prices",
    description: "Get world-class dental implants in India with expert dentists. Titanium implants, same-day procedures, 95% success rate. Save up to 70% on treatment costs.",
    keywords: "dental implants India, titanium implants, same day dental implants, affordable dental implants, best dental implants India, implant dentist India",
    focusKeywords: ["dental implants India", "affordable dental implants", "titanium implants"]
  },
  
  cosmeticDentistry: {
    title: "Cosmetic Dentistry in India | Smile Makeover & Teeth Whitening",
    description: "Transform your smile with cosmetic dentistry in India. Veneers, teeth whitening, smile makeover by expert cosmetic dentists at affordable prices.",
    keywords: "cosmetic dentistry India, smile makeover India, teeth whitening India, dental veneers India, cosmetic dentist India, Hollywood smile",
    focusKeywords: ["cosmetic dentistry India", "smile makeover", "teeth whitening India"]
  },
  
  rootCanal: {
    title: "Root Canal Treatment in India | Pain-Free Endodontic Care",
    description: "Expert root canal treatment in India with advanced technology. Pain-free procedures, single-visit RCT, experienced endodontists at affordable costs.",
    keywords: "root canal treatment India, endodontic treatment, pain-free root canal, single visit RCT, root canal specialist India, endodontist India",
    focusKeywords: ["root canal treatment India", "endodontic treatment", "pain-free root canal"]
  },
  
  orthodontics: {
    title: "Orthodontic Treatment in India | Braces & Teeth Alignment",
    description: "Straighten your teeth with orthodontic treatment in India. Metal braces, clear aligners, Invisalign at affordable prices by certified orthodontists.",
    keywords: "orthodontic treatment India, braces India, teeth alignment India, Invisalign India, clear aligners India, orthodontist India",
    focusKeywords: ["orthodontic treatment India", "braces India", "teeth alignment"]
  },
  
  // City-specific templates
  delhi: {
    title: "Best Dental Clinics in Delhi | Top Dentists & Treatments",
    description: "Find the best dental clinics in Delhi. Verified dentists, advanced treatments, affordable prices. Book appointments with top-rated dental practices in Delhi.",
    keywords: "dental clinics Delhi, best dentists Delhi, dental treatment Delhi, dental hospital Delhi, dentist appointment Delhi, dental care Delhi",
    focusKeywords: ["dental clinics Delhi", "best dentists Delhi", "dental treatment Delhi"]
  },
  
  mumbai: {
    title: "Top Dental Clinics in Mumbai | Expert Dental Care & Treatment",
    description: "Discover leading dental clinics in Mumbai. Expert dentists, modern facilities, comprehensive dental care. Book your dental appointment in Mumbai today.",
    keywords: "dental clinics Mumbai, best dentists Mumbai, dental treatment Mumbai, dental hospital Mumbai, dentist appointment Mumbai, dental care Mumbai",
    focusKeywords: ["dental clinics Mumbai", "best dentists Mumbai", "dental treatment Mumbai"]
  },
  
  bangalore: {
    title: "Best Dental Clinics in Bangalore | Quality Dental Treatment",
    description: "Find top-rated dental clinics in Bangalore. Experienced dentists, latest technology, affordable dental treatments. Book your consultation today.",
    keywords: "dental clinics Bangalore, best dentists Bangalore, dental treatment Bangalore, dental hospital Bangalore, dentist appointment Bangalore",
    focusKeywords: ["dental clinics Bangalore", "best dentists Bangalore", "dental treatment Bangalore"]
  }
};

// SEO keyword categories for dental tourism
export const keywordCategories = {
  treatments: [
    "dental implants India",
    "cosmetic dentistry India",
    "root canal treatment India",
    "orthodontic treatment India",
    "teeth whitening India",
    "dental crowns India",
    "dental bridges India",
    "oral surgery India",
    "periodontal treatment India",
    "preventive dentistry India"
  ],
  
  locations: [
    "dental clinics Delhi",
    "dental clinics Mumbai",
    "dental clinics Bangalore",
    "dental clinics Chennai",
    "dental clinics Hyderabad",
    "dental clinics Pune",
    "dental clinics Kolkata",
    "dental clinics Ahmedabad",
    "dental clinics Jaipur",
    "dental clinics Kochi"
  ],
  
  services: [
    "dental tourism India",
    "medical tourism dentistry",
    "affordable dental treatment",
    "quality dental care",
    "international dental patients",
    "dental vacation India",
    "dental treatment abroad",
    "overseas dental treatment",
    "dental care packages",
    "dental tourism packages"
  ],
  
  qualityTerms: [
    "best dental clinics India",
    "top dentists India",
    "certified dentists India",
    "experienced dental specialists",
    "world-class dental treatment",
    "advanced dental technology",
    "international dental standards",
    "accredited dental clinics",
    "verified dental professionals",
    "premium dental care"
  ]
};

// Long-tail keyword suggestions
export const longTailKeywords = [
  "best dental implant clinics in India for international patients",
  "affordable cosmetic dentistry packages in India",
  "top-rated orthodontist in Delhi for braces treatment",
  "pain-free root canal treatment in Mumbai with latest technology",
  "dental tourism packages including accommodation in India",
  "certified dental specialists for complex oral surgery in Bangalore",
  "same-day dental implants with immediate loading in Chennai",
  "Hollywood smile makeover cost in India vs USA",
  "dental treatment cost comparison India vs other countries",
  "best dental clinics in India with international accreditation"
];

// SEO content suggestions for different page types
export const contentSuggestions = {
  homepage: {
    h1: "India's Leading Dental Tourism Platform",
    h2: [
      "Why Choose India for Dental Treatment?",
      "Top-Rated Dental Clinics Across India",
      "Comprehensive Dental Treatments at Affordable Prices",
      "Success Stories from International Patients"
    ],
    content: [
      "India has emerged as a global leader in dental tourism, offering world-class dental treatments at a fraction of international costs.",
      "Our platform connects you with verified, certified dental clinics across major Indian cities.",
      "From simple cleanings to complex oral surgeries, Indian dental clinics provide comprehensive care with international standards."
    ]
  },
  
  treatments: {
    h1: "Comprehensive Dental Treatments in India",
    h2: [
      "Popular Dental Procedures for International Patients",
      "Advanced Technology in Indian Dental Clinics",
      "Cost Comparison: India vs Global Dental Treatment Prices",
      "Quality Assurance and International Standards"
    ]
  },
  
  clinics: {
    h1: "Verified Dental Clinics Across India",
    h2: [
      "Find Top-Rated Dental Clinics in Your Preferred City",
      "Certified Dental Specialists and Their Expertise",
      "Modern Facilities and International Standards",
      "Patient Reviews and Success Rates"
    ]
  }
};

// Schema markup templates
export const schemaTemplates = {
  dentalClinic: {
    "@context": "https://schema.org",
    "@type": "DentalClinic",
    "name": "",
    "description": "",
    "url": "",
    "telephone": "",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "",
      "addressLocality": "",
      "addressRegion": "",
      "postalCode": "",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "",
      "longitude": ""
    },
    "openingHours": [],
    "priceRange": "$$",
    "acceptsReservations": true,
    "medicalSpecialty": ["Dentistry"],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "",
      "reviewCount": ""
    }
  },
  
  medicalProcedure: {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "",
    "description": "",
    "procedureType": "Dental procedure",
    "bodyLocation": "Mouth",
    "preparation": "",
    "howPerformed": "",
    "followup": "",
    "typicalAgeRange": "18-99",
    "medicalSpecialty": "Dentistry"
  }
};

export default {
  seoTemplates,
  keywordCategories,
  longTailKeywords,
  contentSuggestions,
  schemaTemplates
};
