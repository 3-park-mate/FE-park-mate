// Re-export shared types for backward compatibility
export type { CommonResponseType, ApiResponse } from '@repo/shared-types';

// 실패일 시 아래 success, message 부분을 반환하게 되며
// api 함수 작성할 때 제너릭 타입 명시해줘야 함
