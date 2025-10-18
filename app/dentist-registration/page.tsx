"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { registerDentalPractitioner } from "@/services/dentalApi";
import axios from "axios";


const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal"
];

const specialities = [
  "General Dentist", "Orthodontist", "Periodontist", "Endodontist", "Prosthodontist",
  "Oral Surgeon", "Pedodontist", "Oral Radiologist", "Other"
];

const DENTAL_PROBLEMS = [
  "Adding Bone to the Socket", "Bad Breath", "Burning Mouth", "Complete Denture", "Biting Down Hard",
  "Dental Implants", "Dental Braces", "Dry Mouth", "Dental Jewellery", "Fractured Tooth",
  "Facial Twitch", "Mouth Breathing in Kids", "Front Tooth Gap", "Gum Treatment", "Diabetic Mouth Changes",
  "Lump on the Facial Nerve", "Loud Sleeping", "Mouth Guard for Sports", "Missing Front Tooth", "Mouth Ulcer",
  "Mouth Red Patch", "Mouth Infection", "Mouth Cancer", "Mouth Care After Cancer", "One Sided Facial Weakness",
  "Partial Tooth Cap", "Producing Too Much Saliva", "Pain in the Jaw Joint", "Root Canal Treatment", "Ringing Sound in Ears",
  "Re-Root Canal Treatment", "Removable Teeth", "Split Lip", "Smoking Habit", "Stone in the Saliva Gland",
  "Smile Makeover", "Severe Gum Infection", "Tight Tongue Skin", "Teeth Present at Birth", "Tongue Pushing",
  "Trapped Back Tooth", "Tooth Crown", "Tooth Wear", "Tooth Rescue Treatment", "Tooth Removal",
  "Teeth Whitening", "Thin Shells for Teeth", "Teeth Cleaning & Polishing", "Tooth Replacement", "Tooth is Stuck",
  "Thumb Sucking", "Teeth Protector for Night", "Tooth Cavities", "White Spots on Teeth", "Invisible Braces",
  "Dry Peeling Lips", "Wearing Down of Teeth", "Gum Pocket", "Sensitive Teeth", "Tooth Filling",
  "Crooked Tooth", "Bleeding Gums", "Swollen Gums", "Loose Teeth", "Discoloured Teeth",
  "Swelling Inside Mouth", "Eruption Issues in Kids", "Grinding Teeth at Night", "Audible Breathing", "Uncomfortable Denture",
  "Facial Asymmetry", "Oral Cancer Screening", "Delayed Eruption of Teeth", "Hole in the Roof of the Mouth", "Nutrition Deficiency Symptoms",
  "Difficulty in Chewing & Kids Speaking", "Facial Muscle Twitching on One Side", "Braces Adjustment", "Toothache",
  "Dental Implant Pain", "Wisdom Tooth Swelling"
];

interface DentistForm {
  name: string;
  phone: string;
  email: string;
  state: string;
  problems: string[];
  image: File | null;
  gradCollege: string;
  gradYear: string;
  gradReg: string;
  postCollege: string;
  postYear: string;
  postSpec: string;
  otherQual: string;
  hasClinic: boolean;
  clinicName: string;
  clinicPhone: string;
  clinicAddress: string;
  clinicInsta: string;
  clinicWebsite: string;
  clinicYoutube: string;
  clinicImage: File | null;
  agreeDisclaimer: boolean;
}

