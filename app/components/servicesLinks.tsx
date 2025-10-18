import React, { useState } from "react";

const ServicesLinks = () => {
  const [active, setActive] = useState("All");

  const handleServiceChange = (cat: string) => {
    setActive(cat);
  };


const services = [
  "All",
  "Website Design & Development",
  "E-commerce Solutions",
  "Landing Pages & Funnels",
  "UI/UX Audits & Product Strategy",
  "SaaS App Development",
  "AI-Powered Web Solutions",
  "API Integration & Automation",
  "SEO & Digital Marketing",
  "Branding & Graphic Design",
  "Web Hosting & Maintenance",
  "Enterprise Solutions & Deployment",
  "Go-to-Market & Startup Tech Partner"
];






  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {services.map((cat) => (
        <button
          key={cat}
          onClick={() => handleServiceChange(cat)}
          className={`px-4 py-2 rounded-full border font-medium transition duration-200 ${
            active === cat
              ? "bg-[#D4AF37] text-black border-transparent"
              : "text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-[#D4AF37]/20"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default ServicesLinks;
