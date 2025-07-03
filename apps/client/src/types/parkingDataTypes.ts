import ACSingleIcon from '@repo/ui/components/icon/ACSingleIcon';
import ACThreePhaseIcon from '@repo/ui/components/icon/ACThreePhaseIcon';
import DCChademoIcon from '@repo/ui/components/icon/DCChademoIcon';
import DCComboIcon from '@repo/ui/components/icon/DCComboIcon';
import { ParkingLotSimpleInfoType } from './mapDataTypes';

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

// api

export type ParkingLotType = 'PUBLIC' | 'PRIVATE' | 'COMMERCIAL';

export type ParkingSpotType = 'SMALL' | 'COMPACT' | 'STANDARD' | 'LARGE';

export type ParkingSpotTypeWithEV =
  | 'EV'
  | 'SMALL'
  | 'COMPACT'
  | 'STANDARD'
  | 'LARGE';

export type EVChargeType =
  | 'AC_SINGLE'
  | 'DC_COMBO'
  | 'DC_CHADEMO'
  | 'AC_THREE_PHASE';

export const chargingTypes = [
  { key: 'AC_SINGLE', icon: ACSingleIcon, label: 'AC단상' },
  { key: 'AC_THREE_PHASE', icon: ACThreePhaseIcon, label: 'AC3상' },
  { key: 'DC_CHADEMO', icon: DCChademoIcon, label: 'DC차데모' },
  { key: 'DC_COMBO', icon: DCComboIcon, label: 'DC콤보' },
];

export interface ParkingLotOption {
  name: string;
  label: string;
}

export interface ParkingLotResponseDataType {
  parkingLotUuid: string;
  hostUuid: string;
  thumbnailUrl?: string;
  name: string;
  phoneNumber: string;
  address: string;
  latitude: number;
  longitude: number;
  capacity: number;
  parkingLotType: ParkingLotType;
  parkingSpotTypes: ParkingSpotType[];
  evChargeTypes: EVChargeType[];
  extraInfo: string;
  imageUrls: { imageUrl: string }[];
  options: ParkingLotOption[];
  likeCount: number;
  dislikeCount: number;
}

export interface WeeklyOperationInfo {
  dayOfWeek: string;
  dayOfMonth: number;
  startTime?: string;
  endTime?: string;
}

export interface GetParkingLotsInBoxRequestType {
  swLat: number;
  swLng: number;
  neLat: number;
  neLng: number;
  isEvChargingAvailable: boolean;
  entry?: string;
  exit?: string;
}

export interface ParkingLotsInBoxResponseType {
  parkingLots: ParkingLotSimpleInfoType[];
}

export interface OperationsInfo {
  parkingOperationUuid: string;
  parkingLotUuid: string;
  operationDate: string;
  validStartTime: string;
  validEndTime: string;
  baseIntervalMinutes: number;
  baseFee: number;
  extraIntervalMinutes: number;
  extraFee: number;
  discountRate: number;
}

export interface ParkingLotOptionDataType {
  id: number;
  name: string;
  label: string;
}

export type AvailableSpotsResponseType = Partial<
  Record<ParkingSpotTypeWithEV, number>
>;
