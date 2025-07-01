'use server';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { api } from '@/hooks/serverFetch';
import { ApiResponse, CommonResponseType } from '@/types/responseDataTypes';
import { NotificationResponse } from '@/types/notificationDataTypes';

const API_PREFIX = `${process.env.BASE_API_URL}/notification-service/api/v1`;

export async function sendTokenToServer(token: string): Promise<void> {
  try {
    const session = await getServerSession(options);
    if (!session) {
      redirect('/error');
    }
    const uuid = session.user.uuid;
    const accessToken = session.user.accessToken;

    const res = await api.post<CommonResponseType<string>>(
      API_PREFIX,
      `/usertokens?token=${token}`,
      undefined,
      {
        headers: {
          'X-User-UUID': uuid,
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    console.log('Token sent to server:', res.data);
  } catch (error) {
    console.error('Error sending token to server:', error);
  }
}

export async function getNotificationsData({
  size,
  cursor,
}: {
  size: number;
  cursor?: number;
}): Promise<ApiResponse<NotificationResponse>> {
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
    console.log(uuid);

    const res = await api.get<CommonResponseType<NotificationResponse>>(
      API_PREFIX,
      '/notifications/user',
      query,
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
  } catch (_error) {
    redirect('/error');
  }
}
