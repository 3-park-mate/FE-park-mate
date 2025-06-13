'use server';
import { SignUpDataType } from '@/types/authDataTypes';

const API_PREFIX = `${process.env.BASE_API_URL}/auth-service/api/v1/user`;

export async function signUpAction(signUpData: Partial<SignUpDataType>) {
  const payload: Partial<SignUpDataType> = { ...signUpData };

  try {
    console.log('Payload being sent to the API:', payload);
    const res = await fetch(`${API_PREFIX}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, message: errorData.message };
    }

    return await res.json();
  } catch (error) {
    console.log('Unexcpected Error:', error);
    return { success: false, message: '알 수 없는 오류가 발생했습니다.' };
  }
}

export async function sendEmailVerificationAction({
  email,
}: {
  email: string;
}) {
  try {
    const res = await fetch(
      `${API_PREFIX}/sendVerificationCode?email=${email}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, message: errorData.message };
    }

    return await res.json();
  } catch (error) {
    console.log('Unexcpected Error:', error);
    return { success: false, message: '알 수 없는 오류가 발생했습니다.' };
  }
}

export async function checkEmailDuplicateAction({ email }: { email: string }) {
  const payload = {
    email,
  };

  try {
    const res = await fetch(`${API_PREFIX}/checkEmail`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('이메일 인증 코드 전송 실패: ', errorData);

      return { success: false, message: errorData.message };
    }

    return await res.json();
  } catch (error) {
    console.log('Unexcpected Error:', error);
    return { success: false, message: '알 수 없는 오류가 발생했습니다.' };
  }
}

export async function verifyEmailCodeAction({
  email,
  verificationCode,
}: {
  email: string;
  verificationCode: string;
}) {
  const payload = {
    email,
    verificationCode,
  };

  try {
    const res = await fetch(`${API_PREFIX}/verifyCode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('이메일 인증 실패: ', errorData);

      return { success: false, message: errorData.message };
    }

    return await res.json();
  } catch (error) {
    console.log('Unexcpected Error:', error);
    return { success: false, message: '알 수 없는 오류가 발생했습니다.' };
  }
}
