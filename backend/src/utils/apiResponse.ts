/**
 * Standard API Response Structure for Puzzolana Platform
 */
import { Response } from 'express';

export interface ApiResponseData<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    [key: string]: unknown;
  };
  errors?: unknown;
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = 'Operation completed successfully',
  statusCode: number = 200,
  meta?: ApiResponseData['meta']
): void => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
    ...(meta && { meta }),
  });
};

export const sendError = (
  res: Response,
  message: string = 'An error occurred',
  statusCode: number = 400,
  errors: unknown = null
): void => {
  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};
