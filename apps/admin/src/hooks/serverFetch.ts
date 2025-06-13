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

  try {
    const res = await fetch(url, config);

    // HTTP 응답이 실패 상태(4xx, 5xx)일 경우
    if (!res.ok) {
      const errorData = await res
        .json()
        .catch(() => ({ message: res.statusText || '서버 오류' }));
      console.error('API 호출 실패: ', url, errorData);

      throw new Error(errorData.message || '알 수 없는 오류가 발생했습니다.');
    }

    // 응답이 없는 경우 (예: 204 No Content) 처리
    if (res.status === 204) {
      return null as T; // 또는 undefined
    }

    // 성공적인 응답의 JSON 파싱
    return await res.json();
  } catch (error) {
    console.error('Fetch 중 예상치 못한 오류 발생: ', error);
    // 네트워크 오류, JSON 파싱 오류 등 예외 처리
    throw new Error(
      (error as Error).message || '네트워크 오류가 발생했습니다.'
    );
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
