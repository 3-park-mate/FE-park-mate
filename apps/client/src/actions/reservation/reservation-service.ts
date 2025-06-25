'use server';

import { options } from '@/app/api/auth/[...nextauth]/options';
import { api } from '@/hooks/serverFetch';
import {
  ReservationCancelDataType,
  ReservationItemDataType,
  ReservationListResponse,
} from '@/types/reservationDataTypes';
import { ApiResponse, CommonResponseType } from '@/types/responseDataTypes';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const API_PREFIX = `${process.env.BASE_API_URL}/reservation-service/api/v1/reservations`;

export async function getReservationsData({
  size,
  cursor,
}: {
  size: number;
  cursor?: number;
}): Promise<ApiResponse<ReservationListResponse>> {
  const payload: Record<string, string> = {
    size: size.toString(),
    ...(cursor !== undefined && { cursor: cursor.toString() }),
  };
  try {
    const session = await getServerSession(options);
    if (!session) {
      redirect('/error');
    }
    const uuid = session.user.uuid;
    const accessToken = session.user.accessToken;
    console.log(uuid);

    const res = await api.get<CommonResponseType<ReservationListResponse>>(
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
    // console.log(res);

    return {
      success: true,
      data: res.data,
    };
  } catch (_error) {
    redirect('/error');
  }
}

export async function getReservationDetailData(
  reservationCode: string
): Promise<ApiResponse<ReservationItemDataType>> {
  try {
    const session = await getServerSession(options);
    if (!session) {
      redirect('/error');
    }
    const uuid = session.user.uuid;
    const accessToken = session.user.accessToken;
    console.log('accessToken:', accessToken);

    const res = await api.get<CommonResponseType<ReservationItemDataType>>(
      API_PREFIX,
      `/${reservationCode}`,
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
  } catch (_error) {
    redirect('/error');
  }
}

export async function cancelReservationAction({
  reservationCode,
  cancelReason,
}: ReservationCancelDataType): Promise<ApiResponse<string>> {
  const payload = { cancelReason };

  console.log(payload);
  try {
    const session = await getServerSession(options);
    if (!session) {
      redirect('/error');
    }
    const uuid = session.user.uuid;
    const accessToken = session.user.accessToken;

    const res = await api.put<CommonResponseType<string>>(
      API_PREFIX,
      `/${reservationCode}/cancel`,
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
      data: res.message,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || '알 수 없는 오류가 발생했습니다.',
    };
  }
}
