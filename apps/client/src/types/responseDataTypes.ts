export interface CommonResponseType<T> {
  code: number;
  status: string;
  message: string;
  data: T;
}

export type ApiResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      message: string;
    };
// 실패일 시 아래 success, message 부분을 반환하게 되며
// api 함수 작성할 때 제너릭 타입 명시해줘야 함
