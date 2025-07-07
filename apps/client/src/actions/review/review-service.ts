'use server';
import { api } from '@/hooks/serverFetch';
import { ApiResponse, CommonResponseType } from '@/types/responseDataTypes';
import {
  ReviewResponseDataType,
  ReviewSummaryDataType,
} from '@/types/reviewDataTypes';
import { redirect } from 'next/navigation';

const READ_API_PREFIX = `${process.env.BASE_API_URL}/review-read-service/api/v1/reviews`;

export async function getReviewsData({
  size,
  cursor,
  parkingLotUuid,
}: {
  size: number;
  cursor?: string;
  parkingLotUuid: string;
}): Promise<ApiResponse<ReviewResponseDataType>> {
  const query: Record<string, string> = {
    size: size.toString(),
    parkingLotUuid,
    ...(cursor !== undefined && { cursor: cursor }),
  };
  try {
    const res = await api.get<CommonResponseType<ReviewResponseDataType>>(
      READ_API_PREFIX,
      '',
      query
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

    return {
      success: true,
      data: res.data,
    };
  } catch (_error) {
    redirect('/error');
  }
}
