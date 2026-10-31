import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WizardProgressProps {
  currentStep: number;
  totalSteps?: number;
  onStepClick?: (step: number) => void;
}

const steps = [
  { step: 1, label: 'Event Basics' },
  { step: 2, label: 'Category Needs' },
  { step: 3, label: 'Additional Details' },
  { step: 4, label: 'Review & Submit' },
];

export function WizardProgress({ currentStep, onStepClick }: WizardProgressProps) {
  return (
    <div className="w-full mb-8">
      {/* Mobile Step Bar */}
      <div className="sm:hidden mb-4">
        <div className="flex items-center justify-between text-xs font-semibold text-[#585866] mb-2">
          <span>
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-[#1D1D24] font-bold">
            {steps[currentStep - 1].label}
          </span>
        </div>
        <div className="w-full bg-[#E8E8ED] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[var(--color-primary)] h-full transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop Step Stepper (Matching Reference Image 2) */}
      <div className="hidden sm:flex items-center justify-between relative px-6">
        <div className="absolute left-10 right-10 top-4 -translate-y-1/2 h-[2px] bg-[#E8E8ED] -z-0" />
        <div
          className="absolute left-10 top-4 -translate-y-1/2 h-[2px] bg-[var(--color-primary)] transition-all duration-300 -z-0"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 82}%` }}
        />

        {steps.map((item) => {
          const isCompleted = item.step < currentStep;
          const isCurrent = item.step === currentStep;

          return (
            <div
              key={item.step}
              className="flex flex-col items-center relative z-10"
            >
              <button
                type="button"
                disabled={!isCompleted && !isCurrent}
                onClick={() => isCompleted && onStepClick?.(item.step)}
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 border-2 select-none',
                  isCompleted
                    ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-xs cursor-pointer'
                    : isCurrent
                    ? 'bg-white border-[var(--color-primary)] text-[var(--color-primary)] ring-4 ring-[var(--color-primary-light)]'
                    : 'bg-white border-[#D6D6DC] text-[#A6A6B4] cursor-not-allowed'
                )}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : item.step}
              </button>
              <span
                className={cn(
                  'text-xs font-medium mt-2 transition-colors tracking-tight',
                  isCurrent
                    ? 'text-[#1D1D24] font-bold'
                    : isCompleted
                    ? 'text-[#585866]'
                    : 'text-[#A6A6B4]'
                )}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
