// Re-export shared types for backward compatibility
export type {
  ReviewDataType,
  ReviewSummaryDataType,
  CreateReviewRequest,
  UpdateReviewRequest,
  ReviewListResponse,
  ReviewFilterParams,
  ReviewStatus,
} from '@repo/shared-types';

export interface Review {
  id: number;
  userName: string;
  rating: number;
  date: string;
  content: string;
  images: string[];
  likes: number;
  dislikes: number;
}
