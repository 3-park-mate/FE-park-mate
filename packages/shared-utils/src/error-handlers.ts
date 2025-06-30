import {
  ErrorHandler,
  ErrorLogger,
  ErrorRecoveryStrategy,
  ErrorContext,
  ErrorResponse,
  BaseError,
  ApiError,
  ValidationError,
  AuthenticationError,
  BusinessLogicError,
  NetworkError,
  ErrorCodes,
  ErrorFactory,
  ErrorCategory,
  ErrorSeverity,
} from '@repo/shared-types';

// Console Error Logger (Concrete Implementation)
export class ConsoleErrorLogger implements ErrorLogger {
  log(error: BaseError, context?: ErrorContext): void {
    const logData = {
      error: {
        code: error.code,
        message: error.message,
        timestamp: error.timestamp,
        context: error.context,
      },
      context,
      severity: this.getSeverity(error.code),
    };

    if (this.getSeverity(error.code) === 'CRITICAL') {
      console.error('🚨 CRITICAL ERROR:', logData);
    } else if (this.getSeverity(error.code) === 'HIGH') {
      console.error('❌ HIGH ERROR:', logData);
    } else if (this.getSeverity(error.code) === 'MEDIUM') {
      console.warn('⚠️ MEDIUM ERROR:', logData);
    } else {
      console.log('ℹ️ LOW ERROR:', logData);
    }
  }

  logError(error: unknown, context?: ErrorContext): void {
    if (this.isBaseError(error)) {
      this.log(error, context);
    } else {
      console.error('Unknown error:', error, context);
    }
  }

  private getSeverity(code: string): ErrorSeverity {
    if (code.startsWith('AUTH_') || code.startsWith('API_')) {
      return 'HIGH';
    }
    if (code.startsWith('BUSINESS_')) {
      return 'MEDIUM';
    }
    if (code.startsWith('VALIDATION_')) {
      return 'LOW';
    }
    return 'UNKNOWN' as ErrorSeverity;
  }

  private isBaseError(error: unknown): error is BaseError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      'message' in error
    );
  }
}

// API Error Handler (Concrete Implementation)
export class ApiErrorHandler implements ErrorHandler {
  canHandle(error: unknown): boolean {
    return this.isApiError(error) || this.isNetworkError(error);
  }

  handle(error: unknown, context?: ErrorContext): ErrorResponse {
    if (this.isApiError(error)) {
      return {
        success: false,
        error: error,
        context,
      };
    }

    if (this.isNetworkError(error)) {
      const networkError = ErrorFactory.createNetworkError(
        'CONNECTION_FAILED',
        true,
        error instanceof Error ? error.message : 'Network error occurred'
      );
      return {
        success: false,
        error: networkError,
        context,
      };
    }

    // Fallback for unknown errors
    const unknownError = ErrorFactory.createApiError(
      ErrorCodes.UNKNOWN_ERROR,
      500,
      'unknown',
      'UNKNOWN',
      error instanceof Error ? error.message : 'Unknown error occurred'
    );

    return {
      success: false,
      error: unknownError,
      context,
    };
  }

  private isApiError(error: unknown): error is ApiError {
    return typeof error === 'object' && error !== null && 'statusCode' in error;
  }

  private isNetworkError(error: unknown): boolean {
    return error instanceof TypeError && error.message.includes('fetch');
  }
}

// Validation Error Handler (Concrete Implementation)
export class ValidationErrorHandler implements ErrorHandler {
  canHandle(error: unknown): boolean {
    return this.isValidationError(error);
  }

  handle(error: unknown, context?: ErrorContext): ErrorResponse {
    if (this.isValidationError(error)) {
      return {
        success: false,
        error: error,
        context,
      };
    }

    // Fallback for unknown validation errors
    const validationError = ErrorFactory.createValidationError(
      'unknown',
      'unknown',
      'unknown',
      error instanceof Error ? error.message : 'Validation error occurred'
    );

    return {
      success: false,
      error: validationError,
      context,
    };
  }

  private isValidationError(error: unknown): error is ValidationError {
    return typeof error === 'object' && error !== null && 'field' in error;
  }
}

// Authentication Error Handler (Concrete Implementation)
export class AuthenticationErrorHandler implements ErrorHandler {
  canHandle(error: unknown): boolean {
    return this.isAuthenticationError(error);
  }

