import { BaseFormData } from './common';

// MyPage Menu Types
export interface MyPageMenuDataType {
  label: string;
  href: string;
  icon?: string;
  badge?: number;
}

// MyPage Statistics Types
export interface MyPageStatisticsDataType {
  totalReservations: number;
  totalSpent: number;
  favoriteParkingLots: number;
  averageRating: number;
  currentPoints: number;
  memberSince: string;
}

// MyPage Activity Types
export interface MyPageActivityItem {
  id: string;
  type: 'reservation' | 'payment' | 'review' | 'favorite';
  title: string;
  description: string;
  timestamp: string;
  relatedId?: string;
}

// MyPage Settings Types
export interface MyPageSettingsDataType {
  profile: {
    name: string;
    email: string;
    phoneNumber: string;
    profileImageUrl?: string;
  };
  preferences: {
    language: 'ko' | 'en';
    timezone: string;
    currency: 'KRW' | 'USD';
  };
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
    marketing: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    dataSharing: boolean;
  };
}

// MyPage Favorites Types
export interface MyPageFavoriteItem {
  parkingLotUuid: string;
  name: string;
  address: string;
  thumbnailUrl?: string;
  rating: number;
  price: number;
  distance: number;
  addedAt: string;
}

// MyPage History Types
export interface MyPageHistoryItem {
  id: string;
  type: 'reservation' | 'payment' | 'review';
  title: string;
  amount?: number;
  status: string;
  timestamp: string;
  relatedId?: string;
}

// MyPage Tab Types
export interface MyPageTabType {
  id: string;
  label: string;
  icon?: string;
  badge?: number;
  content: any;
}
