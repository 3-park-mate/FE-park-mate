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

export interface ReviewItemDataType {
  reviewUuid: string;
  userUuid: string;
  name: string;
  content: string;
  imageUrls: string[];
  rating: number;
  likeCount: number;
  dislikeCount: number;
}

export interface ReviewResponseDataType {
  cursor: string;
  hasNext: boolean;
  content: ReviewItemDataType[];
}

export interface ReviewSummaryDataType {
  averageRating: number;
  totalReviews: number;
}
