"use client";

import React, { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

interface Step {
  icon: React.ReactNode;
  text: string;
}

const stats: Stat[] = [
  { value: 30999, suffix: "+", label: "Happy Users" },
  { value: 327, suffix: "+", label: "Verified Doctors" },
  { value: 15, suffix: "", label: "Specialities" },
];

const HowItWorks: Step[] = [
  {
    icon: (
      <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#15396A] bg-white text-[#15396A] text-2xl shadow-md">
        <svg
          width="28"
          height="28"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 5v14l11-7L8 5z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    ),
    text: "Choose your dental need",
  },
  {
    icon: (
      <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#15396A] bg-white text-[#15396A] text-2xl shadow-md">
        <svg
          width="28"
          height="28"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
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
      </span>
    ),
    text: "Audio/ video call with a verified doctor",
  },
  {
    icon: (
      <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#15396A] bg-white text-[#15396A] text-2xl shadow-md font-bold">
        Rx
      </span>
    ),
    text: "Get a digital prescription & a free follow-up",
  },
];

/** Custom hook to animate counting up */
function useCountUp(end: number, duration = 600, trigger = true): number {
  const [count, setCount] = useState(0);
  const start = 0;
  const frame = useRef<number>();

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
}> = ({ value, suffix = "", duration = 600, trigger }) => {
  const count = useCountUp(value, duration, trigger);
  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const StatsAndHowItWorks: React.FC = () => {
  const [startAnim, setStartAnim] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!statsRef.current) return;
      const rect = statsRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setStartAnim(true);
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // trigger immediately if visible
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* How it works */}
      <div className="flex flex-col items-center w-full py-10 bg-white">
        <h2 className="text-3xl font-bold text-[#2C73D2] text-center mb-10">
          How it works
        </h2>
        <div className="flex flex-col items-center justify-center w-full max-w-5xl gap-10 md:flex-row md:gap-0">
          {HowItWorks.map((step) => (
            <div
              key={step.text}
              className="relative flex flex-col items-center flex-1"
            >
              {step.icon}
              <span className="mt-4 text-[#15396A] text-base md:text-lg text-center font-medium max-w-[180px]">
                {step.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div
        ref={statsRef}
        className="w-full bg-[#2C73D2] py-8 flex flex-col items-center justify-center mt-0"
      >
        <div className="flex flex-col items-center justify-center w-full max-w-5xl gap-10 md:flex-row md:gap-24">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-[#F4A300] text-3xl md:text-4xl font-bold mb-1">
                <StatCountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  duration={600}
                  trigger={startAnim}
                />
              </span>
              <span className="text-lg font-semibold text-center text-white md:text-xl">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StatsAndHowItWorks;
