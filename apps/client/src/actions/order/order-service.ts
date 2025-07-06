'use server';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { api } from '@/hooks/serverFetch';
import {
  OrderDataType,
  OrderDetailDataType,
  OrderResponseDataType,
} from '@/types/orderDataTypes';
import { ApiResponse, CommonResponseType } from '@/types/responseDataTypes';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const API_PREFIX = `${process.env.BASE_API_URL}/order-service/api/v1/orders`;

export async function createOrderAction({
  orderType,
  productCode,
  amount,
  paymentType,
}: OrderDataType): Promise<ApiResponse<OrderResponseDataType>> {
  const payload = { orderType, productCode, amount, paymentType };
  console.log(payload);
  try {
    const session = await getServerSession(options);
    if (!session) {
      redirect('/error');
    }
    const uuid = session.user.uuid;
    const accessToken = session.user.accessToken;

    const res = await api.post<CommonResponseType<OrderResponseDataType>>(
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

export async function getOrderDetailData(
  orderCode: string
): Promise<ApiResponse<OrderDetailDataType>> {
  try {
    const session = await getServerSession(options);
    if (!session) {
      redirect('/error');
    }
    const uuid = session.user.uuid;
    const accessToken = session.user.accessToken;
    console.log('accessToken:', accessToken);

    const res = await api.get<CommonResponseType<OrderDetailDataType>>(
      API_PREFIX,
      `/${orderCode}`,
      undefined,
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
