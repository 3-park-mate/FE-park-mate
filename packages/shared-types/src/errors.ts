// Base Error Types
export interface BaseError {
  code: string;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
}

// Domain-specific Error Types
export interface ApiError extends BaseError {
  statusCode: number;
  endpoint: string;
  method: string;
  requestId?: string;
}

export interface ValidationError extends BaseError {
  field: string;
  value: unknown;
  constraint: string;
}

export interface AuthenticationError extends BaseError {
  reason: 'INVALID_CREDENTIALS' | 'TOKEN_EXPIRED' | 'INSUFFICIENT_PERMISSIONS';
  redirectUrl?: string;
}

export interface BusinessLogicError extends BaseError {
  operation: string;
  entity: string;
  reason: 'INVALID_STATE' | 'CONSTRAINT_VIOLATION' | 'BUSINESS_RULE_VIOLATION';
}

export interface NetworkError extends BaseError {
  reason: 'TIMEOUT' | 'CONNECTION_FAILED' | 'DNS_ERROR';
  retryable: boolean;
  retryAfter?: number;
}

// Error Categories
export type ErrorCategory =
  | 'API'
  | 'VALIDATION'
  | 'AUTHENTICATION'
  | 'BUSINESS_LOGIC'
  | 'NETWORK'
  | 'UNKNOWN';

// Error Severity Levels
export type ErrorSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

// Error Context
export interface ErrorContext {
  userId?: string;
  sessionId?: string;
  requestId?: string;
  userAgent?: string;
  timestamp: string;
  environment: 'development' | 'staging' | 'production';
}

// Error Response Types
export interface ErrorResponse {
  success: false;
  error: BaseError;
  context?: ErrorContext;
}

// Success Response Types
export interface SuccessResponse<T> {
  success: true;
  data: T;
  context?: ErrorContext;
}

// Union Response Type
export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

// Error Handler Interface (Strategy Pattern)
export interface ErrorHandler {
  canHandle(error: unknown): boolean;
  handle(error: unknown, context?: ErrorContext): ErrorResponse;
}

// Error Logger Interface (Strategy Pattern)
export interface ErrorLogger {
  log(error: BaseError, context?: ErrorContext): void;
  logError(error: unknown, context?: ErrorContext): void;
}

// Error Recovery Strategy
export interface ErrorRecoveryStrategy {
  canRecover(error: BaseError): boolean;
  recover(error: BaseError, context?: ErrorContext): Promise<boolean>;
}

// Error Codes Enum
export enum ErrorCodes {
  // API Errors
  API_TIMEOUT = 'API_TIMEOUT',
  API_RATE_LIMIT = 'API_RATE_LIMIT',
  API_SERVER_ERROR = 'API_SERVER_ERROR',
  API_NOT_FOUND = 'API_NOT_FOUND',
  API_UNAUTHORIZED = 'API_UNAUTHORIZED',
  API_FORBIDDEN = 'API_FORBIDDEN',

  // Validation Errors
  VALIDATION_REQUIRED = 'VALIDATION_REQUIRED',
  VALIDATION_INVALID_FORMAT = 'VALIDATION_INVALID_FORMAT',
  VALIDATION_TOO_LONG = 'VALIDATION_TOO_LONG',
  VALIDATION_TOO_SHORT = 'VALIDATION_TOO_SHORT',
  VALIDATION_INVALID_VALUE = 'VALIDATION_INVALID_VALUE',

  // Authentication Errors
  AUTH_INVALID_CREDENTIALS = 'AUTH_INVALID_CREDENTIALS',
  AUTH_TOKEN_EXPIRED = 'AUTH_TOKEN_EXPIRED',
  AUTH_INSUFFICIENT_PERMISSIONS = 'AUTH_INSUFFICIENT_PERMISSIONS',
  AUTH_SESSION_EXPIRED = 'AUTH_SESSION_EXPIRED',

  // Business Logic Errors
  BUSINESS_INVALID_STATE = 'BUSINESS_INVALID_STATE',
  BUSINESS_CONSTRAINT_VIOLATION = 'BUSINESS_CONSTRAINT_VIOLATION',
  BUSINESS_RESOURCE_NOT_FOUND = 'BUSINESS_RESOURCE_NOT_FOUND',
  BUSINESS_DUPLICATE_ENTRY = 'BUSINESS_DUPLICATE_ENTRY',

  // Network Errors
  NETWORK_TIMEOUT = 'NETWORK_TIMEOUT',
  NETWORK_CONNECTION_FAILED = 'NETWORK_CONNECTION_FAILED',
  NETWORK_DNS_ERROR = 'NETWORK_DNS_ERROR',

