/**
 * FE-park-mate 프로젝트 에러 처리 설정
 * SOLID 원칙을 준수하는 에러 처리 시스템 구성
 */

module.exports = {
  // 에러 처리 기본 설정
  errorHandling: {
    // 에러 로깅 설정
    logging: {
      enabled: true,
      level: process.env.NODE_ENV === 'production' ? 'ERROR' : 'DEBUG',
      includeContext: true,
      includeStack: process.env.NODE_ENV !== 'production',
      structured: true,
    },

    // 에러 복구 설정
    recovery: {
      enabled: true,
      maxRetries: 3,
      baseDelay: 1000,
      exponentialBackoff: true,
      jitter: true,
    },

    // 에러 알림 설정
    notification: {
      enabled: process.env.NODE_ENV === 'production',
      criticalErrorsOnly: true,
      channels: ['console', 'slack', 'email'],
    },

    // 에러 메트릭 설정
    metrics: {
      enabled: true,
      collectUserErrors: true,
      collectPerformanceMetrics: true,
    },
  },

  // 에러 타입별 설정
  errorTypes: {
    // API 에러 설정
    api: {
      timeout: 10000,
      retryable: true,
      logLevel: 'ERROR',
      notifyOnFailure: true,
    },

    // 검증 에러 설정
    validation: {
      timeout: 5000,
      retryable: false,
      logLevel: 'WARN',
      notifyOnFailure: false,
    },

    // 인증 에러 설정
    authentication: {
      timeout: 8000,
      retryable: false,
      logLevel: 'ERROR',
      notifyOnFailure: true,
    },

    // 비즈니스 로직 에러 설정
    businessLogic: {
      timeout: 15000,
      retryable: true,
      logLevel: 'ERROR',
      notifyOnFailure: true,
    },

    // 네트워크 에러 설정
    network: {
      timeout: 12000,
      retryable: true,
      logLevel: 'ERROR',
      notifyOnFailure: true,
    },
  },

  // 에러 메시지 설정
  messages: {
    // 기본 에러 메시지
    default: {
      api: '서버와의 통신 중 오류가 발생했습니다.',
      validation: '입력 정보를 확인해주세요.',
      authentication: '인증에 실패했습니다.',
      businessLogic: '요청을 처리할 수 없습니다.',
      network: '네트워크 연결을 확인해주세요.',
      unknown: '알 수 없는 오류가 발생했습니다.',
    },

    // 사용자 친화적 메시지
    userFriendly: {
      api: '일시적인 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      validation: '입력하신 정보를 다시 확인해주세요.',
      authentication: '로그인 정보가 올바르지 않습니다. 다시 확인해주세요.',
      businessLogic:
        '현재 요청을 처리할 수 없습니다. 잠시 후 다시 시도해주세요.',
      network: '인터넷 연결을 확인하고 다시 시도해주세요.',
      unknown: '예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    },
  },

  // 에러 처리 룰 설정
  rules: {
    // SOLID 원칙 준수 룰
    solid: {
      singleResponsibility: true,
      openClosed: true,
      liskovSubstitution: true,
      interfaceSegregation: true,
      dependencyInversion: true,
    },

    // 에러 처리 룰
    errorHandling: {
      useSpecificErrorTypes: true,
      consistentErrorLogging: true,
      userFriendlyMessages: true,
      errorRecoveryStrategy: true,
      singleResponsibilityHandler: true,
      errorTypeSpecificHandling: true,
      includeErrorContext: true,
      extensibleErrorHandling: true,
      internationalizableMessages: true,
      testableErrorHandling: true,
    },
  },

  // 환경별 설정
  environments: {
    development: {
      logging: {
        level: 'DEBUG',
        includeStack: true,
      },
      recovery: {
        maxRetries: 1,
      },
      notification: {
        enabled: false,
      },
    },

    staging: {
      logging: {
        level: 'INFO',
        includeStack: false,
      },
      recovery: {
        maxRetries: 2,
      },
      notification: {
        enabled: true,
        criticalErrorsOnly: true,
      },
    },

    production: {
      logging: {
        level: 'ERROR',
        includeStack: false,
      },
      recovery: {
        maxRetries: 3,
      },
      notification: {
        enabled: true,
        criticalErrorsOnly: true,
      },
    },
  },

  // 에러 처리 모니터링 설정
  monitoring: {
    // 에러 발생 임계값
    thresholds: {
      critical: 1, // 1개 이상 발생 시 즉시 알림
      high: 5, // 5개 이상 발생 시 알림
      medium: 10, // 10개 이상 발생 시 알림
      low: 50, // 50개 이상 발생 시 알림
    },

    // 에러 발생 시간 윈도우 (분)
    timeWindow: {
      critical: 1, // 1분
      high: 5, // 5분
      medium: 15, // 15분
      low: 60, // 60분
    },

    // 알림 채널 설정
    channels: {
      slack: {
        enabled: process.env.SLACK_WEBHOOK_URL !== undefined,
        webhookUrl: process.env.SLACK_WEBHOOK_URL,
        channel: '#alerts',
      },
      email: {
        enabled: process.env.EMAIL_SERVICE !== undefined,
        recipients: process.env.ALERT_EMAIL_RECIPIENTS?.split(',') || [],
      },
      console: {
        enabled: true,
      },
    },
  },

  // 에러 처리 성능 설정
  performance: {
    // 에러 처리 타임아웃 (ms)
    timeout: {
      handler: 5000, // 에러 핸들러 실행 타임아웃
      recovery: 10000, // 에러 복구 타임아웃
      notification: 3000, // 알림 전송 타임아웃
    },

    // 메모리 사용량 제한
    memory: {
      maxErrorLogSize: 1000, // 최대 에러 로그 개수
      maxContextSize: 1024, // 최대 컨텍스트 크기 (bytes)
    },

    // 캐시 설정
    cache: {
      enabled: true,
      ttl: 300000, // 5분
      maxSize: 100, // 최대 캐시 항목 수
    },
  },
};
