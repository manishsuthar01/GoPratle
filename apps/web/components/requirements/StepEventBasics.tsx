'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  eventBasicsSchema,
  EventBasicsFormData,
  EVENT_TYPES,
  EVENT_TYPE_LABELS,
  getTodayDateString,
  RequirementCategory,
} from '@gopratle/shared';
import { useRequirementStore } from '@/store/requirement-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { CategorySelector } from '@/components/requirements/CategorySelector';
import { FormNavigation } from '@/components/requirements/FormNavigation';

export function StepEventBasics() {
  const { event, category, setEventBasics, setCategory, nextStep } =
    useRequirementStore();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EventBasicsFormData>({
    resolver: zodResolver(eventBasicsSchema),
    defaultValues: {
      eventName: event.eventName,
      eventType: (event.eventType as any) || undefined,
      isMultiDay: event.isMultiDay,
      startDate: event.startDate || '',
      endDate: event.endDate || '',
      location: event.location,
      venue: event.venue,
      category: category,
    },
  });

  const isMultiDay = watch('isMultiDay');
  const today = getTodayDateString();

  const onSubmit = (data: EventBasicsFormData) => {
    setCategory(data.category as RequirementCategory);
    setEventBasics({
      eventName: data.eventName,
      eventType: data.eventType,
      isMultiDay: data.isMultiDay,
      startDate: data.startDate,
      endDate: data.isMultiDay && data.endDate ? data.endDate : '',
      location: data.location,
      venue: data.venue || '',
    });
    nextStep();
  };

  const eventTypeOptions = EVENT_TYPES.map((type) => ({
    value: type,
    label: EVENT_TYPE_LABELS[type],
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Event Name */}
      <div>
        <Label htmlFor="eventName" required>
          Event Name
        </Label>
        <Input
          id="eventName"
          placeholder="e.g. Annual Tech Symposium 2027"
          {...register('eventName')}
          error={errors.eventName?.message}
        />
      </div>

      {/* Event Type & City */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="eventType" required>
            Event Type
          </Label>
          <Controller
            name="eventType"
            control={control}
            render={({ field }) => (
              <Select
                id="eventType"
                options={eventTypeOptions}
                placeholder="Choose event type"
                value={field.value || ''}
                onChange={field.onChange}
                error={errors.eventType?.message}
              />
            )}
          />
        </div>

        <div>
          <Label htmlFor="location" required>
            City / Location
          </Label>
          <Input
            id="location"
            placeholder="e.g. Bangalore, Karnataka"
            {...register('location')}
            error={errors.location?.message}
          />
        </div>
      </div>

      {/* Venue Name (Optional) */}
      <div>
        <Label htmlFor="venue">Venue Name (Optional)</Label>
        <Input
          id="venue"
          placeholder="e.g. Palace Grounds, Hall 3"
          {...register('venue')}
          error={errors.venue?.message}
        />
      </div>

      {/* Date Handling: Single vs Multi-Day */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
        <div>
          <Label required>Event Duration</Label>
          <div className="grid grid-cols-2 gap-3 mt-1.5">
            <button
              type="button"
              onClick={() => {
                setValue('isMultiDay', false);
                setValue('endDate', '');
              }}
              className={`py-2 px-4 rounded-xl text-xs font-semibold border transition-all ${
                !isMultiDay
                  ? 'bg-white border-accent text-accent shadow-xs'
                  : 'bg-transparent border-slate-200 text-slate-600 hover:bg-white/60'
              }`}
            >
              Single-Day Event
            </button>
            <button
              type="button"
              onClick={() => setValue('isMultiDay', true)}
              className={`py-2 px-4 rounded-xl text-xs font-semibold border transition-all ${
                isMultiDay
                  ? 'bg-white border-accent text-accent shadow-xs'
                  : 'bg-transparent border-slate-200 text-slate-600 hover:bg-white/60'
              }`}
            >
              Multi-Day Event
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <Label htmlFor="startDate" required>
              {isMultiDay ? 'Start Date' : 'Event Date'}
            </Label>
            <Input
              id="startDate"
              type="date"
              min={today}
              {...register('startDate')}
              error={errors.startDate?.message}
            />
          </div>

          {isMultiDay && (
            <div>
              <Label htmlFor="endDate" required>
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                min={watch('startDate') || today}
                {...register('endDate')}
                error={errors.endDate?.message}
              />
            </div>
          )}
        </div>
      </div>

      {/* Requirement Category Selection */}
      <div className="pt-2">
        <Label required className="text-base font-bold text-slate-900 mb-2">
          Choose Requirement Category
        </Label>
        <p className="text-xs text-slate-500 mb-3">
          Select what you want to hire. The wizard will customize the next steps accordingly.
        </p>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <CategorySelector
              value={field.value as RequirementCategory}
              onChange={(newCat) => {
                field.onChange(newCat);
                setCategory(newCat);
              }}
              error={errors.category?.message}
            />
          )}
        />
      </div>

      <FormNavigation currentStep={1} submitType="submit" />
    </form>
  );
}

