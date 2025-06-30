import { BaseFormData } from './common';

// Review Types
export interface ReviewDataType extends BaseFormData {
  reviewUuid: string;
  parkingLotUuid: string;
  userUuid: string;
  userName: string;
  rating: number;
  content: string;
  imageUrls?: string[];
  isVerified: boolean;
}

export interface ReviewSummaryDataType {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    [key: number]: number;
  };
}

export interface CreateReviewRequest {
  parkingLotUuid: string;
  rating: number;
  content: string;
  imageUrls?: string[];
}

export interface UpdateReviewRequest {
  rating: number;
  content: string;
  imageUrls?: string[];
}

// Review Response Types
export interface ReviewListResponse {
  reviews: ReviewDataType[];
  totalCount: number;
  averageRating: number;
}

// Review Filter Types
export interface ReviewFilterParams {
  rating?: number;
  sortBy?: 'latest' | 'rating' | 'helpful';
  page?: number;
  size?: number;
}

// Review Status Types
export type ReviewStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'DELETED';
