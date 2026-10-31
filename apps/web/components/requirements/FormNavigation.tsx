import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-6 mt-8 border-t border-[#E8E8ED]">
      <div>
        {currentStep > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-2.5 rounded-2xl font-semibold"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back
          </Button>
        )}
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <Button
          type={submitType}
          variant="primary"
          onClick={submitType === 'button' ? onNext : undefined}
          disabled={isNextDisabled || isLoading}
          isLoading={isLoading}
          className="w-full sm:w-auto px-8 py-2.5 rounded-2xl font-semibold"
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
