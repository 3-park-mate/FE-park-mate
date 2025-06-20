'use server';
import { api } from '@/hooks/serverFetch';
import { ParkingLotsInBoxResponseType } from '@/types/mapDataTypes';
import { CommonResponseType } from '@/types/responseDataTypes';

const API_PREFIX = `${process.env.BASE_API_URL}/parking-read-service/api/v1/parkingLots`;

interface getParkingLotsInBoxRequestType {
  swLat: number;
  swLng: number;
  neLat: number;
  neLng: number;
  isEvChargingAvailable?: boolean;
  startDateTime?: string;
  endDateTime?: string;
}

export async function getParkingLotsInBox(
  data: getParkingLotsInBoxRequestType
) {
  try {
    const query = {
      swLat: data.swLat.toString(),
      swLng: data.swLng.toString(),
      neLat: data.neLat.toString(),
      neLng: data.neLng.toString(),
      // isEvChargingAvailable: data.isEvChargingAvailable.toString(),
      //   ...(data.startDateTime && { startDateTime: data.startDateTime }),
      //   ...(data.endDateTime && { endDateTime: data.endDateTime }),
    };

    const res = await api.get<CommonResponseType<ParkingLotsInBoxResponseType>>(
      API_PREFIX,
      '/box',
      query
    );
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.error('getParkingLotsInBox 에러:', error);
    throw error;
  }
}

// export async function getParkingLotsInBox(
//   filter: getParkingLotsInBoxRequestType
// ) {
//   console.log('filter', filter);
//   const query = {
//     swLat: filter.swLat.toString(),
//     swLng: filter.swLng.toString(),
//     neLat: filter.neLat.toString(),
//     neLng: filter.neLng.toString(),
//     // isEvChargingAvailable: data.isEvChargingAvailable.toString(),
//     //   ...(data.startDateTime && { startDateTime: data.startDateTime }),
//     //   ...(data.endDateTime && { endDateTime: data.endDateTime }),
//   };
// }
