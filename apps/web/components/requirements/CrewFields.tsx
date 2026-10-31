'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  crewDetailsSchema,
  CrewDetails,
  CREW_ROLES,
  CREW_ROLE_LABELS,
  SHIFT_DURATIONS,
  SHIFT_DURATION_LABELS,
  CREW_EXPERIENCES,
  CREW_EXPERIENCE_LABELS,
  BUDGET_RANGES,
  BUDGET_LABELS,
  CrewRole,
} from '@gopratle/shared';
import { useRequirementStore } from '@/store/requirement-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { FormNavigation } from '@/components/requirements/FormNavigation';
import { Check } from 'lucide-react';

export function CrewFields() {
  const { categoryDetails, setCategoryDetails, nextStep, prevStep } =
    useRequirementStore();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CrewDetails>({
    resolver: zodResolver(crewDetailsSchema),
    defaultValues: {
      roles: (categoryDetails.roles as CrewRole[]) || [],
      crewCount: categoryDetails.crewCount || ('' as any),
      shiftDuration: categoryDetails.shiftDuration || undefined,
      experience: categoryDetails.experience || undefined,
      budget: categoryDetails.budget || undefined,
    },
  });

  const selectedRoles = watch('roles') || [];

  const toggleRole = (role: CrewRole) => {
    const current = selectedRoles;
    const exists = current.includes(role);
    const updated = exists
      ? current.filter((r) => r !== role)
      : [...current, role];
    setValue('roles', updated, { shouldValidate: true });
  };

  const onSubmit = (data: CrewDetails) => {
    setCategoryDetails(data);
    nextStep();
  };

  const shiftOptions = SHIFT_DURATIONS.map((s) => ({
    value: s,
    label: SHIFT_DURATION_LABELS[s],
  }));

  const experienceOptions = CREW_EXPERIENCES.map((e) => ({
    value: e,
    label: CREW_EXPERIENCE_LABELS[e],
  }));

  const budgetOptions = BUDGET_RANGES.map((b) => ({
    value: b,
    label: BUDGET_LABELS[b],
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Crew Roles Multi-Select */}
      <div>
        <Label required>Crew Roles Needed</Label>
        <p className="text-xs text-[#7E7E8C] mb-3">
          Select all operational, technical, or logistics roles required for your event.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {CREW_ROLES.map((role) => {
            const isChecked = selectedRoles.includes(role);
            return (
              <button
                key={role}
                type="button"
                onClick={() => toggleRole(role)}
                className={`flex items-center justify-between p-3.5 rounded-2xl border text-left text-xs font-medium transition-all ${
                  isChecked
                    ? 'bg-[var(--color-primary-light)] border-[var(--color-primary)] text-[var(--color-primary)] font-semibold shadow-xs'
                    : 'bg-white border-[#E8E8ED] text-[#1D1D24] hover:border-[#D6D6DC]'
                }`}
              >
                <span>{CREW_ROLE_LABELS[role]}</span>
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
        {errors.roles && (
          <p className="mt-1.5 text-xs text-rose-600 font-medium">
            {errors.roles.message}
          </p>
        )}
      </div>

      {/* Number of Crew & Shift Duration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="crewCount" required>
            Number of Crew Members
          </Label>
          <Input
            id="crewCount"
            type="number"
            min={1}
            placeholder="e.g. 5"
            {...register('crewCount')}
            error={errors.crewCount?.message}
          />
        </div>

        <div>
          <Label htmlFor="shiftDuration" required>
            Shift Duration
          </Label>
          <Controller
            name="shiftDuration"
            control={control}
            render={({ field }) => (
              <Select
                id="shiftDuration"
                options={shiftOptions}
                placeholder="Select shift length"
                value={field.value || ''}
                onChange={field.onChange}
                error={errors.shiftDuration?.message}
              />
            )}
          />
        </div>
      </div>

      {/* Experience & Budget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="experience" required>
            Required Experience
          </Label>
          <Controller
            name="experience"
            control={control}
            render={({ field }) => (
              <Select
                id="experience"
                options={experienceOptions}
                placeholder="Choose experience level"
                value={field.value || ''}
                onChange={field.onChange}
                error={errors.experience?.message}
              />
            )}
          />
        </div>

        <div>
          <Label htmlFor="budget" required>
            Estimated Crew Budget
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
      </div>

      <FormNavigation
        currentStep={2}
        onBack={prevStep}
        submitType="submit"
      />
    </form>
  );
}
