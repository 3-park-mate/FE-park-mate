'use server';
import { api } from '@/hooks/serverFetch';
import { SignUpDataType } from '@/types/authDataTypes';
import { ApiResponse, CommonResponseType } from '@/types/responseDataTypes';

const API_PREFIX = `${process.env.BASE_API_URL}/auth-service/api/v1/user`;

export async function signUpAction(
  signUpData: Partial<SignUpDataType>
): Promise<ApiResponse<string>> {
  const payload: Partial<SignUpDataType> = { ...signUpData };
  console.log(payload);
  try {
    const res = await api.post<CommonResponseType<string>>(
      API_PREFIX,
      '/register',
      payload
    );
    console.log(res);

    if (res.code !== 201) {
      return {
        success: false,
        message: res.message,
      };
    }
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || '알 수 없는 오류가 발생했습니다.',
    };
  }
}

export async function sendEmailVerificationAction({
  email,
}: {
  email: string;
}): Promise<ApiResponse<string>> {
  try {
    const res = await api.post<CommonResponseType<string>>(
      API_PREFIX,
      `/sendVerificationCode`,
      undefined,
      {
        query: { email },
      }
    );
    console.log(res);

    return {
      success: true,
      data: res.message,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || '알 수 없는 오류가 발생했습니다.',
    };
  }
}

export async function checkEmailDuplicateAction({
  email,
}: {
  email: string;
}): Promise<ApiResponse<{ duplicate: boolean }>> {
  const payload = { email };

  try {
    const res = await api.post<CommonResponseType<{ duplicate: boolean }>>(
      API_PREFIX,
      '/checkEmail',
      payload
    );
    console.log(res);

    return {
      success: true,
      data: { duplicate: res.data.duplicate },
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || '알 수 없는 오류가 발생했습니다.',
    };
  }
}

export async function verifyEmailCodeAction({
  email,
  verificationCode,
}: {
  email: string;
  verificationCode: string;
}): Promise<ApiResponse<{ valid: boolean }>> {
  const payload = { email, verificationCode };

  try {
    const res = await api.post<CommonResponseType<{ valid: boolean }>>(
      API_PREFIX,
      '/verifyCode',
      payload
    );
    console.log(res);

    return {
      success: true,
      data: { valid: res.data.valid },
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || '알 수 없는 오류가 발생했습니다.',
    };
  }
}