const DentistRegistrationForm: React.FC = () => {
  const [form, setForm] = useState<DentistForm>({
    name: "", phone: "", email: "", state: "", problems: [], image: null,
    gradCollege: "", gradYear: "", gradReg: "", postCollege: "", postYear: "",
    postSpec: "", otherQual: "", hasClinic: false, clinicName: "", clinicPhone: "",
    clinicAddress: "", clinicInsta: "", clinicWebsite: "", clinicYoutube: "", clinicImage: null,
    agreeDisclaimer: false
  });
  const [problemsOpen, setProblemsOpen] = useState<boolean>(false);
  const [problemsSearch, setProblemsSearch] = useState<string>("");
  const problemsRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setForm(f => ({ ...f, [name]: checked }));
    } else if (type === "file") {
      if (files && files[0]) {
        const file = files[0];
        if (file.size > 600 * 1024) {
          alert(`File size must be less than 600KB. Selected file is ${(file.size / 1024).toFixed(1)}KB`);
          return;
        }
        setForm(f => ({ ...f, [name]: file }));
      }
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleProblemToggle = (problem: string) => {
    setForm(f => ({
      ...f,
      problems: f.problems.includes(problem)
        ? f.problems.filter(p => p !== problem)
        : [...f.problems, problem]
    }));
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (problemsRef.current && !problemsRef.current.contains(e.target as Node)) {
        setProblemsOpen(false);
      }
    };
    if (problemsOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [problemsOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); setSuccess(""); setLoading(true);

    try {
      if (!form.name || !form.phone || !form.email || !form.state || !form.gradCollege || !form.gradYear || !form.gradReg) {
        setError("Please fill all required fields.");
        setLoading(false);
        return;
      }
      if (!form.image) {
        setError("Personal document file is required.");
        setLoading(false);
        return;
      }

      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("phoneNumber", form.phone);
      fd.append("state", form.state);
      fd.append("gradCollege", form.gradCollege);
      fd.append("gradYear", form.gradYear);
      fd.append("gradReg", form.gradReg);
      fd.append("postCollege", form.postCollege);
      fd.append("postYear", form.postYear);
      fd.append("postSpec", form.postSpec);
      fd.append("otherQual", form.otherQual);
      fd.append("hasClinic", form.hasClinic.toString());
      fd.append("agreeDisclaimer", form.agreeDisclaimer.toString());
      fd.append("file", form.image);
      fd.append("problems", form.problems.join(','));

      if (form.hasClinic) {
        if (form.clinicName) fd.append("ClinicName", form.clinicName);
        if (form.clinicPhone) fd.append("ClinicPhoneNumber", form.clinicPhone);
        if (form.clinicAddress) fd.append("ClinicAddress", form.clinicAddress);
        if (form.clinicInsta) fd.append("ClinicInstagram", form.clinicInsta);
        if (form.clinicWebsite) fd.append("ClinicWebsite", form.clinicWebsite);
        if (form.clinicYoutube) fd.append("ClinicYoutube", form.clinicYoutube);
        if (form.clinicImage) fd.append("ClinicFile", form.clinicImage);
      }

      const res = await registerDentalPractitioner(fd);
      if (res && res.success) {
        setSuccess(res.message || "Registration successful!");
        setTimeout(() => router.push('/pricing-plans'), 1200);
      } else {
        setError(res?.message || "Registration failed. Try again.");
      }
    } catch (err) {
      let errorMessage = "Registration failed. Try again.";
      if (axios.isAxiosError(err) && err.response) {
        errorMessage = err.response.data?.message || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#eaf2fb] relative p-4">
      <form
        className="relative z-10 w-full max-w-2xl mx-auto rounded-3xl shadow-2xl p-10 md:p-14 flex flex-col gap-8 bg-white border border-[#2C73D2]/10"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-[#2C73D2] mb-2 text-center">Dentist Registration</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="rounded-xl px-5 py-3 border border-gray-200 focus:border-[#2C73D2] outline-none" required />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="rounded-xl px-5 py-3 border border-gray-200 focus:border-[#2C73D2] outline-none" required />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="rounded-xl px-5 py-3 border border-gray-200 focus:border-[#2C73D2] outline-none" required />
          <select name="state" value={form.state} onChange={handleChange} className="rounded-xl px-5 py-3 border border-gray-200 focus:border-[#2C73D2] outline-none" required>
            <option value="">Select State</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Problems Multi-Select */}
        <div className="flex flex-col gap-1 md:col-span-2" ref={problemsRef}>
          <label className="text-sm font-semibold text-[#2C73D2]">Problems You Treat (Select Multiple)</label>
          <div className="relative">
            <div
              className="flex flex-wrap items-center gap-2 p-2 min-h-[40px] text-sm border border-gray-200 bg-white rounded-xl cursor-text"
              onClick={() => setProblemsOpen(true)}
            >
              {form.problems.length === 0 && <span className="text-gray-400">Select problems...</span>}
              {form.problems.map(problem => (
                <span key={problem} className="flex items-center gap-1 bg-[#eaf2fb] text-[#2C73D2] font-medium px-2 py-1 rounded-md">
                  {problem}
                  <button type="button" onClick={e => { e.stopPropagation(); handleProblemToggle(problem); }}>×</button>
                </span>
              ))}
              <input
                type="text"
                value={problemsSearch}
                onChange={e => setProblemsSearch(e.target.value)}
                onFocus={() => setProblemsOpen(true)}
                placeholder={form.problems.length === 0 ? "Select problems..." : ""}
                className="flex-grow bg-transparent border-none outline-none p-0 min-w-[80px]"
              />
            </div>

            {problemsOpen && (
              <div className="absolute z-10 w-full mt-2 overflow-y-auto bg-white border border-gray-200 shadow-lg rounded-xl max-h-60">
                <ul className="p-1">
                  {DENTAL_PROBLEMS.filter(p =>
                    !form.problems.includes(p) &&
                    p.toLowerCase().includes(problemsSearch.toLowerCase())
                  ).map(problem => (
                    <li key={problem} className="p-2 cursor-pointer rounded-md hover:bg-[#eaf2fb]" onClick={() => handleProblemToggle(problem)}>
                      {problem}
                    </li>
                  ))}
                  {DENTAL_PROBLEMS.filter(p =>
                    !form.problems.includes(p) &&
                    p.toLowerCase().includes(problemsSearch.toLowerCase())
                  ).length === 0 && <li className="p-2 text-center text-gray-400">No options found.</li>}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-sm font-semibold text-[#2C73D2]">Dentist Image (Max 600KB)</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} required />
        </div>

        {/* Graduation Details */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-bold text-[#2C73D2] mb-4 border-b pb-2">Graduation Details</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <input name="gradCollege" value={form.gradCollege} onChange={handleChange} placeholder="College" className="rounded-xl px-5 py-3 border border-gray-200 focus:border-[#2C73D2] outline-none" required />
            <input name="gradYear" value={form.gradYear} onChange={handleChange} placeholder="Year" className="rounded-xl px-5 py-3 border border-gray-200 focus:border-[#2C73D2] outline-none" required />
            <input name="gradReg" value={form.gradReg} onChange={handleChange} placeholder="Registration No." className="rounded-xl px-5 py-3 border border-gray-200 focus:border-[#2C73D2] outline-none" required />
          </div>
        </div>

        {/* Post Graduation Details */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-bold text-[#2C73D2] mb-4 border-b pb-2">Post Graduation Details (Optional)</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <input name="postCollege" value={form.postCollege} onChange={handleChange} placeholder="College" className="rounded-xl px-5 py-3 border border-gray-200 focus:border-[#2C73D2] outline-none" />
            <input name="postYear" value={form.postYear} onChange={handleChange} placeholder="Year" className="rounded-xl px-5 py-3 border border-gray-200 focus:border-[#2C73D2] outline-none" />
            <select name="postSpec" value={form.postSpec} onChange={handleChange} className="rounded-xl px-5 py-3 border border-gray-200 focus:border-[#2C73D2] outline-none">
              <option value="">Select Speciality</option>
              {specialities.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="md:col-span-2">
          <input name="otherQual" value={form.otherQual} onChange={handleChange} placeholder="Other Qualifications (Optional)" className="w-full rounded-xl px-5 py-3 border border-gray-200 focus:border-[#2C73D2] outline-none" />
        </div>

        {/* Clinic Details */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-4">
            <input type="checkbox" name="hasClinic" checked={form.hasClinic} onChange={handleChange} id="hasClinic" className="w-5 h-5 rounded" />
            <label htmlFor="hasClinic" className="text-lg font-semibold text-[#2C73D2]">I have a clinic</label>
          </div>
        </div>

        {form.hasClinic && (
          <div className="grid grid-cols-1 gap-6 p-6 border md:col-span-2 md:grid-cols-2 bg-gray-50 rounded-xl">
            <input name="clinicName" value={form.clinicName} onChange={handleChange} placeholder="Clinic Name" className="rounded-xl px-5 py-3 border border-gray-200 focus:border-[#2C73D2] outline-none" />
            <input name="clinicPhone" value={form.clinicPhone} onChange={handleChange} placeholder="Clinic Phone" className="rounded-xl px-5 py-3 border border-gray-200 focus:border-[#2C73D2] outline-none" />
            <input name="clinicAddress" value={form.clinicAddress} onChange={handleChange} placeholder="Clinic Address" className="md:col-span-2 rounded-xl px-5 py-3 border border-gray-200 focus:border-[#2C73D2] outline-none" />
            <input name="clinicInsta" value={form.clinicInsta} onChange={handleChange} placeholder="Instagram URL" className="rounded-xl px-5 py-3 border border-gray-200 focus:border-[#2C73D2] outline-none" />
            <input name="clinicWebsite" value={form.clinicWebsite} onChange={handleChange} placeholder="Website URL" className="rounded-xl px-5 py-3 border border-gray-200 focus:border-[#2C73D2] outline-none" />
            <input name="clinicYoutube" value={form.clinicYoutube} onChange={handleChange} placeholder="Youtube URL" className="rounded-xl px-5 py-3 border border-gray-200 focus:border-[#2C73D2] outline-none" />
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-[#2C73D2]">Clinic Image (Max 600KB)</label>
              <input type="file" name="clinicImage" accept="image/*" onChange={handleChange} />
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 md:col-span-2">
          <input type="checkbox" name="agreeDisclaimer" checked={form.agreeDisclaimer} onChange={handleChange} id="agreeDisclaimer" required className="w-5 h-5 rounded" />
          <label htmlFor="agreeDisclaimer" className="text-sm">I agree to the terms and conditions.</label>
        </div>

        <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-[#2C73D2] to-[#2056AE] text-white font-bold text-xl" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
        {error && <div className="mt-2 text-center text-red-500">{error}</div>}
        {success && <div className="mt-2 text-center text-green-600">{success}</div>}
      </form>
    </div>
  );
};

export default DentistRegistrationForm;
