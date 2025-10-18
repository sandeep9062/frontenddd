import React, { useRef, useEffect } from "react";

interface DropdownProps {
  options: string[];
  selected: string;
  placeholder: string;
  search?: string;
  setSearch?: (val: string) => void;
  showDropdown: boolean;
  setShowDropdown: (val: boolean) => void;
  onSelect: (val: string) => void;
}

const ClinicDropdown: React.FC<DropdownProps> = ({
  options,
  selected,
  placeholder,
  search = "",
  setSearch,
  showDropdown,
  setShowDropdown,
  onSelect,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowDropdown]);

  const handleSelect = (value: string) => {
    onSelect(value);
    setShowDropdown(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="px-6 py-3 rounded-lg border-2 border-[#2C73D2] text-[#2C73D2] text-base bg-white font-sans cursor-pointer flex items-center justify-between"
        style={{ minHeight: "48px" }}
        onClick={() => setShowDropdown(!showDropdown)}
        tabIndex={0}
      >
        <span>{selected || placeholder}</span>
        <svg
          className={`w-4 h-4 ml-2 text-[#2C73D2] transition-transform duration-200 ${
            showDropdown ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {showDropdown && (
        <div className="absolute left-0 right-0 mt-1 bg-white border-2 border-[#2C73D2] rounded-lg shadow-lg max-h-60 overflow-y-auto text-[#2C73D2] text-base font-sans z-30">
          {setSearch && (
            <div className="px-4 py-2">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 rounded border border-gray-200 text-[#2C73D2] text-base focus:outline-none focus:border-[#F4A300] bg-white"
              />
            </div>
          )}
          <ul>
            <li
              className={`px-6 py-2 cursor-pointer hover:bg-[#F4A300] hover:text-white ${
                !selected ? "bg-gray-100" : ""
              }`}
              onClick={() => handleSelect("")}
            >
              {placeholder}
            </li>
            {options
              .filter((opt) => opt.toLowerCase().includes(search.toLowerCase()))
              .map((opt) => (
                <li
                  key={opt}
                  className={`px-6 py-2 cursor-pointer hover:bg-[#F4A300] hover:text-white ${
                    selected === opt ? "bg-[#2C73D2] text-white" : ""
                  }`}
                  onClick={() => handleSelect(opt)}
                >
                  {opt}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClinicDropdown;
