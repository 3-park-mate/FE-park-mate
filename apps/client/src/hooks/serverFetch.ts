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

    // 응답이 없는 경우 (예: 204 No Content) 처리
    if (res.status === 204) {
      return null as T;
    }

    // 성공적인 응답의 JSON 파싱
    // 서버가 HTTP 200 OK를 보내더라도 본문에 오류 정보를 담는 경우를 대비하여 항상 파싱합니다.
    const jsonResponse = await res.json().catch(() => {
      // JSON 파싱 실패 시 기본 오류 메시지
      throw new Error(res.statusText || '응답 JSON 파싱 실패');
    });

    // **여기서 서버 응답 바디의 'code' 필드를 확인하여 에러를 처리합니다.**
    // 서버가 HTTP 200 OK를 보내더라도 본문 JSON에 오류 코드가 있다면 에러로 간주합니다.
    if (
      jsonResponse &&
      typeof jsonResponse.code === 'number' &&
      jsonResponse.code >= 400
    ) {
      console.error('API 호출 실패 (서버 응답 코드 오류): ', url, jsonResponse);
      throw new Error(jsonResponse.message || '서버에서 오류를 반환했습니다.');
    }

    // HTTP 응답이 실패 상태(4xx, 5xx)일 경우 (기존 로직 유지)
    // 이 부분은 서버가 명시적으로 HTTP 상태 코드 자체를 4xx/5xx로 보내는 경우를 대비합니다.
    if (!res.ok) {
      // 위에서 jsonResponse를 이미 파싱했으므로 다시 파싱할 필요가 없습니다.
      console.error('API 호출 실패 (HTTP 상태 코드 오류): ', url, jsonResponse);
      throw new Error(
        jsonResponse.message ||
          res.statusText ||
          '알 수 없는 오류가 발생했습니다.'
      );
    }

    // 모든 검사를 통과한 경우, 성공적인 응답으로 간주하여 반환합니다.
    return jsonResponse;
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
