'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  performerDetailsSchema,
  PerformerDetails,
  PERFORMER_CATEGORIES,
  PERFORMER_CATEGORY_LABELS,
  PERFORMANCE_TYPES,
  PERFORMANCE_TYPE_LABELS,
  PERFORMANCE_DURATIONS,
  PERFORMANCE_DURATION_LABELS,
  BUDGET_RANGES,
  BUDGET_LABELS,
} from '@gopratle/shared';
import { useRequirementStore } from '@/store/requirement-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { FormNavigation } from '@/components/requirements/FormNavigation';

export function PerformerFields() {
  const { categoryDetails, setCategoryDetails, nextStep, prevStep } =
    useRequirementStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PerformerDetails>({
    resolver: zodResolver(performerDetailsSchema),
    defaultValues: {
      performerCategory: categoryDetails.performerCategory || undefined,
      performanceType: categoryDetails.performanceType || undefined,
      performerCount: categoryDetails.performerCount || ('' as any),
      duration: categoryDetails.duration || undefined,
      budget: categoryDetails.budget || undefined,
    },
  });

  const onSubmit = (data: PerformerDetails) => {
    setCategoryDetails(data);
    nextStep();
  };

  const categoryOptions = PERFORMER_CATEGORIES.map((c) => ({
    value: c,
    label: PERFORMER_CATEGORY_LABELS[c],
  }));

  const typeOptions = PERFORMANCE_TYPES.map((t) => ({
    value: t,
    label: PERFORMANCE_TYPE_LABELS[t],
  }));

  const durationOptions = PERFORMANCE_DURATIONS.map((d) => ({
    value: d,
    label: PERFORMANCE_DURATION_LABELS[d],
  }));

  const budgetOptions = BUDGET_RANGES.map((b) => ({
    value: b,
    label: BUDGET_LABELS[b],
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Performer Category & Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="performerCategory" required>
            Performer Category
          </Label>
          <Controller
            name="performerCategory"
            control={control}
            render={({ field }) => (
              <Select
                id="performerCategory"
                options={categoryOptions}
                placeholder="Choose performer type"
                value={field.value || ''}
                onChange={field.onChange}
                error={errors.performerCategory?.message}
              />
            )}
          />
        </div>

        <div>
          <Label htmlFor="performanceType" required>
            Performance Style
          </Label>
          <Controller
            name="performanceType"
            control={control}
            render={({ field }) => (
              <Select
                id="performanceType"
                options={typeOptions}
                placeholder="Solo, Live Band, DJ, etc."
                value={field.value || ''}
                onChange={field.onChange}
                error={errors.performanceType?.message}
              />
            )}
          />
        </div>
      </div>

      {/* Number of Performers & Duration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="performerCount" required>
            Number of Artists / Performers
          </Label>
          <Input
            id="performerCount"
            type="number"
            min={1}
            placeholder="e.g. 1 (solo) or 4 (band)"
            {...register('performerCount')}
            error={errors.performerCount?.message}
          />
        </div>

        <div>
          <Label htmlFor="duration" required>
            Performance Duration
          </Label>
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <Select
                id="duration"
                options={durationOptions}
                placeholder="Expected set duration"
                value={field.value || ''}
                onChange={field.onChange}
                error={errors.duration?.message}
              />
            )}
          />
        </div>
      </div>

      {/* Budget */}
      <div>
        <Label htmlFor="budget" required>
          Budget for Performance
        </Label>
        <Controller
          name="budget"
          control={control}
          render={({ field }) => (
            <Select
              id="budget"
              options={budgetOptions}
              placeholder="Select budget range"
              value={field.value || ''}
              onChange={field.onChange}
              error={errors.budget?.message}
            />
          )}
        />
      </div>

      <FormNavigation
        currentStep={2}
        onBack={prevStep}
        submitType="submit"
      />
    </form>
  );
}
