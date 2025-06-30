// Re-export shared types for backward compatibility
export type {
  UserDataType,
  UserProfileDataType,
  UpdateUserProfileRequest,
  UserCarDataType,
  AddUserCarRequest,
  UpdateUserCarRequest,
  UserPointDataType,
  PointHistoryItem,
  UserSettingsDataType,
  UserStatisticsDataType,
} from '@repo/shared-types';

export interface UserInfoDataType {
  name: string;
  phoneNumber: string;
  point: number;
}

export interface EditProfileDataType {
  name: string;
  phoneNumber: string;
}
