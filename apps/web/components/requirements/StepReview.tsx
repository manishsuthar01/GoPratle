'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Calendar,
  MapPin,
  Tag,
  FileText,
  User,
  Mail,
  Phone,
  Pencil,
  AlertCircle,
  Building,
} from 'lucide-react';
import {
  CATEGORY_LABELS,
  EVENT_TYPE_LABELS,
  BUDGET_LABELS,
  PLANNER_SERVICE_LABELS,
  PLANNING_SCOPE_LABELS,
  PERFORMER_CATEGORY_LABELS,
  PERFORMANCE_TYPE_LABELS,
  PERFORMANCE_DURATION_LABELS,
  CREW_ROLE_LABELS,
  SHIFT_DURATION_LABELS,
  CREW_EXPERIENCE_LABELS,
  VENUE_ENVIRONMENT_LABELS,
} from '@gopratle/shared';
import { useRequirementStore } from '@/store/requirement-store';
import { submitRequirement, ApiClientError } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FormNavigation } from '@/components/requirements/FormNavigation';

export function StepReview() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    event,
    category,
    categoryDetails,
    additionalDetails,
    contact,
    idempotencyKey,
    setStep,
    prevStep,
    resetDraft,
    getSubmissionPayload,
  } = useRequirementStore();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = getSubmissionPayload();
      const result = await submitRequirement(payload, idempotencyKey);

      toast.success('Requirement posted successfully!');
      resetDraft();
      router.push(`/requirements/success/${encodeURIComponent(result.reference)}`);
    } catch (err: any) {
      setIsSubmitting(false);
      let errorMessage = 'An unexpected error occurred. Please try again.';

      if (err instanceof ApiClientError) {
        if (err.errors && err.errors.length > 0) {
          errorMessage = err.errors.map((e) => e.message).join(', ');
        } else {
          errorMessage = err.message;
        }
      } else if (err?.message) {
        errorMessage = err.message;
      }

      setSubmitError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="space-y-6">
      {submitError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <div className="font-bold">Submission failed</div>
            <div className="text-xs text-rose-700 mt-0.5">{submitError}</div>
          </div>
        </div>
      )}

      {/* 1. Event Information */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
            <Calendar className="w-4 h-4 text-accent" />
            <span>1. Event Information</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setStep(1)}
            className="text-xs text-accent hover:text-accent-hover hover:bg-indigo-50 font-semibold"
          >
            <Pencil className="w-3 h-3 mr-1" /> Edit
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block font-medium mb-1">Event Name</span>
            <span className="font-bold text-slate-800 text-sm">
              {event.eventName || '—'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium mb-1">Event Type</span>
            <span className="font-medium text-slate-800">
              {event.eventType ? (EVENT_TYPE_LABELS as any)[event.eventType] : '—'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium mb-1">Date(s)</span>
            <span className="font-medium text-slate-800">
              {event.isMultiDay && event.endDate
                ? `${event.startDate} to ${event.endDate}`
                : event.startDate || '—'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium mb-1">City / Location</span>
            <span className="font-medium text-slate-800 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {event.location || '—'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium mb-1">Venue</span>
            <span className="font-medium text-slate-800 flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              {event.venue || 'To be determined'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Selected Category */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
            <Tag className="w-4 h-4 text-accent" />
            <span>2. Selected Category</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setStep(1)}
            className="text-xs text-accent hover:text-accent-hover hover:bg-indigo-50 font-semibold"
          >
            <Pencil className="w-3 h-3 mr-1" /> Edit
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="accent" className="text-sm px-3 py-1 font-bold">
            {CATEGORY_LABELS[category]}
          </Badge>
          <span className="text-xs text-slate-500">
            {category === 'planner' && 'Hiring event coordination and styling professionals.'}
            {category === 'performer' && 'Hiring musical artists, live performers, or entertainers.'}
            {category === 'crew' && 'Hiring technical, logistics, or operational support crew.'}
          </span>
        </div>
      </div>

      {/* 3. Primary Requirements */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
            <FileText className="w-4 h-4 text-accent" />
            <span>3. Primary Requirements</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setStep(2)}
            className="text-xs text-accent hover:text-accent-hover hover:bg-indigo-50 font-semibold"
          >
            <Pencil className="w-3 h-3 mr-1" /> Edit
          </Button>
        </div>

        {category === 'planner' && (
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 block font-medium mb-1.5">
                Services Required
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(categoryDetails.services as string[] || []).map((s) => (
                  <Badge key={s} variant="secondary">
                    {(PLANNER_SERVICE_LABELS as any)[s] || s}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <span className="text-slate-400 block font-medium mb-1">
                  Expected Guest Count
                </span>
                <span className="font-semibold text-slate-800">
                  {categoryDetails.guestCount || '—'} Guests
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium mb-1">
                  Planning Scope
                </span>
                <span className="font-semibold text-slate-800">
                  {(PLANNING_SCOPE_LABELS as any)[categoryDetails.planningScope] || '—'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium mb-1">
                  Budget
                </span>
                <span className="font-semibold text-slate-800">
                  {(BUDGET_LABELS as any)[categoryDetails.budget] || '—'}
                </span>
              </div>
            </div>
          </div>
        )}

        {category === 'performer' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block font-medium mb-1">
                Performer Category
              </span>
              <span className="font-semibold text-slate-800">
                {(PERFORMER_CATEGORY_LABELS as any)[categoryDetails.performerCategory] || '—'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium mb-1">
                Performance Style
              </span>
              <span className="font-semibold text-slate-800">
                {(PERFORMANCE_TYPE_LABELS as any)[categoryDetails.performanceType] || '—'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium mb-1">
                Number of Artists
              </span>
              <span className="font-semibold text-slate-800">
                {categoryDetails.performerCount || '—'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium mb-1">
                Duration
              </span>
              <span className="font-semibold text-slate-800">
                {(PERFORMANCE_DURATION_LABELS as any)[categoryDetails.duration] || '—'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium mb-1">
                Budget
              </span>
              <span className="font-semibold text-slate-800">
                {(BUDGET_LABELS as any)[categoryDetails.budget] || '—'}
              </span>
            </div>
          </div>
        )}

        {category === 'crew' && (
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 block font-medium mb-1.5">
                Roles Required
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(categoryDetails.roles as string[] || []).map((r) => (
                  <Badge key={r} variant="secondary">
                    {(CREW_ROLE_LABELS as any)[r] || r}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
              <div>
                <span className="text-slate-400 block font-medium mb-1">
                  Crew Count
                </span>
                <span className="font-semibold text-slate-800">
                  {categoryDetails.crewCount || '—'} Members
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium mb-1">
                  Shift Duration
                </span>
                <span className="font-semibold text-slate-800">
                  {(SHIFT_DURATION_LABELS as any)[categoryDetails.shiftDuration] || '—'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium mb-1">
                  Experience
                </span>
                <span className="font-semibold text-slate-800">
                  {(CREW_EXPERIENCE_LABELS as any)[categoryDetails.experience] || '—'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium mb-1">
                  Budget
                </span>
                <span className="font-semibold text-slate-800">
                  {(BUDGET_LABELS as any)[categoryDetails.budget] || '—'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Additional Requirements */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
            <FileText className="w-4 h-4 text-accent" />
            <span>4. Additional Requirements</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setStep(3)}
            className="text-xs text-accent hover:text-accent-hover hover:bg-indigo-50 font-semibold"
          >
            <Pencil className="w-3 h-3 mr-1" /> Edit
          </Button>
        </div>

        <div className="space-y-3 text-xs">
          {additionalDetails.description && (
            <div>
              <span className="text-slate-400 block font-medium mb-0.5">
                Overview / Description
              </span>
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {additionalDetails.description}
              </p>
            </div>
          )}

          {additionalDetails.specialRequirements && (
            <div>
              <span className="text-slate-400 block font-medium mb-0.5">
                Special Requests
              </span>
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {additionalDetails.specialRequirements}
              </p>
            </div>
          )}

          {category === 'planner' && additionalDetails.preferredTheme && (
            <div>
              <span className="text-slate-400 block font-medium mb-0.5">
                Preferred Theme / Style
              </span>
              <span className="font-medium text-slate-800">
                {additionalDetails.preferredTheme}
              </span>
            </div>
          )}

          {category === 'performer' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {additionalDetails.preferredGenre && (
                <div>
                  <span className="text-slate-400 block font-medium mb-0.5">
                    Genre / Music Style
                  </span>
                  <span className="font-medium text-slate-800">
                    {additionalDetails.preferredGenre}
                  </span>
                </div>
              )}
              {additionalDetails.indoorOutdoor && (
                <div>
                  <span className="text-slate-400 block font-medium mb-0.5">
                    Setting
                  </span>
                  <span className="font-medium text-slate-800">
                    {(VENUE_ENVIRONMENT_LABELS as any)[additionalDetails.indoorOutdoor] || additionalDetails.indoorOutdoor}
                  </span>
                </div>
              )}
            </div>
          )}

          {category === 'crew' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {additionalDetails.uniformRequirements && (
                <div>
                  <span className="text-slate-400 block font-medium mb-0.5">
                    Uniform / Dress Code
                  </span>
                  <span className="font-medium text-slate-800">
                    {additionalDetails.uniformRequirements}
                  </span>
                </div>
              )}
              {additionalDetails.reportingInstructions && (
                <div>
                  <span className="text-slate-400 block font-medium mb-0.5">
                    Reporting Instructions
                  </span>
                  <span className="font-medium text-slate-800">
                    {additionalDetails.reportingInstructions}
                  </span>
                </div>
              )}
            </div>
          )}

          {!additionalDetails.description &&
            !additionalDetails.specialRequirements &&
            !additionalDetails.preferredTheme &&
            !additionalDetails.preferredGenre &&
            !additionalDetails.uniformRequirements && (
              <span className="text-slate-400 italic">No additional instructions provided.</span>
            )}
        </div>
      </div>

      {/* 5. Contact Information */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
            <User className="w-4 h-4 text-accent" />
            <span>5. Contact Information</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setStep(3)}
            className="text-xs text-accent hover:text-accent-hover hover:bg-indigo-50 font-semibold"
          >
            <Pencil className="w-3 h-3 mr-1" /> Edit
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block font-medium mb-1">Full Name</span>
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              {contact.name || '—'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium mb-1">Email Address</span>
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              {contact.email || '—'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium mb-1">Phone Number</span>
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              {contact.phone || '—'}
            </span>
          </div>
        </div>
      </div>

      <FormNavigation
        currentStep={4}
        onBack={prevStep}
        onNext={handleSubmit}
        isLoading={isSubmitting}
        nextLabel="Submit Requirement"
      />
    </div>
  );
}

