'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  contactSchema,
  plannerAdditionalDetailsSchema,
  performerAdditionalDetailsSchema,
  crewAdditionalDetailsSchema,
  VENUE_ENVIRONMENTS,
  VENUE_ENVIRONMENT_LABELS,
  VenueEnvironment,
} from '@gopratle/shared';
import { useRequirementStore } from '@/store/requirement-store';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { FormNavigation } from '@/components/requirements/FormNavigation';
import { User, Mail, Phone } from 'lucide-react';

export function StepAdditionalDetails() {
  const {
    category,
    additionalDetails,
    contact,
    setAdditionalDetails,
    setContact,
    nextStep,
    prevStep,
  } = useRequirementStore();

  const additionalSchema =
    category === 'planner'
      ? plannerAdditionalDetailsSchema
      : category === 'performer'
      ? performerAdditionalDetailsSchema
      : crewAdditionalDetailsSchema;

  const step3Schema = z.object({
    additional: additionalSchema,
    contact: contactSchema,
  });

  type Step3Data = z.infer<typeof step3Schema>;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      additional: {
        description: additionalDetails.description || '',
        specialRequirements: additionalDetails.specialRequirements || '',
        ...(category === 'planner'
          ? {
              preferredTheme: additionalDetails.preferredTheme || '',
              coordinationNotes: additionalDetails.coordinationNotes || '',
              planningConstraints: additionalDetails.planningConstraints || '',
            }
          : {}),
        ...(category === 'performer'
          ? {
              preferredGenre: additionalDetails.preferredGenre || '',
              languagePreferences: additionalDetails.languagePreferences || '',
              technicalEquipmentRequirements:
                additionalDetails.technicalEquipmentRequirements || '',
              indoorOutdoor:
                (additionalDetails.indoorOutdoor as VenueEnvironment) || undefined,
            }
          : {}),
        ...(category === 'crew'
          ? {
              requiredTools: additionalDetails.requiredTools || '',
              uniformRequirements: additionalDetails.uniformRequirements || '',
              reportingInstructions: additionalDetails.reportingInstructions || '',
              certificationsRequired:
                additionalDetails.certificationsRequired || '',
            }
          : {}),
      } as any,
      contact: {
        name: contact.name || '',
        email: contact.email || '',
        phone: contact.phone || '',
      },
    },
  });

  const onSubmit = (data: Step3Data) => {
    setAdditionalDetails(data.additional);
    setContact(data.contact);
    nextStep();
  };

  const venueEnvironmentOptions = VENUE_ENVIRONMENTS.map((env) => ({
    value: env,
    label: VENUE_ENVIRONMENT_LABELS[env],
  }));

  const addErrors = errors.additional as any;
  const contactErrors = errors.contact;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Category Specific Fields */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[#1D1D24] border-b border-[#E8E8ED] pb-2">
          {category === 'planner'
            ? 'Planning Style & Constraints'
            : category === 'performer'
            ? 'Performance & Venue Preferences'
            : 'Crew Equipment & Instructions'}
        </h3>

        {category === 'planner' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="preferredTheme">Preferred Event Theme / Style</Label>
              <Input
                id="preferredTheme"
                placeholder="e.g. Modern Minimalist, Bohemian Chic, Traditional Royal"
                {...register('additional.preferredTheme' as any)}
                error={addErrors?.preferredTheme?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="coordinationNotes">Coordination Notes</Label>
                <Textarea
                  id="coordinationNotes"
                  placeholder="e.g. Need weekly status meetings via video call"
                  {...register('additional.coordinationNotes' as any)}
                  error={addErrors?.coordinationNotes?.message}
                />
              </div>

              <div>
                <Label htmlFor="planningConstraints">Planning Constraints</Label>
                <Textarea
                  id="planningConstraints"
                  placeholder="e.g. Strict venue curfew at 10 PM, vegetarian catering only"
                  {...register('additional.planningConstraints' as any)}
                  error={addErrors?.planningConstraints?.message}
                />
              </div>
            </div>
          </div>
        )}

        {category === 'performer' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="preferredGenre">Preferred Genre / Style</Label>
                <Input
                  id="preferredGenre"
                  placeholder="e.g. Bollywood Pop, Acoustic Rock, Classic Jazz"
                  {...register('additional.preferredGenre' as any)}
                  error={addErrors?.preferredGenre?.message}
                />
              </div>

              <div>
                <Label htmlFor="languagePreferences">Language Preferences</Label>
                <Input
                  id="languagePreferences"
                  placeholder="e.g. English, Hindi, Punjabi"
                  {...register('additional.languagePreferences' as any)}
                  error={addErrors?.languagePreferences?.message}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="indoorOutdoor">Indoor / Outdoor Setting</Label>
                <Controller
                  name={'additional.indoorOutdoor' as any}
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="indoorOutdoor"
                      options={venueEnvironmentOptions}
                      placeholder="Select environment"
                      value={field.value || ''}
                      onChange={field.onChange}
                      error={addErrors?.indoorOutdoor?.message}
                    />
                  )}
                />
              </div>

              <div>
                <Label htmlFor="technicalEquipmentRequirements">
                  Technical Equipment Requirements
                </Label>
                <Textarea
                  id="technicalEquipmentRequirements"
                  placeholder="e.g. Artist requires 2 wireless dynamic mics, monitor wedge"
                  {...register('additional.technicalEquipmentRequirements' as any)}
                  error={addErrors?.technicalEquipmentRequirements?.message}
                />
              </div>
            </div>
          </div>
        )}

        {category === 'crew' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="uniformRequirements">Uniform / Dress Code</Label>
                <Input
                  id="uniformRequirements"
                  placeholder="e.g. All black crew attire, safety boots required"
                  {...register('additional.uniformRequirements' as any)}
                  error={addErrors?.uniformRequirements?.message}
                />
              </div>

              <div>
                <Label htmlFor="certificationsRequired">
                  Certifications / Licensing
                </Label>
                <Input
                  id="certificationsRequired"
                  placeholder="e.g. Rigging certification, electrician license"
                  {...register('additional.certificationsRequired' as any)}
                  error={addErrors?.certificationsRequired?.message}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reportingInstructions">Reporting Instructions</Label>
                <Textarea
                  id="reportingInstructions"
                  placeholder="e.g. Report to Stage Gate 2, ask for Production Lead"
                  {...register('additional.reportingInstructions' as any)}
                  error={addErrors?.reportingInstructions?.message}
                />
              </div>

              <div>
                <Label htmlFor="requiredTools">Required Equipment or Tools</Label>
                <Textarea
                  id="requiredTools"
                  placeholder="e.g. Must bring own sound tester, tool belt, multimeters"
                  {...register('additional.requiredTools' as any)}
                  error={addErrors?.requiredTools?.message}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* General Description & Special Requests */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[#1D1D24] border-b border-[#E8E8ED] pb-2">
          General Details
        </h3>

        <div>
          <Label htmlFor="description">Event & Requirement Overview</Label>
          <Textarea
            id="description"
            rows={3}
            placeholder="Describe your event vibe, expectations, and any helpful context..."
            {...register('additional.description')}
            error={addErrors?.description?.message}
          />
        </div>

        <div>
          <Label htmlFor="specialRequirements">Special Requests / Requirements</Label>
          <Textarea
            id="specialRequirements"
            rows={2}
            placeholder="Any custom requests, accessibility needs, or security precautions..."
            {...register('additional.specialRequirements')}
            error={addErrors?.specialRequirements?.message}
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4 pt-1">
        <h3 className="text-sm font-bold text-[#1D1D24] border-b border-[#E8E8ED] pb-2">
          Contact Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="contactName" required>
              Your Full Name
            </Label>
            <Input
              id="contactName"
              placeholder="e.g. Sarah Miller"
              rightIcon={<User className="w-4 h-4" />}
              {...register('contact.name')}
              error={contactErrors?.name?.message}
            />
          </div>

          <div>
            <Label htmlFor="contactEmail" required>
              Email Address
            </Label>
            <Input
              id="contactEmail"
              type="email"
              placeholder="e.g. sarah@example.com"
              rightIcon={<Mail className="w-4 h-4" />}
              {...register('contact.email')}
              error={contactErrors?.email?.message}
            />
          </div>

          <div>
            <Label htmlFor="contactPhone" required>
              Phone Number
            </Label>
            <Input
              id="contactPhone"
              type="tel"
              placeholder="e.g. 9876543210"
              rightIcon={<Phone className="w-4 h-4" />}
              {...register('contact.phone')}
              error={contactErrors?.phone?.message}
            />
          </div>
        </div>
      </div>

      <FormNavigation
        currentStep={3}
        onBack={prevStep}
        submitType="submit"
      />
    </form>
  );
}
