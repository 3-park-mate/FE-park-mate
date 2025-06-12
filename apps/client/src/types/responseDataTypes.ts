export interface CommonResponseType<T> {
  code: number;
  status: string;
  message: string;
  data: T;
}
