'use server';
import { api } from '@/hooks/serverFetch';
import {
  ParkingLotResponseDataType,
  WeeklyOperationInfo,
} from '@/types/parkingDataTypes';
import { ApiResponse, CommonResponseType } from '@/types/responseDataTypes';
import { redirect } from 'next/navigation';

const READ_API_PREFIX = `${process.env.BASE_API_URL}/parking-read-service/api/v1/parkingLots`;
const PARKING_API_PREFIX = `${process.env.BASE_API_URL}/parking-service/api/v1/parkingLots`;

export async function getParkingLotById(
  parkingLotUuid: string
): Promise<ApiResponse<ParkingLotResponseDataType>> {
  try {
    const res = await api.get<CommonResponseType<ParkingLotResponseDataType>>(
      READ_API_PREFIX,
      `/${parkingLotUuid}`,
      undefined,
      {
        cache: 'force-cache',
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

export async function getWeeklyOperationById(
  parkingLotUuid: string
): Promise<ApiResponse<WeeklyOperationInfo[]>> {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const isoDate = `${yyyy}-${mm}-${dd}T00:00:00`;

  try {
    const res = await api.get<CommonResponseType<WeeklyOperationInfo[]>>(
      PARKING_API_PREFIX,
      `/${parkingLotUuid}/operations/weekly?date=${encodeURIComponent(isoDate)}`,
      undefined,
      {
        cache: 'no-cache',
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
