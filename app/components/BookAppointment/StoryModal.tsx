"use client";
import React from "react";
import { Story } from "./types";

const defaultStory: Story = {
  recommend: null,
  problem: "",
  waitTime: "",
  improvements: [],
  experience: "",
  name: "",
  phone: "",
  anonymous: false,
};

const StoryModal: React.FC<{
  clinicName?: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (s: Story) => void;
}> = ({ clinicName, open, onClose, onSubmit }) => {
  const [story, setStory] = React.useState<Story>(defaultStory);

  React.useEffect(() => {
    if (!open) setStory(defaultStory);
  }, [open]);

  if (!open) return null;

  function handleSubmit() {
    if (
      story.recommend === null ||
      !story.problem ||
      !story.waitTime ||
      !story.improvements.length ||
      !story.experience
    ) {
      // lightweight client-side validation; you can enhance it
      alert("Please fill all required fields.");
      return;
    }
    onSubmit(story);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-2 bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 w-full max-w-lg relative overflow-y-auto max-h-[90vh]">
        <button
          className="absolute text-xl text-gray-400 top-2 right-2"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="font-bold text-lg sm:text-xl mb-2 text-[#2056AE]">
          How was your appointment experience with Dr. {clinicName || ""}?
        </div>
        <div className="mb-4 text-sm text-gray-600 sm:text-base">
          Your experience will help thousands of people choose the right doctor.
        </div>
        <div className="mb-2 text-sm font-semibold sm:text-base">
          Q1. Would you like to recommend the doctor?{" "}
          <span className="text-red-500">*</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-2 sm:gap-4">
          <button
            className={`px-3 sm:px-4 py-2 rounded border ${
              story.recommend === true
                ? "bg-[#1890FF] text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => setStory({ ...story, recommend: true })}
          >
            Yes
          </button>
          <button
            className={`px-3 sm:px-4 py-2 rounded border ${
              story.recommend === false
                ? "bg-[#1890FF] text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => setStory({ ...story, recommend: false })}
          >
            No
          </button>
        </div>
        <div className="mb-2 text-sm font-semibold sm:text-base">
          Q2. For which health problem/treatment did you visit?{" "}
          <span className="text-red-500">*</span>
        </div>
        <input
          type="text"
          className="w-full px-3 py-2 mb-2 text-sm border rounded sm:text-base"
          placeholder="e.g. Stomach Ache, body pain"
          value={story.problem}
          onChange={(e) => setStory({ ...story, problem: e.target.value })}
        />
        <div className="mb-2 text-sm font-semibold sm:text-base">
          Q3. How long did you wait to be seen by the doctor?{" "}
          <span className="text-red-500">*</span>
        </div>
        <div className="flex flex-col gap-1 mb-2">
          {[
            "Less than 15 min",
            "15 min to 30 min",
            "30 min to 1 hour",
            "More than 1 hour",
          ].map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2 text-sm sm:text-base"
            >
              <input
                type="radio"
                name="waitTime"
                checked={story.waitTime === opt}
                onChange={() => setStory({ ...story, waitTime: opt })}
              />{" "}
              {opt}
            </label>
          ))}
        </div>
        <div className="mb-2 text-sm font-semibold sm:text-base">
          Q4. What do you think can be improved?{" "}
          <span className="text-red-500">*</span>
        </div>
        <div className="flex flex-col gap-1 mb-2">
          {[
            "Doctor friendliness",
            "Explanation of the health issue",
            "Treatment satisfaction",
            "Value for money",
            "Wait time",
          ].map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2 text-sm sm:text-base"
            >
              <input
                type="checkbox"
                checked={story.improvements.includes(opt)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setStory({
                    ...story,
                    improvements: checked
                      ? [...story.improvements, opt]
                      : story.improvements.filter((i) => i !== opt),
                  });
                }}
              />{" "}
              {opt}
            </label>
          ))}
        </div>
        <div className="mb-2 text-sm font-semibold sm:text-base">
          Q5. Tell us about your experience with the doctor.{" "}
          <span className="text-red-500">*</span>
        </div>
        <textarea
          className="w-full px-3 py-2 mb-2 text-sm border rounded sm:text-base"
          rows={4}
          placeholder="Start typing here..."
          value={story.experience}
          onChange={(e) => setStory({ ...story, experience: e.target.value })}
        />
        <div className="p-2 mb-2 text-xs rounded bg-yellow-50 sm:text-sm">
          Info: All patient stories go under strict moderation process before
          publishing.
        </div>
        <input
          type="text"
          className="w-full px-3 py-2 mb-2 text-sm border rounded sm:text-base"
          placeholder="Your name"
          value={story.name}
          onChange={(e) => setStory({ ...story, name: e.target.value })}
        />
        <input
          type="text"
          className="w-full px-3 py-2 mb-2 text-sm border rounded sm:text-base"
          placeholder="Your phone number"
          value={story.phone}
          onChange={(e) => setStory({ ...story, phone: e.target.value })}
        />
        <label className="flex items-center gap-2 mb-4 text-sm sm:text-base">
          <input
            type="checkbox"
            checked={story.anonymous}
            onChange={(e) =>
              setStory({ ...story, anonymous: e.target.checked })
            }
          />{" "}
          Keep my feedback story anonymous
        </label>
        <button
          className="bg-[#1890FF] text-white px-6 py-2 rounded font-bold w-full text-sm sm:text-base"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <div className="mt-2 text-xs text-gray-500">
          By submitting, you agree to{" "}
          <a href="#" className="underline">
            Terms and Conditions
          </a>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
