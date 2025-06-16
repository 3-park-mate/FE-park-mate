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
