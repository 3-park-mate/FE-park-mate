'use server';
import { ParkingLotOptionDataType } from '@/types/parkingDataTypes';
import { ApiResponse, CommonResponseType } from '@/types/responseDataTypes';
import { redirect } from 'next/navigation';

const API_PREFIX = `${process.env.BASE_API_URL}/parking-service/api/v1`;

export async function getParkingLotOptions(): Promise<
  ApiResponse<ParkingLotOptionDataType[]>
> {
  try {
    const res = await fetch(`${API_PREFIX}/parkingLotOptions`, {
      method: 'GET',
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Data Fetching failed:', errorData);
      redirect('/error');
    }

    const data = (await res.json()) as CommonResponseType<{
      options: ParkingLotOptionDataType[];
    }>;

    return {
      success: true,
      data: data.data.options,
    };
  } catch (error) {
    console.log('Unexcpected Error:', error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : '예상치 못한 오류가 발생했습니다.',
    };
    // redirect('/error');
  }
}
