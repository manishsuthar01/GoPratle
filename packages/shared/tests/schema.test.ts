import { describe, it, expect } from 'vitest';
import {
  requirementCreateSchema,
  eventBasicsSchema,
  getTodayDateString,
} from '../src/index.js';

describe('Shared Requirement Schemas', () => {
  const validEvent = {
    eventName: 'Annual Tech Summit',
    eventType: 'corporate-event' as const,
    startDate: getTodayDateString(),
    endDate: null,
    location: 'Mumbai',
    venue: 'Grand Convention Hall',
  };

  const validContact = {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '9876543210',
  };

  it('validates a valid planner requirement', () => {
    const payload = {
      category: 'planner' as const,
      event: validEvent,
      categoryDetails: {
        services: ['complete-event-planning', 'decoration-styling'],
        guestCount: 250,
        budget: '3lakh-5lakh',
        planningScope: 'full-planning',
      },
      additionalDetails: {
        description: 'Tech conference with exhibition stalls.',
        preferredTheme: 'Futuristic Modern',
      },
      contact: validContact,
    };

    const result = requirementCreateSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it('validates a valid performer requirement', () => {
    const payload = {
      category: 'performer' as const,
      event: validEvent,
      categoryDetails: {
        performerCategory: 'dj',
        performanceType: 'recorded-dj-set',
        performerCount: 1,
        duration: '2-4-hours',
        budget: '50k-1lakh',
      },
      additionalDetails: {
        preferredGenre: 'EDM / Bollywood',
        indoorOutdoor: 'indoor',
      },
      contact: validContact,
    };

    const result = requirementCreateSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it('validates a valid crew requirement', () => {
    const payload = {
      category: 'crew' as const,
      event: validEvent,
      categoryDetails: {
        roles: ['sound-engineer', 'lighting-technician'],
        crewCount: 4,
        shiftDuration: '8-12-hours',
        experience: '3-5-years',
        budget: '1lakh-3lakh',
      },
      additionalDetails: {
        reportingInstructions: 'Report to backstage gate 2 at 7 AM',
      },
      contact: validContact,
    };

    const result = requirementCreateSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it('rejects invalid email in contact', () => {
    const payload = {
      category: 'planner' as const,
      event: validEvent,
      categoryDetails: {
        services: ['complete-event-planning'],
        guestCount: 100,
        budget: '1lakh-3lakh',
        planningScope: 'full-planning',
      },
      additionalDetails: {},
      contact: {
        ...validContact,
        email: 'invalid-email',
      },
    };

    const result = requirementCreateSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it('rejects unknown fields in categoryDetails due to strict schema', () => {
    const payload = {
      category: 'planner' as const,
      event: validEvent,
      categoryDetails: {
        services: ['complete-event-planning'],
        guestCount: 100,
        budget: '1lakh-3lakh',
        planningScope: 'full-planning',
        unexpectedField: 'intruder',
      },
      additionalDetails: {},
      contact: validContact,
    };

    const result = requirementCreateSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it('rejects past dates in eventBasics', () => {
    const result = eventBasicsSchema.safeParse({
      eventName: 'Past Event',
      eventType: 'wedding',
      isMultiDay: false,
      startDate: '2020-01-01',
      location: 'Delhi',
      category: 'planner',
    });

    expect(result.success).toBe(false);
  });
});

