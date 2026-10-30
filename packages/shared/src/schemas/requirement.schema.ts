import { z } from 'zod';
import {
  BUDGET_RANGES,
  CREW_EXPERIENCES,
  CREW_ROLES,
  EVENT_TYPES,
  PERFORMANCE_DURATIONS,
  PERFORMANCE_TYPES,
  PERFORMER_CATEGORIES,
  PLANNER_SERVICES,
  PLANNING_SCOPES,
  REQUIREMENT_CATEGORIES,
  SHIFT_DURATIONS,
  VENUE_ENVIRONMENTS,
} from '../constants/index.js';

// Helper to get today's date in YYYY-MM-DD
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const phoneRegex = /^(\+?[1-9]\d{0,3}[-.\s]?)?(\d{10}|\d{3}[-.\s]?\d{3}[-.\s]?\d{4})$/;

// Event Basics Schema
export const eventBasicsSchema = z
  .object({
    eventName: z
      .string({ required_error: 'Event name is required' })
      .trim()
      .min(3, 'Event name must be at least 3 characters')
      .max(100, 'Event name must not exceed 100 characters'),
    eventType: z.enum(EVENT_TYPES, {
      errorMap: () => ({ message: 'Please select a valid event type' }),
    }),
    isMultiDay: z.boolean().default(false),
    startDate: z
      .string({ required_error: 'Start date is required' })
      .regex(dateRegex, 'Date must be in YYYY-MM-DD format')
      .refine(
        (val) => {
          return val >= getTodayDateString();
        },
        { message: 'Event date cannot be in the past' }
      ),
    endDate: z
      .string()
      .regex(dateRegex, 'End date must be in YYYY-MM-DD format')
      .nullable()
      .optional()
      .or(z.literal('')),
    location: z
      .string({ required_error: 'Location / City is required' })
      .trim()
      .min(2, 'City / Location must be at least 2 characters')
      .max(100, 'Location must not exceed 100 characters'),
    venue: z
      .string()
      .trim()
      .max(150, 'Venue name must not exceed 150 characters')
      .optional()
      .or(z.literal('')),
    category: z.enum(REQUIREMENT_CATEGORIES, {
      errorMap: () => ({ message: 'Please select a service category' }),
    }),
  })
  .refine(
    (data) => {
      if (data.isMultiDay) {
        if (!data.endDate || data.endDate.trim() === '') {
          return false;
        }
        return data.endDate >= data.startDate;
      }
      return true;
    },
    {
      message: 'End date must be provided and equal to or later than the start date for multi-day events',
      path: ['endDate'],
    }
  );

export type EventBasicsFormData = z.infer<typeof eventBasicsSchema>;

// Category-Specific Primary Requirements Schemas
export const plannerDetailsSchema = z
  .object({
    services: z
      .array(z.enum(PLANNER_SERVICES))
      .min(1, 'Please select at least one planning service'),
    guestCount: z.coerce
      .number({ invalid_type_error: 'Guest count must be a number' })
      .int('Guest count must be an integer')
      .positive('Guest count must be greater than 0'),
    budget: z.enum(BUDGET_RANGES, {
      errorMap: () => ({ message: 'Please select a budget range' }),
    }),
    planningScope: z.enum(PLANNING_SCOPES, {
      errorMap: () => ({ message: 'Please select a planning scope' }),
    }),
  })
  .strict();

export type PlannerDetails = z.infer<typeof plannerDetailsSchema>;

export const performerDetailsSchema = z
  .object({
    performerCategory: z.enum(PERFORMER_CATEGORIES, {
      errorMap: () => ({ message: 'Please select a performer category' }),
    }),
    performanceType: z.enum(PERFORMANCE_TYPES, {
      errorMap: () => ({ message: 'Please select a performance type' }),
    }),
    performerCount: z.coerce
      .number({ invalid_type_error: 'Number of performers must be a number' })
      .int('Number of performers must be an integer')
      .positive('Number of performers must be at least 1'),
    duration: z.enum(PERFORMANCE_DURATIONS, {
      errorMap: () => ({ message: 'Please select a performance duration' }),
    }),
    budget: z.enum(BUDGET_RANGES, {
      errorMap: () => ({ message: 'Please select a budget range' }),
    }),
  })
  .strict();

export type PerformerDetails = z.infer<typeof performerDetailsSchema>;

export const crewDetailsSchema = z
  .object({
    roles: z
      .array(z.enum(CREW_ROLES))
      .min(1, 'Please select at least one crew role'),
    crewCount: z.coerce
      .number({ invalid_type_error: 'Crew count must be a number' })
      .int('Crew count must be an integer')
      .positive('Crew count must be at least 1'),
    shiftDuration: z.enum(SHIFT_DURATIONS, {
      errorMap: () => ({ message: 'Please select a shift duration' }),
    }),
    experience: z.enum(CREW_EXPERIENCES, {
      errorMap: () => ({ message: 'Please select required experience' }),
    }),
    budget: z.enum(BUDGET_RANGES, {
      errorMap: () => ({ message: 'Please select a budget range' }),
    }),
  })
  .strict();

export type CrewDetails = z.infer<typeof crewDetailsSchema>;

// Additional Details Schemas
export const commonAdditionalDetailsSchema = z.object({
  description: z
    .string()
    .trim()
    .max(2000, 'Description must not exceed 2000 characters')
    .optional()
    .or(z.literal('')),
  specialRequirements: z
    .string()
    .trim()
    .max(1000, 'Special requirements must not exceed 1000 characters')
    .optional()
    .or(z.literal('')),
});

