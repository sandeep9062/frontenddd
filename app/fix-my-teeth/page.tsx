"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/authSlice";
import allStatesAndUTs from "../data/allStatesAndUTs";
import FAQSection from "../components/FAQSection";
import ContactOptions from "../components/ContactOptions";
import { submitFixMyTeethCase } from "../../services/fixMyTeethApi";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Step from "../components/Step";

interface UploadedImage {
  file: File;
  url: string;
  name: string;
  size: number;
}

interface TeethProblems {
  [key: string]: string[];
}

interface Tooth {
  id: string | number;
  top: string;
  left: string;
}

interface Problem {
  id: string;
  name: string;
  icon: string;
  category: string;
}

const adultTeethCheckboxes = [
  { id: 1, top: "44%", left: "23%" },
  { id: 2, top: "38%", left: "23%" },
  { id: 3, top: "32%", left: "24%" },
  { id: 4, top: "25%", left: "27%" },
  { id: 5, top: "20%", left: "30%" },
  { id: 6, top: "15%", left: "33%" },
  { id: 7, top: "9.3%", left: "37%" },
  { id: 8, top: "6%", left: "46.5%" },
  { id: 9, top: "6%", left: "54%" },
  { id: 10, top: "8%", left: "62%" },
  { id: 11, top: "14%", left: "70%" },
  { id: 12, top: "19.5%", left: "73%" },
  { id: 13, top: "25.3%", left: "75.4%" },
  { id: 14, top: "31.5%", left: "77.6%" },
  { id: 15, top: "38%", left: "79%" },
  { id: 16, top: "44%", left: "79.2%" },
  { id: 17, top: "58%", left: "79.8%" },
  { id: 18, top: "64.9%", left: "79.5%" },
  { id: 19, top: "72%", left: "78.4%" },
  { id: 20, top: "78%", left: "76.2%" },
  { id: 21, top: "84%", left: "73%" },
  { id: 22, top: "88.6%", left: "68%" },
  { id: 23, top: "94%", left: "60.7%" },
  { id: 24, top: "95%", left: "54.4%" },
  { id: 25, top: "95.4%", left: "48%" },
  { id: 26, top: "94.5%", left: "41.2%" },
  { id: 27, top: "89.6%", left: "34%" },
  { id: 28, top: "84%", left: "29%" },
  { id: 29, top: "78%", left: "26%" },
  { id: 30, top: "71.6%", left: "24%" },
  { id: 31, top: "65%", left: "22.6%" },
  { id: 32, top: "58%", left: "22%" },
];

const kidTeethCheckboxes = [
  { id: "A", top: "36.8%", left: "20%" },
  { id: "B", top: "26.6%", left: "23.5%" },
  { id: "C", top: "18.5%", left: "28%" },
  { id: "D", top: "10.8%", left: "35.8%" },
  { id: "E", top: "7.4%", left: "46%" },
  { id: "F", top: "7%", left: "61%" },
  { id: "G", top: "11%", left: "72%" },
  { id: "H", top: "18%", left: "78%" },
  { id: "I", top: "26.5%", left: "83%" },
  { id: "J", top: "36.8%", left: "86.9%" },
  { id: "K", top: "62.6%", left: "20%" },
  { id: "L", top: "73%", left: "84%" },
  { id: "M", top: "81%", left: "79%" },
  { id: "N", top: "88%", left: "72%" },
  { id: "O", top: "92%", left: "62%" },
  { id: "P", top: "92%", left: "45%" },
  { id: "Q", top: "88%", left: "35%" },
  { id: "R", top: "81%", left: "28%" },
  { id: "S", top: "73%", left: "23%" },
  { id: "T", top: "62.6%", left: "86.9%" },
];

