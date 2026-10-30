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
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
          <span>
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-slate-900 font-bold">
            {steps[currentStep - 1].label}
          </span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-accent h-full transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop Step Stepper */}
      <div className="hidden sm:flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-slate-200 -z-0" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-accent transition-all duration-300 -z-0"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((item) => {
          const isCompleted = item.step < currentStep;
          const isCurrent = item.step === currentStep;

          return (
            <div
              key={item.step}
              className="flex flex-col items-center relative z-10 group"
            >
              <button
                type="button"
                disabled={!isCompleted && !isCurrent}
                onClick={() => isCompleted && onStepClick?.(item.step)}
                className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 border-2',
                  isCompleted
                    ? 'bg-accent border-accent text-white hover:bg-accent-hover cursor-pointer shadow-sm'
                    : isCurrent
                    ? 'bg-white border-accent text-accent ring-4 ring-indigo-50 shadow-sm'
                    : 'bg-white border-slate-300 text-slate-400 cursor-not-allowed'
                )}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : item.step}
              </button>
              <span
                className={cn(
                  'text-xs font-semibold mt-2 tracking-tight transition-colors',
                  isCurrent
                    ? 'text-slate-900'
                    : isCompleted
                    ? 'text-slate-600'
                    : 'text-slate-400'
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

