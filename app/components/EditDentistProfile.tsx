"use client";

import React, { useState, useEffect } from "react";
import axios from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";

export default function DentistProfilePage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    clinicName: "",
    specialization: "",
    experienceYears: "",
    certifications: "",
    clinicAddress: "",
    about: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("/dentist/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { user, profile } = res.data;
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        clinicName: profile?.clinicName || "",
        specialization: profile?.specialization || "",
        experienceYears: profile?.experienceYears || "",
        certifications: profile?.certifications?.join(", ") || "",
        clinicAddress: profile?.clinicAddress || "",
        about: profile?.about || "",
      });
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    await axios.put(
      "/dentist/profile",
      {
        ...form,
        certifications: form.certifications.split(",").map((c) => c.trim()),
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    toast.success("Profile updated!");
  };

  return (
    <div className="max-w-2xl p-6 mx-auto mt-10 bg-white shadow rounded-xl">
      <h2 className="mb-4 text-xl font-bold text-center">Edit Dentist Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <Input
          placeholder="Clinic Name"
          value={form.clinicName}
          onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
        />
        <Input
          placeholder="Specialization"
          value={form.specialization}
          onChange={(e) => setForm({ ...form, specialization: e.target.value })}
        />
        <Input
          placeholder="Experience (Years)"
          value={form.experienceYears}
          onChange={(e) => setForm({ ...form, experienceYears: e.target.value })}
        />
        <Input
          placeholder="Certifications (comma separated)"
          value={form.certifications}
          onChange={(e) => setForm({ ...form, certifications: e.target.value })}
        />
        <Textarea
          placeholder="Clinic Address"
          value={form.clinicAddress}
          onChange={(e) => setForm({ ...form, clinicAddress: e.target.value })}
        />
        <Textarea
          placeholder="About"
          value={form.about}
          onChange={(e) => setForm({ ...form, about: e.target.value })}
        />

        <Button type="submit" className="w-full">
          Update Profile
        </Button>
      </form>
    </div>
  );
}
