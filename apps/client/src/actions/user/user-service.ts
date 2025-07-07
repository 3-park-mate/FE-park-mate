'use server';

import { options } from '@/app/api/auth/[...nextauth]/options';
import { api } from '@/hooks/serverFetch';
import { ParkingLotSimpleDataType } from '@/types/parkingDataTypes';
import { ApiResponse, CommonResponseType } from '@/types/responseDataTypes';
import {
  EditProfileDataType,
  FavoritesResponseDataType,
  UserInfoDataType,
  UserVehicleDataType,
} from '@/types/userDataTypes';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getSimpleParkingLotById } from '../parking/parking-service';

const API_PREFIX = `${process.env.BASE_API_URL}/user-service/api/v1/users`;

export async function getUserInfoData(): Promise<
  ApiResponse<UserInfoDataType>
> {
  try {
    const session = await getServerSession(options);
    if (!session) {
      redirect('/error');
    }
    const uuid = session.user.uuid;
    const accessToken = session.user.accessToken;
    console.log(uuid);

    const res = await api.get<CommonResponseType<UserInfoDataType>>(
      API_PREFIX,
      '',
      undefined,
      {
        headers: {
          'X-User-UUID': uuid,
          'Authorization': `Bearer ${accessToken}`,
        },
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

export async function getUserPointData(): Promise<
  ApiResponse<{ point: number }>
> {
  try {
    const session = await getServerSession(options);
    if (!session) {
      redirect('/error');
    }
    const uuid = session.user.uuid;
    const accessToken = session.user.accessToken;

    const res = await api.get<CommonResponseType<{ point: number }>>(
      API_PREFIX,
      '/point',
      undefined,
      {
        headers: {
          'X-User-UUID': uuid,
          'Authorization': `Bearer ${accessToken}`,
        },
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

export async function AddFavoriteAction(
  parkingLotUuid: string
): Promise<ApiResponse<string>> {
  const payload = {
    parkingLotUuid,
  };
  console.log('payload: ', payload);

  try {
    const session = await getServerSession(options);
    if (!session) {
      return { success: false, message: '로그인 해주세요.' };
    }
    const uuid = session.user.uuid;
    const accessToken = session.user.accessToken;

    const res = await api.post<CommonResponseType<string>>(
      API_PREFIX,
      '/favorites',
      payload,
      {
        headers: {
          'X-User-UUID': uuid,
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );
    console.log(res);

    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || '알 수 없는 오류가 발생했습니다.',
    };
  }
}

export async function DeleteFavoriteAction(
  parkingLotUuid: string
): Promise<ApiResponse<string>> {
  const payload = {
    parkingLotUuid,
  };
  console.log('payload: ', payload);

  try {
    const session = await getServerSession(options);
    if (!session) {
      return { success: false, message: '로그인 해주세요.' };
    }
    const uuid = session.user.uuid;
    const accessToken = session.user.accessToken;

    const res = await api.del<CommonResponseType<string>>(
      API_PREFIX,
      '/favorites',
      payload,
      {
        headers: {
          'X-User-UUID': uuid,
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );
    console.log(res);

    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || '알 수 없는 오류가 발생했습니다.',
    };
  }
}

export async function checkIsFavorite(
  parkingLotUuid: string
): Promise<ApiResponse<boolean>> {
  try {
    const session = await getServerSession(options);
    if (!session) {
      redirect('/error');
    }
    const uuid = session.user.uuid;
    const accessToken = session.user.accessToken;

    const res = await api.get<CommonResponseType<boolean>>(
      API_PREFIX,
      `/favorites/check/${parkingLotUuid}`,
      undefined,
      {
        headers: {
          'X-User-UUID': uuid,
          'Authorization': `Bearer ${accessToken}`,
        },
        cache: 'force-cache',
      }
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

export async function EditUserInfoData(
  userInfoData: Partial<EditProfileDataType>
): Promise<ApiResponse<string>> {
  const payload: Partial<EditProfileDataType> = { ...userInfoData };
  try {
    const session = await getServerSession(options);
    if (!session) {
      return { success: false, message: '로그인 해주세요.' };
    }
    const uuid = session.user.uuid;
    const accessToken = session.user.accessToken;

    const res = await api.put<CommonResponseType<string>>(
      API_PREFIX,
      ``,
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
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || '알 수 없는 오류가 발생했습니다.',
    };
  }
}

export async function getUserVehiclesData(): Promise<
  ApiResponse<{ vehicleUuid: string }[]>
> {
  try {
    const session = await getServerSession(options);
    if (!session) {
      redirect('/error');
    }
    const uuid = session.user.uuid;
    const accessToken = session.user.accessToken;

    const res = await api.get<CommonResponseType<{ vehicleUuid: string }[]>>(
      API_PREFIX,
      '/userVehicle',
      undefined,
      {
        headers: {
          'X-User-UUID': uuid,
          'Authorization': `Bearer ${accessToken}`,
        },
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

export async function getUserVehicleDetailData(
  vehicleUuid: string
): Promise<ApiResponse<UserVehicleDataType>> {
  try {
    const session = await getServerSession(options);
    if (!session) {
      redirect('/error');
    }
    const uuid = session.user.uuid;
    const accessToken = session.user.accessToken;

    const res = await api.get<CommonResponseType<UserVehicleDataType>>(
      API_PREFIX,
      `/userVehicle/${vehicleUuid}`,
      undefined,
      {
        headers: {
          'X-User-UUID': uuid,
          'Authorization': `Bearer ${accessToken}`,
        },
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

export async function addUserVehicleAction(
  userVehicleData: Partial<UserVehicleDataType>
): Promise<ApiResponse<string>> {
  const payload: Partial<UserVehicleDataType> = { ...userVehicleData };
  console.log('payload: ', payload);

  try {
    const session = await getServerSession(options);
    if (!session) {
      return { success: false, message: '로그인 해주세요.' };
    }
    const uuid = session.user.uuid;
    const accessToken = session.user.accessToken;

    const res = await api.post<CommonResponseType<string>>(
      API_PREFIX,
      '/userVehicle',
      payload,
      {
        headers: {
          'X-User-UUID': uuid,
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );
    console.log(res);

    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || '알 수 없는 오류가 발생했습니다.',
    };
  }
}

export async function DeleteUserVehicleAction(
  vehicleUuid: string
): Promise<ApiResponse<string>> {
  try {
    const session = await getServerSession(options);
    if (!session) {
      return { success: false, message: '로그인 해주세요.' };
    }
    const uuid = session.user.uuid;
    const accessToken = session.user.accessToken;

    const res = await api.del<CommonResponseType<string>>(
      API_PREFIX,
      `/userVehicle/${vehicleUuid}`,
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
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || '알 수 없는 오류가 발생했습니다.',
    };
  }
}

export async function UpdateDefaultVehicleAction(
  vehicleUuid: string
): Promise<ApiResponse<string>> {
  try {
    const session = await getServerSession(options);
    if (!session) {
      return { success: false, message: '로그인 해주세요.' };
    }
    const uuid = session.user.uuid;
    const accessToken = session.user.accessToken;

    const res = await api.put<CommonResponseType<string>>(
      API_PREFIX,
      `/userVehicle/${vehicleUuid}`,
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
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || '알 수 없는 오류가 발생했습니다.',
    };
  }
}

export async function getFavoritesData({
  size,
  cursor,
}: {
  size: number;
  cursor?: number;
}): Promise<ApiResponse<FavoritesResponseDataType>> {
  const query: Record<string, string> = {
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

    const res = await api.get<CommonResponseType<FavoritesResponseDataType>>(
      API_PREFIX,
      `/favorites/cursor`,
      query,
      {
        headers: {
          'X-User-UUID': uuid,
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    return {
      success: true,
      data: res.data,
    };
  } catch (_error) {
    redirect('/error');
  }
}

export async function fetchCombinedFavoriteParkingLots({
  size,
  cursor,
}: {
  size: number;
  cursor?: number;
}): Promise<{
  content: ParkingLotSimpleDataType[];
  nextCursor?: number;
  hasNext: boolean;
}> {
  const favoritesRes = await getFavoritesData({ size, cursor });

  if (!favoritesRes.success || !favoritesRes.data) {
    console.error('Failed to fetch favorite UUIDs:', favoritesRes);
    return {
      content: [],
      hasNext: false,
    };
  }

  const favoriteUuids = favoritesRes.data.content;
  const nextCursor = favoritesRes.data.nextCursor;
  const hasNext = favoritesRes.data.hasNext;

  const parkingDetailsPromises = favoriteUuids.map(async (item) => {
    const detailRes = await getSimpleParkingLotById(item.parkingLotUuid);
    if (detailRes.success && detailRes.data) {
      return detailRes.data;
    }
    console.warn(`Failed to fetch details for UUID: ${item.parkingLotUuid}`);
    return null;
  });

  const allLoadedDetails = (await Promise.all(parkingDetailsPromises)).filter(
    Boolean
  ) as ParkingLotSimpleDataType[];

  return {
    content: allLoadedDetails,
    nextCursor,
    hasNext,
  };
}
