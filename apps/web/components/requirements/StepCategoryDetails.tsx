'use client';

import React from 'react';
import { useRequirementStore } from '@/store/requirement-store';
import { PlannerFields } from './PlannerFields';
import { PerformerFields } from './PerformerFields';
import { CrewFields } from './CrewFields';

export function StepCategoryDetails() {
  const { category } = useRequirementStore();

  switch (category) {
    case 'planner':
      return <PlannerFields />;
    case 'performer':
      return <PerformerFields />;
    case 'crew':
      return <CrewFields />;
    default:
      return <PlannerFields />;
  }
}

