'use server';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { api } from '@/hooks/serverFetch';
import { AddParkingLotDataType } from '@/types/addParkingLotDataTypes';
import {
  OperationDataType,
  OperationStoreDataType,
  ParkingLotItem,
  ParkingLotOptionDataType,
  ParkingLotResponseDataType,
} from '@/types/parkingDataTypes';
import { ApiResponse, CommonResponseType } from '@/types/responseDataTypes';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const API_PREFIX = `${process.env.BASE_API_URL}/parking-service/api/v1`;
const READ_API_PREFIX = `${process.env.BASE_API_URL}/parking-read-service/api/v1/parkingLots`;

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

export async function getMonthlyOperationById(
  parkingLotUuid: string
): Promise<ApiResponse<OperationDataType[]>> {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1);

  const query: Record<string, string> = {
    year: year.toString(),
    month: month.toString(),
  };

  try {
    const res = await api.get<CommonResponseType<OperationDataType[]>>(
      API_PREFIX,
      `/parkingLots/${parkingLotUuid}/operations`,
      query
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

export async function UpdateParkingOperationAction(
  parkingLotUuid: string,
  operationUuid: string,
  OperationData: Partial<OperationStoreDataType>
): Promise<ApiResponse<string>> {
  const payload: Partial<OperationStoreDataType> = { ...OperationData };
  try {
    const res = await api.put<CommonResponseType<string>>(
      API_PREFIX,
      `/parkingLots/${parkingLotUuid}/operations/${operationUuid}`,
      payload
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

export async function AddParkingOperationAction(
  parkingLotUuid: string,
  operationDate: string,
  OperationData: Partial<OperationStoreDataType>
): Promise<ApiResponse<string>> {
  const payload: Partial<OperationStoreDataType> & { operationDate: string } = {
    ...OperationData,
    operationDate,
  };
  try {
    const res = await api.post<CommonResponseType<string>>(
      API_PREFIX,
      `/parkingLots/${parkingLotUuid}/operations`,
      payload
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

export async function DeleteParkingOperationAction(
  parkingLotUuid: string,
  operationUuid: string
): Promise<ApiResponse<string>> {
  try {
    const res = await api.del<CommonResponseType<string>>(
      API_PREFIX,
      `/parkingLots/${parkingLotUuid}/operations/${operationUuid}`
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

export async function getMyParkingLots(): Promise<
  ApiResponse<ParkingLotItem[]>
> {
  try {
    const session = await getServerSession(options);
    if (!session) {
      redirect('/error');
    }
    const uuid = session.user.uuid;
    const accessToken = session.user.accessToken;

    const res = await api.get<
      CommonResponseType<{ parkingLots: ParkingLotItem[] }>
    >(API_PREFIX, '/parkingLots', undefined, {
      headers: {
        'X-Host-UUID': uuid,
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return {
      success: true,
      data: res.data.parkingLots,
    };
  } catch (_error) {
    redirect('/error');
  }
}
