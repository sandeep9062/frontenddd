"use client";

import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

interface Medication {
  name: string;
  dosage: string;
  duration: string;
  instructions: string;
}

interface Treatment {
  procedure: string;
  duration: string;
  cost: string;
  notes: string;
}

export default function Prescription() {
  const [clinicName, setClinicName] = useState("SmileCare Dental Clinic");
  const [dentistName, setDentistName] = useState("Dr. Ananya Sharma");
  const [registrationNo, setRegistrationNo] = useState("DMC/12345");
  const [patientName, setPatientName] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medications, setMedications] = useState<Medication[]>([
    { name: "", dosage: "", duration: "", instructions: "" },
  ]);
  const [treatments, setTreatments] = useState<Treatment[]>([
    { procedure: "", duration: "", cost: "", notes: "" },
  ]);

  const addMedication = () =>
    setMedications([...medications, { name: "", dosage: "", duration: "", instructions: "" }]);

  const addTreatment = () =>
    setTreatments([...treatments, { procedure: "", duration: "", cost: "", notes: "" }]);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("🦷 Dental Tourism Prescription", 14, 15);
    doc.setFontSize(12);

    doc.text(`Clinic: ${clinicName}`, 14, 25);
    doc.text(`Dentist: ${dentistName}`, 14, 32);
    doc.text(`Registration No: ${registrationNo}`, 14, 39);
    doc.text(`Patient: ${patientName}`, 14, 46);
    doc.text(`Diagnosis: ${diagnosis}`, 14, 53);

    // --- Medications Table ---
    if (medications.some((m) => m.name)) {
      (doc as any).autoTable({
        startY: 60,
        head: [["Medication", "Dosage", "Duration", "Instructions"]],
        body: medications.map((m) => [m.name, m.dosage, m.duration, m.instructions]),
      });
    }

    // --- Treatments Table ---
    const afterMedsY = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 10 : 80;

    if (treatments.some((t) => t.procedure)) {
      (doc as any).autoTable({
        startY: afterMedsY,
        head: [["Procedure", "Duration", "Cost (USD)", "Notes"]],
        body: treatments.map((t) => [t.procedure, t.duration, t.cost, t.notes]),
      });
    }

    const afterTreatY = (doc as any).lastAutoTable
      ? (doc as any).lastAutoTable.finalY + 15
      : afterMedsY + 20;

    doc.text("⚠️ Pre & Post Treatment Advice:", 14, afterTreatY);
    doc.setFontSize(11);
    doc.text(
      "- Maintain oral hygiene and avoid hard foods for 7–10 days.\n" +
        "- Use prescribed mouthwash twice daily.\n" +
        "- Schedule online follow-up if required.\n" +
        "- Contact clinic for any emergency during your travel.",
      14,
      afterTreatY + 8
    );

    doc.setFontSize(12);
    doc.text(`Dentist Signature: ___________________`, 14, 275);
    doc.text(`${dentistName}`, 14, 283);

    doc.save(`${patientName || "dental"}_prescription.pdf`);
  };

  return (
    <div className="max-w-4xl p-6 mx-auto mt-8 bg-white shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold text-[#2C73D2] mb-4 text-center">
        🦷 Dental Tourism Prescription Generator
      </h2>

      {/* Clinic & Dentist Info */}
      <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
        <input
          value={clinicName}
          onChange={(e) => setClinicName(e.target.value)}
          placeholder="Clinic Name"
          className="p-2 border rounded"
        />
        <input
          value={dentistName}
          onChange={(e) => setDentistName(e.target.value)}
          placeholder="Dentist Name"
          className="p-2 border rounded"
        />
        <input
          value={registrationNo}
          onChange={(e) => setRegistrationNo(e.target.value)}
          placeholder="Registration No"
          className="p-2 border rounded"
        />
        <input
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Patient Name"
          className="p-2 border rounded"
        />
      </div>

      <textarea
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
        placeholder="Diagnosis"
        className="w-full p-2 mb-4 border rounded"
      />

      {/* Medications */}
      <h3 className="font-semibold text-lg text-[#2C73D2] mb-2">Medications</h3>
      {medications.map((m, i) => (
        <div key={i} className="grid grid-cols-2 gap-2 mb-2 sm:grid-cols-4">
          <input
            placeholder="Medication"
            value={m.name}
            onChange={(e) => {
              const updated = [...medications];
              updated[i].name = e.target.value;
              setMedications(updated);
            }}
            className="p-2 border rounded"
          />
          <input
            placeholder="Dosage"
            value={m.dosage}
            onChange={(e) => {
              const updated = [...medications];
              updated[i].dosage = e.target.value;
              setMedications(updated);
            }}
            className="p-2 border rounded"
          />
          <input
            placeholder="Duration"
            value={m.duration}
            onChange={(e) => {
              const updated = [...medications];
              updated[i].duration = e.target.value;
              setMedications(updated);
            }}
            className="p-2 border rounded"
          />
          <input
            placeholder="Instructions"
            value={m.instructions}
            onChange={(e) => {
              const updated = [...medications];
              updated[i].instructions = e.target.value;
              setMedications(updated);
            }}
            className="p-2 border rounded"
          />
        </div>
      ))}
      <button
        onClick={addMedication}
        className="text-[#2C73D2] font-semibold text-sm mb-4 hover:underline"
      >
        + Add Medication
      </button>

      {/* Treatment Plan */}
      <h3 className="font-semibold text-lg text-[#2C73D2] mb-2">Treatment Plan</h3>
      {treatments.map((t, i) => (
        <div key={i} className="grid grid-cols-2 gap-2 mb-2 sm:grid-cols-4">
          <input
            placeholder="Procedure"
            value={t.procedure}
            onChange={(e) => {
              const updated = [...treatments];
              updated[i].procedure = e.target.value;
              setTreatments(updated);
            }}
            className="p-2 border rounded"
          />
          <input
            placeholder="Duration"
            value={t.duration}
            onChange={(e) => {
              const updated = [...treatments];
              updated[i].duration = e.target.value;
              setTreatments(updated);
            }}
            className="p-2 border rounded"
          />
          <input
            placeholder="Cost (USD)"
            value={t.cost}
            onChange={(e) => {
              const updated = [...treatments];
              updated[i].cost = e.target.value;
              setTreatments(updated);
            }}
            className="p-2 border rounded"
          />
          <input
            placeholder="Notes"
            value={t.notes}
            onChange={(e) => {
              const updated = [...treatments];
              updated[i].notes = e.target.value;
              setTreatments(updated);
            }}
            className="p-2 border rounded"
          />
        </div>
      ))}
      <button
        onClick={addTreatment}
        className="text-[#2C73D2] font-semibold text-sm mb-4 hover:underline"
      >
        + Add Treatment
      </button>

      {/* Generate Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={generatePDF}
          className="bg-[#2C73D2] hover:bg-[#1E4E8C] text-white px-6 py-3 rounded-lg font-semibold shadow-md"
        >
          Generate PDF Prescription
        </button>
      </div>
    </div>
  );
}
