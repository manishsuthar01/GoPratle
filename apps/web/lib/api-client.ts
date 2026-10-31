import { RequirementCreateInput, ApiSuccessResponse, ApiErrorResponse } from '@gopratle/shared';

const API_BASE_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:5000/api/v1';

export class ApiClientError extends Error {
  public readonly statusCode: number;
  public readonly errors?: Array<{ field?: string; message: string }>;

  constructor(
    statusCode: number,
    message: string,
    errors?: Array<{ field?: string; message: string }>
  ) {
    super(message);
    this.name = 'ApiClientError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export async function submitRequirement(
  payload: RequirementCreateInput,
  idempotencyKey: string
): Promise<{
  reference: string;
  category: string;
  status: string;
  createdAt: string;
}> {
  const url = `${API_BASE_URL}/requirements`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
      },
      body: JSON.stringify(payload),
    });
  } catch (error: any) {
    throw new ApiClientError(
      0,
      'Unable to connect to the server. Please check your internet connection and try again.'
    );
  }

  const result = await response.json();

  if (!response.ok || !result.success) {
    const errorResponse = result as ApiErrorResponse;
    throw new ApiClientError(
      response.status,
      errorResponse.message || 'Failed to submit requirement',
      errorResponse.errors
    );
  }

  return (result as ApiSuccessResponse<any>).data;
}

export async function fetchRequirement(reference: string): Promise<any> {
  const url = `${API_BASE_URL}/requirements/${encodeURIComponent(reference)}`;

  let response: Response;
  try {
    response = await fetch(url);
  } catch (error: any) {
    throw new ApiClientError(
      0,
      'Unable to connect to the server. Please verify your connection.'
    );
  }

  const result = await response.json();

  if (!response.ok || !result.success) {
    const errorResponse = result as ApiErrorResponse;
    throw new ApiClientError(
      response.status,
      errorResponse.message || 'Requirement not found'
    );
  }

  return (result as ApiSuccessResponse<any>).data;
}

