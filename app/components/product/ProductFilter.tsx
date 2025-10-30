"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { categories } from "@/app/data/categories";

interface ProductFilterProps {
  onFilterChange: (selectedFilters: string[]) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilterChange }) => {
  const [openCategory, setOpenCategory] = useState<string | null>(
    "ToothBrushes"
  );
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleCategory = (name: string) => {
    setOpenCategory(openCategory === name ? null : name);
  };

  const handleCategoryChange = (items: string[]) => {
    const areAllSelected = items.every((item) =>
      selectedFilters.includes(item)
    );
    let newSelectedFilters;
    if (areAllSelected) {
      newSelectedFilters = selectedFilters.filter(
        (item) => !items.includes(item)
      );
    } else {
      const itemsToAdd = items.filter(
        (item) => !selectedFilters.includes(item)
      );
      newSelectedFilters = [...selectedFilters, ...itemsToAdd];
    }
    setSelectedFilters(newSelectedFilters);
    onFilterChange(newSelectedFilters);
  };

  const handleFilterChange = (item: string) => {
    const newSelectedFilters = selectedFilters.includes(item)
      ? selectedFilters.filter((i) => i !== item)
      : [...selectedFilters, item];
    setSelectedFilters(newSelectedFilters);
    onFilterChange(newSelectedFilters);
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    onFilterChange([]);
  };

  return (
    <aside className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Filter by</h2>
        <button
          onClick={clearFilters}
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          Clear All
        </button>
      </div>
      <hr className="mb-4 border-gray-200" />

      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.name} className="pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between w-full">
              <label className="flex items-center gap-3 text-lg font-medium text-gray-800 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={
                    category.items.length > 0 &&
                    category.items.every((item) =>
                      selectedFilters.includes(item)
                    )
                  }
                  onChange={() => handleCategoryChange(category.items)}
                />
                <span
                  onClick={() => toggleCategory(category.name)}
                  className="hover:text-blue-600"
                >
                  {category.name}
                </span>
              </label>
              <button
                onClick={() => toggleCategory(category.name)}
                className="transition-colors duration-200"
              >
                {openCategory === category.name ? (
                  <ChevronDown size={20} className="text-gray-500" />
                ) : (
                  <ChevronRight size={20} className="text-gray-500" />
                )}
              </button>
            </div>

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
                      checked={selectedFilters.includes(item)}
                      onChange={() => handleFilterChange(item)}
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
