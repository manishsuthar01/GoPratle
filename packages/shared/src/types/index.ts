import {
  RequirementCategory,
  RequirementStatus,
} from '../constants/index.js';
import {
  RequirementCreateInput,
  PlannerDetails,
  PerformerDetails,
  CrewDetails,
  PlannerAdditionalDetails,
  PerformerAdditionalDetails,
  CrewAdditionalDetails,
  EventData,
  ContactFormData,
} from '../schemas/requirement.schema.js';

export interface RequirementDocument<TDetails = any, TAdditional = any> {
  _id: string;
  reference: string;
  category: RequirementCategory;
  status: RequirementStatus;
  event: EventData;
  categoryDetails: TDetails;
  additionalDetails: TAdditional;
  contact: ContactFormData;
  createdAt: string;
  updatedAt: string;
}

export type PlannerRequirementDoc = RequirementDocument<
  PlannerDetails,
  PlannerAdditionalDetails
>;

export type PerformerRequirementDoc = RequirementDocument<
  PerformerDetails,
  PerformerAdditionalDetails
>;

export type CrewRequirementDoc = RequirementDocument<
  CrewDetails,
  CrewAdditionalDetails
>;

export interface RequirementSummary {
  reference: string;
  category: RequirementCategory;
  status: RequirementStatus;
  createdAt: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorDetail {
  field?: string;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: ApiErrorDetail[];
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

