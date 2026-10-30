import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { requirementService, RequirementService } from './requirement.service.js';
import { RequirementQueryParams } from './requirement.validation.js';

export class RequirementController {
  constructor(private readonly service: RequirementService = requirementService) {}

  createRequirement = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const idempotencyKey = req.header('Idempotency-Key') || undefined;
      const { data, isReplay } = await this.service.createRequirement(
        req.body,
        idempotencyKey
      );

      const message = isReplay
        ? 'Requirement retrieved from idempotency cache'
        : 'Requirement submitted successfully';

      ApiResponse.created(res, message, data);
    } catch (error) {
      next(error);
    }
  };

  getRequirement = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const referenceParam = req.params.reference;
      const reference = Array.isArray(referenceParam)
        ? referenceParam[0]
        : referenceParam;
      const data = await this.service.getRequirementByReference(reference);
      ApiResponse.success(res, 'Requirement retrieved successfully', data);
    } catch (error) {
      next(error);
    }
  };

  listRequirements = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const query = req.query as unknown as RequirementQueryParams;
      const data = await this.service.listRequirements(query);
      ApiResponse.success(res, 'Requirements retrieved successfully', data);
    } catch (error) {
      next(error);
    }
  };
}

export const requirementController = new RequirementController();
