'use server';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { api } from '@/hooks/serverFetch';
import { CommonResponseType } from '@/types/responseDataTypes';

export async function sendTokenToServer(token: string): Promise<void> {
  try {
    const session = await getServerSession(options);
    if (!session) {
      redirect('/error');
    }
    const uuid = session.user.uuid;
    const accessToken = session.user.accessToken;

    const res = await api.post<CommonResponseType<string>>(
      `${process.env.BASE_API_URL}/notification-service/api/v1`,
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