  // Unknown Errors
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

// Error Messages
export const ERROR_MESSAGES = {
  [ErrorCodes.API_TIMEOUT]: '요청 시간이 초과되었습니다.',
  [ErrorCodes.API_RATE_LIMIT]: '요청 횟수가 제한을 초과했습니다.',
  [ErrorCodes.API_SERVER_ERROR]: '서버 오류가 발생했습니다.',
  [ErrorCodes.API_NOT_FOUND]: '요청한 리소스를 찾을 수 없습니다.',
  [ErrorCodes.API_UNAUTHORIZED]: '인증이 필요합니다.',
  [ErrorCodes.API_FORBIDDEN]: '접근 권한이 없습니다.',

  [ErrorCodes.VALIDATION_REQUIRED]: '필수 입력 항목입니다.',
  [ErrorCodes.VALIDATION_INVALID_FORMAT]: '올바른 형식이 아닙니다.',
  [ErrorCodes.VALIDATION_TOO_LONG]: '입력 길이가 너무 깁니다.',
  [ErrorCodes.VALIDATION_TOO_SHORT]: '입력 길이가 너무 짧습니다.',
  [ErrorCodes.VALIDATION_INVALID_VALUE]: '올바르지 않은 값입니다.',

  [ErrorCodes.AUTH_INVALID_CREDENTIALS]:
    '이메일 또는 비밀번호가 올바르지 않습니다.',
  [ErrorCodes.AUTH_TOKEN_EXPIRED]: '로그인이 만료되었습니다.',
  [ErrorCodes.AUTH_INSUFFICIENT_PERMISSIONS]: '권한이 부족합니다.',
  [ErrorCodes.AUTH_SESSION_EXPIRED]: '세션이 만료되었습니다.',

  [ErrorCodes.BUSINESS_INVALID_STATE]:
    '현재 상태에서는 해당 작업을 수행할 수 없습니다.',
  [ErrorCodes.BUSINESS_CONSTRAINT_VIOLATION]: '제약 조건을 위반했습니다.',
  [ErrorCodes.BUSINESS_RESOURCE_NOT_FOUND]: '요청한 리소스를 찾을 수 없습니다.',
  [ErrorCodes.BUSINESS_DUPLICATE_ENTRY]: '이미 존재하는 항목입니다.',

  [ErrorCodes.NETWORK_TIMEOUT]: '네트워크 연결 시간이 초과되었습니다.',
  [ErrorCodes.NETWORK_CONNECTION_FAILED]: '네트워크 연결에 실패했습니다.',
  [ErrorCodes.NETWORK_DNS_ERROR]: '도메인을 찾을 수 없습니다.',

  [ErrorCodes.UNKNOWN_ERROR]: '알 수 없는 오류가 발생했습니다.',
} as const;

// Error Factory
export class ErrorFactory {
  static createApiError(
    code: ErrorCodes,
    statusCode: number,
    endpoint: string,
    method: string,
    message?: string
  ): ApiError {
    return {
      code,
      message: message || ERROR_MESSAGES[code],
      timestamp: new Date().toISOString(),
      statusCode,
      endpoint,
      method,
    };
  }

  static createValidationError(
    field: string,
    value: unknown,
    constraint: string,
    message?: string
  ): ValidationError {
    return {
      code: ErrorCodes.VALIDATION_INVALID_VALUE,
      message: message || ERROR_MESSAGES[ErrorCodes.VALIDATION_INVALID_VALUE],
      timestamp: new Date().toISOString(),
      field,
      value,
      constraint,
    };
  }

  static createAuthenticationError(
    reason: AuthenticationError['reason'],
    message?: string
  ): AuthenticationError {
    return {
      code: ErrorCodes.AUTH_INVALID_CREDENTIALS,
      message: message || ERROR_MESSAGES[ErrorCodes.AUTH_INVALID_CREDENTIALS],
      timestamp: new Date().toISOString(),
      reason,
    };
  }

  static createBusinessLogicError(
    operation: string,
    entity: string,
    reason: BusinessLogicError['reason'],
    message?: string
  ): BusinessLogicError {
    return {
      code: ErrorCodes.BUSINESS_INVALID_STATE,
      message: message || ERROR_MESSAGES[ErrorCodes.BUSINESS_INVALID_STATE],
      timestamp: new Date().toISOString(),
      operation,
      entity,
      reason,
    };
  }

  static createNetworkError(
    reason: NetworkError['reason'],
    retryable: boolean,
    message?: string
  ): NetworkError {
    return {
      code: ErrorCodes.NETWORK_CONNECTION_FAILED,
      message: message || ERROR_MESSAGES[ErrorCodes.NETWORK_CONNECTION_FAILED],
      timestamp: new Date().toISOString(),
      reason,
      retryable,
    };
  }
}
