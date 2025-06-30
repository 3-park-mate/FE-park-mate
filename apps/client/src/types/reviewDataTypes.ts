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
