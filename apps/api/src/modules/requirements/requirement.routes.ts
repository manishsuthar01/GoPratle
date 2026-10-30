import { Router } from 'express';
import { requirementController } from './requirement.controller.js';
import { validateBody, validateQuery } from '../../middleware/validate-request.js';
import {
  requirementCreateSchema,
  requirementQuerySchema,
} from './requirement.validation.js';

const router = Router();

router.post(
  '/',
  validateBody(requirementCreateSchema),
  requirementController.createRequirement
);

router.get(
  '/',
  validateQuery(requirementQuerySchema),
  requirementController.listRequirements
);

router.get(
  '/:reference',
  requirementController.getRequirement
);

export const requirementRoutes: Router = router;
