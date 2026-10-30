import React from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FormNavigationProps {
  currentStep: number;
  totalSteps?: number;
  onBack?: () => void;
  onNext?: () => void;
  isNextDisabled?: boolean;
  isLoading?: boolean;
  nextLabel?: string;
  submitType?: 'button' | 'submit';
}

export function FormNavigation({
  currentStep,
  totalSteps = 4,
  onBack,
  onNext,
  isNextDisabled = false,
  isLoading = false,
  nextLabel,
  submitType = 'button',
}: FormNavigationProps) {
  const getDefaultLabel = () => {
    if (currentStep === totalSteps) {
      return 'Submit Requirement';
    }
    if (currentStep === totalSteps - 1) {
      return 'Review Requirement';
    }
    return 'Continue';
  };

  const label = nextLabel || getDefaultLabel();

  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-8 mt-8 border-t border-slate-200">
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Draft saved locally</span>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        {currentStep > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isLoading}
            className="flex-1 sm:flex-none"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back
          </Button>
        )}

        <Button
          type={submitType}
          variant="primary"
          onClick={submitType === 'button' ? onNext : undefined}
          disabled={isNextDisabled || isLoading}
          isLoading={isLoading}
          className="flex-1 sm:flex-none px-6"
        >
          {label}
          {!isLoading && currentStep < totalSteps && (
            <ArrowRight className="w-4 h-4 ml-1.5" />
          )}
        </Button>
      </div>
    </div>
  );
}

