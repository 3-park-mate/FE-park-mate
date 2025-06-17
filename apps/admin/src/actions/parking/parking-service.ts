'use server';
import { api } from '@/hooks/serverFetch';
import { AddParkingLotDataType } from '@/types/addParkingLotDataTypes';
import { ParkingLotOptionDataType } from '@/types/parkingDataTypes';
import { ApiResponse, CommonResponseType } from '@/types/responseDataTypes';
import { redirect } from 'next/navigation';

const API_PREFIX = `${process.env.BASE_API_URL}/parking-service/api/v1`;

export async function getParkingLotOptions(): Promise<
  ApiResponse<ParkingLotOptionDataType[]>
> {
  try {
    const res = await api.get<
      CommonResponseType<{ options: ParkingLotOptionDataType[] }>
    >(API_PREFIX, '/parkingLotOptions');

    return {
      success: true,
      data: res.data.options,
    };
  } catch (_error) {
    redirect('/error');
  }
}

export async function addParkingLotAction(
  AddParkingLotData: Partial<AddParkingLotDataType>
): Promise<ApiResponse<string>> {
  const payload: Partial<AddParkingLotDataType> = { ...AddParkingLotData };
  console.log(payload);
  try {
    const res = await api.post<CommonResponseType<string>>(
      API_PREFIX,
      '/parkingLots',
      payload
    );
    console.log(res);

    // if (res.code !== 201) {
    //   return {
    //     success: false,
    //     message: res.message,
    //   };
    // }
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
