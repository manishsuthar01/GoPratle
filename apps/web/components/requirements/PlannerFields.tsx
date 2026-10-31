'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  plannerDetailsSchema,
  PlannerDetails,
  PLANNER_SERVICES,
  PLANNER_SERVICE_LABELS,
  BUDGET_RANGES,
  BUDGET_LABELS,
  PLANNING_SCOPES,
  PLANNING_SCOPE_LABELS,
  PlannerService,
} from '@gopratle/shared';
import { useRequirementStore } from '@/store/requirement-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { FormNavigation } from '@/components/requirements/FormNavigation';
import { Check } from 'lucide-react';

export function PlannerFields() {
  const { categoryDetails, setCategoryDetails, nextStep, prevStep } =
    useRequirementStore();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PlannerDetails>({
    resolver: zodResolver(plannerDetailsSchema),
    defaultValues: {
      services: (categoryDetails.services as PlannerService[]) || [],
      guestCount: categoryDetails.guestCount || ('' as any),
      budget: categoryDetails.budget || undefined,
      planningScope: categoryDetails.planningScope || undefined,
    },
  });

  const selectedServices = watch('services') || [];

  const toggleService = (service: PlannerService) => {
    const current = selectedServices;
    const exists = current.includes(service);
    const updated = exists
      ? current.filter((s) => s !== service)
      : [...current, service];
    setValue('services', updated, { shouldValidate: true });
  };

  const onSubmit = (data: PlannerDetails) => {
    setCategoryDetails(data);
    nextStep();
  };

  const budgetOptions = BUDGET_RANGES.map((b) => ({
    value: b,
    label: BUDGET_LABELS[b],
  }));

  const scopeOptions = PLANNING_SCOPES.map((s) => ({
    value: s,
    label: PLANNING_SCOPE_LABELS[s],
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Planning Services Multi-select */}
      <div>
        <Label required>Planning Services Required</Label>
        <p className="text-xs text-[#7E7E8C] mb-3">
          Select one or more services you need the planner to manage.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {PLANNER_SERVICES.map((service) => {
            const isChecked = selectedServices.includes(service);
            return (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                className={`flex items-center justify-between p-3.5 rounded-2xl border text-left text-xs font-medium transition-all ${
                  isChecked
                    ? 'bg-[var(--color-primary-light)] border-[var(--color-primary)] text-[var(--color-primary)] font-semibold shadow-xs'
                    : 'bg-white border-[#E8E8ED] text-[#1D1D24] hover:border-[#D6D6DC]'
                }`}
              >
                <span>{PLANNER_SERVICE_LABELS[service]}</span>
                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white'
                      : 'border-[#D6D6DC] bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
        {errors.services && (
          <p className="mt-1.5 text-xs text-rose-600 font-medium">
            {errors.services.message}
          </p>
        )}
      </div>

      {/* Guest Count & Planning Scope */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="guestCount" required>
            Expected Guest Count
          </Label>
          <Input
            id="guestCount"
            type="number"
            min={1}
            placeholder="e.g. 250"
            {...register('guestCount')}
            error={errors.guestCount?.message}
          />
        </div>

        <div>
          <Label htmlFor="planningScope" required>
            Planning Scope
          </Label>
          <Controller
            name="planningScope"
            control={control}
            render={({ field }) => (
              <Select
                id="planningScope"
                options={scopeOptions}
                placeholder="Choose scope of planning"
                value={field.value || ''}
                onChange={field.onChange}
                error={errors.planningScope?.message}
              />
            )}
          />
        </div>
      </div>

      {/* Event Budget */}
      <div>
        <Label htmlFor="budget" required>
          Estimated Budget for Planning
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
