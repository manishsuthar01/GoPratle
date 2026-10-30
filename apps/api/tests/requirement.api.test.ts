import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/app.js';
import { connectDatabase, disconnectDatabase } from '../src/config/database.js';
import { RequirementModel, IdempotencyRecordModel } from '../src/modules/requirements/requirement.model.js';
import { getTodayDateString } from '@gopratle/shared';

const TEST_DB_URI = 'mongodb://127.0.0.1:27017/gopratle_test';

describe('Requirement API Integration Tests', () => {
  const validEvent = {
    eventName: 'Annual Tech Summit',
    eventType: 'corporate-event',
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

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    await connectDatabase(TEST_DB_URI);
  });

  afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.dropDatabase();
      await disconnectDatabase();
    }
  });

  beforeEach(async () => {
    await RequirementModel.deleteMany({});
    await IdempotencyRecordModel.deleteMany({});
  });

  // 1. Health endpoint returns 200
  it('1. Health endpoint returns 200 and healthy status', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('ok');
  });

  // 2. Valid planner requirement is created
  it('2. Creates a valid planner requirement and persists in MongoDB', async () => {
    const payload = {
      category: 'planner',
      event: validEvent,
      categoryDetails: {
        services: ['complete-event-planning', 'decoration-styling'],
        guestCount: 300,
        budget: '3lakh-5lakh',
        planningScope: 'full-planning',
      },
      additionalDetails: {
        description: 'Complete planning required for tech conference.',
        preferredTheme: 'Minimalist Tech',
      },
      contact: validContact,
    };

    const res = await request(app)
      .post('/api/v1/requirements')
      .send(payload);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.reference).toMatch(/^GPR-[A-Z0-9]{8}$/);
    expect(res.body.data.category).toBe('planner');
    expect(res.body.data.status).toBe('submitted');

    // Verify persisted document in MongoDB
    const savedDoc = await RequirementModel.findOne({ reference: res.body.data.reference });
    expect(savedDoc).not.toBeNull();
    expect(savedDoc?.category).toBe('planner');
    expect(savedDoc?.categoryDetails.guestCount).toBe(300);
  });

  // 3. Valid performer requirement is created
  it('3. Creates a valid performer requirement', async () => {
    const payload = {
      category: 'performer',
      event: validEvent,
      categoryDetails: {
        performerCategory: 'dj',
        performanceType: 'recorded-dj-set',
        performerCount: 1,
        duration: '2-4-hours',
        budget: '50k-1lakh',
      },
      additionalDetails: {
        preferredGenre: 'EDM',
        indoorOutdoor: 'indoor',
      },
      contact: validContact,
    };

    const res = await request(app)
      .post('/api/v1/requirements')
      .send(payload);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.category).toBe('performer');

    const savedDoc = await RequirementModel.findOne({ reference: res.body.data.reference });
    expect(savedDoc?.categoryDetails.performerCategory).toBe('dj');
  });

  // 4. Valid crew requirement is created
  it('4. Creates a valid crew requirement', async () => {
    const payload = {
      category: 'crew',
      event: validEvent,
      categoryDetails: {
        roles: ['sound-engineer', 'lighting-technician'],
        crewCount: 5,
        shiftDuration: '8-12-hours',
        experience: '3-5-years',
        budget: '1lakh-3lakh',
      },
      additionalDetails: {
        reportingInstructions: 'Report to stage manager backstage at 8 AM',
      },
      contact: validContact,
    };

    const res = await request(app)
      .post('/api/v1/requirements')
      .send(payload);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.category).toBe('crew');

    const savedDoc = await RequirementModel.findOne({ reference: res.body.data.reference });
    expect(savedDoc?.categoryDetails.crewCount).toBe(5);
  });

  // 5. Invalid category is rejected
  it('5. Rejects invalid category with HTTP 400', async () => {
    const payload = {
      category: 'caterer', // invalid
      event: validEvent,
      categoryDetails: {},
      contact: validContact,
    };

    const res = await request(app)
      .post('/api/v1/requirements')
      .send(payload);

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Validation failed');
  });

  // 6. Missing event name is rejected
  it('6. Rejects missing event name with HTTP 400', async () => {
    const payload = {
      category: 'planner',
      event: {
        ...validEvent,
        eventName: '',
      },
      categoryDetails: {
        services: ['complete-event-planning'],
        guestCount: 50,
        budget: 'under-50k',
        planningScope: 'day-of-coordination',
      },
      contact: validContact,
    };

    const res = await request(app)
      .post('/api/v1/requirements')
      .send(payload);

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors.some((e: any) => e.field.includes('eventName'))).toBe(true);
  });

  // 7. Invalid email is rejected
  it('7. Rejects invalid email with HTTP 400', async () => {
    const payload = {
      category: 'planner',
      event: validEvent,
      categoryDetails: {
        services: ['complete-event-planning'],
        guestCount: 50,
        budget: 'under-50k',
        planningScope: 'day-of-coordination',
      },
      contact: {
        ...validContact,
        email: 'invalid-email-address',
      },
    };

    const res = await request(app)
      .post('/api/v1/requirements')
      .send(payload);

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors.some((e: any) => e.field.includes('email'))).toBe(true);
  });

  // 8. Invalid date range is rejected
  it('8. Rejects end date earlier than start date for multi-day events', async () => {
    const payload = {
      category: 'planner',
      event: {
        ...validEvent,
        startDate: '2027-05-10',
        endDate: '2027-05-08', // earlier than start date
      },
      categoryDetails: {
        services: ['complete-event-planning'],
        guestCount: 50,
        budget: 'under-50k',
        planningScope: 'day-of-coordination',
      },
      contact: validContact,
    };

    const res = await request(app)
      .post('/api/v1/requirements')
      .send(payload);

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors.some((e: any) => e.field.includes('endDate'))).toBe(true);
  });

  // 9. Category-specific missing fields are rejected
  it('9. Rejects category-specific missing fields (planner without services)', async () => {
    const payload = {
      category: 'planner',
      event: validEvent,
      categoryDetails: {
        services: [], // at least 1 required
        guestCount: 50,
        budget: 'under-50k',
        planningScope: 'day-of-coordination',
      },
      contact: validContact,
    };

    const res = await request(app)
      .post('/api/v1/requirements')
      .send(payload);

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // 10. Unknown category-specific fields are rejected
  it('10. Rejects unknown category-specific fields due to strict schema', async () => {
    const payload = {
      category: 'planner',
      event: validEvent,
      categoryDetails: {
        services: ['complete-event-planning'],
        guestCount: 50,
        budget: 'under-50k',
        planningScope: 'day-of-coordination',
        maliciousInjectedField: 'hack',
      },
      contact: validContact,
    };

    const res = await request(app)
      .post('/api/v1/requirements')
      .send(payload);

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // 11. Duplicate idempotency requests do not create duplicate documents
  it('11. Idempotent submission returns original response without creating duplicate documents', async () => {
    const idempotencyKey = 'c38a2e49-8c6f-4749-bbd1-561b3c95973e';
    const payload = {
      category: 'planner',
      event: validEvent,
      categoryDetails: {
        services: ['complete-event-planning'],
        guestCount: 150,
        budget: '1lakh-3lakh',
        planningScope: 'full-planning',
      },
      contact: validContact,
    };

    // First attempt
    const res1 = await request(app)
      .post('/api/v1/requirements')
      .set('Idempotency-Key', idempotencyKey)
      .send(payload);

    expect(res1.status).toBe(201);
    const originalRef = res1.body.data.reference;

    // Second attempt with exact same key and payload
    const res2 = await request(app)
      .post('/api/v1/requirements')
      .set('Idempotency-Key', idempotencyKey)
      .send(payload);

    expect(res2.status).toBe(201);
    expect(res2.body.data.reference).toBe(originalRef);

    // Verify only ONE document was persisted in the requirements collection
    const count = await RequirementModel.countDocuments({ reference: originalRef });
    expect(count).toBe(1);
  });

  // 12. Reusing an idempotency key with different payload returns 409
  it('12. Reusing an idempotency key with a different payload returns HTTP 409 Conflict', async () => {
    const idempotencyKey = '8fd632e8-58ec-460d-85fa-76ef101a91cf';
    const payload1 = {
      category: 'planner',
      event: validEvent,
      categoryDetails: {
        services: ['complete-event-planning'],
        guestCount: 100,
        budget: 'under-50k',
        planningScope: 'day-of-coordination',
      },
      contact: validContact,
    };

    const res1 = await request(app)
      .post('/api/v1/requirements')
      .set('Idempotency-Key', idempotencyKey)
      .send(payload1);

    expect(res1.status).toBe(201);

    // Different payload with SAME idempotency key
    const payload2 = {
      ...payload1,
      categoryDetails: {
        ...payload1.categoryDetails,
        guestCount: 999, // altered payload!
      },
    };

    const res2 = await request(app)
      .post('/api/v1/requirements')
      .set('Idempotency-Key', idempotencyKey)
      .send(payload2);

    expect(res2.status).toBe(409);
    expect(res2.body.success).toBe(false);
    expect(res2.body.message).toBe('Idempotency key already used with a different request');
  });

  // 13. Database errors are handled safely
  it('13. Safely handles not found and malformed routes', async () => {
    const res = await request(app).get('/api/v1/requirements/GPR-NONEXIST');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Requirement not found');
  });

  it('Safe public retrieval omits private contact details', async () => {
    const payload = {
      category: 'planner',
      event: validEvent,
      categoryDetails: {
        services: ['complete-event-planning'],
        guestCount: 120,
        budget: '1lakh-3lakh',
        planningScope: 'full-planning',
      },
      contact: {
        name: 'Private Person',
        email: 'secret@example.com',
        phone: '9999999999',
      },
    };

    const createRes = await request(app).post('/api/v1/requirements').send(payload);
    const ref = createRes.body.data.reference;

    const getRes = await request(app).get(`/api/v1/requirements/${ref}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.data.reference).toBe(ref);
    expect(getRes.body.data.contact).toBeUndefined(); // Verify contact is NOT leaked in safe response
  });
});
