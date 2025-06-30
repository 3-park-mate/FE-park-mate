import {
  ApiResponse,
  ErrorContext,
  ErrorCodes,
  ErrorFactory,
} from '@repo/shared-types';

interface RequestOptions extends RequestInit {
  // RequestInit을 확장하여 추가적인 옵션이 필요하면 여기에 정의
  query?: Record<string, string>;
}

export async function serverFetch<T>(
  baseApiUrl: string,
  endpoint: string,
  options?: RequestOptions
): Promise<T> {
  const {
    method = 'GET',
    headers,
    body,
    query,
    ...customOptions
  } = options || {};

  // 쿼리 파라미터 처리 (예: /users?name=test)
  const url = query
    ? `${baseApiUrl}${endpoint}?${new URLSearchParams(query).toString()}`
    : `${baseApiUrl}${endpoint}`;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json', // 기본 Content-Type
      ...headers, // 사용자 정의 헤더로 덮어쓰기 가능
    },
    ...customOptions, // 기타 fetch 옵션 (cache, next 등)
  };

  // POST, PUT 등 body가 필요한 경우 JSON.stringify 처리
  if (body) {
    if (
      typeof body === 'object' &&
      config.headers &&
      (config.headers as Record<string, string>)['Content-Type']?.includes(
        'json'
      )
    ) {
      config.body = JSON.stringify(body);
    } else {
      config.body = body as BodyInit; // FormData 등 다른 타입의 body 허용
    }
  }

  const context: ErrorContext = {
    timestamp: new Date().toISOString(),
    environment:
      (process.env.NODE_ENV as 'development' | 'staging' | 'production') ||
      'development',
    requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };

  try {
    const res = await fetch(url, config);

    // 응답이 없는 경우 (예: 204 No Content) 처리
    if (res.status === 204) {
      return null as T;
    }

    // 성공적인 응답의 JSON 파싱
    const jsonResponse = await res.json().catch(() => {
      // JSON 파싱 실패 시 기본 오류 메시지
      const parseError = ErrorFactory.createApiError(
        ErrorCodes.API_SERVER_ERROR,
        res.status,
        endpoint,
        method,
        '응답 JSON 파싱 실패'
      );
      throw parseError;
    });

    // 서버 응답 바디의 'code' 필드를 확인하여 에러를 처리
    if (
      jsonResponse &&
      typeof jsonResponse.code === 'number' &&
      jsonResponse.code >= 400
    ) {
      const apiError = ErrorFactory.createApiError(
        ErrorCodes.API_SERVER_ERROR,
        jsonResponse.code,
        endpoint,
        method,
        jsonResponse.message || '서버에서 오류를 반환했습니다.'
      );
      throw apiError;
    }

    // HTTP 응답이 실패 상태(4xx, 5xx)일 경우
    if (!res.ok) {
      const httpError = ErrorFactory.createApiError(
        ErrorCodes.API_SERVER_ERROR,
        res.status,
        endpoint,
        method,
        jsonResponse.message ||
          res.statusText ||
          '알 수 없는 오류가 발생했습니다.'
      );
      throw httpError;
    }

    // 모든 검사를 통과한 경우, 성공적인 응답으로 간주하여 반환
    return jsonResponse;
  } catch (error) {
    // 에러 로깅 및 처리
    console.error('Fetch 중 예상치 못한 오류 발생: ', error);

    // 이미 ApiError인 경우 그대로 throw
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error;
    }

    // 네트워크 오류, JSON 파싱 오류 등 예외 처리
    const networkError = ErrorFactory.createApiError(
      ErrorCodes.API_SERVER_ERROR,
      500,
      endpoint,
      method,
      (error as Error).message || '네트워크 오류가 발생했습니다.'
    );
    throw networkError;
  }
}

// RESTful API 호출을 위한 헬퍼 함수
export const api = {
  get: <T>(
    baseApiUrl: string,
    endpoint: string,
    query?: Record<string, string>,
    options?: Omit<RequestOptions, 'method' | 'query'>
  ) =>
    serverFetch<T>(baseApiUrl, endpoint, { method: 'GET', query, ...options }),

  post: <T>(
    baseApiUrl: string,
    endpoint: string,
    body?: any,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ) =>
    serverFetch<T>(baseApiUrl, endpoint, { method: 'POST', body, ...options }),

  put: <T>(
    baseApiUrl: string,
    endpoint: string,
    body?: any,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ) =>
    serverFetch<T>(baseApiUrl, endpoint, { method: 'PUT', body, ...options }),

  del: <T>(
    baseApiUrl: string,
    endpoint: string,
    options?: Omit<RequestOptions, 'method'>
  ) => serverFetch<T>(baseApiUrl, endpoint, { method: 'DELETE', ...options }),
};
