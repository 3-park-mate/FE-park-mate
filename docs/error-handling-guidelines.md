# 에러 처리 가이드라인

## 개요

이 문서는 FE-park-mate 프로젝트에서 SOLID 원칙을 준수하는 에러 처리 시스템을 구현하기 위한 가이드라인입니다.

## SOLID 원칙 적용

### 1. Single Responsibility Principle (SRP) - 단일 책임 원칙

각 에러 핸들러는 하나의 책임만 가져야 합니다.

```typescript
// ❌ 잘못된 예시 - 여러 책임을 가짐
class ErrorHandler {
  handleError(error: unknown) {
    // 로깅
    console.error(error);
    // 사용자 알림
    showNotification(error);
    // 에러 복구
    this.recover(error);
    // 메트릭 수집
    this.collectMetrics(error);
  }
}

// ✅ 올바른 예시 - 단일 책임
class ErrorLogger {
  log(error: BaseError, context?: ErrorContext): void {
    // 로깅만 담당
  }
}

class ErrorNotifier {
  notify(error: BaseError): void {
    // 사용자 알림만 담당
  }
}

class ErrorRecovery {
  recover(error: BaseError): Promise<boolean> {
    // 에러 복구만 담당
  }
}
```

### 2. Open/Closed Principle (OCP) - 개방-폐쇄 원칙

에러 처리 로직은 확장에는 열려있고 수정에는 닫혀있어야 합니다.

```typescript
// ✅ 확장 가능한 에러 핸들러 시스템
interface ErrorHandler {
  canHandle(error: unknown): boolean;
  handle(error: unknown, context?: ErrorContext): ErrorResponse;
}

class ApiErrorHandler implements ErrorHandler {
  canHandle(error: unknown): boolean {
    return this.isApiError(error);
  }

  handle(error: unknown, context?: ErrorContext): ErrorResponse {
    // API 에러 처리 로직
  }
}

// 새로운 에러 타입 추가 시 기존 코드 수정 없이 확장 가능
class ValidationErrorHandler implements ErrorHandler {
  canHandle(error: unknown): boolean {
    return this.isValidationError(error);
  }

  handle(error: unknown, context?: ErrorContext): ErrorResponse {
    // 검증 에러 처리 로직
  }
}
```

### 3. Liskov Substitution Principle (LSP) - 리스코프 치환 원칙

에러 핸들러는 인터페이스를 정확히 구현해야 합니다.

```typescript
// ✅ 인터페이스 계약을 정확히 구현
class ApiErrorHandler implements ErrorHandler {
  canHandle(error: unknown): boolean {
    return this.isApiError(error);
  }

  handle(error: unknown, context?: ErrorContext): ErrorResponse {
    // 항상 ErrorResponse를 반환
    return {
      success: false,
      error: this.createApiError(error),
      context,
    };
  }
}
```

### 4. Interface Segregation Principle (ISP) - 인터페이스 분리 원칙

에러 핸들러 인터페이스는 구체적이고 작아야 합니다.

```typescript
// ❌ 잘못된 예시 - 너무 큰 인터페이스
interface ErrorHandler {
  canHandle(error: unknown): boolean;
  handle(error: unknown, context?: ErrorContext): ErrorResponse;
  log(error: BaseError, context?: ErrorContext): void;
  recover(error: BaseError, context?: ErrorContext): Promise<boolean>;
  notify(error: BaseError): void;
}

// ✅ 올바른 예시 - 분리된 인터페이스
interface ErrorHandler {
  canHandle(error: unknown): boolean;
  handle(error: unknown, context?: ErrorContext): ErrorResponse;
}

interface ErrorLogger {
  log(error: BaseError, context?: ErrorContext): void;
}

interface ErrorRecoveryStrategy {
  canRecover(error: BaseError): boolean;
  recover(error: BaseError, context?: ErrorContext): Promise<boolean>;
}
```

### 5. Dependency Inversion Principle (DIP) - 의존성 역전 원칙

고수준 모듈은 저수준 모듈에 의존하지 않아야 합니다.

```typescript
// ✅ 의존성 역전 원칙 적용
class ErrorHandlerManager {
  constructor(
    private handlers: ErrorHandler[],
    private logger: ErrorLogger,
    private recoveryStrategies: ErrorRecoveryStrategy[]
  ) {}

  handleError(error: unknown, context?: ErrorContext): ErrorResponse {
    // 추상화에 의존
    const handler = this.handlers.find((h) => h.canHandle(error));
    if (handler) {
      return handler.handle(error, context);
    }
    // 기본 처리
  }
}
```

## 에러 타입 분류

### 1. API 에러 (ApiError)

- HTTP 상태 코드 기반 에러
- 네트워크 통신 실패
- 서버 응답 에러

### 2. 검증 에러 (ValidationError)

- 입력 데이터 검증 실패
- 필수 필드 누락
- 형식 검증 실패

### 3. 인증 에러 (AuthenticationError)

- 로그인 실패
- 토큰 만료
- 권한 부족

### 4. 비즈니스 로직 에러 (BusinessLogicError)

- 비즈니스 규칙 위반
- 상태 제약 조건 위반
- 중복 데이터

### 5. 네트워크 에러 (NetworkError)

- 연결 실패
- 타임아웃
- DNS 에러

## 에러 처리 패턴

### 1. Strategy Pattern

```typescript
// 에러 타입별 처리 전략
const errorHandlers = [
  new ApiErrorHandler(),
  new ValidationErrorHandler(),
  new AuthenticationErrorHandler(),
  new BusinessLogicErrorHandler(),
];

const handler = errorHandlers.find((h) => h.canHandle(error));
if (handler) {
  return handler.handle(error, context);
}
```

### 2. Factory Pattern

