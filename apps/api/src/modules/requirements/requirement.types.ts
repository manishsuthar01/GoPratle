import {
  RequirementCategory,
  RequirementStatus,
  RequirementCreateInput,
} from '@gopratle/shared';

export interface RequirementResponseData {
  reference: string;
  category: RequirementCategory;
  status: RequirementStatus;
  createdAt: string;
}

export interface RequirementPublicDetails {
  reference: string;
  category: RequirementCategory;
  status: RequirementStatus;
  event: {
    eventName: string;
    eventType: string;
    startDate: string;
    endDate?: string | null;
    location: string;
    venue?: string;
  };
  categoryDetails: Record<string, any>;
  additionalDetails: Record<string, any>;
  createdAt: string;
}

export interface RequirementListResult {
  items: RequirementPublicDetails[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type { RequirementCreateInput };