const dentalProblems = [
  // Common Problems
  { id: "toothache", name: "Toothache", icon: "😣", category: "common" },
  {
    id: "tooth-cavities",
    name: "Tooth Cavities",
    icon: "🦷",
    category: "common",
  },
  {
    id: "bleeding-gums",
    name: "Bleeding Gums",
    icon: "🩸",
    category: "common",
  },
  {
    id: "missing-tooth",
    name: "Missing Tooth",
    icon: "🦷",
    category: "common",
  },
  {
    id: "broken-chipped",
    name: "Broken/Chipped Tooth",
    icon: "💔",
    category: "common",
  },
  {
    id: "crooked-teeth",
    name: "Crooked Teeth",
    icon: "↪️",
    category: "common",
  },
  {
    id: "yellow-teeth",
    name: "Yellow Teeth",
    icon: "🟡",
    category: "common",
  },
  {
    id: "gaps-between-teeth",
    name: "Gaps Between Teeth",
    icon: "↔️",
    category: "common",
  },

  // Gum Problems
  { id: "gum-disease", name: "Gum Disease", icon: "🦷", category: "gum" },
  { id: "swollen-gums", name: "Swollen Gums", icon: "🔴", category: "gum" },
  { id: "receding-gums", name: "Receding Gums", icon: "⬇️", category: "gum" },
  {
    id: "gum-infection",
    name: "Severe Gum Infection",
    icon: "🦠",
    category: "gum",
  },
  { id: "gum-pocket", name: "Gum Pocket", icon: "🕳️", category: "gum" },
  { id: "bad-breath", name: "Bad Breath", icon: "💨", category: "gum" },

  // Jaw & TMJ Problems
  { id: "jaw-pain", name: "Jaw Pain", icon: "😖", category: "jaw" },
  { id: "tmj-disorder", name: "TMJ Disorder", icon: "⚙️", category: "jaw" },
  { id: "jaw-lock", name: "Jaw Lock", icon: "🔒", category: "jaw" },
  {
    id: "teeth-grinding",
    name: "Teeth Grinding",
    icon: "😬",
    category: "jaw",
  },
  { id: "jaw-clenching", name: "Jaw Clenching", icon: "💪", category: "jaw" },

  // Tooth Problems
  {
    id: "tooth-sensitivity",
    name: "Tooth Sensitivity",
    icon: "❄️",
    category: "tooth",
  },
  {
    id: "wisdom-tooth",
    name: "Wisdom Tooth Problems",
    icon: "🦷",
    category: "tooth",
  },
  { id: "tooth-wear", name: "Tooth Wear", icon: "⚡", category: "tooth" },
  { id: "loose-tooth", name: "Loose Tooth", icon: "🪫", category: "tooth" },
  {
    id: "fractured-tooth",
    name: "Fractured Tooth",
    icon: "💥",
    category: "tooth",
  },
  {
    id: "tooth-pain",
    name: "Severe Tooth Pain",
    icon: "⚡",
    category: "tooth",
  },

  // Cosmetic Problems
  {
    id: "smile-makeover",
    name: "Smile Makeover",
    icon: "✨",
    category: "cosmetic",
  },
  {
    id: "teeth-whitening",
    name: "Teeth Whitening",
    icon: "⚪",
    category: "cosmetic",
  },
  {
    id: "gummy-smile",
    name: "Gummy Smile",
    icon: "😊",
    category: "cosmetic",
  },
  {
    id: "front-tooth-gap",
    name: "Front Tooth Gap",
    icon: "↔️",
    category: "cosmetic",
  },
  {
    id: "dental-jewellery",
    name: "Dental Jewellery",
    icon: "💎",
    category: "cosmetic",
  },
  {
    id: "white-spots",
    name: "White Spots on Teeth",
    icon: "⚪",
    category: "cosmetic",
  },

  // Treatment Needs
  {
    id: "root-canal",
    name: "Root Canal Treatment",
    icon: "🔧",
    category: "treatment",
  },
  {
    id: "dental-implants",
    name: "Dental Implants",
    icon: "🦷",
    category: "treatment",
  },
  {
    id: "dental-braces",
    name: "Dental Braces",
    icon: "🦷",
    category: "treatment",
  },
  {
    id: "tooth-extraction",
    name: "Tooth Extraction",
    icon: "🔧",
    category: "treatment",
  },
  {
    id: "dental-crown",
    name: "Dental Crown",
    icon: "👑",
    category: "treatment",
  },
  {
    id: "tooth-filling",
    name: "Tooth Filling",
    icon: "🔧",
    category: "treatment",
  },

  // Children's Problems
  {
    id: "kids-cavities",
    name: "Children's Cavities",
    icon: "👶",
    category: "kids",
  },
  {
    id: "thumb-sucking",
    name: "Thumb Sucking",
    icon: "👍",
    category: "kids",
  },
  {
    id: "mouth-breathing",
    name: "Mouth Breathing",
    icon: "💨",
    category: "kids",
  },
  {
    id: "baby-teeth",
    name: "Baby Teeth Problems",
    icon: "🍼",
    category: "kids",
  },

  // Oral Health Issues
  { id: "dry-mouth", name: "Dry Mouth", icon: "🏜️", category: "oral" },
  { id: "mouth-sores", name: "Mouth Sores", icon: "🔴", category: "oral" },
  {
    id: "burning-sensation",
    name: "Burning Sensation",
    icon: "🔥",
    category: "oral",
  },
  {
    id: "oral-cancer",
    name: "Oral Cancer Screening",
    icon: "🔍",
    category: "oral",
  },

  // Other
  { id: "other", name: "Other", icon: "📝", category: "other" },
];

