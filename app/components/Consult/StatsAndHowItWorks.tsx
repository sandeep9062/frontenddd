"use client";

import React, { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

interface Step {
  icon: React.ReactNode;
  text: string;
  description: string;
}

const stats: Stat[] = [
  { value: 30999, suffix: "+", label: "Happy Users", icon: "😊" },
  { value: 327, suffix: "+", label: "Verified Doctors", icon: "👨‍⚕️" },
  { value: 15, suffix: "", label: "Specialities", icon: "🦷" },
];

const HowItWorks: Step[] = [
  {
    icon: (
      <div className="relative">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full shadow-lg">
          <svg
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-600"
          >
            <path
              d="M8 5v14l11-7L8 5z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-blue-600 rounded-full -top-2 -right-2">
          1
        </div>
      </div>
    ),
    text: "Choose your dental need",
    description:
      "Select your problem or speciality from our comprehensive list",
  },
  {
    icon: (
      <div className="relative">
        <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full shadow-lg">
          <svg
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="text-green-600"
          >
            <path
              d="M17 8h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="12"
              cy="12"
              r="3"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-600 rounded-full -top-2 -right-2">
          2
        </div>
      </div>
    ),
    text: "Audio/ video call with a verified doctor",
    description:
      "Connect with experienced dentists through secure video consultation",
  },
  {
    icon: (
      <div className="relative">
        <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full shadow-lg">
          <div className="text-xl font-bold text-purple-600">Rx</div>
        </div>
        <div className="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-purple-600 rounded-full -top-2 -right-2">
          3
        </div>
      </div>
    ),
    text: "Get a digital prescription & a free follow-up",
    description:
      "Receive instant digital prescription and schedule follow-up consultations",
  },
];

/** Custom hook to animate counting up */
function useCountUp(end: number, duration = 800, trigger = true): number {
  const [count, setCount] = useState(0);
  const start = 0;
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;
    let startTime: number | null = null;

    const animate = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));

      if (progress < 1) {
        frame.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    frame.current = requestAnimationFrame(animate);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [end, duration, trigger]);

  return count;
}

/** Displays animated count value */
const StatCountUp: React.FC<{
  value: number;
  suffix?: string;
  duration?: number;
  trigger: boolean;
}> = ({ value, suffix = "", duration = 800, trigger }) => {
  const count = useCountUp(value, duration, trigger);
  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const StatsAndHowItWorks: React.FC = () => {
  const [startAnim, setStartAnim] = useState(false);
  const [howItWorksAnim, setHowItWorksAnim] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!statsRef.current) return;
      const rect = statsRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setStartAnim(true);
      }
    };

    const onScrollHowItWorks = () => {
      if (!howItWorksRef.current) return;
      const rect = howItWorksRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setHowItWorksAnim(true);
      }
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScrollHowItWorks);
    onScroll(); // trigger immediately if visible
    onScrollHowItWorks();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScrollHowItWorks);
    };
  }, []);

  return (
    <>
      {/* How it works */}
      <div
        ref={howItWorksRef}
        className="w-full py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50"
      >
        <div className="px-4 mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#2C73D2] to-[#008E97] text-white rounded-full text-sm font-semibold mb-6">
              🔄 Process
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2C73D2] to-[#008E97] mb-6">
              How it works
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600">
              Get expert dental care in just three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
            {HowItWorks.map((step, index) => (
              <div
                key={step.text}
                className={`relative flex flex-col items-center text-center group ${
                  howItWorksAnim ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Connection Line */}
                {index < HowItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#2C73D2] to-[#008E97] transform translate-x-4"></div>
                )}

                <div className="mb-6 transition-transform duration-300 group-hover:scale-110">
                  {step.icon}
                </div>

                <h3 className="text-xl font-bold text-[#15396A] mb-3 group-hover:text-[#2C73D2] transition-colors">
                  {step.text}
                </h3>
                <p className="max-w-xs leading-relaxed text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div
        ref={statsRef}
        className="relative w-full py-20 bg-gradient-to-r from-[#2C73D2] via-[#1E5BA8] to-[#15396A] overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

        <div className="relative px-4 mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h3 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Trusted by Thousands
            </h3>
            <p className="text-xl text-blue-100">
              Join our growing community of satisfied patients
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-16">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center group ${
                  startAnim ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="mb-4 text-6xl transition-transform duration-300 group-hover:scale-110">
                  {stat.icon}
                </div>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4A300] mb-2 group-hover:text-white transition-colors">
                    <StatCountUp
                      value={stat.value}
                      suffix={stat.suffix}
                      duration={1000}
                      trigger={startAnim}
                    />
                  </div>
                  <div className="text-lg font-semibold text-white transition-colors sm:text-xl group-hover:text-blue-100">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default StatsAndHowItWorks;
