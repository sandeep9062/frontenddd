"use client";

import React from "react";

interface Advantage {
  title: string;
  desc: string;
  icon: string;
  bgColor: string;
}

const advantages: Advantage[] = [
  {
    title: "Convenience & Accessibility",
    desc: "Patients can consult a dentist from home, saving time and travel expenses. This is especially beneficial for those in remote areas.",
    icon: "🏠",
    bgColor: "bg-blue-100",
  },
  {
    title: "Time-Saving",
    desc: "No need to wait in long queues; appointments can be scheduled at a preferred time.",
    icon: "⏰",
    bgColor: "bg-green-100",
  },
  {
    title: "Cost-Effective",
    desc: "Virtual consultations are often cheaper than in-person visits, reducing transportation and consultation fees.",
    icon: "💰",
    bgColor: "bg-amber-100",
  },
  {
    title: "Initial Assessment",
    desc: "Dentists can assess the problem, suggest temporary solutions, and determine if an in-person visit is necessary.",
    icon: "🔍",
    bgColor: "bg-purple-100",
  },
  {
    title: "Privacy & Comfort",
    desc: "Patients can discuss their dental issues in a comfortable environment without the anxiety of visiting a clinic.",
    icon: "🔒",
    bgColor: "bg-rose-100",
  },
  {
    title: "Emergency Guidance",
    desc: "In case of dental emergencies, patients can get immediate advice on managing pain or handling the situation until they visit a clinic.",
    icon: "🚨",
    bgColor: "bg-red-100",
  },
  {
    title: "Access to Specialists",
    desc: "Patients can consult top dental specialists across different locations without need to travel.",
    icon: "👨‍⚕️",
    bgColor: "bg-teal-100",
  },
  {
    title: "Digital Prescriptions & Follow-ups",
    desc: "Dentists can provide e-prescriptions for medications and schedule follow-up virtual visits for treatment progress.",
    icon: "📱",
    bgColor: "bg-indigo-100",
  },
];

const AdvantagesVirtualConsultation: React.FC = () => {
  return (
    <div className="w-full py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="px-4 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#008E97] to-[#2C73D2] text-white rounded-full text-sm font-semibold mb-6">
            ✨ Benefits
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#008E97] to-[#2C73D2] mb-6">
            Advantages of Virtual Consultation
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Discover why thousands of patients choose our online dental
            consultation platform
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {advantages.map((advantage, index) => (
            <div
              key={advantage.title}
              className="relative p-8 overflow-hidden transition-all duration-300 transform bg-white border border-gray-100 shadow-lg group rounded-2xl hover:shadow-2xl hover:scale-105"
            >
              <div className="relative">
                {/* Icon */}
                <div className="mb-6 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 ${advantage.bgColor} rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-3xl">{advantage.icon}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-lg font-bold text-[#15396A] mb-3 group-hover:text-[#008E97] transition-colors">
                    {advantage.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {advantage.desc}
                  </p>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[#F4A300] to-[#FF6B35] rounded-full flex items-center justify-center text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  ✓
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#008E97] to-[#2C73D2] text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <span className="mr-2">🚀</span>
            Experience These Benefits Today
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvantagesVirtualConsultation;
