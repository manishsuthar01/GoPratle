'use client';

import React, { useEffect, useState } from 'react';
import { useRequirementStore } from '@/store/requirement-store';
import { WizardProgress } from './WizardProgress';
import { WizardHeader } from './WizardHeader';
import { StepEventBasics } from './StepEventBasics';
import { StepCategoryDetails } from './StepCategoryDetails';
import { StepAdditionalDetails } from './StepAdditionalDetails';
import { StepReview } from './StepReview';

export function RequirementWizard() {
  const [mounted, setMounted] = useState(false);
  const { currentStep, category, setStep } = useRequirementStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render skeleton while hydrating persisted store to prevent flash
    return (
      <div className="w-full max-w-[800px] mx-auto py-10 px-4 sm:px-6 animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-1/3 mb-8" />
        <div className="h-8 bg-slate-200 rounded w-2/3 mb-4" />
        <div className="h-4 bg-slate-200 rounded w-1/2 mb-12" />
        <div className="h-64 bg-slate-100 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[820px] mx-auto py-8 sm:py-12 px-4 sm:px-6">
      {/* Step Progress Indicator */}
      <WizardProgress currentStep={currentStep} onStepClick={setStep} />

      {/* Main Form Container Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-10 transition-all">
        {/* Dynamic Contextual Header */}
        <WizardHeader currentStep={currentStep} category={category} />

        {/* Dynamic Wizard Steps */}
        {currentStep === 1 && <StepEventBasics />}
        {currentStep === 2 && <StepCategoryDetails />}
        {currentStep === 3 && <StepAdditionalDetails />}
        {currentStep === 4 && <StepReview />}
      </div>
    </div>
  );
}

