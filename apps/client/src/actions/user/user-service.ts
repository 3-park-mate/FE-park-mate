'use server';

import { options } from '@/app/api/auth/[...nextauth]/options';
import { api } from '@/hooks/serverFetch';
import { ApiResponse, CommonResponseType } from '@/types/responseDataTypes';
import { UserInfoDataType } from '@/types/userDataTypes';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

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

    const res = await api.get<CommonResponseType<UserInfoDataType>>(
      API_PREFIX,
      `/${uuid}`
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
          'X-User-UUID': `Bearer ${uuid}`,
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