const steps = [
  {
    number: 1,
    title: "Select Tooth & Problems",
    icon: "🦷",
    color: "bg-blue-500",
  },
  {
    number: 2,
    title: "Select Preferred Location",
    icon: "📍",
    color: "bg-green-500",
  },
  { number: 3, title: "Upload Photos", icon: "📷", color: "bg-purple-500" },
  { number: 4, title: "Pay ₹149", icon: "💳", color: "bg-orange-500" },
  {
    number: 5,
    title: "Receive Report in 24 hrs",
    icon: "📄",
    color: "bg-red-500",
  },
];

const FixMyTeeth = () => {
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState("");
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [otherProblemText, setOtherProblemText] = useState("");
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [quoteForm, setQuoteForm] = useState({ name: "", email: "" });
  const [selectedType, setSelectedType] = useState<"adult" | "kid">("adult");
  const [teethProblems, setTeethProblems] = useState<TeethProblems>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTooth, setCurrentTooth] = useState<string | number | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      setQuoteForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    }));
    setUploadedImages((prevImages) => [...prevImages, ...newImages]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Revoke object URLs on cleanup
  useEffect(() => {
    return () => {
      uploadedImages.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, [uploadedImages]);

  const handleToothClick = (toothId: string | number) => {
    setCurrentTooth(toothId);
    setIsModalOpen(true);
  };

  const handleProblemSelection = (problemId: string) => {
    if (!currentTooth) return;
    const currentProblems = teethProblems[currentTooth] || [];
    const newProblems = currentProblems.includes(problemId)
      ? currentProblems.filter((p) => p !== problemId)
      : [...currentProblems, problemId];
    setTeethProblems({ ...teethProblems, [currentTooth]: newProblems });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentTooth(null);
  };

  const handleQuoteFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuoteForm({ ...quoteForm, [e.target.name]: e.target.value });
  };

  const handleQuoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", quoteForm.name);
    formData.append("email", quoteForm.email);
    formData.append("teethProblems", JSON.stringify(teethProblems));
    formData.append("selectedType", selectedType);
    formData.append("selectedState", selectedState);
    formData.append("otherProblemText", otherProblemText);
    uploadedImages.forEach((image) => formData.append("photo", image.file));

    try {
      const result = await submitFixMyTeethCase(formData);
      if (result.success) {
        toast.success("Quote request submitted successfully!");
        setQuoteForm({ name: "", email: "" });
        setTeethProblems({});
        setSelectedState("");
        setOtherProblemText("");
        setUploadedImages([]);
        setShowQuoteForm(false);
      } else {
        toast.error(`Submission failed: ${result.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-center" />
      <div className="max-w-6xl px-4 py-8 mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Fix My Teeth
            </span>
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
            Get expert advice and personalized treatment plans.
          </p>
        </header>

        {/* Main */}
        <main className="p-8 bg-white border border-gray-200 shadow-2xl rounded-3xl">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            {/* Left */}
            <div className="lg:w-1/2">
              <div className="relative overflow-hidden rounded-2xl aspect-video">
                <Image
                  src="/dentist.jpg"
                  alt="Dentist"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Treatment Plan & Quote in 24 Hours
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                For just <span className="font-bold text-blue-600">₹149</span>,
                select your dental problems and get a detailed plan.
              </p>
              <Button onClick={() => setShowQuoteForm(!showQuoteForm)}>
                {showQuoteForm ? "Hide Form" : "Start Now - ₹149"}
              </Button>
            </div>

            {/* Right Steps */}
            <div className="relative lg:w-1/2">
              {steps.map((step, index) => (
                <Step
                  key={step.number}
                  step={step}
                  isLast={index === steps.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Quote Form */}
          {showQuoteForm && (
            <section className="pt-10 mt-10 border-t border-gray-200">
              {/* Teeth Selector */}
              <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-2xl">
                <div className="flex p-1 mb-8 bg-gray-200 rounded-full">
                  {["adult", "kid"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type as "adult" | "kid")}
                      className={`px-6 py-2 text-sm font-semibold rounded-full ${
                        selectedType === type
                          ? "bg-white text-blue-600 shadow"
                          : "text-gray-600"
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>

                <div className="relative w-full max-w-2xl aspect-square">
                  <Image
                    src={selectedType === "adult" ? "/adults.png" : "/kids.png"}
                    alt={`${selectedType} Teeth`}
                    fill
                    className="object-contain"
                  />
                  <div className="absolute top-0 left-0 w-full h-full">
                    {(selectedType === "adult"
                      ? adultTeethCheckboxes
                      : kidTeethCheckboxes
                    ).map((tooth) => (
                      <button
                        key={tooth.id}
                        onClick={() => handleToothClick(tooth.id)}
                        className={`absolute w-5 h-5 transition-all duration-200 transform border-2 rounded-full ${
                          teethProblems[tooth.id]?.length > 0
                            ? "bg-yellow-400 border-yellow-600"
                            : "bg-transparent border-blue-500"
                        } hover:scale-125`}
                        style={{
                          top: tooth.top,
                          left: tooth.left,
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Problem Modal */}
              <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                title={`Select Problems for Tooth ${currentTooth}`}
              >
                <div className="max-h-[60vh] overflow-y-auto p-2">
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
                    {dentalProblems.map((problem) => (
                      <button
                        key={problem.id}
                        onClick={() => handleProblemSelection(problem.id)}
                        className={`flex flex-col items-center justify-center p-4 text-center border-2 rounded-lg transition-all duration-200 ${
                          currentTooth &&
                          teethProblems[currentTooth]?.includes(problem.id)
                            ? "bg-blue-100 border-blue-500 scale-105 shadow-md"
                            : "border-gray-200 hover:bg-gray-50 hover:border-gray-400"
                        }`}
                      >
                        <div className="text-3xl">{problem.icon}</div>
                        <div className="mt-2 text-sm font-semibold">
                          {problem.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <Button onClick={handleModalClose} className="w-full mt-6">
                  Done
                </Button>
              </Modal>

              {/* Summary & Form */}
              <div className="pt-10 mt-10">
                <h3 className="text-2xl font-bold text-center text-gray-900">
                  Summary of Problems
                </h3>
                <div className="p-6 mt-6 bg-gray-50 rounded-xl">
                  {Object.keys(teethProblems).length > 0 ? (
                    <ul className="space-y-4">
                      {Object.entries(teethProblems).map(
                        ([tooth, problems]) => (
                          <li key={tooth} className="flex items-start">
                            <span className="font-bold text-blue-600 w-28">
                              Tooth {tooth}:
                            </span>
                            <span className="flex-1">
                              {problems
                                .map(
                                  (p) =>
                                    dentalProblems.find((dp) => dp.id === p)
                                      ?.name
                                )
                                .join(", ")}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p className="text-center text-gray-500">
                      No problems selected yet. Click on a tooth to add
                      problems.
                    </p>
                  )}
                </div>

                {Object.values(teethProblems).flat().includes("other") && (
                  <div className="mt-8">
                    <h4 className="mb-2 text-lg font-semibold text-gray-800">
                      Please describe the 'Other' problem:
                    </h4>
                    <textarea
                      value={otherProblemText}
                      onChange={(e) => setOtherProblemText(e.target.value)}
                      placeholder="Describe the other dental problem in detail..."
                      rows={4}
                      className="w-full p-4 transition-shadow border-2 border-gray-200 outline-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}

                <div className="mt-8">
                  <h4 className="mb-2 text-lg font-semibold text-gray-800">
                    Preferred Treatment Location
                  </h4>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full p-4 bg-white border-2 border-gray-200 outline-none rounded-xl"
                  >
                    <option value="">Select State/UT</option>
                    {allStatesAndUTs.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <form onSubmit={handleQuoteSubmit} className="mt-8">
                  {/* Dropzone for Image Uploads */}
                  <div className="mt-8">
                    <h4 className="mb-4 text-lg font-semibold text-gray-800">
                      Upload Photos (Drag & Drop)
                    </h4>
                    <div
                      {...getRootProps()}
                      className={`p-10 text-center border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                        isDragActive
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p className="text-blue-600">Drop the files here ...</p>
                      ) : (
                        <p className="text-gray-500">
                          Drag & drop some files here, or click to select files
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-4">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <Image
                            src={image.url}
                            alt={image.name}
                            width={150}
                            height={150}
                            className="object-cover w-full h-auto rounded-lg aspect-square"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setUploadedImages(
                                uploadedImages.filter((_, i) => i !== index)
                              )
                            }
                            className="absolute p-1 text-xs leading-none text-white transition-opacity bg-red-600 rounded-full opacity-0 top-1 right-1 group-hover:opacity-100"
                          >
                            &#x2715;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-6 mt-8 md:grid-cols-2">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={quoteForm.name}
                      onChange={handleQuoteFormChange}
                      required
                      className="w-full p-4 transition-shadow border-2 border-gray-200 outline-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={quoteForm.email}
                      onChange={handleQuoteFormChange}
                      required
                      className="w-full p-4 transition-shadow border-2 border-gray-200 outline-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <Button
                    type="submit"
                    className={`w-full mt-8 ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : "Get My Treatment Plan - Pay ₹149"}
                  </Button>
                </form>
              </div>
            </section>
          )}
        </main>

        <FAQSection />
        <ContactOptions />
      </div>
    </div>
  );
};

export default FixMyTeeth;
