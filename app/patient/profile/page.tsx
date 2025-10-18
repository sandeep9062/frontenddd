"use client";

import React from "react";
import { useRouter } from "next/navigation";
const PatientProfilePage = () => {
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
          onClick={handleLogout}
          className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default PatientProfilePage;
