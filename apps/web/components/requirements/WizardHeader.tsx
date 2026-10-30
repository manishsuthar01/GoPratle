import React from 'react';
import { RequirementCategory } from '@gopratle/shared';

interface WizardHeaderProps {
  currentStep: number;
  category: RequirementCategory;
}

export function WizardHeader({ currentStep, category }: WizardHeaderProps) {
  const getHeaderInfo = () => {
    switch (currentStep) {
      case 1:
        return {
          title: "Let's start with your event.",
          description:
            'Tell us a little about the event so we can understand your requirements.',
        };
      case 2:
        if (category === 'planner') {
          return {
            title: 'Tell us what you need planned.',
            description:
              'Specify the planning scope, services required, guest count, and your estimated budget.',
          };
        }
        if (category === 'performer') {
          return {
            title: 'What kind of performance are you looking for?',
            description:
              'Choose your desired entertainment type, artist count, performance duration, and budget.',
          };
        }
        return {
          title: 'What kind of crew do you need?',
          description:
            'Select the operational and technical roles, number of crew members, shifts, and experience level.',
        };
      case 3:
        return {
          title: "Let's add the final details.",
          description:
            'Provide any special instructions, style preferences, and your contact information.',
        };
      case 4:
        return {
          title: 'Review your requirement.',
          description:
            'Double-check all information before submitting. You can edit any section directly.',
        };
      default:
        return {
          title: 'Event Requirement Studio',
          description: 'Complete each step to publish your event requirement.',
        };
    }
  };

  const { title, description } = getHeaderInfo();

  return (
    <div className="mb-8">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        {title}
      </h2>
      <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

