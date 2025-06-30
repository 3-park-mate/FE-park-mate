import { BaseFormData } from './common';

// User Types
export interface UserDataType extends BaseFormData {
  userUuid: string;
  email: string;
  name: string;
  phoneNumber: string;
  profileImageUrl?: string;
  point: number;
}

export interface UserProfileDataType {
  userUuid: string;
  email: string;
  name: string;
  phoneNumber: string;
  profileImageUrl?: string;
}

export interface UpdateUserProfileRequest {
  name: string;
  phoneNumber: string;
  profileImageUrl?: string;
}

// User Car Types
export interface UserCarDataType extends BaseFormData {
  carUuid: string;
  userUuid: string;
  vehicleNumber: string;
  carType: string;
  isDefault: boolean;
}

export interface AddUserCarRequest {
  vehicleNumber: string;
  carType: string;
  isDefault?: boolean;
}

export interface UpdateUserCarRequest {
  vehicleNumber: string;
  carType: string;
  isDefault?: boolean;
}

// User Point Types
export interface UserPointDataType {
  userUuid: string;
  currentPoint: number;
  totalEarnedPoint: number;
  totalUsedPoint: number;
}

export interface PointHistoryItem {
  pointHistoryUuid: string;
  userUuid: string;
  amount: number;
  type: 'EARN' | 'USE' | 'REFUND';
  description: string;
  createdAt: string;
}

// User Settings Types
export interface UserSettingsDataType {
  userUuid: string;
  pushNotificationEnabled: boolean;
  emailNotificationEnabled: boolean;
  smsNotificationEnabled: boolean;
  language: 'ko' | 'en';
  timezone: string;
}

// User Statistics Types
export interface UserStatisticsDataType {
  userUuid: string;
  totalReservations: number;
  totalSpent: number;
  favoriteParkingLots: number;
  averageRating: number;
  memberSince: string;
}
