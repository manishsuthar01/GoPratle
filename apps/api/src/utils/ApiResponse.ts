import { Response } from 'express';

export class ApiResponse {
  static success<T>(
    res: Response,
    message: string,
    data: T,
    statusCode = 200
  ): Response {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static created<T>(
    res: Response,
    message: string,
    data: T
  ): Response {
    return res.status(201).json({
      success: true,
      message,
      data,
    });
  }

  static error(
    res: Response,
    statusCode: number,
    message: string,
    errors?: Array<{ field?: string; message: string }>
  ): Response {
    const payload: {
      success: boolean;
      message: string;
      errors?: Array<{ field?: string; message: string }>;
    } = {
      success: false,
      message,
    };

    if (errors && errors.length > 0) {
      payload.errors = errors;
    }

    return res.status(statusCode).json(payload);
  }
}
