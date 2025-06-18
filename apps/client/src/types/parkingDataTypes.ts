export interface ParkingLocationDataType {
  parkingLotUuid: string;
  parkingLotName: string;
  parkingLotDistance: number;
  parkingSpotName: string;
  vehicleNumber: string;
}

export interface ParkingTimeDataType {
  entryTime: string;
  exitTime: string;
}

export interface ParkingQRDataType {
  parkingLotUuid: string;
  entryTime: string;
  exitTime: string;
  parkingSpotName: string;
  vehicleNumber: string;
}

export interface ParkingCarouselItemDataType {
  parkingLotUuid: string;
  name: string;
  distance: number;
  thumbnailUrl: string;
  baseFee: number;
  averageRating: number;
}

export interface ReviewSummaryDataType {
  averageRating: number;
  totalReviews: number;
}

export interface ParkingSpotChargeType {
  chargeTypeId: number;
  chargeTypeName: string;
}

export interface ParkingDetailDataType {
  hostUuid: string;
  parkingLotType: string;
  name: string;
  parkingCapacity: number;
  registeredParkingCount: number;
  zoneCode: string;
  mainAddress: string;
  detailAddress: string;
  evChargingAvailable: boolean;
  phoneNumber: string;
  extraInfo: string;
  imageUrls: string[];
  parkingSpotChargeTypeList: ParkingSpotChargeType[];
}

export interface ParkingOperationDataType {
  parkingLotUuid: string;
  isActive: boolean;
  validStartTime: string;
  validEndTime: string;
  baseIntervalMinutes: number;
  baseFee: number;
  extraIntervalMinutes: number;
  extraFee: number;
  discountPercent: number;
}

export interface DetailInfoSectionProps {
  thumbImageUrl?: string;
  baseFee: number;
  name: string;
  averageRating: number;
  totalReviews: number;
  distance: number;
  availableSpots: number;
  registeredParkingCount: number;
}

// api

export type ParkingLotType = 'PUBLIC' | 'PRIVATE' | 'COMMERCIAL';

export type ParkingSpotType = 'SMALL' | 'COMPACT' | 'STANDARD' | 'LARGE';

export type EVChargeType =
  | 'AC_SINGLE'
  | 'DC_COMBO'
  | 'DC_CHADEMO'
  | 'AC_THREE_PHASE';

export interface ParkingLotOption {
  name: string;
  label: string;
}

export interface ParkingLotRequestDataType {
  parkingLotUuid: string;
  hostUuid: string;
  thumbnailUrl?: string;
  name: string;
  phoneNumber: string;
  address: string;
  capacity: number;
  parkingLotType: ParkingLotType;
  parkingSpotTypes: ParkingSpotType[];
  isEvChargingAvailable: boolean;
  evChargeTypes: EVChargeType[];
  extraInfo: string;
  imageUrls: string[];
  options: ParkingLotOption[];
  likeCount: number;
  dislikeCount: number;
}
