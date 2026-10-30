import { z } from 'zod';
import {
  REQUIREMENT_CATEGORIES,
  REQUIREMENT_STATUSES,
  requirementCreateSchema,
} from '@gopratle/shared';

export { requirementCreateSchema };

export const requirementQuerySchema = z.object({
  category: z.enum(REQUIREMENT_CATEGORIES).optional(),
  status: z.enum(REQUIREMENT_STATUSES).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export const requirementParamsSchema = z.object({
  reference: z
    .string()
    .trim()
    .regex(/^GPR-[A-Z0-9]{8}$/, 'Invalid requirement reference format'),
});

export type RequirementQueryParams = z.infer<typeof requirementQuerySchema>;

