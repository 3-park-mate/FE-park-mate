'use server';
import { api } from '@/hooks/serverFetch';
import {
  ParkingLotInfoType,
  ParkingLotsInBoxResponseType,
} from '@/types/mapDataTypes';
import { CommonResponseType } from '@/types/responseDataTypes';

const API_PREFIX = `${process.env.BASE_API_URL}/parking-read-service/api/v1/parkingLots`;

export interface GetParkingLotsInBoxRequestType {
  swLat: number;
  swLng: number;
  neLat: number;
  neLng: number;
  isEvChargingAvailable?: boolean;
  startDateTime?: string;
  endDateTime?: string;
}

export async function getParkingLotsInBox(
  data: GetParkingLotsInBoxRequestType
) {
  try {
    const query: Record<string, string> = {
      swLat: data.swLat.toString(),
      swLng: data.swLng.toString(),
      neLat: data.neLat.toString(),
      neLng: data.neLng.toString(),
    };

    if (data.isEvChargingAvailable) {
      query.isEvChargingAvailable = data.isEvChargingAvailable.toString();
    }

    if (data.startDateTime) {
      query.startDateTime = data.startDateTime;
    }

    if (data.endDateTime) {
      query.endDateTime = data.endDateTime;
    }

    const res = await api.get<CommonResponseType<ParkingLotsInBoxResponseType>>(
      API_PREFIX,
      '/box',
      query,
      { cache: 'no-cache' }
    );
    console.log(query);
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.error('getParkingLotsInBox 에러:', error);
    throw error;
  }
}
