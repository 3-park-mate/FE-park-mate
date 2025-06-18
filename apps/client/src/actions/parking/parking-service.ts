'use server';
import { api } from '@/hooks/serverFetch';
import { ParkingLotRequestDataType } from '@/types/parkingDataTypes';
import { ApiResponse, CommonResponseType } from '@/types/responseDataTypes';
import { redirect } from 'next/navigation';

const API_PREFIX = `${process.env.BASE_API_URL}/parking-service/api/v1/parkingLots`;

export async function getParkingLotById(
  parkingLotUuid: string
): Promise<ApiResponse<ParkingLotRequestDataType>> {
  try {
    const res = await api.get<CommonResponseType<ParkingLotRequestDataType>>(
      API_PREFIX,
      `/${parkingLotUuid}`,
      undefined,
      {
        cache: 'force-cache',
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