  handle(error: unknown, context?: ErrorContext): ErrorResponse {
    if (this.isAuthenticationError(error)) {
      return {
        success: false,
        error: error,
        context,
      };
    }

    // Fallback for unknown auth errors
    const authError = ErrorFactory.createAuthenticationError(
      'INVALID_CREDENTIALS',
      error instanceof Error ? error.message : 'Authentication error occurred'
    );

    return {
      success: false,
      error: authError,
      context,
    };
  }

  private isAuthenticationError(error: unknown): error is AuthenticationError {
    return typeof error === 'object' && error !== null && 'reason' in error;
  }
}

// Business Logic Error Handler (Concrete Implementation)
export class BusinessLogicErrorHandler implements ErrorHandler {
  canHandle(error: unknown): boolean {
    return this.isBusinessLogicError(error);
  }

  handle(error: unknown, context?: ErrorContext): ErrorResponse {
    if (this.isBusinessLogicError(error)) {
      return {
        success: false,
        error: error,
        context,
      };
    }

    // Fallback for unknown business logic errors
    const businessError = ErrorFactory.createBusinessLogicError(
      'unknown',
      'unknown',
      'INVALID_STATE',
      error instanceof Error ? error.message : 'Business logic error occurred'
    );

    return {
      success: false,
      error: businessError,
      context,
    };
  }

  private isBusinessLogicError(error: unknown): error is BusinessLogicError {
    return typeof error === 'object' && error !== null && 'operation' in error;
  }
}

// Error Recovery Strategy Implementations
export class NetworkErrorRecoveryStrategy implements ErrorRecoveryStrategy {
  canRecover(error: BaseError): boolean {
    return error.code.startsWith('NETWORK_') && this.isRetryable(error);
  }

  async recover(error: BaseError, context?: ErrorContext): Promise<boolean> {
    if (!this.canRecover(error)) {
      return false;
    }

    // Simple exponential backoff retry logic
    const maxRetries = 3;
    const baseDelay = 1000; // 1 second

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await this.delay(baseDelay * Math.pow(2, attempt - 1));
        // Here you would retry the original operation
        return true;
      } catch (retryError) {
        if (attempt === maxRetries) {
          return false;
        }
      }
    }

    return false;
  }

  private isRetryable(error: BaseError): boolean {
    if (error.code === ErrorCodes.NETWORK_TIMEOUT) {
      return true;
    }
    if (error.code === ErrorCodes.NETWORK_CONNECTION_FAILED) {
      return true;
    }
    return false;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Error Handler Manager (Facade Pattern)
export class ErrorHandlerManager {
  private handlers: ErrorHandler[] = [];
  private logger: ErrorLogger;
  private recoveryStrategies: ErrorRecoveryStrategy[] = [];

  constructor(logger: ErrorLogger = new ConsoleErrorLogger()) {
    this.logger = logger;
    this.initializeDefaultHandlers();
  }

  private initializeDefaultHandlers(): void {
    this.handlers = [
      new ApiErrorHandler(),
      new ValidationErrorHandler(),
      new AuthenticationErrorHandler(),
      new BusinessLogicErrorHandler(),
    ];

    this.recoveryStrategies = [new NetworkErrorRecoveryStrategy()];
  }

  addHandler(handler: ErrorHandler): void {
    this.handlers.push(handler);
  }

  addRecoveryStrategy(strategy: ErrorRecoveryStrategy): void {
    this.recoveryStrategies.push(strategy);
  }

  handleError(error: unknown, context?: ErrorContext): ErrorResponse {
    // Log the error first
    this.logger.logError(error, context);

    // Find appropriate handler
    const handler = this.handlers.find((h) => h.canHandle(error));

    if (handler) {
      const errorResponse = handler.handle(error, context);

      // Try to recover if possible
      if (errorResponse.error) {
        this.attemptRecovery(errorResponse.error, context);
      }

      return errorResponse;
    }

    // Fallback to API error handler for unknown errors
    const apiHandler = new ApiErrorHandler();
    return apiHandler.handle(error, context);
  }

  private async attemptRecovery(
    error: BaseError,
    context?: ErrorContext
  ): Promise<void> {
    for (const strategy of this.recoveryStrategies) {
      if (strategy.canRecover(error)) {
        try {
          const recovered = await strategy.recover(error, context);
          if (recovered) {
            this.logger.log(
              {
                ...error,
                message: `Error recovered: ${error.message}`,
                timestamp: new Date().toISOString(),
              },
              context
            );
            break;
          }
        } catch (recoveryError) {
          this.logger.logError(recoveryError, context);
        }
      }
    }
  }
}

// Global Error Handler Instance
export const globalErrorHandler = new ErrorHandlerManager();
