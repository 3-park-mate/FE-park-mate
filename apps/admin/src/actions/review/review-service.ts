'use server';
import { api } from '@/hooks/serverFetch';
import { ApiResponse, CommonResponseType } from '@/types/responseDataTypes';
import { ReviewSummaryDataType } from '@/types/reviewDataTypes';
import { redirect } from 'next/navigation';

const READ_API_PREFIX = `${process.env.BASE_API_URL}/review-read-service/api/v1/reviews`;

export async function getReviewSummaryData(
  parkingLotUuid: string
): Promise<ApiResponse<ReviewSummaryDataType>> {
  const query: Record<string, string> = {
    parkingLotUuid,
  };
  try {
    const res = await api.get<CommonResponseType<ReviewSummaryDataType>>(
      READ_API_PREFIX,
      '/summary',
      query
    );
    console.log(res.data);
    return {
      success: true,
      data: res.data,
    };
  } catch (_error) {
    redirect('/error');
  }
}
