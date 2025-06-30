import {
  ApiResponse,
  SuccessResponse,
  ErrorResponse,
  ErrorContext,
  ErrorCodes,
  ErrorFactory,
  ApiError,
} from '@repo/shared-types';
import { globalErrorHandler } from './error-handlers';

// Request Configuration Interface
export interface RequestConfig {
  baseUrl: string;
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
}

// HTTP Method Types
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Request Options Interface
export interface RequestOptions {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
  query?: Record<string, string>;
  timeout?: number;
  retries?: number;
}

// Response Interface
export interface HttpResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

// API Client Interface (Interface Segregation Principle)
export interface IApiClient {
  get<T>(
    endpoint: string,
    options?: Partial<RequestOptions>
  ): Promise<ApiResponse<T>>;
  post<T>(
    endpoint: string,
    data?: unknown,
    options?: Partial<RequestOptions>
  ): Promise<ApiResponse<T>>;
  put<T>(
    endpoint: string,
    data?: unknown,
    options?: Partial<RequestOptions>
  ): Promise<ApiResponse<T>>;
  delete<T>(
    endpoint: string,
    options?: Partial<RequestOptions>
  ): Promise<ApiResponse<T>>;
}

// Base API Client Implementation
export class BaseApiClient implements IApiClient {
  private config: RequestConfig;
  private defaultHeaders: Record<string, string>;

  constructor(config: RequestConfig) {
    this.config = {
      timeout: 10000,
      retries: 3,
      ...config,
    };

    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
  }

  async get<T>(
    endpoint: string,
    options?: Partial<RequestOptions>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', ...options });
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    options?: Partial<RequestOptions>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data,
      ...options,
    });
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    options?: Partial<RequestOptions>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body: data, ...options });
  }

  async delete<T>(
    endpoint: string,
    options?: Partial<RequestOptions>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE', ...options });
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions
  ): Promise<ApiResponse<T>> {
    const context: ErrorContext = {
      timestamp: new Date().toISOString(),
      environment: this.getEnvironment(),
      requestId: this.generateRequestId(),
    };

    try {
      const response = await this.executeRequest<T>(endpoint, options, context);
      return this.createSuccessResponse<T>(response.data, context);
    } catch (error) {
      return this.handleError<T>(error, endpoint, options.method, context);
    }
  }

  private async executeRequest<T>(
    endpoint: string,
    options: RequestOptions,
    context: ErrorContext
  ): Promise<HttpResponse<T>> {
    const url = this.buildUrl(endpoint, options.query);
    const requestOptions = this.buildRequestOptions(options);

    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      options.timeout || this.config.timeout
    );

    try {
      const response = await fetch(url, {
        ...requestOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw this.createHttpError(response, endpoint, options.method);
      }

      const data = response.status === 204 ? null : await response.json();

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private buildUrl(endpoint: string, query?: Record<string, string>): string {
    const url = new URL(endpoint, this.config.baseUrl);

    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    return url.toString();
  }

  private buildRequestOptions(options: RequestOptions): RequestInit {
    const headers = { ...this.defaultHeaders, ...options.headers };

    const requestOptions: RequestInit = {
      method: options.method,
      headers,
    };

    if (options.body) {
      if (options.body instanceof FormData) {
        delete headers['Content-Type']; // Let browser set it
        requestOptions.body = options.body;
      } else {
        requestOptions.body = JSON.stringify(options.body);
      }
    }

    return requestOptions;
  }

  private createHttpError(
    response: Response,
    endpoint: string,
    method: string
  ): ApiError {
    let errorCode: ErrorCodes;

    switch (response.status) {
      case 400:
        errorCode = ErrorCodes.API_SERVER_ERROR;
        break;
      case 401:
        errorCode = ErrorCodes.API_UNAUTHORIZED;
        break;
      case 403:
        errorCode = ErrorCodes.API_FORBIDDEN;
        break;
      case 404:
        errorCode = ErrorCodes.API_NOT_FOUND;
        break;
      case 429:
        errorCode = ErrorCodes.API_RATE_LIMIT;
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        errorCode = ErrorCodes.API_SERVER_ERROR;
        break;
      default:
        errorCode = ErrorCodes.API_SERVER_ERROR;
    }

    return ErrorFactory.createApiError(
      errorCode,
      response.status,
      endpoint,
      method,
      response.statusText
    );
  }

  private createSuccessResponse<T>(
    data: T,
    context: ErrorContext
  ): SuccessResponse<T> {
    return {
      success: true,
      data,
      context,
    };
  }

  private handleError<T>(
    error: unknown,
    endpoint: string,
    method: string,
    context: ErrorContext
  ): ErrorResponse {
    if (error instanceof Error && error.name === 'AbortError') {
      const timeoutError = ErrorFactory.createApiError(
        ErrorCodes.API_TIMEOUT,
        408,
        endpoint,
        method,
        'Request timeout'
      );
      return globalErrorHandler.handleError(timeoutError, context);
    }

    return globalErrorHandler.handleError(error, context);
  }

  private getEnvironment(): 'development' | 'staging' | 'production' {
    return (
      (process.env.NODE_ENV as 'development' | 'staging' | 'production') ||
      'development'
    );
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Specialized API Client for Parking Service
export class ParkingApiClient extends BaseApiClient {
  constructor(baseUrl: string) {
    super({
      baseUrl,
      timeout: 15000, // Longer timeout for parking operations
      retries: 2,
    });
  }

  // Parking-specific methods can be added here
  async getParkingLots<T>(
    params?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.get<T>('/parkingLots', { query: params });
  }

  async createParkingLot<T>(data: unknown): Promise<ApiResponse<T>> {
    return this.post<T>('/parkingLots', data);
  }
}

// Specialized API Client for Auth Service
export class AuthApiClient extends BaseApiClient {
  constructor(baseUrl: string) {
    super({
      baseUrl,
      timeout: 10000,
      retries: 1, // Don't retry auth failures
    });
  }

  // Auth-specific methods
  async login<T>(credentials: unknown): Promise<ApiResponse<T>> {
    return this.post<T>('/login', credentials);
  }

  async refreshToken<T>(refreshToken: string): Promise<ApiResponse<T>> {
    return this.post<T>('/refresh', { refreshToken });
  }
}

// API Client Factory (Factory Pattern)
export class ApiClientFactory {
  static createParkingClient(): ParkingApiClient {
    const baseUrl = process.env.BASE_API_URL || '';
    return new ParkingApiClient(`${baseUrl}/parking-service/api/v1`);
  }

  static createAuthClient(): AuthApiClient {
    const baseUrl = process.env.BASE_API_URL || '';
    return new AuthApiClient(`${baseUrl}/auth-service/api/v1`);
  }

  static createReadClient(): BaseApiClient {
    const baseUrl = process.env.BASE_API_URL || '';
    return new BaseApiClient({
      baseUrl: `${baseUrl}/parking-read-service/api/v1`,
      timeout: 8000,
    });
  }
}
