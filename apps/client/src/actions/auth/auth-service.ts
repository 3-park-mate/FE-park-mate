import { SignUpDataType } from '@/types/authDataTypes';

export async function signUpAction(signUpData: Partial<SignUpDataType>) {
  const payload: Partial<SignUpDataType> = { ...signUpData };

  try {
    console.log('Payload being sent to the API:', payload);
    const res = await fetch(
      `${process.env.BASE_API_URL}/auth-service/api/v1/user/register`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, message: errorData.message };
    }

    return await res.json();
  } catch (error) {
    return { success: false, message: '알 수 없는 오류가 발생했습니다.' };
  }
}