```typescript
// 에러 객체 생성
const apiError = ErrorFactory.createApiError(
  ErrorCodes.API_SERVER_ERROR,
  500,
  '/api/users',
  'GET',
  '서버 오류가 발생했습니다.'
);
```

### 3. Facade Pattern

```typescript
// 복잡한 에러 처리 로직을 단순화
class ErrorHandlerManager {
  handleError(error: unknown, context?: ErrorContext): ErrorResponse {
    // 로깅, 처리, 복구를 한 곳에서 관리
  }
}
```

## 에러 로깅 가이드라인

### 1. 구조화된 로깅

```typescript
// ✅ 구조화된 로깅
logger.log({
  error: {
    code: 'API_SERVER_ERROR',
    message: '서버 오류가 발생했습니다.',
    timestamp: new Date().toISOString(),
    statusCode: 500,
    endpoint: '/api/users',
    method: 'GET',
  },
  context: {
    userId: 'user123',
    sessionId: 'session456',
    requestId: 'req_123456789',
    environment: 'production',
  },
  severity: 'HIGH',
});
```

### 2. 에러 심각도 분류

- **CRITICAL**: 시스템 전체에 영향을 주는 에러
- **HIGH**: 주요 기능에 영향을 주는 에러
- **MEDIUM**: 일부 기능에 영향을 주는 에러
- **LOW**: 사용자 경험에만 영향을 주는 에러

## 에러 복구 전략

### 1. 재시도 로직

```typescript
class NetworkErrorRecoveryStrategy implements ErrorRecoveryStrategy {
  async recover(error: BaseError, context?: ErrorContext): Promise<boolean> {
    const maxRetries = 3;
    const baseDelay = 1000;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await this.delay(baseDelay * Math.pow(2, attempt - 1));
        // 원래 작업 재시도
        return true;
      } catch (retryError) {
        if (attempt === maxRetries) {
          return false;
        }
      }
    }
    return false;
  }
}
```

### 2. 대체 로직

```typescript
class FallbackStrategy implements ErrorRecoveryStrategy {
  async recover(error: BaseError, context?: ErrorContext): Promise<boolean> {
    // 캐시된 데이터 사용
    const cachedData = await this.getCachedData();
    if (cachedData) {
      return true;
    }

    // 기본값 사용
    return this.useDefaultValue();
  }
}
```

## 사용자 친화적 에러 메시지

### 1. 기술적 용어 제거

```typescript
// ❌ 잘못된 예시
throw new Error('TypeError: Cannot read property "name" of undefined');

// ✅ 올바른 예시
throw new Error('사용자 정보를 불러올 수 없습니다. 다시 시도해주세요.');
```

### 2. 해결 방법 제시

```typescript
const errorMessages = {
  [ErrorCodes.AUTH_INVALID_CREDENTIALS]:
    '이메일 또는 비밀번호가 올바르지 않습니다. 다시 확인해주세요.',
  [ErrorCodes.NETWORK_CONNECTION_FAILED]:
    '네트워크 연결에 실패했습니다. 인터넷 연결을 확인해주세요.',
  [ErrorCodes.VALIDATION_REQUIRED]: '필수 입력 항목을 모두 입력해주세요.',
};
```

## 테스트 가이드라인

### 1. 에러 핸들러 테스트

```typescript
describe('ApiErrorHandler', () => {
  it('should handle API errors correctly', () => {
    const handler = new ApiErrorHandler();
    const apiError = ErrorFactory.createApiError(
      ErrorCodes.API_SERVER_ERROR,
      500,
      '/api/test',
      'GET'
    );

    const result = handler.handle(apiError);

    expect(result.success).toBe(false);
    expect(result.error.code).toBe(ErrorCodes.API_SERVER_ERROR);
  });
});
```

### 2. 에러 복구 전략 테스트

```typescript
describe('NetworkErrorRecoveryStrategy', () => {
  it('should retry network errors with exponential backoff', async () => {
    const strategy = new NetworkErrorRecoveryStrategy();
    const networkError = ErrorFactory.createNetworkError(
      'CONNECTION_FAILED',
      true
    );

    const result = await strategy.recover(networkError);

    expect(result).toBe(true);
  });
});
```

## 모니터링 및 알림

### 1. 에러 메트릭 수집

```typescript
class ErrorMetricsCollector {
  recordError(error: BaseError, context?: ErrorContext): void {
    // 에러 발생 횟수
    this.incrementErrorCount(error.code);

    // 에러 심각도별 분류
    this.recordErrorSeverity(error.code, this.getSeverity(error.code));

    // 사용자별 에러 추적
    if (context?.userId) {
      this.recordUserError(context.userId, error.code);
    }
  }
}
```

### 2. 알림 설정

```typescript
class ErrorNotificationService {
  async notifyCriticalError(
    error: BaseError,
    context?: ErrorContext
  ): Promise<void> {
    if (this.getSeverity(error.code) === 'CRITICAL') {
      await this.sendSlackNotification(error, context);
      await this.sendEmailNotification(error, context);
    }
  }
}
```

## 결론

이 가이드라인을 따라 SOLID 원칙을 준수하는 에러 처리 시스템을 구현하면:

1. **유지보수성**: 에러 처리 로직이 명확하고 분리되어 있어 유지보수가 용이
2. **확장성**: 새로운 에러 타입이나 처리 로직을 쉽게 추가 가능
3. **테스트 가능성**: 각 에러 핸들러를 독립적으로 테스트 가능
4. **사용자 경험**: 일관되고 사용자 친화적인 에러 메시지 제공
5. **운영 효율성**: 구조화된 로깅과 모니터링으로 문제 해결 시간 단축

이 가이드라인을 프로젝트에 적용하여 견고하고 확장 가능한 에러 처리 시스템을 구축하세요.
