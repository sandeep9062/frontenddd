"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const ProductFilter = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(
    "ToothBrushes"
  );

  const categories = [
    {
      name: "ToothBrushes",
      items: [
        "Soft Bristles Toothbrushes",
        "Medium Bristles Toothbrushes",
        "Hard Bristles Toothbrushes",
        "Electric Toothbrushes",
        "Interdental Brushes",
        "Kids Toothbrushes",
        "Eco-Friendly Bamboo Brushes",
      ],
    },
    {
      name: "Toothpaste",
      items: [
        "Whitening Toothpaste",
        "Herbal Toothpaste",
        "Fluoride Toothpaste",
        "Sensitive Toothpaste",
        "Charcoal Toothpaste",
        "Kids Toothpaste",
        "Anti-Cavity Toothpaste",
      ],
    },
    {
      name: "MouthWash",
      items: [
        "Alcohol-Free Mouthwash",
        "Whitening Mouthwash",
        "Antibacterial Mouthwash",
        "Fluoride Mouthwash",
        "Natural Herbal Mouthwash",
        "Fresh Breath Mouthwash",
        "Sensitive Mouthwash",
      ],
    },
    {
      name: "Tounge Cleaner",
      items: [
        "Plastic Tongue Cleaners",
        "Metal Tongue Scrapers",
        "Copper Tongue Cleaners",
        "Stainless Steel Tongue Cleaners",
        "Silicone Tongue Cleaners",
        "Disposable Tongue Cleaners",
      ],
    },
    {
      name: "Flossers",
      items: [
        "Waxed Dental Floss",
        "Unwaxed Dental Floss",
        "Flavored Dental Floss",
        "Floss Picks",
        "Water Flossers",
        "Eco-Friendly Floss",
        "Charcoal Floss",
      ],
    },
    {
      name: "Gum Paints",
      items: [
        "Chlorhexidine Gum Paint",
        "Antiseptic Gum Paint",
        "Astringent Gum Paint",
        "Herbal Gum Paint",
        "Fluoride Gum Paint",
        "Pain-Relief Gum Paint",
      ],
    },
    {
      name: "Nicotine Tablets",
      items: [
        "2mg Nicotine Tablets",
        "4mg Nicotine Tablets",
        "Nicotine Lozenges",
        "Mint Flavored Tablets",
        "Sugar-Free Tablets",
        "Nicotine Chewing Gum",
      ],
    },
  ];

  const toggleCategory = (name: string) => {
    setOpenCategory(openCategory === name ? null : name);
  };

  return (
    <aside className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm sm:w-64">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">Filter by</h2>
      <hr className="mb-4 border-gray-200" />

      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.name} className="pb-4 border-b border-gray-200">
            <button
              className="flex items-center justify-between w-full text-lg font-medium text-gray-800 transition-colors duration-200 hover:text-blue-600"
              onClick={() => toggleCategory(category.name)}
            >
              <span>{category.name}</span>
              {openCategory === category.name ? (
                <ChevronDown size={20} className="text-gray-500" />
              ) : (
                <ChevronRight size={20} className="text-gray-500" />
              )}
            </button>

            {openCategory === category.name && category.items.length > 0 && (
              <div className="pl-4 mt-3 space-y-3 animate-fadeIn">
                {category.items.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 text-base text-gray-600 cursor-pointer hover:text-gray-800"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default ProductFilter;
