'use server';

import { options } from '@/app/api/auth/[...nextauth]/options';
import { api } from '@/hooks/serverFetch';
import {
  ReservationItemDataType,
  ReservationListResponse,
} from '@/types/reservationDataTypes';
import { ApiResponse, CommonResponseType } from '@/types/responseDataTypes';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const API_PREFIX = `${process.env.BASE_API_URL}/reservation-service/api/v1/reservations`;

export async function getReservationsData({
  size,
}: {
  size: number;
  cursor?: number;
}): Promise<ApiResponse<ReservationListResponse>> {
  const payload = {
    size: size.toString(),
  };
  try {
    const session = await getServerSession(options);
    if (!session) {
      redirect('/error');
    }
    const uuid = session.user.uuid;
    const accessToken = session.user.accessToken;

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
    console.log(res);

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
