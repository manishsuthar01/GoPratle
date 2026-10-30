import { ClientSession } from 'mongoose';
import {
  RequirementModel,
  IRequirement,
  IdempotencyRecordModel,
  IIdempotencyRecord,
} from './requirement.model.js';

export class RequirementRepository {
  async findByReference(reference: string): Promise<IRequirement | null> {
    return RequirementModel.findOne({ reference });
  }

  async create(
    data: Partial<IRequirement>,
    session?: ClientSession
  ): Promise<IRequirement> {
    const doc = new RequirementModel(data);
    return doc.save({ session });
  }

  async findIdempotencyRecord(key: string): Promise<IIdempotencyRecord | null> {
    return IdempotencyRecordModel.findOne({ key });
  }

  async createIdempotencyRecord(
    data: {
      key: string;
      requestHash: string;
      response: Record<string, any>;
      expiresAt: Date;
    },
    session?: ClientSession
  ): Promise<IIdempotencyRecord> {
    const record = new IdempotencyRecordModel(data);
    return record.save({ session });
  }

  async list(
    filter: Record<string, any>,
    skip: number,
    limit: number
  ): Promise<IRequirement[]> {
    return RequirementModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  async count(filter: Record<string, any>): Promise<number> {
    return RequirementModel.countDocuments(filter);
  }
}

export const requirementRepository = new RequirementRepository();
