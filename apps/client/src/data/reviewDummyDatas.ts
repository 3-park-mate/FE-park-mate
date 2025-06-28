import { Review } from '@/types/reviewDataTypes';

export const mockReviews: Review[] = [
  {
    id: 1,
    userName: '홍*동',
    rating: 4.5,
    date: '2023-04-21',
    content:
      '여기에 리뷰 내용이 들어갑니다. 여기에 리뷰 내용이 들어갑니다. 여기에 리뷰 내용이 들어갑니다. 여기에 리뷰 내용이 들어갑니다.',
    images: [
      'https://dummyimage.com/155x102',
      'https://dummyimage.com/155x102',
      'https://dummyimage.com/155x102',
    ],
    likes: 4,
    dislikes: 0,
  },
  {
    id: 2,
    userName: '홍*동',
    rating: 4.5,
    date: '2023-04-21',
    content:
      '여기에 리뷰 내용이 들어갑니다. 여기에 리뷰 내용이 들어갑니다. 여기에 리뷰 내용이 들어갑니다. 여기에 리뷰 내용이 들어갑니다.',
    images: [],
    likes: 11,
    dislikes: 9,
  },
  {
    id: 3,
    userName: '홍*동',
    rating: 4.5,
    date: '2023-04-21',
    content:
      '여기에 리뷰 내용이 들어갑니다. 여기에 리뷰 내용이 들어갑니다. 여기에 리뷰 내용이 들어갑니다. 여기에 리뷰 내용이 들어갑니다.',
    images: [],
    likes: 11,
    dislikes: 9,
  },
];
