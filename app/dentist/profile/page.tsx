

"use client";
import DentistProfile from "@/app/components/DentistProfile";
import React from "react";
import { useRouter } from "next/navigation";
const DentistProfilePage = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logout clicked");
    // For example, you might clear a token and redirect:
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="container p-4 mx-auto">
      <div className="flex justify-end gap-4 mb-4">
        <button
          onClick={() => router.push("/add-clinic")}
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Add a Clinic
        </button>
        <button
          onClick={() => router.push("/plans/clinics/")}
          className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
        >
          Choose Clinic Registration Plan
        </button>

        <button
          onClick={() => router.push("/plans/dentist/")}
          className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
        >
          Choose Online Consultation Plan
        </button>

        <button
          onClick={handleLogout}
          className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      <DentistProfile />
    </div>
  );
};

export default DentistProfilePage;
