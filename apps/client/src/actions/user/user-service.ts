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
