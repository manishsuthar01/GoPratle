import crypto from 'crypto';
import mongoose from 'mongoose';
import { ApiError } from '../../utils/ApiError.js';
import { env } from '../../config/env.js';
import { requirementRepository, RequirementRepository } from './requirement.repository.js';
import {
  RequirementCreateInput,
  RequirementResponseData,
  RequirementPublicDetails,
  RequirementListResult,
} from './requirement.types.js';
import { RequirementQueryParams } from './requirement.validation.js';

export class RequirementService {
  constructor(private readonly repo: RequirementRepository = requirementRepository) {}

  public generateReference(): string {
    const randomHex = crypto.randomBytes(4).toString('hex').toUpperCase();
    return `GPR-${randomHex}`;
  }

  public computeRequestHash(payload: any): string {
    const canonicalize = (obj: any): any => {
      if (obj === null || typeof obj !== 'object') {
        return obj;
      }
      if (Array.isArray(obj)) {
        return obj.map(canonicalize);
      }
      return Object.keys(obj)
        .sort()
        .reduce((acc: Record<string, any>, key: string) => {
          acc[key] = canonicalize(obj[key]);
          return acc;
        }, {});
    };

    const canonicalString = JSON.stringify(canonicalize(payload));
    return crypto.createHash('sha256').update(canonicalString).digest('hex');
  }

  async createRequirement(
    payload: RequirementCreateInput,
    idempotencyKey?: string
  ): Promise<{ data: RequirementResponseData; isReplay: boolean }> {
    let requestHash = '';
    const now = new Date();

    if (idempotencyKey) {
      requestHash = this.computeRequestHash(payload);

      // 1. Check if an idempotency record already exists
      const existingRecord = await this.repo.findIdempotencyRecord(idempotencyKey);
      if (existingRecord) {
        if (existingRecord.requestHash === requestHash) {
          return {
            data: existingRecord.response as RequirementResponseData,
            isReplay: true,
          };
        } else {
          throw ApiError.conflict(
            'Idempotency key already used with a different request'
          );
        }
      }
    }

    const reference = this.generateReference();
    const expiresAt = new Date(
      now.getTime() + env.IDEMPOTENCY_TTL_SECONDS * 1000
    );

    // Try MongoDB transaction if replica set is available
    let session: mongoose.ClientSession | undefined;
    const client = mongoose.connection.getClient?.();
    const topologyType = (client as any)?.topology?.description?.type;
    const isReplicaSet =
      typeof topologyType === 'string' && topologyType.includes('ReplicaSet');

    try {
      if (isReplicaSet) {
        session = await mongoose.startSession();
        session.startTransaction();
      }

      const createdReq = await this.repo.create(
        {
          reference,
          category: payload.category,
          status: 'submitted',
          event: payload.event,
          categoryDetails: payload.categoryDetails,
          additionalDetails: payload.additionalDetails || {},
          contact: payload.contact,
        },
        session
      );

      const responseData: RequirementResponseData = {
        reference: createdReq.reference,
        category: createdReq.category,
        status: createdReq.status,
        createdAt: createdReq.createdAt.toISOString(),
      };

      if (idempotencyKey) {
        await this.repo.createIdempotencyRecord(
          {
            key: idempotencyKey,
            requestHash,
            response: responseData,
            expiresAt,
          },
          session
        );
      }

      if (session) {
        await session.commitTransaction();
      }

      return { data: responseData, isReplay: false };
    } catch (err: any) {
      if (session) {
        await session.abortTransaction();
      }

      // Handle duplicate idempotency key race condition (E11000)
      if (err.code === 11000 && idempotencyKey && err.keyPattern?.key) {
        const raceRecord = await this.repo.findIdempotencyRecord(idempotencyKey);
        if (raceRecord) {
          if (raceRecord.requestHash === requestHash) {
            return {
              data: raceRecord.response as RequirementResponseData,
              isReplay: true,
            };
          }
          throw ApiError.conflict(
            'Idempotency key already used with a different request'
          );
        }
      }

      // If reference collision occurred (E11000 on reference), retry once
      if (err.code === 11000 && err.keyPattern?.reference) {
        return this.createRequirement(payload, idempotencyKey);
      }

      throw err;
    } finally {
      if (session) {
        await session.endSession();
      }
    }
  }

  async getRequirementByReference(
    reference: string
  ): Promise<RequirementPublicDetails> {
    const doc = await this.repo.findByReference(reference);
    if (!doc) {
      throw ApiError.notFound('Requirement not found');
    }

    // Return safe public details (omit private contact details)
    return {
      reference: doc.reference,
      category: doc.category,
      status: doc.status,
      event: {
        eventName: doc.event.eventName,
        eventType: doc.event.eventType,
        startDate: doc.event.startDate,
        endDate: doc.event.endDate,
        location: doc.event.location,
        venue: doc.event.venue,
      },
      categoryDetails: doc.categoryDetails,
      additionalDetails: doc.additionalDetails,
      createdAt: doc.createdAt.toISOString(),
    };
  }

  async listRequirements(
    params: RequirementQueryParams
  ): Promise<RequirementListResult> {
    const { category, status, page, limit } = params;
    const filter: Record<string, any> = {};

    if (category) {
      filter.category = category;
    }
    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;
    const [docs, total] = await Promise.all([
      this.repo.list(filter, skip, limit),
      this.repo.count(filter),
    ]);

    const items: RequirementPublicDetails[] = docs.map((doc) => ({
      reference: doc.reference,
      category: doc.category,
      status: doc.status,
      event: {
        eventName: doc.event.eventName,
        eventType: doc.event.eventType,
        startDate: doc.event.startDate,
        endDate: doc.event.endDate,
        location: doc.event.location,
        venue: doc.event.venue,
      },
      categoryDetails: doc.categoryDetails,
      additionalDetails: doc.additionalDetails,
      createdAt: doc.createdAt.toISOString(),
    }));

    return {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }
}

export const requirementService = new RequirementService();
