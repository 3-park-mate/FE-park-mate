'use server';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { api } from '@/hooks/serverFetch';
import { ApiResponse, CommonResponseType } from '@/types/responseDataTypes';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const API_PREFIX = `${process.env.BASE_API_URL}/payment-service/api/v1/payment`;

export async function requestPaymentAction({
  paymentKey,
  orderId,
  amount,
}: {
  paymentKey: string;
  orderId: string;
  amount: number;
}): Promise<ApiResponse<string>> {
  const payload = { paymentKey, orderId, amount };
  console.log(payload);
  try {
    const session = await getServerSession(options);
    if (!session) {
      redirect('/error');
    }
    const uuid = session.user.uuid;
    const accessToken = session.user.accessToken;

    const res = await api.post<CommonResponseType<string>>(
      API_PREFIX,
      '',
      payload,
      {
        headers: {
          'X-User-UUID': uuid,
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );
    console.log(res);

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