export const plannerAdditionalDetailsSchema = commonAdditionalDetailsSchema
  .extend({
    preferredTheme: z
      .string()
      .trim()
      .max(200, 'Theme must not exceed 200 characters')
      .optional()
      .or(z.literal('')),
    coordinationNotes: z
      .string()
      .trim()
      .max(500, 'Coordination notes must not exceed 500 characters')
      .optional()
      .or(z.literal('')),
    planningConstraints: z
      .string()
      .trim()
      .max(500, 'Planning constraints must not exceed 500 characters')
      .optional()
      .or(z.literal('')),
  })
  .strict();

export type PlannerAdditionalDetails = z.infer<typeof plannerAdditionalDetailsSchema>;

export const performerAdditionalDetailsSchema = commonAdditionalDetailsSchema
  .extend({
    preferredGenre: z
      .string()
      .trim()
      .max(200, 'Preferred genre must not exceed 200 characters')
      .optional()
      .or(z.literal('')),
    languagePreferences: z
      .string()
      .trim()
      .max(200, 'Language preferences must not exceed 200 characters')
      .optional()
      .or(z.literal('')),
    technicalEquipmentRequirements: z
      .string()
      .trim()
      .max(500, 'Technical equipment requirements must not exceed 500 characters')
      .optional()
      .or(z.literal('')),
    indoorOutdoor: z.enum(VENUE_ENVIRONMENTS).optional(),
  })
  .strict();

export type PerformerAdditionalDetails = z.infer<typeof performerAdditionalDetailsSchema>;

export const crewAdditionalDetailsSchema = commonAdditionalDetailsSchema
  .extend({
    requiredTools: z
      .string()
      .trim()
      .max(500, 'Required tools description must not exceed 500 characters')
      .optional()
      .or(z.literal('')),
    uniformRequirements: z
      .string()
      .trim()
      .max(200, 'Uniform requirements must not exceed 200 characters')
      .optional()
      .or(z.literal('')),
    reportingInstructions: z
      .string()
      .trim()
      .max(500, 'Reporting instructions must not exceed 500 characters')
      .optional()
      .or(z.literal('')),
    certificationsRequired: z
      .string()
      .trim()
      .max(300, 'Certifications must not exceed 300 characters')
      .optional()
      .or(z.literal('')),
  })
  .strict();

export type CrewAdditionalDetails = z.infer<typeof crewAdditionalDetailsSchema>;

// Contact Information Schema
export const contactSchema = z
  .object({
    name: z
      .string({ required_error: 'Contact name is required' })
      .trim()
      .min(2, 'Contact name must be at least 2 characters')
      .max(100, 'Contact name must not exceed 100 characters'),
    email: z
      .string({ required_error: 'Contact email is required' })
      .trim()
      .toLowerCase()
      .email('Enter a valid email address'),
    phone: z
      .string({ required_error: 'Contact phone number is required' })
      .trim()
      .regex(phoneRegex, 'Enter a valid 10-digit or international phone number'),
  })
  .strict();

export type ContactFormData = z.infer<typeof contactSchema>;

// Shared Event Schema inside requirement payload (without category)
export const eventDataSchema = z
  .object({
    eventName: z
      .string()
      .trim()
      .min(3, 'Event name must be at least 3 characters')
      .max(100, 'Event name must not exceed 100 characters'),
    eventType: z.enum(EVENT_TYPES),
    startDate: z
      .string()
      .regex(dateRegex, 'Date must be in YYYY-MM-DD format')
      .refine((val) => val >= getTodayDateString(), {
        message: 'Event date cannot be in the past',
      }),
    endDate: z
      .string()
      .regex(dateRegex, 'End date must be in YYYY-MM-DD format')
      .nullable()
      .optional(),
    location: z
      .string()
      .trim()
      .min(2, 'Location must be at least 2 characters')
      .max(100, 'Location must not exceed 100 characters'),
    venue: z.string().trim().max(150).optional().default(''),
  })
  .refine(
    (data) => {
      if (data.endDate && data.endDate.trim() !== '') {
        return data.endDate >= data.startDate;
      }
      return true;
    },
    {
      message: 'End date must be equal to or later than the start date',
      path: ['endDate'],
    }
  );

export type EventData = z.infer<typeof eventDataSchema>;

// Discriminated Union Payloads for Submission
export const plannerRequirementCreateSchema = z
  .object({
    category: z.literal('planner'),
    event: eventDataSchema,
    categoryDetails: plannerDetailsSchema,
    additionalDetails: plannerAdditionalDetailsSchema,
    contact: contactSchema,
  })
  .strict();

export const performerRequirementCreateSchema = z
  .object({
    category: z.literal('performer'),
    event: eventDataSchema,
    categoryDetails: performerDetailsSchema,
    additionalDetails: performerAdditionalDetailsSchema,
    contact: contactSchema,
  })
  .strict();

export const crewRequirementCreateSchema = z
  .object({
    category: z.literal('crew'),
    event: eventDataSchema,
    categoryDetails: crewDetailsSchema,
    additionalDetails: crewAdditionalDetailsSchema,
    contact: contactSchema,
  })
  .strict();

export const requirementCreateSchema = z.discriminatedUnion('category', [
  plannerRequirementCreateSchema,
  performerRequirementCreateSchema,
  crewRequirementCreateSchema,
]);

export type RequirementCreateInput = z.infer<typeof requirementCreateSchema>;
export type PlannerRequirementInput = z.infer<typeof plannerRequirementCreateSchema>;
export type PerformerRequirementInput = z.infer<typeof performerRequirementCreateSchema>;
export type CrewRequirementInput = z.infer<typeof crewRequirementCreateSchema>;
