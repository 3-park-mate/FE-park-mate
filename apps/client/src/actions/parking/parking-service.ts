'use server';
import { AvailableSpotsResponseType } from '@/components/pages/check-availability/CheckAvailableSpotsContent';
import { api } from '@/hooks/serverFetch';
import {
  GetParkingLotsInBoxRequestType,
  OperationsInfo,
  ParkingLotOptionDataType,
  ParkingLotResponseDataType,
  ParkingLotsInBoxResponseType,
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

export async function getParkingLotsInBox(
  data: GetParkingLotsInBoxRequestType
) {
  console.log(data);
  try {
    const query: Record<string, string> = {
      swLat: data.swLat.toString(),
      swLng: data.swLng.toString(),
      neLat: data.neLat.toString(),
      neLng: data.neLng.toString(),
      isEvChargingAvailable: data.isEvChargingAvailable.toString(),
    };

    if (data.startDateTime) {
      query.startDateTime = data.startDateTime;
    }

    if (data.endDateTime) {
      query.endDateTime = data.endDateTime;
    }

    const res = await api.get<CommonResponseType<ParkingLotsInBoxResponseType>>(
      READ_API_PREFIX,
      '/box',
      query,
      { cache: 'no-cache' }
    );
    console.log(query, '요청 테스트');
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.error('getParkingLotsInBox 에러:', error);
    throw error;
  }
}

export async function getOperationsById(
  parkingLotUuid: string,
  year: number,
  month: number
): Promise<ApiResponse<OperationsInfo[]>> {
  try {
    const query: Record<string, string> = {
      year: year.toString(),
      month: month.toString(),
    };

    const res = await api.get<CommonResponseType<OperationsInfo[]>>(
      PARKING_API_PREFIX,
      `/${parkingLotUuid}/operations`,
      query,
      {
        cache: 'no-cache',
      }
    );
    console.log(query);
    console.log(res);

    return {
      success: true,
      data: res.data,
    };
  } catch (_error) {
    redirect('/error');
  }
}

export async function getDailyOperationById(
  parkingLotUuid: string
): Promise<ApiResponse<OperationsInfo>> {
  try {
    const res = await api.get<CommonResponseType<OperationsInfo>>(
      PARKING_API_PREFIX,
      `/${parkingLotUuid}/operations/daily`,
      undefined,
      {
        cache: 'no-cache',
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

export async function getAvailableSpots(
  parkingLotUuid: string,
  entryTime: string,
  exitTime: string
): Promise<ApiResponse<AvailableSpotsResponseType>> {
  try {
    const query: Record<string, string> = {
      entryTime: entryTime.toString(),
      exitTime: exitTime.toString(),
    };
    const res = await api.get<CommonResponseType<AvailableSpotsResponseType>>(
      PARKING_API_PREFIX,
      `/${parkingLotUuid}/spots/available`,
      query,
      {
        cache: 'no-cache',
      }
    );
    console.log(query);
    console.log(res);

    return {
      success: true,
      data: res.data,
    };
  } catch (_error) {
    redirect('/error');
  }
}

export async function getParkingLotOptions(): Promise<
  ApiResponse<ParkingLotOptionDataType[]>
> {
  try {
    const res = await api.get<
      CommonResponseType<{ options: ParkingLotOptionDataType[] }>
    >(
      `${process.env.BASE_API_URL}/parking-service/api/v1`,
      '/parkingLotOptions'
    );

    return {
      success: true,
      data: res.data.options,
    };
  } catch (_error) {
    redirect('/error');
  }
}
