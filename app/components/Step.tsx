import React from "react";
import Icon from "./Icon";

interface StepProps {
  step: {
    number: number;
    title: string;
    icon: string;
    color: string;
  };
  isLast: boolean;
}

const Step: React.FC<StepProps> = ({ step, isLast }) => {
  return (
    <div className="relative pb-8 pl-16">
      {!isLast && (
        <div className="absolute top-5 left-5 h-full w-0.5 bg-gray-200"></div>
      )}
      <div className="relative flex items-center">
        <div
          className={`z-10 flex items-center justify-center w-10 h-10 ${step.color} rounded-full text-white font-bold text-lg shadow-md`}
        >
          <Icon name={step.icon} size={20} />
        </div>
        <div className="flex-1 pl-6">
          <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default Step;
