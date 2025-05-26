import { useState } from "react";

export default function Test() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 10;

  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="p-12">
      <div className="relative mb-4">
        <div className="absolute left-0 top-2 h-0.5 w-full bg-gray-200">
          <div
            className="h-full bg-gray-900 duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <ul className="relative flex w-full justify-between">
          {steps.map((step) => (
            <li key={step}>
              <div
                onClick={() => setCurrentStep(step)}
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold text-white cursor-pointer
                  ${
                    currentStep === step
                      ? "bg-gray-600 ring ring-gray-600 ring-offset-2"
                      : currentStep > step
                      ? "bg-gray-600"
                      : "bg-gray-300"
                  }`}
              >
                {step}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
