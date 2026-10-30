import mongoose, { Schema, Document } from 'mongoose';
import {
  REQUIREMENT_CATEGORIES,
  REQUIREMENT_STATUSES,
  EVENT_TYPES,
  RequirementCategory,
  RequirementStatus,
} from '@gopratle/shared';

export interface IEvent {
  eventName: string;
  eventType: string;
  startDate: string;
  endDate?: string | null;
  location: string;
  venue?: string;
}

export interface IContact {
  name: string;
  email: string;
  phone: string;
}

export interface IRequirement extends Document {
  reference: string;
  category: RequirementCategory;
  status: RequirementStatus;
  event: IEvent;
  categoryDetails: Record<string, any>;
  additionalDetails: Record<string, any>;
  contact: IContact;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema(
  {
    eventName: { type: String, required: true, trim: true },
    eventType: { type: String, required: true, enum: EVENT_TYPES },
    startDate: { type: String, required: true },
    endDate: { type: String, default: null },
    location: { type: String, required: true, trim: true },
    venue: { type: String, default: '', trim: true },
  },
  { _id: false }
);

const contactSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const requirementSchema = new Schema<IRequirement>(
  {
    reference: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: REQUIREMENT_CATEGORIES,
    },
    status: {
      type: String,
      required: true,
      enum: REQUIREMENT_STATUSES,
      default: 'submitted',
    },
    event: {
      type: eventSchema,
      required: true,
    },
    categoryDetails: {
      type: Schema.Types.Mixed,
      required: true,
    },
    additionalDetails: {
      type: Schema.Types.Mixed,
      default: {},
    },
    contact: {
      type: contactSchema,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: true,
    collection: 'requirements',
  }
);

// Compound and Status Indexes specified in Section 9
requirementSchema.index({ category: 1, createdAt: -1 });
requirementSchema.index({ status: 1, createdAt: -1 });

export const RequirementModel = mongoose.model<IRequirement>(
  'Requirement',
  requirementSchema
);

// Idempotency Record Model
export interface IIdempotencyRecord extends Document {
  key: string;
  requestHash: string;
  response: Record<string, any>;
  createdAt: Date;
  expiresAt: Date;
}

const idempotencyRecordSchema = new Schema<IIdempotencyRecord>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    requestHash: {
      type: String,
      required: true,
    },
    response: {
      type: Schema.Types.Mixed,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: false,
    collection: 'idempotency_records',
  }
);

idempotencyRecordSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const IdempotencyRecordModel = mongoose.model<IIdempotencyRecord>(
  'IdempotencyRecord',
  idempotencyRecordSchema
);
