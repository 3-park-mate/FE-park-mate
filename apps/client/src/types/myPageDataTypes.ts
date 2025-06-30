// Re-export shared types for backward compatibility
export type {
  MyPageMenuDataType,
  MyPageStatisticsDataType,
  MyPageActivityItem,
  MyPageSettingsDataType,
  MyPageFavoriteItem,
  MyPageHistoryItem,
  MyPageTabType,
} from '@repo/shared-types';

export interface VehicleDataType {
  userVehicleNumbersId: number;
  vehicleNumber: string;
  isDefault: boolean;
  nickname: string;
}

export interface AddMyCarDataType {
  vehicleNumber: string;
  isDefault: boolean;
  nickname: string;
}
