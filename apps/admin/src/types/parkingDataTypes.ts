import ACSingleIcon from '@repo/ui/components/icon/ACSingleIcon';
import ACThreePhaseIcon from '@repo/ui/components/icon/ACThreePhaseIcon';
import DCChademoIcon from '@repo/ui/components/icon/DCChademoIcon';
import DCComboIcon from '@repo/ui/components/icon/DCComboIcon';

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

export interface ParkingCarouselItemDataType {
  parkingLotUuid: string;
  name: string;
  thumbnailUrl: string;
  averageRating: number;
  isOperating: boolean;
}

export interface ReviewSummaryType {
  averageRating: number;
  totalReviews: number;
}

export interface ParkingLotOptionDataType {
  id: number;
  name: string;
  label: string;
}

export interface OperationDataType {
  parkingOperationUuid: string;
  parkingLotUuid: string;
  operationDate: string;
  validStartTime: string;
  validEndTime: string;
  baseIntervalMinutes: number;
  extraIntervalMinutes: number;
  extraFee: number;
  baseFee: number;
  discountRate: number;
}

// api

export type ParkingLotType = 'PUBLIC' | 'PRIVATE' | 'COMMERCIAL';

export type ParkingSpotType = 'SMALL' | 'COMPACT' | 'STANDARD' | 'LARGE';

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
  imageUrls: string[];
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
