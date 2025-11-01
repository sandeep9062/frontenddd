"use client";

import React, { useState, useEffect } from "react";
import axios from "@/lib/axios";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select as ShadSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Select from "react-select";

interface Clinic {
  _id: string;
  name: string;
  description: string;
  location: string;
  state: string;
  images: string[];
  specialities: string[];
  offers: string[];
  problems: string[];
  website?: string;
  whatsapp?: string;
  instagramId?: string;
  appointmentCharges?: number;
  noOfDoctors?: number;
}

interface Consultation {
  _id: string;
  patientName: string;
  user?: {
    name: string;
  };
  selectedDate: string;
  selectedSlot: string;
  status: string;
  paymentStatus: string;
  patientEmail: string;
  message: string;
}

export default function DentistProfilePage() {
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const specialities = [
    "General Dentist",
    "Orthodontist",
    "Periodontist",
    "Endodontist",
    "Prosthodontist",
    "Oral Surgeon",
    "Pedodontist",
    "Oral Radiologist",
    "Other",
  ];

  const DENTAL_PROBLEMS = [
    "Adding Bone to the Socket",
    "Bad Breath",
    "Burning Mouth",
    "Complete Denture",
    "Biting Down Hard",
    "Dental Implants",
    "Dental Braces",
    "Dry Mouth",
    "Dental Jewellery",
    "Fractured Tooth",
    "Facial Twitch",
    "Mouth Breathing in Kids",
    "Front Tooth Gap",
    "Gum Treatment",
    "Diabetic Mouth Changes",
    "Lump on the Facial Nerve",
    "Loud Sleeping",
    "Mouth Guard for Sports",
    "Missing Front Tooth",
    "Mouth Ulcer",
    "Mouth Red Patch",
    "Mouth Infection",
    "Mouth Cancer",
    "Mouth Care After Cancer",
    "One Sided Facial Weakness",
    "Partial Tooth Cap",
    "Producing Too Much Saliva",
    "Pain in the Jaw Joint",
    "Root Canal Treatment",
    "Ringing Sound in Ears",
    "Re-Root Canal Treatment",
    "Removable Teeth",
    "Split Lip",
    "Smoking Habit",
    "Stone in the Saliva Gland",
    "Smile Makeover",
    "Severe Gum Infection",
    "Tight Tongue Skin",
    "Teeth Present at Birth",
    "Tongue Pushing",
    "Trapped Back Tooth",
    "Tooth Crown",
    "Tooth Wear",
    "Tooth Rescue Treatment",
    "Tooth Removal",
    "Teeth Whitening",
    "Thin Shells for Teeth",
    "Teeth Cleaning & Polishing",
    "Tooth Replacement",
    "Tooth is Stuck",
    "Thumb Sucking",
    "Teeth Protector for Night",
    "Tooth Cavities",
    "White Spots on Teeth",
    "Invisible Braces",
    "Dry Peeling Lips",
    "Wearing Down of Teeth",
    "Gum Pocket",
    "Sensitive Teeth",
    "Tooth Filling",
    "Crooked Tooth",
    "Bleeding Gums",
    "Swollen Gums",
    "Loose Teeth",
    "Discoloured Teeth",
    "Swelling Inside Mouth",
    "Eruption Issues in Kids",
    "Grinding Teeth at Night",
    "Audible Breathing",
    "Uncomfortable Denture",
    "Facial Asymmetry",
    "Oral Cancer Screening",
    "Delayed Eruption of Teeth",
    "Hole in the Roof of the Mouth",
    "Nutrition Deficiency Symptoms",
    "Difficulty in Chewing & Kids Speaking",
    "Facial Muscle Twitching on One Side",
    "Braces Adjustment",
    "Toothache",
    "Dental Implant Pain",
    "Wisdom Tooth Swelling",
  ];

  const [form, setForm] = useState<{
    name: string;
    phone: string;
    clinicName: string;
    problems: string[];
    specialization: string;
    experienceYears: number;
    consultationCharges: number;
    ratings: number;
    certifications: string;
    clinicAddress: string;
    states: string;
    about: string;
    image: string;
    gradCollege: string;
    gradYear: string;
    gradReg: string;
    postCollege: string;
    postYear: string;
    postSpec: string;
    otherQual: string;
    hasClinic: boolean;
    agreeDisclaimer: boolean;
  }>({
    name: "",
    phone: "",
    clinicName: "",
    problems: [],
    specialization: "",
    experienceYears: 0,
    consultationCharges: 0,
    ratings: 0,
    certifications: "",
    clinicAddress: "",
    states: "",
    about: "",
    image: "",
    gradCollege: "",
    gradYear: "",
    gradReg: "",
    postCollege: "",
    postYear: "",
    postSpec: "",
    otherQual: "",
    hasClinic: false,
    agreeDisclaimer: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedConsultation, setSelectedConsultation] =
    useState<Consultation | null>(null);
  const [statusFilter, setStatusFilter] = useState("All");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-600";
      case "Confirmed":
        return "text-blue-600";
      case "Cancelled":
        return "text-red-600";
      case "Pending":
      default:
        return "text-yellow-600";
    }
  };

  useEffect(() => {
    const fetchProfileAndClinics = async () => {
      try {
        const token = localStorage.getItem("token");
        const profileRes = await axios.get("/api/v1/dentists/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { user, profile } = profileRes.data;

        setForm({
          name: user?.name || "",
          phone: user?.phone || "",
          clinicName: profile?.clinicName || "",
          problems: profile?.problems || [],
          specialization: String(profile?.specialization || ""),
          experienceYears: profile?.experienceYears || 0,
          consultationCharges: profile?.consultationCharges || 0,
          ratings: profile?.ratings || 0,
          certifications: profile?.certifications?.join(", ") || "",
          clinicAddress: profile?.clinicAddress || "",
          states: String(profile?.states || ""),
          about: profile?.about || "",
          image: profile?.image || "",
          gradCollege: profile?.gradCollege || "",
          gradYear: profile?.gradYear || "",
          gradReg: profile?.gradReg || "",
          postCollege: profile?.postCollege || "",
          postYear: profile?.postYear || "",
          postSpec: profile?.postSpec || "",
          otherQual: profile?.otherQual || "",
          hasClinic: profile?.hasClinic || false,
          agreeDisclaimer: profile?.agreeDisclaimer || false,
        });

        const clinicsRes = await axios.get("/api/v1/clinics/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClinics(clinicsRes.data.data);

        if (user?._id) {
          setUserId(user._id);
          const consultationsRes = await axios.get(
            `/api/v1/consultations/dentist/my`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setConsultations(consultationsRes.data.data || []);
        }
      } catch {
        toast.error("Failed to load profile or clinics");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndClinics();
  }, []);

  const handleStatusChange = async (
    consultationId: string,
    newStatus: string
  ) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/v1/consultations/${consultationId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update the local state to reflect the change
      setConsultations((prevConsultations) =>
        prevConsultations.map((c) =>
          c._id === consultationId ? { ...c, status: newStatus } : c
        )
      );

      // Also update the selected consultation if it's the one being edited
      if (selectedConsultation?._id === consultationId) {
        setSelectedConsultation({ ...selectedConsultation, status: newStatus });
      }

      toast.success("Status updated successfully!");
    } catch (error) {
      toast.error("Failed to update status.");
      console.error("Error updating status:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleMultiSelectChange = (
    selectedOptions: readonly { value: string; label: string }[]
  ) => {
    setForm({
      ...form,
      problems: selectedOptions.map((option) => option.value),
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key !== "image") {
        formData.append(key, String(value));
      }
    });

    if (imageFile) {
      formData.append("image", imageFile);
    } else {
      formData.append("image", form.image);
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put("/api/v1/dentists/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl p-6 mx-auto mt-10 text-center">
        <p className="text-gray-500 animate-pulse">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl p-6 mx-auto mt-10">
      <Card className="border border-gray-200 shadow-lg rounded-2xl">
        <CardHeader className="flex flex-col items-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">Dentist Profile</h2>
          <p className="text-sm text-gray-500">
            Update your personal & clinic information
          </p>
        </CardHeader>

        {form.specialization && (
          <div className="p-4 mx-6 mb-4 text-center bg-blue-100 border border-blue-200 rounded-lg">
            <p className="text-lg font-semibold text-blue-800">
              Your Specialization:{" "}
              <span className="font-bold">{form.specialization}</span>
            </p>
          </div>
        )}

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image */}
            <div className="flex flex-col items-center space-y-2">
              {form.image ? (
                <Image
                  src={form.image}
                  alt="Profile"
                  width={100}
                  height={100}
                  className="object-cover border rounded-full"
                />
              ) : (
                <div className="flex items-center justify-center w-24 h-24 text-gray-500 bg-gray-200 rounded-full">
                  No Image
                </div>
              )}
              <label className="text-sm text-blue-600 cursor-pointer hover:underline">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  hidden
                />
                Upload Photo
              </label>
            </div>
            {/* Personal Info */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
              />
              <Input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
              />
            </div>
            {/* Clinic Info */}
            <Input
              name="clinicName"
              value={form.clinicName}
              onChange={handleChange}
              placeholder="Clinic Name"
            />
            <ShadSelect
              name="specialization"
              onValueChange={(value) =>
                handleSelectChange("specialization", value)
              }
              value={form.specialization || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Speciality" />
              </SelectTrigger>
              <SelectContent>
                {specialities.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </ShadSelect>
            <Select
              isMulti
              name="problems"
              options={DENTAL_PROBLEMS.map((p) => ({ value: p, label: p }))}
              onChange={handleMultiSelectChange}
              value={form.problems.map((p) => ({ value: p, label: p }))}
            />
            <ShadSelect
              name="states"
              onValueChange={(value) => handleSelectChange("states", value)}
              value={form.states || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {states.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </ShadSelect>
            <Input
              name="experienceYears"
              type="number"
              value={form.experienceYears}
              onChange={handleChange}
              placeholder="Experience (Years)"
            />{" "}
            <Input
              name="ratings"
              type="number"
              value={form.ratings}
              onChange={handleChange}
              placeholder="Rating (less than 5)"
            />{" "}
            <Input
              name="consultationCharges"
              type="number"
              value={form.consultationCharges}
              onChange={handleChange}
              placeholder=" Consultation Charges(Rupees)"
            />
            <Input
              name="certifications"
              value={form.certifications}
              onChange={handleChange}
              placeholder="Certifications (comma separated)"
            />
            <Textarea
              name="clinicAddress"
              value={form.clinicAddress}
              onChange={handleChange}
              placeholder="Clinic Address"
            />
            <Textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              placeholder="About You / Clinic"
            />
            {/* Education Info */}
            <h3 className="pt-4 font-semibold text-gray-700 border-t">
              Education & Qualifications
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                name="gradCollege"
                value={form.gradCollege}
                onChange={handleChange}
                placeholder="Graduation College *"
                required
              />
              <Input
                name="gradYear"
                value={form.gradYear}
                onChange={handleChange}
                placeholder="Graduation Year *"
                required
              />
              <Input
                name="gradReg"
                value={form.gradReg}
                onChange={handleChange}
                placeholder="Registration Number *"
                required
              />
              <Input
                name="postCollege"
                value={form.postCollege}
                onChange={handleChange}
                placeholder="Post-Graduation College"
              />
              <Input
                name="postYear"
                value={form.postYear}
                onChange={handleChange}
                placeholder="Post-Graduation Year"
              />
              <Input
                name="postSpec"
                value={form.postSpec}
                onChange={handleChange}
                placeholder="Post-Graduation Specialization"
              />
              <Input
                name="otherQual"
                value={form.otherQual}
                onChange={handleChange}
                placeholder="Other Qualifications"
              />
            </div>
            {/* Toggles */}
            <div className="flex flex-col gap-3 pt-4 border-t">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="hasClinic"
                  checked={form.hasClinic}
                  onChange={handleChange}
                />
                <span>I own or operate a dental clinic</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="agreeDisclaimer"
                  checked={form.agreeDisclaimer}
                  onChange={handleChange}
                  required
                />
                <span>
                  I confirm that all provided information is accurate to the
                  best of my knowledge.
                </span>
              </label>
            </div>
            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={saving}>
              {saving ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="max-w-3xl p-6 mx-auto mt-10">
        <Card className="border border-gray-200 shadow-lg rounded-2xl">
          <CardHeader className="flex flex-col items-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">My Clinics</h2>
          </CardHeader>
          <CardContent>
            {clinics.length > 0 ? (
              <ul className="space-y-4">
                {clinics.map((clinic) => (
                  <li
                    key={clinic._id}
                    className="p-4 border rounded-lg shadow-sm"
                  >
                    <div className="flex gap-4">
                      {clinic.images && clinic.images.length > 0 && (
                        <Image
                          src={clinic.images[0]}
                          alt={clinic.name}
                          width={150}
                          height={150}
                          className="object-cover rounded-md"
                        />
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {clinic.name}
                        </h3>
                        <p className="text-gray-600">{clinic.description}</p>
                        <p className="mt-1 text-sm text-gray-500">
                          {clinic.location}, {clinic.state}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {clinic.specialities.map((spec) => (
                            <span
                              key={spec}
                              className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                        <div className="mt-2">
                          {clinic.website && (
                            <a
                              href={clinic.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              Website
                            </a>
                          )}
                          {clinic.whatsapp && (
                            <a
                              href={clinic.whatsapp}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-4 text-green-500 hover:underline"
                            >
                              WhatsApp
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No clinics found.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {userId && (
        <div className="max-w-3xl p-6 mx-auto mt-10">
          <Card className="border border-gray-200 shadow-lg rounded-2xl">
            <CardHeader className="flex flex-col items-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">
                My Consultations
              </h2>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <ShadSelect
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value)}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </ShadSelect>
              </div>
              {consultations.length > 0 ? (
                <table className="w-full text-left table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Patient</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Time</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consultations
                      .filter(
                        (c) =>
                          statusFilter === "All" || c.status === statusFilter
                      )
                      .map((consultation) => (
                        <tr key={consultation._id}>
                          <td className="px-4 py-2 border">
                            {consultation.user?.name ||
                              consultation.patientName}
                          </td>
                          <td className="px-4 py-2 border">
                            {new Date(
                              consultation.selectedDate
                            ).toLocaleDateString("en-GB")}
                          </td>
                          <td className="px-4 py-2 border">
                            {consultation.selectedSlot}
                          </td>
                          <td
                            className={`px-4 py-2 border font-semibold ${getStatusColor(
                              consultation.status
                            )}`}
                          >
                            <ShadSelect
                              value={consultation.status}
                              onValueChange={(newStatus) =>
                                handleStatusChange(consultation._id, newStatus)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Confirmed">
                                  Confirmed
                                </SelectItem>
                                <SelectItem value="Completed">
                                  Completed
                                </SelectItem>
                                <SelectItem value="Cancelled">
                                  Cancelled
                                </SelectItem>
                              </SelectContent>
                            </ShadSelect>
                          </td>
                          <td className="px-4 py-2 border">
                            <Button
                              onClick={() =>
                                setSelectedConsultation(consultation)
                              }
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p>No consultations found.</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {selectedConsultation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h3 className="mb-4 text-lg font-bold">Consultation Details</h3>
            <div className="space-y-2">
              <p>
                <strong>Patient:</strong>{" "}
                {selectedConsultation.user?.name ||
                  selectedConsultation.patientName}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedConsultation.selectedDate).toLocaleDateString(
                  "en-GB"
                )}
              </p>
              <p>
                <strong>Time:</strong> {selectedConsultation.selectedSlot}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${getStatusColor(
                    selectedConsultation.status
                  )}`}
                >
                  {selectedConsultation.status}
                </span>
              </p>
              <p>
                <strong>Payment Status:</strong>{" "}
                {selectedConsultation.paymentStatus}
              </p>
              <p>
                <strong>Email:</strong> {selectedConsultation.patientEmail}
              </p>
              <p>
                <strong>Message:</strong> {selectedConsultation.message}
              </p>
              <div className="mt-4">
                <label className="block mb-2 font-bold">Update Status</label>
                <ShadSelect
                  value={selectedConsultation.status}
                  onValueChange={(newStatus) =>
                    handleStatusChange(selectedConsultation._id, newStatus)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </ShadSelect>
              </div>
            </div>
            <Button
              onClick={() => setSelectedConsultation(null)}
              className="mt-6"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
