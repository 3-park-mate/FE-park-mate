export interface UserInfoDataType {
  name: string;
  phoneNumber: string;
  point: number;
}

export interface EditProfileDataType {
  name: string;
  phoneNumber: string;
}

export interface UserVehicleDataType {
  vehicleNumber: string;
  nickname: string;
  defaultSelected: boolean;
}

export interface FavoritesResponseDataType {
  content: { parkingLotUuid: string }[];
  hasNext: boolean;
  nextCursor: number;
}
