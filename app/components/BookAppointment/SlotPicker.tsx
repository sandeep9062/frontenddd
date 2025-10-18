"use client";
import React from "react";
import { allDays, defaultSlots } from "./utils";

const SlotPicker: React.FC<{
  selectedDate: string;
  setSelectedDate: (d: string) => void;
  selectedSlot: string;
  setSelectedSlot: (s: string) => void;
}> = ({ selectedDate, setSelectedDate, selectedSlot, setSelectedSlot }) => {
  const idx = allDays.findIndex((d) => d.value === selectedDate);
  const start = Math.max(0, idx);
  const viewDays = allDays.slice(start, start + 3);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <button
          className="px-2 text-xl text-gray-400"
          onClick={() => {
            const i = allDays.findIndex((d) => d.value === selectedDate);
            if (i > 0) setSelectedDate(allDays[i - 1].value);
          }}
          disabled={selectedDate === allDays[0].value}
          aria-label="Previous day"
        >
          &#8592;
        </button>
        {viewDays.map((d) => (
          <div
            key={d.value}
            className="flex flex-col items-center px-2 cursor-pointer"
            onClick={() => {
              setSelectedDate(d.value);
              setSelectedSlot("");
            }}
          >
            <span
              className={`font-semibold text-base ${
                selectedDate === d.value ? "text-[#2056AE]" : "text-gray-700"
              }`}
            >
              {d.label}
            </span>
            <span className="text-[#1BC47D] text-sm">
              {d.slots} Slots Available
            </span>
            {selectedDate === d.value && (
              <div className="h-1 w-8 bg-[#00BFFF] mt-1 rounded-full" />
            )}
          </div>
        ))}
        <button
          className="px-2 text-xl text-gray-400"
          onClick={() => {
            const i = allDays.findIndex((d) => d.value === selectedDate);
            if (i < allDays.length - 1) setSelectedDate(allDays[i + 1].value);
          }}
          disabled={selectedDate === allDays[allDays.length - 1].value}
          aria-label="Next day"
        >
          &#8594;
        </button>
      </div>

      <div className="mb-2 font-semibold text-[#2056AE]">Morning (6 slots)</div>
      <div className="grid grid-cols-2 gap-2 mb-4 sm:grid-cols-4">
        {defaultSlots.slice(0, 6).map((slot) => (
          <button
            key={slot}
            className={`border-2 rounded-lg px-2 py-1 font-semibold transition text-xs w-full ${
              selectedSlot === slot
                ? "border-[#1890FF] bg-[#E6F7FF] text-[#1890FF]"
                : "border-[#2C73D2] text-[#2056AE] hover:bg-[#F4F8FF]"
            }`}
            onClick={() => setSelectedSlot(slot)}
          >
            {slot}
          </button>
        ))}
      </div>

      <div className="mb-2 font-semibold text-[#2056AE]">
        Afternoon (6 slots)
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4 sm:grid-cols-4">
        {defaultSlots.slice(6, 14).map((slot) => (
          <button
            key={slot}
            className={`border-2 rounded-lg px-2 py-1 font-semibold transition text-xs w-full ${
              selectedSlot === slot
                ? "border-[#1890FF] bg-[#E6F7FF] text-[#1890FF]"
                : "border-[#2C73D2] text-[#2056AE] hover:bg-[#F4F8FF]"
            }`}
            onClick={() => setSelectedSlot(slot)}
          >
            {slot}
          </button>
        ))}
      </div>

      <div className="mb-2 font-semibold text-[#2056AE]">Evening (9 slots)</div>
      <div className="grid grid-cols-2 gap-2 mb-4 sm:grid-cols-4">
        {defaultSlots.slice(14).map((slot) => (
          <button
            key={slot}
            className={`border-2 rounded-lg px-2 py-1 font-semibold transition text-xs w-full ${
              selectedSlot === slot
                ? "border-[#1890FF] bg-[#E6F7FF] text-[#1890FF]"
                : "border-[#2C73D2] text-[#2056AE] hover:bg-[#F4F8FF]"
            }`}
            onClick={() => setSelectedSlot(slot)}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SlotPicker;
