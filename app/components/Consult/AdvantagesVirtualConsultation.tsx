"use client";

import React from "react";

interface Advantage {
  title: string;
  desc: string;
}

const advantages: Advantage[] = [
  {
    title: "Convenience & Accessibility",
    desc: "Patients can consult a dentist from home, saving time and travel expenses. This is especially beneficial for those in remote areas.",
  },
  {
    title: "Time-Saving",
    desc: "No need to wait in long queues; appointments can be scheduled at a preferred time.",
  },
  {
    title: "Cost-Effective",
    desc: "Virtual consultations are often cheaper than in-person visits, reducing transportation and consultation fees.",
  },
  {
    title: "Initial Assessment",
    desc: "Dentists can assess the problem, suggest temporary solutions, and determine if an in-person visit is necessary.",
  },
  {
    title: "Privacy & Comfort",
    desc: "Patients can discuss their dental issues in a comfortable environment without the anxiety of visiting a clinic.",
  },
  {
    title: "Emergency Guidance",
    desc: "In case of dental emergencies, patients can get immediate advice on managing pain or handling the situation until they visit a clinic.",
  },
  {
    title: "Access to Specialists",
    desc: "Patients can consult top dental specialists across different locations without need to travel.",
  },
  {
    title: "Digital Prescriptions & Follow-ups",
    desc: "Dentists can provide e-prescriptions for medications and schedule follow-up virtual visits for treatment progress.",
  },
];

const AdvantagesVirtualConsultation: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full px-2 bg-white py-14">
      <h2 className="text-3xl md:text-4xl font-bold text-[#2C73D2] text-center mb-10">
        Advantages of Virtual Consultation
      </h2>

      <div className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
        {advantages.map((adv) => (
          <div key={adv.title} className="flex flex-col w-full">
            <span className="font-bold text-[#2C73D2] text-lg md:text-xl mb-1">
              {adv.title}
              <span className="font-normal text-[#444]"> – {adv.desc}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvantagesVirtualConsultation;
