import { options } from '@/app/api/auth/[...nextauth]/options';
import { api } from '@/hooks/serverFetch';
import { parkingStatisticsDataType } from '@/types/hostDataTypes';
import { ApiResponse, CommonResponseType } from '@/types/responseDataTypes';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const API_PREFIX = `${process.env.BASE_API_URL}/host-service/api/v1/hosts/parking-lots`;

export async function getDateSalesRange({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}): Promise<ApiResponse<parkingStatisticsDataType[]>> {
  const query: Record<string, string> = {
    startDate,
    endDate,
  };

  try {
    const session = await getServerSession(options);
    if (!session) {
      redirect('/error');
    }
    const uuid = session.user.uuid;
    const accessToken = session.user.accessToken;
    console.log('uuid:', uuid);

    const res = await api.get<CommonResponseType<parkingStatisticsDataType[]>>(
      API_PREFIX,
      '/sales/weekly-range',
      query,
      {
        headers: {
          //   'X-Host-UUID': uuid,
          'X-Host-UUID': 'hostUuid3',
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
